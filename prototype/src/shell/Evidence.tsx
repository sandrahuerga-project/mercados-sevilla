import React from 'react';
import { EVIDENCE } from '../content/texts';
import { Reveal } from './Reveal';
import { PersonaImage, type PersonaId } from './PersonaImage';

export const Evidence: React.FC = () => (
  <section id="investigacion" className="border-b border-line">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <p className="eyebrow eyebrow-rule text-ink-soft">{EVIDENCE.eyebrow}</p>
        <h2 className="display text-3xl md:text-5xl mt-8 max-w-[16ch]">
          {EVIDENCE.headline}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
        {EVIDENCE.quotes.map((q, i) => (
          <Reveal key={q.person} delay={i * 120}>
            <figure className="h-full flex flex-col">
              <div className="flex items-center gap-4 pb-6 border-b border-line">
                <PersonaImage
                  id={q.person.toLowerCase() as PersonaId}
                  className="w-16 h-16 rounded-full shrink-0 text-2xl"
                  alt={`Ilustración de ${q.person}`}
                />
                <figcaption>
                  <span className="text-lg font-medium">{q.person}</span>
                  <span className="text-ink-faint">, {q.age}</span>
                  <span className="block font-narrow text-eyebrow uppercase tracking-[0.14em] text-ink-faint mt-0.5">
                    {q.role}
                  </span>
                </figcaption>
              </div>

              <blockquote className="pt-8 flex-1">
                <p className="display text-2xl md:text-3xl leading-[1.15] max-w-[24ch]">
                  «{q.quote}»
                </p>
              </blockquote>

              <div className="mt-8 pt-6 border-t border-line flex gap-4">
                <span className="font-narrow text-eyebrow uppercase tracking-[0.14em] text-mercado-green shrink-0 pt-0.5">
                  Qué cambia
                </span>
                <p className="text-ink-soft leading-relaxed">{q.insight}</p>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-14 font-narrow text-eyebrow uppercase tracking-[0.14em] text-ink-faint">
          {EVIDENCE.note}
        </p>
      </Reveal>
    </div>
  </section>
);
