import React from 'react';
import { EVIDENCE } from '../content/texts';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { PersonaImage, type PersonaId } from './PersonaImage';
import { FoodImage } from './FoodImage';
import { Parallax } from './Parallax';

export const Evidence: React.FC = () => (
  <section id="investigacion" className="border-b border-line scroll-mt-14">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <SectionLabel>{EVIDENCE.eyebrow}</SectionLabel>

      <Reveal>
        <h2 className="display text-3xl md:text-5xl mt-12 max-w-[16ch]">
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
                  <span className="block font-narrow text-base text-ink-faint mt-0.5">
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
                <span className="font-narrow text-base text-mercado-green shrink-0 pt-0.5">
                  Qué cambia
                </span>
                <p className="text-ink-soft leading-relaxed">{q.insight}</p>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-14 flex items-end justify-between gap-8">
          <p className="font-narrow text-base text-ink-faint">{EVIDENCE.note}</p>
          <Parallax speed={0.12} className="hidden md:block shrink-0">
            <FoodImage id="huevos" flota retraso={0.8} className="w-32 lg:w-40" />
          </Parallax>
        </div>
      </Reveal>
    </div>
  </section>
);
