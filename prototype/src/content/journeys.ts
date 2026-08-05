import type { FlowScript, FlowStep } from '../engine/types';
import { FLOWS, type AudienceKey } from './flowCatalog';
import c07david from '../flows/c07-david.json';

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
 *  - Solo los finales de la lista de PUENTES encadenan con el flujo siguiente.
 *    Antes puenteaba TODO final que no fuera un corte, y salían disparates:
 *    tocabas «Modificar» en C04 y aparecía el recibo confirmado de C05, o
 *    acababas en un tracking con el pedido de otra persona. Un final feliz
 *    encadena; una excepción termina la historia con su nota, como en la ficha.
 *  - Cada flujo empieza por su propio separador de fecha, así que el salto de
 *    tiempo se lee solo, sin avisos.
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
 * En el recorrido de David el pedido va a reparto (#SGZ-2026-0412, el mismo
 * que se ve en el panel de Antonio), así que el tracking genérico de C07
 * —recogida, otro pedido y otro total— no le vale. Se sustituye el guion,
 * solo dentro del recorrido; la ficha de C07 en «Flujo a flujo» no cambia.
 */
const GUIONES_ALTERNATIVOS: Partial<Record<AudienceKey, Record<string, FlowScript>>> = {
  david: { C07: c07david as FlowScript },
};

/**
 * Qué final encadena con qué paso del flujo siguiente. Todo lo que no esté
 * aquí es un final de verdad también dentro del recorrido: la nota del paso
 * ya cuenta en qué ficha sigue esa rama.
 */
const PUENTES: Partial<Record<AudienceKey, Record<string, string>>> = {
  carmen: {
    // Esperar al vídeo → el saludo del día siguiente.
    'C01:esperar-fin': 'C02:date',
    // Pedir ahora → directo a «¿qué quieres pedir?», sin esperar al broadcast.
    'C01:pedir-fin': 'C03:que-quieres',
    // Sí, ver lo de hoy → llega el vídeo del día.
    'C02:si-fin': 'C03:date',
    // Pedido cerrado (con o sin modificación) → tracking hasta recogerlo.
    'C03:fin-ok': 'C07:date',
    'C03:mod-fin': 'C07:date',
  },
  david: {
    // «Así está bien» → esa tarde el bot le recuerda que puede añadir puestos.
    'C04:fin-ok': 'C05:date',
    // «Añadir otro puesto» → directo a elegir puesto, sin el salto a la noche.
    'C04:fin-anadir': 'C05:lista-puestos',
    // Se queda con un solo puesto → tracking del reparto.
    'C05:fin-single': 'C07:date',
    // El pedido a dos puestos llega entero: es el final bueno de esta historia.
    'C05:fin-entregado': 'C07:date',
  },
  antonio: {
    'P01:fin': 'P02:date',
    'P02:fin': 'P03:date',
    // Solo el día que sale bien encadena con el cierre; rechazar el pedido
    // o marcar agotado terminan en su nota, no en un resumen que no cuadra.
    'P03:fin': 'P04:date',
  },
};

const prefijo = (codigo: string, paso: string) => `${codigo}:${paso}`;

/** Reescribe un `next` para que apunte dentro del flujo ya prefijado. */
const reapuntar = (codigo: string, next: string | null | undefined) =>
  next === null || next === undefined ? null : prefijo(codigo, next);

const encadenar = (entrada: { code: string; script: FlowScript }): Record<string, FlowStep> => {
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

    // La lista no tiene un `next` suyo: los destinos van fila a fila.
    if (paso.kind === 'list') {
      pasos[id] = {
        ...paso,
        sections: paso.sections.map((s) => ({
          ...s,
          rows: s.rows.map((r) => ({ ...r, next: prefijo(code, r.next) })),
        })),
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

export const buildJourney = (
  audience: AudienceKey,
  flujos: { code: string; script: FlowScript }[]
): FlowScript | null => {
  if (flujos.length === 0) return null;

  const pasos: Record<string, FlowStep> = {};
  flujos.forEach((entrada) => Object.assign(pasos, encadenar(entrada)));

  // Solo puentean los finales de la lista, y solo hacia pasos que existen.
  const puentes = new Map<string, string>();
  for (const [desde, hasta] of Object.entries(PUENTES[audience] ?? {})) {
    if (pasos[desde]?.kind === 'end' && pasos[hasta]) puentes.set(desde, hasta);
  }

  for (const [id, paso] of Object.entries(pasos)) {
    if (paso.kind === 'buttons') {
      pasos[id] = {
        ...paso,
        buttons: paso.buttons.map((b) => ({ ...b, next: puentes.get(b.next) ?? b.next })),
      };
      continue;
    }
    if (paso.kind === 'list') {
      pasos[id] = {
        ...paso,
        sections: paso.sections.map((s) => ({
          ...s,
          rows: s.rows.map((r) => ({ ...r, next: puentes.get(r.next) ?? r.next })),
        })),
      };
      continue;
    }
    if (paso.kind === 'end') continue;
    if (paso.next && puentes.has(paso.next)) {
      pasos[id] = { ...paso, next: puentes.get(paso.next)! } as FlowStep;
    }
  }
  // Nadie apunta ya a un final puenteado, así que se pueden borrar.
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

  const alternativos = GUIONES_ALTERNATIVOS[audience] ?? {};

  const flujos = codigos
    .map((code) => {
      const entrada = FLOWS.find((f) => f.code === code);
      if (!entrada) return null;
      return { code, script: alternativos[code] ?? entrada.script };
    })
    .filter((f): f is { code: string; script: FlowScript } => Boolean(f));

  return buildJourney(audience, flujos);
};
