import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { HERO, SITE } from '../content/texts';
import { Reveal } from './Reveal';

const scrollTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const Hero: React.FC = () => (
  <header className="border-b border-line">
    {/* Barra superior fina, siempre presente */}
    <div className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <span className="font-narrow text-eyebrow uppercase tracking-[0.18em] font-semibold">
          {SITE.title}
        </span>
        <span className="font-narrow text-eyebrow uppercase tracking-[0.18em] text-ink-soft hidden sm:block">
          {SITE.subtitle}
        </span>
      </div>
    </div>

    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <p className="eyebrow eyebrow-rule text-ink-soft">{HERO.eyebrow}</p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl max-w-[16ch] mt-8">
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
              className="group inline-flex items-center gap-4 border border-ink px-7 py-4 font-narrow text-eyebrow uppercase tracking-[0.14em] font-semibold hover:bg-ink hover:text-cream transition-colors"
            >
              {HERO.ctaPrimary}
            </button>
            <button
              onClick={scrollTo('flujos')}
              aria-label={HERO.ctaPrimary}
              className="w-14 h-14 rounded-full border border-ink flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollTo('como-esta-hecho')}
              className="ml-2 font-narrow text-eyebrow uppercase tracking-[0.14em] font-semibold text-ink-soft underline underline-offset-8 decoration-line hover:text-ink hover:decoration-ink transition-colors"
            >
              {HERO.ctaSecondary}
            </button>
          </div>
        </Reveal>

        {/* Ficha del proyecto, en filas separadas por línea fina */}
        <Reveal delay={240}>
          <dl className="border-t border-line">
            {HERO.meta.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-[8rem_1fr] gap-4 py-5 border-b border-line"
              >
                <dt className="font-narrow text-eyebrow uppercase tracking-[0.14em] text-ink-faint">
                  {m.label}
                </dt>
                <dd className="text-base">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>

    <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-8 flex items-center gap-3 text-ink-faint">
      <ArrowDown size={15} strokeWidth={1.5} className="animate-pulse" />
      <span className="font-narrow text-eyebrow uppercase tracking-[0.18em]">
        Sigue bajando
      </span>
    </div>
  </header>
);
