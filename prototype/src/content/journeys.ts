import type { FlowScript, FlowStep } from '../engine/types';
import { FLOWS, type AudienceKey, type FlowEntry } from './flowCatalog';

/**
 * Encadena varios flujos en UNA sola conversación, de principio a fin.
 *
 * No es el catálogo entero pegado: es el camino que sale bien. Antes se metían
 * los seis flujos de la persona, ramas malas incluidas, y salían ochenta y ocho
 * pasos que no se parecían a ninguna compra. Aquí se eligen a mano los flujos
 * que forman una historia —darse de alta, ver el vídeo, pedir, recoger— y se
 * dejan fuera los que son excepciones. Cada excepción sigue estando en su ficha,
 * en «Flujo a flujo».
 *
 * Cómo se pegan:
 *  - Los identificadores de paso se prefijan con el código del flujo, para que
 *    dos flujos puedan tener un paso «confirmar» sin pisarse.
 *  - Los finales intermedios desaparecen: quien apuntaba a ellos pasa a apuntar
 *    directamente al arranque del flujo siguiente. Como cada flujo empieza por
 *    su propio separador de fecha, el salto de tiempo se lee solo, sin avisos.
 *  - Los finales del último flujo sí son finales.
 */

/**
 * El camino bueno de cada persona, en orden narrativo.
 *
 * Las situaciones límite no tienen recorrido: son excepciones sueltas, no una
 * historia con principio y final.
 */
const RECORRIDOS: Partial<Record<AudienceKey, string[]>> = {
  carmen: ['C01', 'C02', 'C03', 'C07'],
  david: ['C04', 'C05', 'C07'],
  antonio: ['P01', 'P02', 'P03', 'P04'],
};

/**
 * Finales que cortan la conversación de verdad y no pueden hacer de puente.
 * Darse de baja y encadenar con el pedido siguiente sería tomar por tonto a
 * quien acaba de pedir que no le escriban más.
 */
const CORTES = new Set(['C03:baja-fin', 'P02:cerrado-fin']);

const prefijo = (codigo: string, paso: string) => `${codigo}:${paso}`;

/** Reescribe un `next` para que apunte dentro del flujo ya prefijado. */
const reapuntar = (codigo: string, next: string | null | undefined) =>
  next === null || next === undefined ? null : prefijo(codigo, next);

const encadenar = (entrada: FlowEntry): Record<string, FlowStep> => {
  const { code, script } = entrada;
  const pasos: Record<string, FlowStep> = {};

  for (const [nombre, paso] of Object.entries(script.steps)) {
    const id = prefijo(code, nombre);

    if (paso.kind === 'buttons') {
      pasos[id] = {
        ...paso,
        buttons: paso.buttons.map((b) => ({ ...b, next: prefijo(code, b.next) })),
      };
      continue;
    }

    if (paso.kind === 'end') {
      pasos[id] = paso;
      continue;
    }

    pasos[id] = { ...paso, next: reapuntar(code, paso.next) } as FlowStep;
  }

  return pasos;
};

/**
 * Resuelve un destino saltándose los finales intermedios. Encadena por si un
 * final lleva a otro; el tope corta cualquier ciclo raro entre flujos.
 */
const resolver = (destino: string, puentes: Map<string, string>): string => {
  let actual = destino;
  for (let i = 0; i < 10 && puentes.has(actual); i++) actual = puentes.get(actual)!;
  return actual;
};

export const buildJourney = (audience: AudienceKey, flujos: FlowEntry[]): FlowScript | null => {
  if (flujos.length === 0) return null;

  const pasos: Record<string, FlowStep> = {};
  flujos.forEach((entrada) => Object.assign(pasos, encadenar(entrada)));

  // Cada final que no sea del último flujo es un puente al siguiente arranque.
  const puentes = new Map<string, string>();
  flujos.forEach((entrada, i) => {
    const siguiente = flujos[i + 1];
    if (!siguiente) return;
    const inicioSiguiente = prefijo(siguiente.code, siguiente.script.start);
    for (const [nombre, paso] of Object.entries(entrada.script.steps)) {
      const id = prefijo(entrada.code, nombre);
      if (paso.kind === 'end' && !CORTES.has(id)) puentes.set(id, inicioSiguiente);
    }
  });

  // Nadie apunta ya a un final intermedio, así que se pueden borrar.
  for (const [id, paso] of Object.entries(pasos)) {
    if (paso.kind === 'buttons') {
      pasos[id] = {
        ...paso,
        buttons: paso.buttons.map((b) => ({ ...b, next: resolver(b.next, puentes) })),
      };
      continue;
    }
    if (paso.kind === 'end') continue;
    if (paso.next) pasos[id] = { ...paso, next: resolver(paso.next, puentes) } as FlowStep;
  }
  for (const id of puentes.keys()) delete pasos[id];

  const primero = flujos[0]!;

  return {
    id: `recorrido-${audience}`,
    label: 'De principio a fin',
    description: 'Una conversación entera, del principio al final',
    // La cabecera es la del primer flujo; cuando el interlocutor cambia, se ve
    // en el rótulo de cada burbuja, que ya lleva el nombre del puesto.
    phone: primero.script.phone,
    start: prefijo(primero.code, primero.script.start),
    steps: pasos,
  };
};

export const journeyFor = (audience: AudienceKey) => {
  const codigos = RECORRIDOS[audience];
  if (!codigos) return null;

  const flujos = codigos
    .map((code) => FLOWS.find((f) => f.code === code))
    .filter((f): f is FlowEntry => Boolean(f));

  return buildJourney(audience, flujos);
};
