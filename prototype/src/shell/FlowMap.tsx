import React from 'react';

/**
 * Mapa de los trece flujos. Existe para que los códigos (C03, C11, S01…)
 * dejen de ser jerga: aquí se ve de dónde sale cada uno y a dónde lleva.
 * SVG de tamaño fijo que escala; en móvil se desplaza en horizontal.
 */

interface Node {
  code: string;
  name: string;
  x: number;
  y: number;
  kind: 'entrada' | 'pedido' | 'durante' | 'despues' | 'limite';
  unhappy?: boolean;
}

const W = 190;
const H = 62;

const NODES: Node[] = [
  { code: 'C01', name: 'Darse de alta', x: 30, y: 150, kind: 'entrada' },
  { code: 'C02', name: 'Saludo de cada mañana', x: 30, y: 250, kind: 'entrada' },

  { code: 'C03', name: 'Pedir con un audio', x: 290, y: 90, kind: 'pedido' },
  { code: 'C04', name: 'Pedir sin vídeo', x: 290, y: 190, kind: 'pedido' },
  { code: 'C06', name: 'Repetir lo de siempre', x: 290, y: 290, kind: 'pedido', unhappy: true },

  { code: 'C05', name: 'Dos puestos a la vez', x: 550, y: 60, kind: 'durante', unhappy: true },
  { code: 'C09', name: 'Cambiar el pedido', x: 550, y: 160, kind: 'durante', unhappy: true },
  { code: 'C10', name: 'Cancelar el pedido', x: 550, y: 260, kind: 'durante', unhappy: true },

  { code: 'C07', name: 'Seguir el pedido', x: 810, y: 110, kind: 'despues', unhappy: true },
  { code: 'C08', name: 'Producto agotado', x: 810, y: 210, kind: 'despues', unhappy: true },
  { code: 'C11', name: 'Hablar con el placero', x: 810, y: 310, kind: 'despues' },

  { code: 'S01', name: 'Puesto cerrado', x: 290, y: 400, kind: 'limite' },
  { code: 'S03', name: 'Cliente bloqueado', x: 550, y: 400, kind: 'limite' },
];

const FILL: Record<Node['kind'], string> = {
  entrada: '#2D6A4F',
  pedido: '#1B4F8A',
  durante: '#B8791D',
  despues: '#3F6E58',
  limite: '#6E6A61',
};

// [desde, hacia, curvado]
const EDGES: [string, string][] = [
  ['C01', 'C02'],
  ['C02', 'C03'],
  ['C02', 'C04'],
  ['C02', 'C06'],
  ['C03', 'C05'],
  ['C03', 'C09'],
  ['C03', 'C10'],
  ['C04', 'C09'],
  ['C06', 'C10'],
  ['C05', 'C07'],
  ['C09', 'C07'],
  ['C10', 'C07'],
  ['C07', 'C08'],
  ['C08', 'C11'],
  ['C09', 'C11'],
  ['S01', 'C06'],
];

const byCode = (c: string) => NODES.find((n) => n.code === c)!;

export const FlowMap: React.FC = () => (
  <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
    <svg
      viewBox="0 0 1030 490"
      className="w-full min-w-[860px] h-auto"
      role="img"
      aria-label="Mapa de los trece flujos y cómo se enlazan entre sí"
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(252,246,236,0.45)" />
        </marker>
      </defs>

      {EDGES.map(([from, to]) => {
        const a = byCode(from);
        const b = byCode(to);
        const x1 = a.x + W;
        const y1 = a.y + H / 2;
        const x2 = b.x;
        const y2 = b.y + H / 2;
        const mid = (x1 + x2) / 2;
        return (
          <path
            key={`${from}-${to}`}
            d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
            fill="none"
            stroke="rgba(252,246,236,0.28)"
            strokeWidth="1.5"
            markerEnd="url(#punta)"
          />
        );
      })}

      {NODES.map((n) => (
        <g key={n.code}>
          <rect
            x={n.x}
            y={n.y}
            width={W}
            height={H}
            rx="6"
            fill={FILL[n.kind]}
            fillOpacity="0.22"
            stroke={FILL[n.kind]}
            strokeWidth="1.5"
          />
          {n.unhappy && (
            <circle cx={n.x + W - 14} cy={n.y + 14} r="4" fill="#E0A63F" />
          )}
          <text
            x={n.x + 14}
            y={n.y + 25}
            fill="rgba(252,246,236,0.55)"
            fontSize="12"
            fontFamily="Archivo Narrow, sans-serif"
            letterSpacing="1"
          >
            {n.code}
          </text>
          <text
            x={n.x + 14}
            y={n.y + 45}
            fill="#FCF6EC"
            fontSize="15"
            fontFamily="Archivo, sans-serif"
          >
            {n.name}
          </text>
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
      ['Durante el pedido', '#B8791D'],
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
      <span className="w-2.5 h-2.5 rounded-full bg-azafran-light" />
      Tiene unhappy paths
    </li>
  </ul>
);
