import React from 'react';

/**
 * Mapa de los veintitrés flujos. Existe para que los códigos (C03, P02, S04…)
 * dejen de ser jerga: aquí se ve de dónde sale cada uno y a dónde lleva.
 * Es el único sitio de la web donde los códigos se muestran.
 *
 * Reglas de trazado, para que no vuelva a parecer espagueti:
 *  1. Toda arista va hacia la derecha o hacia abajo. Nunca retrocede.
 *  2. Nada de curvas Bézier: sólo tramos rectos en ángulo recto.
 *  3. Las decisiones son rombos. El «Sí» sigue por el espinazo, el «No» baja.
 */

type Kind = 'entrada' | 'pedido' | 'placero' | 'despues' | 'limite';
type Shape = 'caja' | 'rombo' | 'fin';

interface Nodo {
  id: string;
  /** Código del inventario. Los rombos y el final no tienen. */
  code?: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: Kind;
  shape: Shape;
}

const W = 190;
const H = 56;
const DW = 150;

// Filas
const R_PLACERO = 30;
const R_ESPINAZO = 190;
const R_NO = 340;
const R_CLIENTE = 490;
const R_LIMITE = 640;

const caja = (
  id: string,
  code: string,
  name: string,
  x: number,
  y: number,
  kind: Kind
): Nodo => ({ id, code, name, x, y, w: W, h: H, kind, shape: 'caja' });

const rombo = (id: string, name: string, cx: number, y: number): Nodo => ({
  id,
  name,
  x: cx - DW / 2,
  y,
  w: DW,
  h: H,
  kind: 'pedido',
  shape: 'rombo',
});

// Centros de los rombos del espinazo
const D1 = 615;
const D2 = 1045;
const D3 = 1475;
const D4 = 1905;

const NODOS: Nodo[] = [
  // Placero, arriba: lo que pasa antes de que el cliente vea nada
  caja('P01', 'P01', 'Alta del puesto', 40, R_PLACERO, 'placero'),
  caja('P02', 'P02', 'Vídeo del mostrador', 290, R_PLACERO, 'placero'),
  caja('S07', 'S07', 'No sube el vídeo', 540, R_PLACERO, 'limite'),

  // Espinazo: el camino que sale bien, de izquierda a derecha
  caja('C01', 'C01', 'Darse de alta', 40, R_ESPINAZO, 'entrada'),
  caja('C02', 'C02', 'Saludo de cada mañana', 290, R_ESPINAZO, 'entrada'),
  rombo('D1', '¿Hay vídeo hoy?', D1, R_ESPINAZO),
  caja('C03', 'C03', 'Pedir con un audio', 720, R_ESPINAZO, 'pedido'),
  rombo('D2', '¿El puesto abre?', D2, R_ESPINAZO),
  caja('P03', 'P03', 'El placero lo acepta', 1150, R_ESPINAZO, 'placero'),
  rombo('D3', '¿Tiene el género?', D3, R_ESPINAZO),
  caja('C07', 'C07', 'Seguir el pedido', 1580, R_ESPINAZO, 'despues'),
  rombo('D4', '¿Lo recoge?', D4, R_ESPINAZO),

  // Fila «No»: cada rombo cae aquí cuando la respuesta es que no.
  // C06 se apea aquí también: es otra forma de entrar, no una decisión.
  caja('C06', 'C06', 'Repetir lo de siempre', 290, R_NO, 'pedido'),
  caja('C04', 'C04', 'Pedir sin vídeo', D1 - W / 2, R_NO, 'pedido'),
  caja('S01', 'S01', 'Puesto cerrado', D2 - W / 2, R_NO, 'limite'),
  caja('C08', 'C08', 'Producto agotado', D3 - W / 2, R_NO, 'despues'),
  caja('S02', 'S02', 'No recoge el pedido', D4 - W / 2, R_NO, 'limite'),

  // Resto de flujos del cliente
  caja('C05', 'C05', 'Dos puestos a la vez', 720, R_CLIENTE, 'pedido'),
  caja('C09', 'C09', 'Cambiar el pedido', 970, R_CLIENTE, 'despues'),
  caja('C10', 'C10', 'Cancelar el pedido', 1220, R_CLIENTE, 'despues'),
  caja('C12', 'C12', 'Ya no se puede anular', 1220, R_LIMITE, 'despues'),
  caja('C11', 'C11', 'Hablar con el placero', 1580, R_CLIENTE, 'despues'),

  // Situaciones límite que cuelgan del alta y del pedido
  caja('S05', 'S05', 'Se sale a mitad', 40, R_LIMITE, 'limite'),
  caja('S06', 'S06', 'Fuera de zona', 290, R_LIMITE, 'limite'),
  caja('S03', 'S03', 'Cliente bloqueado', 540, R_LIMITE, 'limite'),
  caja('S04', 'S04', 'No se entiende', 790, R_LIMITE, 'limite'),
  caja('P04', 'P04', 'Cierre del día', 1810, R_LIMITE, 'placero'),

  // Final del camino bueno
  {
    id: 'FIN',
    name: 'Pedido recogido',
    x: 1810,
    y: R_CLIENTE,
    w: W,
    h: H,
    kind: 'despues',
    shape: 'fin',
  },
];

const FILL: Record<Kind, string> = {
  entrada: '#2D6A4F',
  pedido: '#1B4F8A',
  placero: '#B8791D',
  despues: '#3F6E58',
  limite: '#6E6A61',
};

interface Arista {
  from: string;
  to: string;
  label?: 'Sí' | 'No';
}

const ARISTAS: Arista[] = [
  // Espinazo
  { from: 'C01', to: 'C02' },
  { from: 'C02', to: 'D1' },
  { from: 'D1', to: 'C03', label: 'Sí' },
  { from: 'C03', to: 'D2' },
  { from: 'D2', to: 'P03', label: 'Sí' },
  { from: 'P03', to: 'D3' },
  { from: 'D3', to: 'C07', label: 'Sí' },
  { from: 'C07', to: 'D4' },

  // Las cuatro ramas que salen mal
  { from: 'D1', to: 'C04', label: 'No' },
  { from: 'D2', to: 'S01', label: 'No' },
  { from: 'D3', to: 'C08', label: 'No' },
  { from: 'D4', to: 'S02', label: 'No' },
  { from: 'D4', to: 'FIN', label: 'Sí' },

  // Placero
  { from: 'P01', to: 'P02' },
  { from: 'P02', to: 'S07' },
  { from: 'P02', to: 'D1' },
  { from: 'P03', to: 'P04' },

  // Otras formas de pedir y de tocar el pedido
  { from: 'C02', to: 'C06' },
  { from: 'C03', to: 'C05' },
  { from: 'C03', to: 'C09' },
  { from: 'C03', to: 'C10' },
  { from: 'C10', to: 'C12' },
  { from: 'C03', to: 'S04' },
  { from: 'C08', to: 'C11' },

  // Lo que corta el alta
  { from: 'C01', to: 'S05' },
  { from: 'C01', to: 'S06' },
  { from: 'C02', to: 'S03' },
];

const byId = (id: string) => NODOS.find((n) => n.id === id)!;

/** Puertos: derecha, izquierda, abajo y arriba del centro de cada figura. */
const derecha = (n: Nodo) => [n.x + n.w, n.y + n.h / 2] as const;
const izquierda = (n: Nodo) => [n.x, n.y + n.h / 2] as const;
const abajo = (n: Nodo) => [n.x + n.w / 2, n.y + n.h] as const;
const arriba = (n: Nodo) => [n.x + n.w / 2, n.y] as const;

/**
 * Traza en ángulo recto. Misma fila: recta horizontal. Filas distintas: baja
 * hasta el pasillo entre las dos filas, se desplaza en horizontal y entra por
 * arriba del destino. Nunca retrocede porque el destino siempre está a la
 * derecha o más abajo.
 */
const trazar = (a: Nodo, b: Nodo): { d: string; mx: number; my: number } => {
  if (a.y === b.y) {
    const [x1, y1] = derecha(a);
    const [x2] = izquierda(b);
    return { d: `M ${x1} ${y1} H ${x2}`, mx: (x1 + x2) / 2, my: y1 - 10 };
  }
  const [x1, y1] = abajo(a);
  const [x2, y2] = arriba(b);
  const pasillo = y1 + (y2 - y1) / 2;
  return {
    d: `M ${x1} ${y1} V ${pasillo} H ${x2} V ${y2}`,
    mx: x1,
    my: pasillo - 8,
  };
};

const puntosRombo = (n: Nodo) =>
  [
    [n.x + n.w / 2, n.y],
    [n.x + n.w, n.y + n.h / 2],
    [n.x + n.w / 2, n.y + n.h],
    [n.x, n.y + n.h / 2],
  ]
    .map((p) => p.join(','))
    .join(' ');

export const FlowMap: React.FC = () => (
  <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
    <svg
      viewBox="0 0 2050 740"
      className="w-full min-w-[1180px] h-auto"
      role="img"
      aria-label="Mapa de los veintitrés flujos: el camino que sale bien va de izquierda a derecha, y cada rombo de decisión baja a lo que pasa cuando la respuesta es no"
    >
      <defs>
        <marker
          id="punta"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(252,246,236,0.5)" />
        </marker>
      </defs>

      {ARISTAS.map(({ from, to, label }) => {
        const { d, mx, my } = trazar(byId(from), byId(to));
        return (
          <g key={`${from}-${to}`}>
            <path
              d={d}
              fill="none"
              stroke="rgba(252,246,236,0.3)"
              strokeWidth="1.5"
              markerEnd="url(#punta)"
            />
            {label && (
              <text
                x={mx + 8}
                y={my}
                fill={label === 'Sí' ? '#8FC7A6' : '#E0A63F'}
                fontSize="14"
                fontFamily="Archivo Narrow, sans-serif"
                letterSpacing="0.5"
              >
                {label}
              </text>
            )}
          </g>
        );
      })}

      {NODOS.map((n) => (
        <g key={n.id}>
          {n.shape === 'rombo' ? (
            <polygon
              points={puntosRombo(n)}
              fill={FILL[n.kind]}
              fillOpacity="0.16"
              stroke="rgba(252,246,236,0.5)"
              strokeWidth="1.5"
            />
          ) : (
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={n.shape === 'fin' ? H / 2 : 6}
              fill={FILL[n.kind]}
              fillOpacity="0.22"
              stroke={FILL[n.kind]}
              strokeWidth="1.5"
            />
          )}

          {n.shape === 'rombo' ? (
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 5}
              textAnchor="middle"
              fill="#FCF6EC"
              fontSize="14"
              fontFamily="Archivo Narrow, sans-serif"
            >
              {n.name}
            </text>
          ) : (
            <>
              {n.code && (
                <text
                  x={n.x + 14}
                  y={n.y + 22}
                  fill="rgba(252,246,236,0.55)"
                  fontSize="12"
                  fontFamily="Archivo Narrow, sans-serif"
                  letterSpacing="1"
                >
                  {n.code}
                </text>
              )}
              <text
                x={n.x + 14}
                y={n.code ? n.y + 42 : n.y + n.h / 2 + 5}
                fill="#FCF6EC"
                fontSize="15"
                fontFamily="Archivo, sans-serif"
              >
                {n.name}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  </div>
);

export const FlowMapLegend: React.FC = () => (
  <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream/70">
    {[
      ['Entrada', '#2D6A4F'],
      ['Formas de pedir', '#1B4F8A'],
      ['El placero', '#B8791D'],
      ['Después de pedir', '#3F6E58'],
      ['Situaciones límite', '#6E6A61'],
    ].map(([label, color]) => (
      <li key={label} className="flex items-center gap-2.5">
        <span
          className="w-3.5 h-3.5 rounded-sm border"
          style={{ backgroundColor: `${color}38`, borderColor: color }}
        />
        {label}
      </li>
    ))}
    <li className="flex items-center gap-2.5">
      <span className="font-narrow" style={{ color: '#8FC7A6' }}>
        Sí
      </span>
      <span className="text-cream/40">/</span>
      <span className="font-narrow" style={{ color: '#E0A63F' }}>
        No
      </span>
      <span>en cada decisión</span>
    </li>
  </ul>
);
