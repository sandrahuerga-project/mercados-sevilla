import React, { useState } from 'react';

export type PersonaId =
  | 'carmen'
  | 'david'
  | 'antonio'
  | 'mercado'
  | 'pescaderia'
  | 'fruteria'
  | 'carniceria';

/**
 * Ilustración de personaje. Si el archivo falta, cae en un marcador de posición
 * sobrio con la inicial: nunca se ve un icono roto.
 *
 * Se sirven las versiones WebP de /public/ilustraciones/web/, no los originales:
 * las dos fotos de perfil pesaban 2,9 y 4,1 MB para acabar en un avatar de
 * 40 px. Para regenerarlas: node scripts/optimizar-ilustraciones.mjs
 *
 * Todo en minúsculas y sin acentos: Vercel corre sobre Linux y distingue
 * mayúsculas, al contrario que Windows.
 *
 * Los tres personajes son ilustraciones; las «perfil» son las fotos de perfil
 * de las cuentas de WhatsApp que salen en la cabecera del chat: la del mercado
 * y una por puesto (pescadería, frutería, carnicería).
 *
 * No hay retratos aparte: la variante grande reutiliza el mismo archivo.
 */
const FILE: Record<PersonaId, string> = {
  carmen: 'carmen',
  david: 'david',
  antonio: 'antonio',
  mercado: 'perfil-mercados',
  pescaderia: 'perfil-pescaderia',
  fruteria: 'perfil-fruteria',
  carniceria: 'perfil-carniceria',
};

const INITIAL: Record<PersonaId, string> = {
  carmen: 'C',
  david: 'D',
  antonio: 'A',
  mercado: 'M',
  pescaderia: 'P',
  fruteria: 'F',
  carniceria: 'L',
};

// Tonos oscuros a propósito: la inicial va en blanco y tiene que pasar AA.
const TINT: Record<PersonaId, string> = {
  carmen: 'bg-[#8A5A12]',
  david: 'bg-sevilla-tile',
  antonio: 'bg-mercado-green',
  mercado: 'bg-green-deep',
  pescaderia: 'bg-sevilla-tile',
  fruteria: 'bg-mercado-green',
  carniceria: 'bg-[#8A5A12]',
};

interface PersonaImageProps {
  id: PersonaId;
  /**
   * Se acepta por compatibilidad con quien ya lo pasa, pero hoy no cambia el
   * archivo: no hay retratos aparte. El tamaño lo decide `className`.
   */
  variant?: 'avatar' | 'retrato';
  className?: string;
  alt?: string;
}

export const PersonaImage: React.FC<PersonaImageProps> = ({ id, className = '', alt }) => {
  const [failed, setFailed] = useState(false);
  const src = `/ilustraciones/web/${FILE[id]}.webp`;

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
