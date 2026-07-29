import React, { useMemo, useState } from 'react';
import { FLOWS_SECTION, AUDIENCES, PANEL_SECTION } from '../content/texts';
import { AUDIENCE_ORDER, flowsFor, groupsFor, type AudienceKey } from '../content/flowCatalog';
import { FlowScreen } from '../engine/FlowScreen';
import { PlaceroPanel } from '../panel/PlaceroPanel';
import { PersonaImage, type PersonaId } from './PersonaImage';
import { Reveal } from './Reveal';

type Mode = 'recorrido' | 'uno';

export const FlowExplorer: React.FC = () => {
  const [audience, setAudience] = useState<AudienceKey>('carmen');
  const [mode, setMode] = useState<Mode>('uno');
  const [group, setGroup] = useState<string | null>(null);
  const [openFlow, setOpenFlow] = useState<string | null>(null);

  const flows = useMemo(() => flowsFor(audience), [audience]);
  const groups = useMemo(() => groupsFor(audience), [audience]);
  const visible = group ? flows.filter((f) => f.group === group) : flows;
  const isPanel = audience === 'antonio';

  const pickAudience = (key: AudienceKey) => {
    setAudience(key);
    setGroup(null);
    setOpenFlow(null);
    setMode('uno');
  };

  return (
    <section id="flujos" className="bg-green-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <p className="eyebrow eyebrow-rule text-cream/80">
            {FLOWS_SECTION.eyebrow}
          </p>
          <h2 className="display text-3xl md:text-5xl mt-8 max-w-[16ch]">
            {FLOWS_SECTION.headline}
          </h2>
          <p className="mt-8 text-lg leading-relaxed max-w-[56ch] text-cream/70">
            {FLOWS_SECTION.lead}
          </p>
        </Reveal>

        {/* Paso 1 — de quién es la experiencia */}
        <Reveal delay={100}>
          <div className="mt-16 grid gap-px bg-cream/15 border border-cream/15 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE_ORDER.map((key) => {
              const a = AUDIENCES[key];
              const active = audience === key;
              return (
                <button
                  key={key}
                  onClick={() => pickAudience(key)}
                  aria-pressed={active}
                  className={`text-left p-6 transition-colors ${
                    active ? 'bg-cream text-ink' : 'bg-green-deep hover:bg-cream/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {key !== 'limite' && (
                      <PersonaImage
                        id={key as PersonaId}
                        className="w-12 h-12 rounded-full shrink-0 text-xl"
                        alt=""
                      />
                    )}
                    <div>
                      <span
                        className={`block font-narrow text-eyebrow uppercase tracking-[0.14em] ${
                          active ? 'text-mercado-green' : 'text-cream/65'
                        }`}
                      >
                        {a.label}
                      </span>
                      <span className="block text-xl font-medium tracking-tight mt-0.5">
                        {a.name}
                        {a.age && (
                          <span className={active ? 'text-ink-faint' : 'text-cream/60'}>
                            , {a.age}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      active ? 'text-ink-soft' : 'text-cream/65'
                    }`}
                  >
                    {a.blurb}
                  </p>
                </button>
              );
            })}
          </div>
        </Reveal>

        {isPanel ? (
          /* Antonio no usa WhatsApp: su vista es el panel */
          <div className="mt-16">
            <Reveal>
              <p className="eyebrow text-cream/80">{PANEL_SECTION.eyebrow}</p>
              <h3 className="display text-2xl md:text-4xl mt-4">{PANEL_SECTION.headline}</h3>
              <p className="mt-5 text-cream/70 leading-relaxed max-w-[60ch]">
                {PANEL_SECTION.lead}
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <PlaceroPanel />
            </Reveal>
          </div>
        ) : (
          <>
            {/* Paso 2 — recorrido completo o flujo suelto */}
            <Reveal delay={140}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-cream/15 pb-6">
                <div className="flex gap-2">
                  {(
                    [
                      ['uno', 'Flujo a flujo'],
                      ['recorrido', 'Recorrido completo'],
                    ] as [Mode, string][]
                  ).map(([m, label]) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setOpenFlow(null);
                      }}
                      aria-pressed={mode === m}
                      className={`px-5 py-2.5 rounded-full font-narrow text-eyebrow uppercase tracking-[0.14em] font-semibold border transition-colors ${
                        mode === m
                          ? 'bg-cream text-ink border-cream'
                          : 'border-cream/30 text-cream/70 hover:border-cream/60 hover:text-cream'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Paso 3 — agrupación temática */}
                {mode === 'uno' && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setGroup(null)}
                      aria-pressed={group === null}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                        group === null
                          ? 'border-cream text-cream'
                          : 'border-cream/20 text-cream/65 hover:border-cream/50'
                      }`}
                    >
                      Todos
                    </button>
                    {groups.map((g) => (
                      <button
                        key={g}
                        onClick={() => setGroup(g)}
                        aria-pressed={group === g}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                          group === g
                            ? 'border-cream text-cream'
                            : 'border-cream/20 text-cream/65 hover:border-cream/50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {mode === 'uno' ? (
              /* Lista: se abre un flujo cada vez, sin muro de móviles */
              <ul className="mt-4">
                {visible.map((f, i) => {
                  const open = openFlow === f.code;
                  return (
                    <Reveal as="li" key={f.code} delay={i * 60}>
                      <div className="border-b border-cream/15">
                        <button
                          onClick={() => setOpenFlow(open ? null : f.code)}
                          aria-expanded={open}
                          className="w-full text-left py-7 grid grid-cols-[1fr_auto] gap-6 items-center group"
                        >
                          <div>
                            <div className="flex items-baseline gap-3 flex-wrap">
                              <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                                {f.name}
                              </h3>
                              <span className="font-narrow text-eyebrow uppercase tracking-[0.14em] text-cream/60">
                                {f.code}
                              </span>
                              {f.hasUnhappy && (
                                <span className="font-narrow text-eyebrow uppercase tracking-[0.12em] text-azafran-light border border-azafran-light/40 rounded-full px-2.5 py-0.5">
                                  Con caminos que fallan
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-cream/60 leading-relaxed max-w-[62ch]">
                              {f.about}
                            </p>
                          </div>
                          <span
                            className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              open
                                ? 'bg-cream text-ink border-cream'
                                : 'border-cream/30 text-cream/70 group-hover:border-cream'
                            }`}
                            aria-hidden="true"
                          >
                            <span className="text-2xl leading-none pb-0.5">
                              {open ? '−' : '+'}
                            </span>
                          </span>
                        </button>

                        {open && (
                          <div className="pb-14 flex justify-center animate-fade-in">
                            <FlowScreen
                              script={f.script}
                              label={f.name}
                              description={f.about}
                            />
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            ) : (
              /* Recorrido completo: los flujos de la persona, en orden */
              <div className="mt-12 space-y-20">
                {flows.map((f, i) => (
                  <Reveal key={f.code} delay={i * 60}>
                    <div className="flex flex-col items-center">
                      <span className="font-narrow text-eyebrow uppercase tracking-[0.14em] text-cream/60 mb-4">
                        Paso {i + 1} de {flows.length}
                      </span>
                      <FlowScreen script={f.script} label={f.name} description={f.about} />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}

        <Reveal delay={160}>
          <p className="mt-16 pt-8 border-t border-cream/15 font-narrow text-eyebrow uppercase tracking-[0.14em] text-cream/60 max-w-[70ch]">
            {FLOWS_SECTION.hint}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
