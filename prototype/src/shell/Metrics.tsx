import React from 'react';
import { METRICAS } from '../content/texts';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

/**
 * Los cuatro números con los que se sabría si esto funciona.
 *
 * Va justo detrás del prototipo a propósito: es la pregunta que le queda a
 * cualquiera nada más ver la conversación funcionando. Y va escrito como
 * objetivo, nunca como resultado, porque el bot no está desplegado: el único
 * dato real es la línea base de Antonio, y por eso se aparta del resto.
 */
export const Metrics: React.FC = () => (
  <section id="metricas" className="border-b border-line scroll-mt-14">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <SectionLabel>{METRICAS.eyebrow}</SectionLabel>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-10 text-lg leading-relaxed max-w-[62ch] text-ink-soft">
          {METRICAS.lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {METRICAS.items.map((m, i) => (
          <Reveal key={m.titulo} delay={i * 90}>
            <div className="border-t border-line pt-6">
              <div className="font-narrow text-4xl lg:text-5xl font-semibold tracking-tight text-mercado-green">
                {m.cifra}
              </div>
              <h3 className="mt-3 text-lg font-medium tracking-tight">{m.titulo}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{m.cuerpo}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* El dato real, apartado del resto para que no se confunda con los objetivos */}
      <Reveal delay={120}>
        <div className="mt-16 border-l-2 border-mercado-green pl-6 max-w-[52rem]">
          <h3 className="font-narrow text-lg font-semibold text-ink">{METRICAS.base.titulo}</h3>
          <p className="mt-2 text-ink-soft leading-relaxed">{METRICAS.base.cuerpo}</p>
        </div>
      </Reveal>
    </div>
  </section>
);
