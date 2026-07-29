import React, { useState } from 'react';

export type PersonaId = 'carmen' | 'david' | 'antonio' | 'mercado';

/**
 * Ilustración de personaje. Mientras Sandra las dibuja, cae en un marcador
 * de posición sobrio con la inicial: nunca se ve un icono roto.
 *
 * Archivos esperados en /public/ilustraciones/:
 *   carmen.png · david.png · antonio.png   (400×400, recorte circular seguro)
 *   carmen-retrato.png · david-retrato.png · antonio-retrato.png  (~1200px ancho)
 */
const INITIAL: Record<PersonaId, string> = {
  carmen: 'C',
  david: 'D',
  antonio: 'A',
  mercado: 'M',
};

// Tonos oscuros a propósito: la inicial va en blanco y tiene que pasar AA.
const TINT: Record<PersonaId, string> = {
  carmen: 'bg-[#8A5A12]',
  david: 'bg-sevilla-tile',
  antonio: 'bg-mercado-green',
  mercado: 'bg-green-deep',
};

interface PersonaImageProps {
  id: PersonaId;
  /** 'avatar' usa el cuadrado 400×400; 'retrato' la versión grande. */
  variant?: 'avatar' | 'retrato';
  className?: string;
  alt?: string;
}

export const PersonaImage: React.FC<PersonaImageProps> = ({
  id,
  variant = 'avatar',
  className = '',
  alt,
}) => {
  const [failed, setFailed] = useState(false);
  const src =
    variant === 'avatar'
      ? `/ilustraciones/${id}.png`
      : `/ilustraciones/${id}-retrato.png`;

  if (failed) {
    // El tamaño de la inicial lo fija la clase text-* que pasa quien lo usa.
    return (
      <div
        className={`${TINT[id]} flex items-center justify-center text-white select-none ${className}`}
        aria-hidden="true"
      >
        <span className="display leading-none">{INITIAL[id]}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
};
