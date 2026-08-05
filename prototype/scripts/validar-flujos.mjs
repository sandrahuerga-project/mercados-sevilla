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
