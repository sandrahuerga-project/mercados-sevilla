import React from 'react';
import { PROBLEM, SOLUTION } from '../content/texts';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { FoodImage, FoodStrip } from './FoodImage';
import { Parallax } from './Parallax';

/** Una ilustración por pilar, en el mismo orden que los textos. */
const PILAR_ALIMENTO = ['sardina', 'gambas', 'merluza', 'naranja'] as const;

export const Problem: React.FC = () => (
  <section id="problema" className="border-b border-line scroll-mt-14">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <SectionLabel>{PROBLEM.eyebrow}</SectionLabel>

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="display text-3xl md:text-4xl max-w-[14ch]">{PROBLEM.headline}</h2>
          <Parallax speed={0.14} className="hidden lg:block mt-14">
            <FoodImage id="mejillones" flota className="w-64" />
          </Parallax>
        </Reveal>

        {/* Sin numeración: la propia regla separa los apartados */}
        <ul className="border-t border-line">
          {PROBLEM.columns.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 90}>
              <div className="py-8 border-b border-line">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight">{c.title}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed max-w-[58ch]">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const Solution: React.FC = () => (
  <section id="propuesta" className="bg-green-mist border-b border-line scroll-mt-14">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <SectionLabel tone="mist">{SOLUTION.eyebrow}</SectionLabel>

      <Reveal>
        <div className="mt-12 flex items-start justify-between gap-10">
          <div>
            <h2 className="display text-3xl md:text-5xl max-w-[18ch]">{SOLUTION.headline}</h2>
            <p className="mt-8 text-lg leading-relaxed max-w-[60ch] text-ink-soft">
              {SOLUTION.lead}
            </p>
          </div>
          <Parallax speed={0.18} className="hidden lg:block shrink-0">
            <FoodImage id="chorizo-queso" flota retraso={1.4} className="w-48" />
          </Parallax>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {SOLUTION.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <div className="border-t border-mercado-green/25 pt-6 h-full">
              <FoodImage id={PILAR_ALIMENTO[i]} flota retraso={i * 0.9} className="w-28 mb-4" />
              <h3 className="text-xl font-medium tracking-tight text-mercado-green">
                {p.title}
              </h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Friso de mostrador: cierra la sección con el género a la vista */}
      <FoodStrip className="mt-20 pt-10 border-t border-mercado-green/20" />
    </div>
  </section>
);
