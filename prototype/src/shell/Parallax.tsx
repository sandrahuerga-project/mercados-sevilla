import React, { useEffect, useRef, useState } from 'react';

interface ParallaxProps {
  /** Cuánto se despega del scroll. 0.1 es discreto, 0.3 ya se nota mucho. */
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Desplaza a su hijo en vertical según la posición en pantalla, para que las
 * ilustraciones sueltas no vayan clavadas al resto del contenido.
 *
 * La transformación va en este envoltorio y nunca en la imagen: así puede
 * convivir con la animación de flotación, que también usa `transform`.
 *
 * Con prefers-reduced-motion no se engancha ni el listener.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  speed = 0.12,
  className = '',
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const recalcular = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const caja = node.getBoundingClientRect();
      // Distancia del centro de la ilustración al centro de la ventana.
      const distancia = caja.top + caja.height / 2 - window.innerHeight / 2;
      setOffset(-distancia * speed);
    };

    // Un solo recálculo por fotograma, pase lo que pase con el scroll.
    const alDesplazar = () => {
      if (!frame) frame = requestAnimationFrame(recalcular);
    };

    recalcular();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('resize', alDesplazar);
    return () => {
      window.removeEventListener('scroll', alDesplazar);
      window.removeEventListener('resize', alDesplazar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${offset.toFixed(1)}px, 0)` }}
    >
      {children}
    </div>
  );
};
