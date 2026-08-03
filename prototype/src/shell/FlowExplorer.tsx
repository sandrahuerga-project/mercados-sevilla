import React, { useMemo, useState } from 'react';
import { FLOWS_SECTION, AUDIENCES, PANEL_SECTION } from '../content/texts';
import { AUDIENCE_ORDER, flowsFor, groupsFor, type AudienceKey } from '../content/flowCatalog';
import { journeyFor } from '../content/journeys';
import { FlowScreen } from '../engine/FlowScreen';
import { PlaceroPanel } from '../panel/PlaceroPanel';
import { PersonaImage, type PersonaId } from './PersonaImage';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';
import { FlowMap, FlowMapLegend } from './FlowMap';

type Mode = 'recorrido' | 'uno';

export const FlowExplorer: React.FC = () => {
  const [audience, setAudience] = useState<AudienceKey>('carmen');
  const [mode, setMode] = useState<Mode>('uno');
  const [group, setGroup] = useState<string | null>(null);
  const [openFlow, setOpenFlow] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  const flows = useMemo(() => flowsFor(audience), [audience]);
  const groups = useMemo(() => groupsFor(audience), [audience]);
  const journey = useMemo(() => journeyFor(audience), [audience]);
  const visible = group ? flows.filter((f) => f.group === group) : flows;
  const isPanel = audience === 'antonio';

  const pickAudience = (key: AudienceKey) => {
    setAudience(key);
    setGroup(null);
    setOpenFlow(null);
    setMode('uno');
  };

  return (
    <section id="flujos" className="bg-green-deep text-cream scroll-mt-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <SectionLabel tone="deep">{FLOWS_SECTION.eyebrow}</SectionLabel>

        <Reveal>
          <h2 className="display text-3xl md:text-5xl mt-12 max-w-[16ch]">
            {FLOWS_SECTION.headline}
          </h2>
          <p className="mt-8 text-lg leading-relaxed max-w-[56ch] text-cream/70">
            {FLOWS_SECTION.lead}
          </p>

          {/* El mapa da sentido a los códigos C03, C11, S01… */}
          <button
            onClick={() => setMapOpen((v) => !v)}
            aria-expanded={mapOpen}
            className="mt-8 inline-flex items-center gap-3 border border-cream/40 hover:border-cream px-6 py-3.5 font-narrow text-lg transition-colors"
          >
            {mapOpen ? 'Ocultar el mapa de flujos' : 'Ver el mapa de flujos'}
            <span aria-hidden="true">{mapOpen ? '↑' : '↓'}</span>
          </button>
        </Reveal>

        {mapOpen && (
          <Reveal className="mt-10">
            <div className="border-t border-cream/20 pt-10 animate-fade-in">
              <FlowMap />
              <div className="mt-8">
                <FlowMapLegend />
              </div>
              <p className="mt-6 text-sm text-cream/60 max-w-[70ch]">
                Los códigos vienen del inventario de flujos del proyecto. Cada uno es una
                conversación completa; las flechas indican por dónde continúa.
              </p>
            </div>
          </Reveal>
        )}

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
                        className={`block font-narrow text-base ${
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

        <>
            {/* Paso 2 — recorrido completo o flujo suelto */}
            <Reveal delay={140}>
              <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-8 gap-y-4 border-b border-cream/15 pb-6">
                {/* En móvil, uno debajo del otro y sin partir el texto en dos líneas */}
                <div className="flex flex-col sm:flex-row gap-2">
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
                      className={`px-5 py-3 rounded-full font-narrow text-lg border transition-colors whitespace-nowrap text-center ${
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
                              {/* En «Situaciones límite» sobra: ahí todos lo son. */}
                              {f.hasUnhappy && audience !== 'limite' && (
                                <span className="font-narrow text-base text-azafran-light border border-azafran-light/40 rounded-full px-2.5 py-0.5">
                                  Con ramas que salen mal
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
              /* Recorrido completo: un solo hilo, de principio a fin */
              journey && (
                <Reveal className="mt-12">
                  <div className="flex flex-col items-center">
                    <p className="font-narrow text-lg text-cream/70 mb-8 max-w-[52ch] text-center">
                      Los {flows.length} flujos encadenados en una sola conversación. Pulsa
                      dentro y llévala por donde quieras: las ramas que salen mal también
                      están.
                    </p>
                    <FlowScreen
                      script={journey}
                      label="Recorrido completo"
                      description={`${AUDIENCES[audience].name}, de principio a fin`}
                    />
                  </div>
                </Reveal>
              )
            )}
        </>

        {/* Antonio tiene además una vista que no es WhatsApp: el panel */}
        {isPanel && (
          <div className="mt-20 pt-16 border-t border-cream/15">
            <Reveal>
              <p className="font-narrow text-lg text-cream/80">{PANEL_SECTION.eyebrow}</p>
              <h3 className="display text-2xl md:text-4xl mt-4">{PANEL_SECTION.headline}</h3>
              <p className="mt-5 text-cream/70 leading-relaxed max-w-[60ch]">
                {PANEL_SECTION.lead}
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <PlaceroPanel />
            </Reveal>
          </div>
        )}

      </div>
    </section>
  );
};
