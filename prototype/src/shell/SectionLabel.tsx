import React from 'react';

type Tone = 'cream' | 'mist' | 'deep';

const BG: Record<Tone, string> = {
  cream: 'bg-cream',
  mist: 'bg-green-mist',
  deep: 'bg-green-deep',
};

const TEXT: Record<Tone, string> = {
  cream: 'text-mercado-green',
  mist: 'text-mercado-green',
  deep: 'text-cream',
};

const LINE: Record<Tone, string> = {
  cream: 'border-line',
  mist: 'border-mercado-green/25',
  deep: 'border-cream/25',
};

/**
 * Rótulo de sección: una regla que cruza la columna y el nombre encima,
 * recortándola. Sustituye al overline en versalitas, que resultaba genérico.
 */
export const SectionLabel: React.FC<{ children: React.ReactNode; tone?: Tone }> = ({
  children,
  tone = 'cream',
}) => (
  <div className={`relative border-t ${LINE[tone]}`}>
    <span
      className={`absolute -top-3.5 left-0 pr-5 font-narrow text-lg ${BG[tone]} ${TEXT[tone]}`}
    >
      {children}
    </span>
  </div>
);
