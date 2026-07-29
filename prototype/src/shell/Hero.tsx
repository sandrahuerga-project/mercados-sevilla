import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO, SITE } from '../content/texts';
import { Reveal } from './Reveal';
import { Pez, Naranja } from './Motifs';

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
      {/* Motivo de mercado, discreto y solo en pantallas anchas */}
      <Pez className="hidden lg:block absolute right-6 top-10 w-52 text-mercado-green/25" />

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
              className="inline-flex items-center gap-4 border border-ink px-7 py-4 font-narrow text-lg hover:bg-ink hover:text-cream transition-colors whitespace-nowrap"
            >
              {HERO.ctaPrimary}
            </button>
            <button
              onClick={scrollTo('flujos')}
              aria-label={HERO.ctaPrimary}
              className="w-14 h-14 rounded-full border border-ink flex items-center justify-center hover:bg-ink hover:text-cream transition-colors shrink-0"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollTo('como-esta-hecho')}
              className="ml-1 font-narrow text-lg text-ink-soft underline underline-offset-8 decoration-line hover:text-ink hover:decoration-ink transition-colors whitespace-nowrap"
            >
              {HERO.ctaSecondary}
            </button>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <dl className="border-t border-line relative">
            <Naranja className="hidden lg:block absolute -top-24 right-0 w-16 text-azafran/40" />
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
