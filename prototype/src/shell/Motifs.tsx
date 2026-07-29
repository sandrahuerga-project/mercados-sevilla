import React from 'react';

/**
 * Motivos de mercado en línea, para que las secciones no queden desnudas.
 * Provisionales: son míos, y están pensados para que Sandra los sustituya
 * por los suyos cuando los tenga. Trazo de 1,5 y sin relleno, a juego con
 * las reglas del resto de la página.
 */

type MotifProps = { className?: string; stroke?: string };

const base = (className = '') => `pointer-events-none select-none ${className}`;

export const Pez: React.FC<MotifProps> = ({ className, stroke = 'currentColor' }) => (
  <svg viewBox="0 0 120 64" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M4 32c14-19 38-26 58-26 18 0 32 9 40 18 2 2 2 6 0 8-8 9-22 18-40 18C42 50 18 43 4 32Z"
      stroke={stroke}
      strokeWidth="1.5"
    />
    <path d="M102 24c6-6 13-9 14-8 1 1-1 9-4 16 3 7 5 15 4 16-1 1-8-2-14-8" stroke={stroke} strokeWidth="1.5" />
    <circle cx="30" cy="27" r="3" stroke={stroke} strokeWidth="1.5" />
    <path d="M48 14c6 10 6 26 0 36M66 12c7 11 7 29 0 40" stroke={stroke} strokeWidth="1.5" opacity="0.55" />
  </svg>
);

export const Naranja: React.FC<MotifProps> = ({ className, stroke = 'currentColor' }) => (
  <svg viewBox="0 0 72 76" fill="none" className={base(className)} aria-hidden="true">
    <circle cx="36" cy="46" r="27" stroke={stroke} strokeWidth="1.5" />
    <path d="M36 19v6" stroke={stroke} strokeWidth="1.5" />
    <path
      d="M37 18c4-8 12-12 20-10 1 8-4 15-12 17-3 1-6 0-8-1l-1-1 1-5Z"
      stroke={stroke}
      strokeWidth="1.5"
    />
    <path d="M18 38c6 4 12 6 18 6s12-2 18-6" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
  </svg>
);

export const Gamba: React.FC<MotifProps> = ({ className, stroke = 'currentColor' }) => (
  <svg viewBox="0 0 96 72" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M84 16c-20-6-42-2-54 12-9 10-9 24 0 32 8 7 20 6 26-2 5-7 3-16-4-19-6-3-13 1-13 8"
      stroke={stroke}
      strokeWidth="1.5"
    />
    <path d="M84 16c4 2 8 6 8 10M72 12c2-4 6-7 10-8M60 14c0-5 2-9 5-12" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
    <circle cx="74" cy="24" r="2.5" stroke={stroke} strokeWidth="1.5" />
  </svg>
);

export const Pimiento: React.FC<MotifProps> = ({ className, stroke = 'currentColor' }) => (
  <svg viewBox="0 0 64 82" fill="none" className={base(className)} aria-hidden="true">
    <path
      d="M32 24c14 0 24 12 24 27 0 14-10 24-24 24S8 65 8 51c0-15 10-27 24-27Z"
      stroke={stroke}
      strokeWidth="1.5"
    />
    <path d="M32 24V10" stroke={stroke} strokeWidth="1.5" />
    <path d="M22 12c6-4 14-4 20 0-4 4-16 4-20 0Z" stroke={stroke} strokeWidth="1.5" />
    <path d="M24 36c-5 5-8 12-8 19" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
  </svg>
);

/** Fila de motivos como remate de sección. */
export const MotifRow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-end gap-10 ${className}`} aria-hidden="true">
    <Pez className="w-24 h-auto" />
    <Naranja className="w-12 h-auto" />
    <Gamba className="w-20 h-auto" />
    <Pimiento className="w-11 h-auto" />
  </div>
);
