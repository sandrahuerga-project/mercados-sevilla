import React, { useEffect, useState } from 'react';
import { SITE } from '../content/texts';

const LINKS = [
  { id: 'problema', label: 'Problema' },
  { id: 'investigacion', label: 'Investigación' },
  { id: 'flujos', label: 'Prototipo' },
  // El rótulo de esa sección es «Contexto y restricciones»: el enlace lo repite
  // en corto en vez de inventarse otro nombre.
  { id: 'como-esta-hecho', label: 'Contexto' },
];

/**
 * Barra fija que aparece al dejar atrás la portada. Resuelve el problema
 * de quedarse encallado en el pie del móvil sin forma de volver.
 */
export const StickyNav: React.FC = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
        shown ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-cream/95 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between gap-4">
          <button
            onClick={toTop}
            className="font-narrow text-base text-ink hover:text-mercado-green transition-colors shrink-0"
          >
            ↑ {SITE.title}
          </button>

          <nav className="hidden sm:flex items-center gap-6">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="font-narrow text-base text-ink-soft hover:text-ink transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* En móvil no caben los enlaces: basta con poder subir */}
          <button
            onClick={toTop}
            className="sm:hidden font-narrow text-base text-ink-soft"
            aria-label="Volver arriba"
          >
            Arriba
          </button>
        </div>
      </div>
    </div>
  );
};
