import React, { useState } from 'react';

/**
 * Ilustraciones de alimentos de Sandra.
 *
 * Se sirven desde `alimentos/web/` (WebP de 480 px, 13,6 MB -> 0,33 MB). Los
 * PNG originales de 1200×1200 se quedan en el repo sin tocar; para regenerar
 * las versiones ligeras: node scripts/optimizar-ilustraciones.mjs
 */
export const ALIMENTOS = [
  'berenjena',
  'chorizo-queso',
  'ciruelas',
  'gambas',
  'huevos',
  'limon',
  'mejillones',
  'merluza',
  'naranja',
  'pollo',
  'sardina',
  'sepia',
] as const;

export type AlimentoId = (typeof ALIMENTOS)[number];

interface FoodImageProps {
  id: AlimentoId;
  className?: string;
  /** Vacío por defecto: casi siempre es decoración y el lector de pantalla la salta. */
  alt?: string;
  /** Flotación continua. Se desactiva sola con prefers-reduced-motion. */
  flota?: boolean;
  /** Desfase de la flotación en segundos, para que no vayan todas a la vez. */
  retraso?: number;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  id,
  className = '',
  alt,
  flota = false,
  retraso = 0,
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      src={`/ilustraciones/alimentos/web/${id}.webp`}
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={retraso ? { animationDelay: `${retraso}s` } : undefined}
      className={`object-contain select-none pointer-events-none ${
        flota ? 'flota' : ''
      } ${className}`}
    />
  );
};

/**
 * Friso de mostrador: las doce ilustraciones en fila, como el género expuesto.
 * Flotan desfasadas media vuelta entre vecinas, así el friso ondula en vez de
 * subir y bajar en bloque.
 */
export const FoodStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-between gap-2 overflow-hidden ${className}`}
    aria-hidden="true"
  >
    {ALIMENTOS.map((id, i) => (
      <FoodImage
        key={id}
        id={id}
        flota
        retraso={i * 0.45}
        className="w-20 md:w-28 lg:w-32 shrink-0"
      />
    ))}
  </div>
);
