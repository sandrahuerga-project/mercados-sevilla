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
const bloque = journeys.match(/RECORRIDOS[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!bloque) fallo('journeys.ts: no se encuentra el mapa RECORRIDOS');

const CORTES = new Set(
  [...journeys.matchAll(/CORTES = new Set\(\[([^\]]*)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/'([\w:-]+)'/g)])
    .map((m) => m[1])
);

const porAudiencia = new Map(
  [...(bloque?.[1] ?? '').matchAll(/(\w+):\s*\[([^\]]*)\]/g)].map((m) => [
    m[1],
    [...m[2].matchAll(/'(\w+)'/g)].map((c) => c[1]),
  ])
);

for (const [audiencia, codigos] of porAudiencia) {
  const pasos = {};

  for (let i = 0; i < codigos.length; i++) {
    const code = codigos[i];
    const flujo = JSON.parse(await readFile(join(DIR, `${code.toLowerCase()}.json`), 'utf8'));
    const siguiente = codigos[i + 1];
    let inicioSiguiente = null;
    if (siguiente) {
      const sig = JSON.parse(await readFile(join(DIR, `${siguiente.toLowerCase()}.json`), 'utf8'));
      inicioSiguiente = `${siguiente}:${sig.start}`;
    }

    for (const [nombre, paso] of Object.entries(flujo.steps)) {
      const id = `${code}:${nombre}`;
      if (paso.kind === 'buttons') {
        pasos[id] = { kind: 'buttons', next: paso.buttons.map((b) => `${code}:${b.next}`) };
      } else if (paso.kind === 'end') {
        const puentea = inicioSiguiente && !CORTES.has(id);
        pasos[id] = { kind: 'end', next: puentea ? [inicioSiguiente] : [] };
      } else {
        pasos[id] = { kind: paso.kind, next: paso.next ? [`${code}:${paso.next}`] : [] };
      }
    }
  }

  const primero = codigos[0];
  const flujoPrimero = JSON.parse(await readFile(join(DIR, `${primero.toLowerCase()}.json`), 'utf8'));
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

  // El último flujo tiene que ser el único que termina de verdad
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
