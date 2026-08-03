import React from 'react';
import { HERO, SITE } from '../content/texts';
import { Reveal } from './Reveal';
import { FoodImage } from './FoodImage';
import { Parallax } from './Parallax';

const scrollTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const Hero: React.FC = () => (
  <header className="border-b border-line">
    <div className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <span className="font-narrow text-lg">{SITE.title}</span>
        <span className="font-narrow text-lg text-ink-soft hidden sm:block">
          {SITE.subtitle}
        </span>
      </div>
    </div>

    <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28 relative">
      {/* Bodegón de portada: berenjena y limón, solo en pantallas anchas */}
      <Parallax speed={0.16} className="hidden lg:block absolute right-0 top-2 xl:-top-2">
        <FoodImage id="berenjena" flota className="w-80 xl:w-[26rem]" />
      </Parallax>

      <Reveal>
        <p className="font-narrow text-lg text-mercado-green">{HERO.eyebrow}</p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl max-w-[16ch] mt-6">
          {HERO.headline}
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 items-start">
        <Reveal delay={160}>
          <p className="text-lg md:text-xl leading-relaxed max-w-[52ch] text-ink-soft">
            {HERO.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollTo('flujos')}
              className="border border-ink bg-ink text-cream px-7 py-4 font-narrow text-lg hover:bg-transparent hover:text-ink transition-colors whitespace-nowrap"
            >
              {HERO.ctaPrimary}
            </button>
            <button
              onClick={scrollTo('como-esta-hecho')}
              className="border border-line px-7 py-4 font-narrow text-lg text-ink-soft hover:border-ink hover:text-ink transition-colors whitespace-nowrap"
            >
              {HERO.ctaSecondary}
            </button>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <dl className="border-t border-line relative">
            {/* Mismo tamaño que la merluza y pegado a la izquierda de la columna:
                los dos bodegones se equilibran en vez de competir. */}
            <Parallax speed={0.22} className="hidden lg:block absolute -top-[21rem] xl:-top-[23rem] -left-8">
              <FoodImage id="limon" flota retraso={2.2} className="w-72 xl:w-80" />
            </Parallax>
            {HERO.meta.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-[7rem_1fr] gap-4 py-5 border-b border-line"
              >
                <dt className="font-narrow text-lg text-ink-faint">{m.label}</dt>
                <dd className="text-base">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  </header>
);
