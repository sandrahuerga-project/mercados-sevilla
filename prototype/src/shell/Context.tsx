import React, { useState } from 'react';
import { CONTEXT, FOOTER } from '../content/texts';
import { WHATSAPP_CONSTRAINTS } from '../data/mockData';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { FoodImage } from './FoodImage';
import { Parallax } from './Parallax';

type Tab = 'producto' | 'restricciones';

export const Context: React.FC = () => {
  const [tab, setTab] = useState<Tab>('producto');

  return (
    <section id="como-esta-hecho" className="border-b border-line scroll-mt-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <SectionLabel>{CONTEXT.eyebrow}</SectionLabel>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-5">
            {(
              [
                ['producto', CONTEXT.tabs.producto.label],
                ['restricciones', CONTEXT.tabs.restricciones.label],
              ] as [Tab, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                aria-pressed={tab === key}
                className={`px-5 py-2.5 rounded-full font-narrow text-base font-semibold border transition-colors ${
                  tab === key
                    ? 'bg-ink text-cream border-ink'
                    : 'border-line text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cuatro columnas en escritorio: con tres, el cuarto bloque bajaba solo
            a una segunda fila y dejaba dos huecos. En tablet van dos y dos, y en
            móvil uno debajo de otro. */}
        {tab === 'producto' ? (
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {CONTEXT.tabs.producto.blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <div className="border-t border-line pt-6">
                  <h3 className="text-xl font-medium tracking-tight">{b.title}</h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12">
            <Reveal>
              <p className="text-lg leading-relaxed max-w-[62ch] text-ink-soft">
                {CONTEXT.tabs.restricciones.intro}
              </p>
            </Reveal>
            <dl className="mt-12 border-t border-line">
              {WHATSAPP_CONSTRAINTS.map((c, i) => (
                <Reveal key={c.rule} delay={i * 70}>
                  <div className="grid gap-x-10 gap-y-2 md:grid-cols-[1fr_1fr_auto] py-7 border-b border-line items-start">
                    <dt className="text-lg font-medium tracking-tight">{c.rule}</dt>
                    <dd className="text-ink-soft leading-relaxed">
                      <span className="block">{c.limit}</span>
                      <span className="block text-sm text-ink-faint mt-1">{c.spec}</span>
                    </dd>
                    <dd className="font-narrow text-base text-mercado-green md:text-right md:pt-1.5">
                      {c.validation.replace('✓', '').trim()}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        )}

        {/* Cierre del apartado: el género vuelve a asomar */}
        <Parallax speed={0.12} className="mt-16 flex justify-end">
          <FoodImage id="pollo" flota retraso={1.1} className="w-56 lg:w-72" />
        </Parallax>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => (
  <footer className="mx-auto max-w-[1400px] px-6 md:px-10 py-14">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-narrow text-base text-ink-faint">
      <span>{FOOTER.note}</span>
      {/* El trabajo de producto —PRD, restricciones de Meta, los 23 guiones— no
          cabe en la página y tampoco le toca: aquí va el enlace y ya. */}
      <a
        href={FOOTER.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 decoration-line hover:text-ink hover:decoration-ink transition-colors"
      >
        {FOOTER.repoLabel}
      </a>
      <span>{FOOTER.credit}</span>
    </div>
  </footer>
);
