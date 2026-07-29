import React from 'react';
import { PROBLEM, SOLUTION } from '../content/texts';
import { Reveal } from './Reveal';

export const Problem: React.FC = () => (
  <section id="problema" className="border-b border-line">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-16 lg:self-start">
          <p className="eyebrow eyebrow-rule text-ink-soft">{PROBLEM.eyebrow}</p>
          <h2 className="display text-3xl md:text-4xl mt-8 max-w-[14ch]">
            {PROBLEM.headline}
          </h2>
        </Reveal>

        <ol className="border-t border-line">
          {PROBLEM.columns.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 90}>
              <div className="grid grid-cols-[3rem_1fr] gap-4 md:gap-8 py-8 border-b border-line">
                <span className="font-narrow text-eyebrow text-ink-faint pt-1.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-ink-soft leading-relaxed max-w-[58ch]">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export const Solution: React.FC = () => (
  <section id="propuesta" className="bg-green-mist border-b border-line">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <Reveal>
        <p className="eyebrow eyebrow-rule text-ink-soft">{SOLUTION.eyebrow}</p>
        <h2 className="display text-3xl md:text-5xl mt-8 max-w-[18ch]">
          {SOLUTION.headline}
        </h2>
        <p className="mt-8 text-lg leading-relaxed max-w-[60ch] text-ink-soft">
          {SOLUTION.lead}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {SOLUTION.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <div className="border-t border-mercado-green/25 pt-6 h-full">
              <h3 className="text-xl font-medium tracking-tight text-mercado-green">
                {p.title}
              </h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
