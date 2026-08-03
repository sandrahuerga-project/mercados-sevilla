import React from 'react';
import { HERO, SITE } from '../content/texts';
import { Reveal } from './Reveal';
import { FoodImage, FoodStrip } from './FoodImage';
import { Parallax } from './Parallax';

const scrollTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/**
 * El bodegón de portada: cuatro piezas que entran desde fuera del encuadre, se
 * asientan escalonadas y se quedan flotando, como quien coloca el género en el
 * mostrador antes de abrir.
 *
 * `dx`/`dy`/`rot` dicen de dónde viene cada una y `entrada` cuándo sale. Cada
 * pieza tarda 1,5 s en asentarse y arrancan de 0,2 s en 0,35 s, así que la
 * secuencia entera dura unos 2,75 s: lo bastante lenta para que se vea colocar
 * el género y no un parpadeo. La velocidad de parallax sube con las piezas
 * pequeñas: al moverse más, se leen como si estuvieran delante.
 */
const BODEGON = [
  {
    id: 'merluza',
    ancho: 'w-80 xl:w-[26rem]',
    pos: 'right-0 -top-8',
    dx: '130px',
    dy: '-40px',
    rot: '18deg',
    entrada: '0.2s',
    parallax: 0.16,
  },
  {
    id: 'gambas',
    ancho: 'w-56 xl:w-64',
    pos: 'right-[13rem] top-[12rem]',
    dx: '-70px',
    dy: '90px',
    rot: '-14deg',
    entrada: '0.55s',
    parallax: 0.24,
  },
  {
    id: 'naranja',
    ancho: 'w-40 xl:w-44',
    pos: 'right-[5rem] top-[16rem]',
    dx: '50px',
    dy: '100px',
    rot: '26deg',
    entrada: '0.9s',
    parallax: 0.3,
  },
  {
    id: 'huevos',
    ancho: 'w-44 xl:w-52',
    pos: 'right-[22rem] top-[1rem]',
    dx: '-100px',
    dy: '-60px',
    rot: '-22deg',
    entrada: '1.25s',
    parallax: 0.12,
  },
  {
    id: 'limon',
    ancho: 'w-40 xl:w-44',
    pos: 'right-[26rem] top-[11rem]',
    dx: '-80px',
    dy: '70px',
    rot: '30deg',
    entrada: '1.6s',
    parallax: 0.2,
  },
] as const;

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
      {/* Cinta inclinada: el género desfila por detrás del titular, muy tenue.
          El recorte vive aquí y no en toda la portada: la banda girada sobresale
          por los lados y sacaría barra horizontal, pero el bodegón sí necesita
          poder salirse por arriba. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-[28%] -rotate-[12deg] opacity-[0.14]">
          <FoodStrip className="w-[140%] -ml-[20%]" />
        </div>
      </div>

      {/* Bodegón: cuatro piezas que se colocan solas al cargar y luego flotan.
          Cada una entra desde su lado, con su giro y su retraso. */}
      <div className="hidden lg:block absolute right-0 top-0 w-[40rem] h-[30rem] pointer-events-none">
        {BODEGON.map((pieza) => (
          <Parallax key={pieza.id} speed={pieza.parallax} className={`absolute ${pieza.pos}`}>
            <FoodImage
              id={pieza.id}
              /* Sin `retraso`: pondría un animationDelay en línea que pisaría
                 los dos retrasos que ya lleva la clase `asienta`. */
              className={`asienta ${pieza.ancho}`}
              style={
                {
                  '--dx': pieza.dx,
                  '--dy': pieza.dy,
                  '--rot': pieza.rot,
                  '--entrada': pieza.entrada,
                } as React.CSSProperties
              }
            />
          </Parallax>
        ))}
      </div>

      <Reveal className="relative">
        <p className="font-narrow text-lg text-mercado-green">{HERO.eyebrow}</p>
      </Reveal>

      {/* `relative` en el contenido: la cinta va antes en el marcado, así que
          todo lo posicionado que venga después se pinta por encima de ella. */}
      <Reveal delay={80} className="relative">
        <h1 className="display text-4xl sm:text-5xl md:text-6xl max-w-[16ch] mt-6">
          {HERO.headline}
        </h1>
      </Reveal>

      <div className="relative mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 items-start">
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
          <dl className="border-t border-line">
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
