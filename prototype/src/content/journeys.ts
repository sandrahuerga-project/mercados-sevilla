import type { FlowScript, FlowStep } from '../engine/types';
import { FLOWS, type AudienceKey, type FlowEntry } from './flowCatalog';

/**
 * Encadena los flujos de una persona en UNA sola conversación.
 *
 * Antes el «recorrido completo» apilaba móviles con un «paso 3 de 6» encima:
 * seis chats sueltos, no una historia. Aquí se pegan en un único hilo que se
 * recorre pulsando, igual que lo haría alguien comprando de verdad. Todas las
 * ramas siguen ahí, incluidas las que salen mal.
 *
 * Cómo se pegan:
 *  - Los identificadores de paso se prefijan con el código del flujo, para que
 *    dos flujos puedan tener un paso «confirmar» sin pisarse.
 *  - Cada final de un flujo deja de ser final: se convierte en la nota de
 *    cierre y enlaza con el arranque del siguiente. Como cada flujo empieza por
 *    su propio separador de fecha, el salto de tiempo se lee solo.
 *  - Los finales del último flujo sí son finales.
 */

const prefijo = (codigo: string, paso: string) => `${codigo}:${paso}`;

/** Reescribe un `next` para que apunte dentro del flujo ya prefijado. */
const reapuntar = (codigo: string, next: string | null | undefined) =>
  next === null || next === undefined ? null : prefijo(codigo, next);

const encadenar = (entrada: FlowEntry, siguienteInicio: string | null): Record<string, FlowStep> => {
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
      // Último flujo del recorrido: el final se queda como final.
      if (!siguienteInicio) {
        pasos[id] = paso;
        continue;
      }
      // Si no, la nota de cierre hace de bisagra hacia el flujo siguiente.
      pasos[id] = {
        kind: 'system',
        tone: 'blue',
        text: paso.note ?? 'La historia sigue',
        next: siguienteInicio,
      };
      continue;
    }

    pasos[id] = { ...paso, next: reapuntar(code, paso.next) } as FlowStep;
  }

  return pasos;
};

export const buildJourney = (audience: AudienceKey, flujos: FlowEntry[]): FlowScript | null => {
  if (flujos.length === 0) return null;

  const pasos: Record<string, FlowStep> = {};
  flujos.forEach((entrada, i) => {
    const siguiente = flujos[i + 1];
    const siguienteInicio = siguiente ? prefijo(siguiente.code, siguiente.script.start) : null;
    Object.assign(pasos, encadenar(entrada, siguienteInicio));
  });

  const primero = flujos[0]!;

  return {
    id: `recorrido-${audience}`,
    label: 'Recorrido completo',
    description: `Los ${flujos.length} flujos encadenados en una sola conversación`,
    // La cabecera es la del primer flujo; cuando el interlocutor cambia, se ve
    // en el rótulo de cada burbuja, que ya lleva el nombre del puesto.
    phone: primero.script.phone,
    start: prefijo(primero.code, primero.script.start),
    steps: pasos,
  };
};

export const journeyFor = (audience: AudienceKey) =>
  buildJourney(
    audience,
    FLOWS.filter((f) => f.audience === audience)
  );
