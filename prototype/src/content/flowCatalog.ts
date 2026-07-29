import type { FlowScript } from '../engine/types';
import c01 from '../flows/c01.json';
import c02 from '../flows/c02.json';
import c03 from '../flows/c03.json';
import c04 from '../flows/c04.json';
import c05 from '../flows/c05.json';
import c06 from '../flows/c06.json';
import c07 from '../flows/c07.json';
import c08 from '../flows/c08.json';
import c09 from '../flows/c09.json';
import c10 from '../flows/c10.json';
import c11 from '../flows/c11.json';
import s01 from '../flows/s01.json';
import s03 from '../flows/s03.json';

export type AudienceKey = 'carmen' | 'david' | 'antonio' | 'limite';

export interface FlowEntry {
  /** Código interno del inventario (flows-index.md). Se muestra discreto. */
  code: string;
  /** Nombre en cristiano: lo que el visitante entiende sin contexto. */
  name: string;
  /** Una frase sobre qué demuestra este flujo. */
  about: string;
  audience: AudienceKey;
  /** Grupo dentro de la persona, para las pills. */
  group: string;
  /** Si el flujo tiene ramas que salen mal. */
  hasUnhappy?: boolean;
  script: FlowScript;
}

export const FLOWS: FlowEntry[] = [
  {
    code: 'C01',
    name: 'Darse de alta',
    about: 'Alta en tres pantallas dentro del chat, con consentimiento explícito.',
    audience: 'carmen',
    group: 'Empezar',
    script: c01 as FlowScript,
  },
  {
    code: 'C02',
    name: 'El saludo de cada mañana',
    about: 'Un mensaje, dos botones. La rutina diaria sin fricción.',
    audience: 'carmen',
    group: 'Empezar',
    script: c02 as FlowScript,
  },
  {
    code: 'C03',
    name: 'Pedir mandando un audio',
    about: 'El flujo central: vídeo, nota de voz, confirmación y recogida.',
    audience: 'carmen',
    group: 'Comprar',
    hasUnhappy: true,
    script: c03 as FlowScript,
  },
  {
    code: 'C07',
    name: 'Seguir el pedido hasta recogerlo',
    about: 'Avisos de estado y el total real una vez pesado el pedido.',
    audience: 'carmen',
    group: 'Después de pedir',
    hasUnhappy: true,
    script: c07 as FlowScript,
  },
  {
    code: 'C08',
    name: 'Cuando se agota un producto',
    about: 'El placero marca agotado y el cliente decide qué hacer.',
    audience: 'carmen',
    group: 'Después de pedir',
    hasUnhappy: true,
    script: c08 as FlowScript,
  },
  {
    code: 'C11',
    name: 'Hablar con el placero',
    about: 'El bot se aparta, entra la persona y luego devuelve el control.',
    audience: 'carmen',
    group: 'Después de pedir',
    script: c11 as FlowScript,
  },
  {
    code: 'C06',
    name: 'Repetir el pedido de siempre',
    about: '«Lo de siempre» resuelto en un toque.',
    audience: 'david',
    group: 'Comprar rápido',
    hasUnhappy: true,
    script: c06 as FlowScript,
  },
  {
    code: 'C04',
    name: 'Pedir sin esperar al vídeo',
    about: 'El cliente arranca la conversación por su cuenta a media mañana.',
    audience: 'david',
    group: 'Comprar rápido',
    script: c04 as FlowScript,
  },
  {
    code: 'C05',
    name: 'Comprar en dos puestos a la vez',
    about: 'Un pedido, dos placeros, una entrega. Y qué pasa si uno no puede.',
    audience: 'david',
    group: 'Pedido grande',
    hasUnhappy: true,
    script: c05 as FlowScript,
  },
  {
    code: 'C09',
    name: 'Cambiar algo del pedido',
    about: 'Libre antes de que el placero acepte; a partir de ahí, decide él.',
    audience: 'david',
    group: 'Cambios de última hora',
    hasUnhappy: true,
    script: c09 as FlowScript,
  },
  {
    code: 'C10',
    name: 'Cancelar un pedido',
    about: 'Sin fricción si nadie ha empezado; con confirmación si ya está en marcha.',
    audience: 'david',
    group: 'Cambios de última hora',
    hasUnhappy: true,
    script: c10 as FlowScript,
  },
  {
    code: 'S01',
    name: 'Pedir con el puesto cerrado',
    about: 'El bot atiende siempre, aunque el mercado no.',
    audience: 'limite',
    group: 'Fuera de lo normal',
    script: s01 as FlowScript,
  },
  {
    code: 'S03',
    name: 'Cliente bloqueado',
    about: 'Dos incidencias sin resolver y el pedido deja de entrar por el bot.',
    audience: 'limite',
    group: 'Fuera de lo normal',
    script: s03 as FlowScript,
  },
];

export const AUDIENCE_ORDER: AudienceKey[] = ['carmen', 'david', 'antonio', 'limite'];

export const flowsFor = (audience: AudienceKey) =>
  FLOWS.filter((f) => f.audience === audience);

export const groupsFor = (audience: AudienceKey) => [
  ...new Set(flowsFor(audience).map((f) => f.group)),
];
