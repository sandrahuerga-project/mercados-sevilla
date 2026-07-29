import React, { useEffect, useRef } from 'react';

/**
 * Punto + anillo que sigue al ratón; el anillo crece sobre elementos pulsables.
 * Se desactiva por completo en táctil y si el usuario pide menos movimiento.
 */
export const CustomCursor: React.FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    document.body.classList.add('custom-cursor-on');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 4.5}px, ${y - 4.5}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, select, [role="button"]');
      ring.current?.classList.toggle('is-active', Boolean(interactive));
    };

    // El anillo persigue al punto con retardo: da la sensación de peso.
    const loop = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      if (ring.current) {
        const size = ring.current.classList.contains('is-active') ? 31 : 19;
        ring.current.style.transform = `translate3d(${ringX - size}px, ${ringY - size}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
};
