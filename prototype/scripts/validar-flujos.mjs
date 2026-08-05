/**
 * Comprueba los flujos contra los límites reales de WhatsApp Cloud API y
 * contra la propia coherencia del guion.
 *
 * Límites verificados en la documentación de Meta (reply buttons):
 * máximo 3 botones por mensaje y máximo 20 caracteres por botón.
 *
 *   node scripts/validar-flujos.mjs
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = 'src/flows';
const MAX_BOTONES = 3;
const MAX_CARACTERES = 20;
// List Message (wa-constraints.md §5): 10 filas en total contando todas las
// secciones, no 10 por sección.
const MAX_FILAS = 10;
const MAX_TITULO_FILA = 24;
const MAX_DESC_FILA = 72;

let fallos = 0;
const fallo = (msg) => {
  console.log('FALLO: ' + msg);
  fallos++;
};

const archivos = (await readdir(DIR)).filter((f) => f.endsWith('.json')).sort();

for (const archivo of archivos) {
  const flujo = JSON.parse(await readFile(join(DIR, archivo), 'utf8'));
  const { id, steps, start } = flujo;

  if (!steps[start]) fallo(`${id}: el paso inicial "${start}" no existe`);

  const destinos = new Set([start]);

  for (const [nombre, paso] of Object.entries(steps)) {
    const apunta = (next) => {
      if (next === null || next === undefined) return;
      if (!steps[next]) fallo(`${id}/${nombre}: apunta a "${next}", que no existe`);
      destinos.add(next);
    };

    if (paso.kind === 'buttons') {
      if (paso.buttons.length > MAX_BOTONES)
        fallo(`${id}/${nombre}: ${paso.buttons.length} botones, WhatsApp admite ${MAX_BOTONES}`);
      for (const boton of paso.buttons) {
        if ([...boton.label].length > MAX_CARACTERES)
          fallo(
            `${id}/${nombre}: «${boton.label}» tiene ${[...boton.label].length} caracteres, ` +
              `el máximo son ${MAX_CARACTERES}`
          );
        apunta(boton.next);
      }
    } else if (paso.kind === 'list') {
      if ([...paso.buttonLabel].length > MAX_CARACTERES)
        fallo(
          `${id}/${nombre}: el botón «${paso.buttonLabel}» tiene ` +
            `${[...paso.buttonLabel].length} caracteres, el máximo son ${MAX_CARACTERES}`
        );
      const filas = paso.sections.flatMap((s) => s.rows);
      if (filas.length > MAX_FILAS)
        fallo(
          `${id}/${nombre}: ${filas.length} filas en la lista, WhatsApp admite ${MAX_FILAS} ` +
            `contando todas las secciones`
        );
      for (const fila of filas) {
        if ([...fila.label].length > MAX_TITULO_FILA)
          fallo(
            `${id}/${nombre}: la fila «${fila.label}» tiene ${[...fila.label].length} ` +
              `caracteres, el máximo son ${MAX_TITULO_FILA}`
          );
        if (fila.description && [...fila.description].length > MAX_DESC_FILA)
          fallo(
            `${id}/${nombre}: la descripción de «${fila.label}» tiene ` +
              `${[...fila.description].length} caracteres, el máximo son ${MAX_DESC_FILA}`
          );
        apunta(fila.next);
      }
    } else {
      apunta(paso.next);
    }
  }

  // Ningún paso colgado: todo tiene que ser alcanzable desde el inicio
  for (const nombre of Object.keys(steps))
    if (!destinos.has(nombre)) fallo(`${id}/${nombre}: no se llega desde ningún sitio`);

  // Toda rama tiene que morir en un 'end'
  const finales = Object.values(steps).filter((p) => p.kind === 'end').length;
  if (finales === 0) fallo(`${id}: no tiene ningún paso final`);

  // ---- Las tres salidas de una propuesta de pedido -------------------------
  // El fallo que más se ha repetido: el bot enseña el pedido, pregunta si lo
  // confirmas y el único botón es «Confirmar». Quien se equivoca al modificar
  // no puede volver a cambiarlo, ni echarse atrás, ni pedir ayuda.
  //
  // Se reconoce una propuesta porque lleva el total estimado y va seguida de
  // botones. El recibo lleva total pero ya no es una propuesta —el pedido está
  // hecho—, y se distingue porque empieza por 📝; ahí mandan otras tres plazas
  // (añadir puesto, cancelar y cerrar).
  const CONFIRMA = /^(confirmar|confírmalo|sí|si|vale|apúntalo)/i;
  const RECTIFICA = /modific|cambiar/i;
  // La salida puede ser irse (cancelar, quitar) o buscar a una persona. Fuera
  // del horario del puesto esa persona no está, y entonces la salida es dejarle
  // recado — por eso «mensaje» y «recado» cuentan igual que «hablar».
  const SALIDA = /hablar|mensaje|recado|cancel|quitar/i;

  // Varios mensajes pueden desembocar en el mismo grupo de botones, y el aviso
  // interesa una vez por grupo, no una por camino que llega a él.
  const revisados = new Set();

  for (const [nombre, paso] of Object.entries(steps)) {
    if (paso.kind !== 'bot' || !paso.text.includes('Total estimado')) continue;
    if (paso.text.includes('📝')) continue;
    const siguiente = paso.next && steps[paso.next];
    if (!siguiente || siguiente.kind !== 'buttons') continue;
    if (revisados.has(paso.next)) continue;
    revisados.add(paso.next);

    const etiquetas = siguiente.buttons.map((b) => b.label);
    const falta = [];
    if (!etiquetas.some((l) => CONFIRMA.test(l))) falta.push('confirmar');
    if (!etiquetas.some((l) => RECTIFICA.test(l))) falta.push('volver a modificar');
    if (!etiquetas.some((l) => SALIDA.test(l)))
      falta.push('una salida (hablar con el placero, dejarle recado o cancelar)');
    if (falta.length)
      fallo(
        `${id}/${paso.next}: propone un pedido y no ofrece ${falta.join(' ni ')}. ` +
          `Tiene [${etiquetas.join('] [')}]`
      );
  }

  // ---- Hablar con el placero, solo cuando está el placero -------------------
  // flows-index.md (C11) lo dice desde el principio: el escalado humano existe
  // solo dentro del horario del puesto, y fuera de él manda S01. Se coló igual:
  // C05 ofrecía «Hablar con Manolo» a las 21:42, con el mercado cerrado desde
  // hacía siete horas. Un botón no puede prometer algo que no va a pasar; si es
  // de noche, lo honrado es decir que se le deja recado.
  const ABRE = 9;
  const CIERRA = 14;

  // De qué paso viene cada uno, para heredar la hora cuando el grupo no la trae
  const vieneDe = {};
  for (const [nombre, paso] of Object.entries(steps)) {
    if (paso.kind === 'buttons') paso.buttons.forEach((b) => (vieneDe[b.next] ??= nombre));
    else if (paso.kind === 'list')
      paso.sections.forEach((s) => s.rows.forEach((r) => (vieneDe[r.next] ??= nombre)));
    else if (paso.next) vieneDe[paso.next] ??= nombre;
  }

  for (const [nombre, paso] of Object.entries(steps)) {
    if (paso.kind !== 'buttons') continue;
    const escalados = paso.buttons.filter((b) => /hablar con/i.test(b.label));
    if (!escalados.length) continue;

    const hora = paso.timestamp ?? steps[vieneDe[nombre]]?.timestamp;
    if (!hora) continue;
    const h = parseInt(hora.split(':')[0], 10);
    if (h >= ABRE && h < CIERRA) continue;

    fallo(
      `${id}/${nombre}: ofrece «${escalados[0].label}» a las ${hora}, con el puesto ` +
        `cerrado (abre de ${ABRE}:00 a ${CIERRA}:00). Fuera de horario no se habla con ` +
        `el placero: se le deja recado y contesta al abrir`
    );
  }

  // ---- Preguntas sin manera de contestar -----------------------------------
  // Si el bot pregunta algo y la rama muere ahí, el cliente se queda mirando
  // una pregunta que no puede responder.
  for (const [nombre, paso] of Object.entries(steps)) {
    if (paso.kind !== 'bot' || !paso.text.includes('?')) continue;
    const siguiente = paso.next && steps[paso.next];
    if (!siguiente || siguiente.kind === 'end') {
      const pregunta = paso.text.split('\n').filter((l) => l.includes('?')).pop().trim();
      fallo(`${id}/${nombre}: pregunta «${pregunta}» y la rama termina sin poder contestar`);
    }
  }
}

// ---- Recorridos encadenados -------------------------------------------------
// Reproduce lo que hace buildJourney() y comprueba que el hilo resultante se
// recorre entero: sin referencias rotas y sin pasos a los que no se llega.

// Los recorridos se leen de journeys.ts: son a mano, no todos los flujos de la
// persona. Las situaciones límite no tienen recorrido y por eso no salen aquí.
const journeys = await readFile('src/content/journeys.ts', 'utf8');
const bloque = journeys.match(/const RECORRIDOS[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!bloque) fallo('journeys.ts: no se encuentra el mapa RECORRIDOS');

// Solo los finales listados en PUENTES encadenan con el flujo siguiente;
// el resto termina de verdad también dentro del recorrido.
const bloquePuentes = journeys.match(/const PUENTES[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!bloquePuentes) fallo('journeys.ts: no se encuentra el mapa PUENTES');
const puentesPorAudiencia = new Map(
  [...(bloquePuentes?.[1] ?? '').matchAll(/(\w+):\s*\{([\s\S]*?)\}/g)].map((m) => [
    m[1],
    new Map([...m[2].matchAll(/'([\w:-]+)':\s*'([\w:-]+)'/g)].map((p) => [p[1], p[2]])),
  ])
);

// Guiones alternativos por recorrido (p. ej. el C07 de reparto de David).
const importes = new Map(
  [...journeys.matchAll(/import (\w+) from '\.\.\/flows\/([\w-]+)\.json'/g)].map((m) => [
    m[1],
    m[2],
  ])
);
const bloqueAlt = journeys.match(/const GUIONES_ALTERNATIVOS[^=]*=\s*\{([\s\S]*?)\n\};/);
const altPorAudiencia = new Map(
  [...(bloqueAlt?.[1] ?? '').matchAll(/(\w+):\s*\{([^}]*)\}/g)].map((m) => [
    m[1],
    new Map(
      [...m[2].matchAll(/(\w+):\s*(\w+)/g)].map((p) => [p[1], importes.get(p[2]) ?? p[1].toLowerCase()])
    ),
  ])
);

const porAudiencia = new Map(
  [...(bloque?.[1] ?? '').matchAll(/(\w+):\s*\[([^\]]*)\]/g)].map((m) => [
    m[1],
    [...m[2].matchAll(/'(\w+)'/g)].map((c) => c[1]),
  ])
);

for (const [audiencia, codigos] of porAudiencia) {
  const pasos = {};
  const puentes = puentesPorAudiencia.get(audiencia) ?? new Map();
  const alternativos = altPorAudiencia.get(audiencia) ?? new Map();
  const ficheroDe = (code) => `${alternativos.get(code) ?? code.toLowerCase()}.json`;

  for (const code of codigos) {
    const flujo = JSON.parse(await readFile(join(DIR, ficheroDe(code)), 'utf8'));

    for (const [nombre, paso] of Object.entries(flujo.steps)) {
      const id = `${code}:${nombre}`;
      if (paso.kind === 'buttons') {
        pasos[id] = { kind: 'buttons', next: paso.buttons.map((b) => `${code}:${b.next}`) };
      } else if (paso.kind === 'list') {
        pasos[id] = {
          kind: 'list',
          next: paso.sections.flatMap((s) => s.rows.map((r) => `${code}:${r.next}`)),
        };
      } else if (paso.kind === 'end') {
        const destino = puentes.get(id);
        pasos[id] = { kind: 'end', next: destino ? [destino] : [] };
      } else {
        pasos[id] = { kind: paso.kind, next: paso.next ? [`${code}:${paso.next}`] : [] };
      }
    }
  }

  // Cada puente tiene que salir de un final real y llegar a un paso que exista
  for (const [desde, hasta] of puentes) {
    if (!pasos[desde]) fallo(`recorrido ${audiencia}: el puente sale de "${desde}", que no existe`);
    else if (pasos[desde].kind !== 'end')
      fallo(`recorrido ${audiencia}: el puente "${desde}" no es un paso final`);
    if (!pasos[hasta]) fallo(`recorrido ${audiencia}: el puente lleva a "${hasta}", que no existe`);
  }

  const primero = codigos[0];
  const flujoPrimero = JSON.parse(await readFile(join(DIR, ficheroDe(primero)), 'utf8'));
  const arranque = `${primero}:${flujoPrimero.start}`;

  if (!pasos[arranque]) fallo(`recorrido ${audiencia}: el arranque "${arranque}" no existe`);

  for (const [id, paso] of Object.entries(pasos))
    for (const destino of paso.next)
      if (!pasos[destino]) fallo(`recorrido ${audiencia}: ${id} apunta a "${destino}", que no existe`);

  // Recorrido en anchura desde el arranque
  const vistos = new Set([arranque]);
  const cola = [arranque];
  while (cola.length) {
    const actual = cola.shift();
    for (const destino of pasos[actual]?.next ?? [])
      if (pasos[destino] && !vistos.has(destino)) {
        vistos.add(destino);
        cola.push(destino);
      }
  }
  const sueltos = Object.keys(pasos).filter((id) => !vistos.has(id));
  if (sueltos.length)
    fallo(`recorrido ${audiencia}: ${sueltos.length} pasos inalcanzables (${sueltos[0]}…)`);

  // Tiene que quedar al menos un final de verdad (los no puenteados lo son)
  const ultimos = Object.entries(pasos).filter(([, p]) => p.kind === 'end' && p.next.length === 0);
  if (ultimos.length === 0) fallo(`recorrido ${audiencia}: no termina en ningún sitio`);

  console.log(
    `recorrido ${audiencia}: ${codigos.length} flujos, ${Object.keys(pasos).length} pasos, ` +
      `${ultimos.length} finales`
  );
}

console.log(
  fallos === 0
    ? `\nOK: ${archivos.length} flujos y ${porAudiencia.size} recorridos, sin fallos`
    : `\n${fallos} fallos`
);
process.exit(fallos === 0 ? 0 : 1);
