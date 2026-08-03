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
 * Friso de mostrador: las doce ilustraciones desfilando en bucle, como el
 * género pasando por delante. La tira va duplicada porque la animación
 * desplaza justo la mitad y vuelve a empezar sin costura; la copia lleva
 * aria-hidden para que nadie la lea dos veces.
 *
 * Se para al pasar el ratón por encima y con prefers-reduced-motion.
 */
export const FoodStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`marquesina-marco overflow-hidden ${className}`} aria-hidden="true">
    <div className="marquesina flex items-center w-max">
      {/* Cada tanda lleva su hueco final dentro (pr-8/pr-12), así las dos mitades
          miden exactamente lo mismo y el salto del -50% cae sin costura. */}
      {[0, 1].map((vuelta) => (
        <div key={vuelta} className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12">
          {ALIMENTOS.map((id, i) => (
            <FoodImage
              key={`${vuelta}-${id}`}
              id={id}
              flota
              retraso={i * 0.45}
              className="w-24 md:w-32 lg:w-36 shrink-0"
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);
