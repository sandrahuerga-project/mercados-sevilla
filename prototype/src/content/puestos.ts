import type { PersonaId } from '../shell/PersonaImage';

/**
 * La foto de perfil de cada puesto, buscada por el nombre con el que firma sus
 * mensajes en los flujos (`step.puesto`).
 *
 * En un chat de verdad el rótulo del puesto va con su cara: en un pedido a dos
 * puestos, el nombre solo no basta para saber quién habla de un vistazo.
 *
 * Si un puesto no está aquí, se pinta solo el rótulo. No se inventa avatar.
 */
const PUESTO_PERSONA: Record<string, PersonaId> = {
  'Mercado San Gonzalo': 'mercado',
  'Pescadería Antonio': 'pescaderia',
  Antonio: 'pescaderia',
  'Frutería Manolo': 'fruteria',
  'Carnicería Lola': 'carniceria',
};

export const personaDePuesto = (nombre?: string): PersonaId | undefined =>
  nombre ? PUESTO_PERSONA[nombre] : undefined;
