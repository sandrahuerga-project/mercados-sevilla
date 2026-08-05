// TODOS los textos del portfolio viven aquí.
// Copia editable para revisión: TEXTOS_PORTFOLIO.md (raíz del repo).
// Regla de estilo: solo la primera palabra en mayúscula (sentence case),
// salvo nombres propios. Nada de "Título Con Todas Las Iniciales".
//
// ---- Cortes de línea ----
// Los saltos NO se escriben a mano. El reparto lo hace el navegador con
// `text-wrap: balance` en titulares y `pretty` en párrafos (index.css): un
// <br> fijo cuadra a un ancho y descuadra a los otros tres.
//
// Dónde NO puede partir lo decide `pegaTextos` (tipografia.ts), que envuelve
// cada export: pega con espacio duro toda palabra átona a la siguiente, para
// que no quede una preposición ni un artículo colgando al final de una línea.
// Aquí se escribe en castellano normal y no hay que acordarse de nada.

import { pegaAtonas, pegaTextos, TOPE } from './tipografia';

export const SITE = pegaTextos({
  title: 'Mercados de Sevilla',
  subtitle: 'Diseño de producto conversacional',
  author: 'Sandra Huerga',
});

export const HERO = pegaTextos({
  eyebrow: 'Case study · Diseño de producto',
  headline: 'Comprar en el mercado sin salir de WhatsApp',
  lead: 'Los mercados de abastos de Sevilla tienen una web para vender online que no se usa. El problema es el canal. Este proyecto rediseña la compra a través de WhatsApp tras el caso de éxito de un pescadero.',
  ctaPrimary: 'Ver los flujos',
  ctaSecondary: 'Por qué WhatsApp',
  meta: [
    { label: 'Rol', value: 'Diseño de producto y contenido' },
    { label: 'Ámbito', value: 'Sistema conversacional y panel de gestión' },
    { label: 'Estado', value: 'Prototipo navegable' },
  ],
});

export const PROBLEM = pegaTextos({
  eyebrow: 'El problema',
  headline:
    'Los mercados cada vez están más vacíos. La gente no compra en ellos por horarios incompatibles o por no poder acudir.',
  columns: [
    {
      title: 'Una plataforma que casi nadie usa',
      body: 'El Ayuntamiento tiene web app, app, taquillas refrigeradas y reparto para once mercados. La infraestructura está construida y financiada, pero el uso es bajo: pide registro, aprendizaje y descargar una app nueva en el móvil. No muestra fotos de productos reales y la interfaz es compleja para usuarios no tecnológicos.',
    },
    {
      title: 'Un WhatsApp que funciona solo',
      body: 'Un pescadero de un mercado de barrio graba cada mañana un vídeo de su mostrador, lo manda por difusión y recibe los pedidos en lenguaje natural. Ahí reside su éxito: entra por los ojos, engancha cada día a gente que mira WhatsApp a primera hora, hacen un pedido rápido y el cobro se realiza al entregar o recoger.',
    },
    {
      title: 'Lo que separa a un canal del otro',
      body: 'WhatsApp ya está en el móvil del cliente, la compra ocurre dentro de una conversación y la relación con el placero se mantiene. La actual web app requiere una curva de aprendizaje alta, es fría y está llena de fotografías de producto de stock que no convencen a los usuarios.',
    },
  ],
});

export const EVIDENCE = pegaTextos({
  eyebrow: 'De la investigación',
  headline: 'Qué piensan los clientes',
  note: 'Citas de las entrevistas. Los nombres no son reales.',
  quotes: [
    {
      person: 'Carmen',
      age: '71 años',
      role: 'Compra en el mercado de toda la vida',
      quote:
        'Lo único que uso del móvil es WhatsApp y, la verdad, cuando veo los vídeos de la pescadería todas las mañanas me vienen ideas de comidas y me entran ganas de comprar.',
      insight:
        'El vídeo diario no es un catálogo: es lo que despierta las ganas de comprar. Por eso el flujo empieza en el vídeo y no en una lista de productos.',
    },
    {
      person: 'David',
      age: '34 años',
      role: 'Trabaja de 8 a 17h y le gusta comprar fresco',
      quote:
        'Aunque me encanta comprar en negocios locales, con el trabajo es imposible comprar en el mercado como no sea los sábados. Y siempre tengo planes. Me gustaría poder recoger lo que encargue por la tarde cuando salga de trabajar.',
      insight:
        'No es falta de intención, es incompatibilidad de horarios. De aquí salen la taquilla refrigerada y el reparto en franja de tarde.',
    },
  ],
});

export const SOLUTION = pegaTextos({
  eyebrow: 'La propuesta',
  headline: 'Un asistente que acerca el negocio a los usuarios y les impacta a diario.',
  lead: 'El bot habla con los clientes, toma nota y avisa al placero. No calcula precios, no decide sustituciones y no sustituye al vendedor. Potencia sus ventas y le deja la relación con el cliente, creando un impacto diario en la mente del usuario y fidelizándolo.',
  pillars: [
    {
      title: 'El vídeo abre el día',
      body: 'Cada mañana le llega a los usuarios un vídeo del mostrador real del puesto. Lo que se ve es lo que hay, sin inventario que mantener.',
    },
    {
      title: 'Se pide hablando',
      body: 'Audio o texto, en lenguaje natural. «Un cuarto de gambas» se entiende como ¼ kg.',
    },
    {
      title: 'El placero manda',
      body: 'Acepta, pesa y teclea el total final. El bot solo repite ese número al cliente.',
    },
    {
      title: 'Se paga como siempre',
      body: 'Efectivo, Bizum o tarjeta al recoger o al recibir. Sin pasarela de pago que aprender ni que desarrollar tecnológicamente.',
    },
  ],
});

export const FLOWS_SECTION = pegaTextos({
  eyebrow: 'El prototipo',
  headline: 'Elige de qué persona quieres ver la experiencia',
  lead: 'Cada pantalla es interactiva: pulsa dentro y la conversación avanza.',
});

export const AUDIENCES = pegaTextos({
  carmen: {
    name: 'Carmen',
    age: '71 años',
    label: 'Clienta no tecnológica y dificultad para salir de casa sola',
    blurb:
      'WhatsApp es la única app que usa. Necesita confirmación en cada paso y poder hablar con una persona en cualquier momento.',
  },
  david: {
    name: 'David',
    age: '34 años',
    label: 'Cliente joven con poco tiempo',
    blurb:
      'Compra mientras desayuna en el trabajo. Hace pedidos en varios puestos y recoge fuera del horario de mercado.',
  },
  antonio: {
    name: 'Antonio',
    age: '52 años',
    label: 'Placero',
    blurb:
      'Si su producto no se ve fresco, no lo vende igual. Sus pedidos recibidos le llegan a un panel donde cada uno de ellos se resuelve en un toque.',
  },
  limite: {
    name: 'Situaciones límite',
    age: '',
    label: 'Sistema',
    blurb:
      'Lo que pasa cuando el puesto está cerrado, se ha terminado el producto o cuando un cliente acumula incidencias sin resolver, entre otros casos.',
  },
});

export const PANEL_SECTION = pegaTextos({
  eyebrow: 'La otra mitad',
  headline: 'El panel del placero',
  lead: 'Antonio no usa WhatsApp para trabajar, sino que tiene un panel web. Recibe el pedido, teclea el total real tras pesarlo y el total le llega al cliente junto al estado de «en preparación». Tras el pago, Antonio lo marca como «cobrado» y, cuando lo entrega, como «entregado».',
});

// Los cuatro bloques van en columnas de unos 300 px, así que llevan el tope
// estrecho: es el mismo caso que las tarjetas de flujo. Se pegan aparte para
// que no les pase por encima el tope ancho del resto del apartado.
const PRODUCTO = pegaTextos(
  {
    label: 'Contexto de producto',
    blocks: [
        {
          title: 'El modelo que ya funcionaba',
          body: 'Un pescadero en un mercado de barrio demostró que el canal conversacional en WhatsApp gana al comercio electrónico clásico, pese a estar presente en ambos. Lo hace a través de un vídeo del mostrador por la mañana en el chat, pedidos en lenguaje natural y cobro en mano, Bizum o tarjeta. Recoger o a domicilio. Este proyecto lleva ese modelo a WhatsApp Business y engloba más puestos y mercados.',
        },
        {
          title: 'Aprovechar la infraestructura',
          body: 'La plataforma municipal creada para la web app ya tiene taquillas y reparto (en algunos, pero extensible a todos) en once mercados. La capa conversacional se apoya en esa infraestructura y le da un uso que hasta ahora ha sido mínimo.',
        },
        {
          title: 'Voz y tono',
          body: 'Lenguaje cercano y cotidiano, entendible por todos los usuarios. Carmen recibe el mismo trato que David. Cambia la densidad de la información y la posibilidad de acceder a llamadas con el vendedor.',
        },
      {
        title: 'Decir que es un bot',
        body: 'El reglamento europeo de IA obliga a avisar de que se está hablando con una máquina. Aquí se dice en la primera frase del alta y sin tecnicismos: «un asistente automático, no una persona». A Carmen «sistema de IA» no le dice nada; que no es una persona, sí. Y el aviso no va solo: viene con la salida, que es hablar con el placero.',
      },
    ],
  },
  TOPE.estrecho
);

// La entradilla de esta pestaña va a 62ch, así que se queda con el tope ancho.
const RESTRICCIONES = pegaTextos({
  label: 'Restricciones de WhatsApp Business',
  intro:
    'WhatsApp Business controla el aspecto del chat (la UI). Todo el diseño ocurre dentro de estos límites, verificados contra la documentación de Meta.',
});

export const CONTEXT = {
  eyebrow: pegaAtonas('Contexto y restricciones'),
  tabs: { producto: PRODUCTO, restricciones: RESTRICCIONES },
};

/**
 * Nota al pie del apartado, no sección propia: el post mortem es para quien ya
 * ha leído lo demás y quiere saber qué costó. Puesto arriba sería vender el
 * error como reclamo, y no es eso.
 */
export const POSTMORTEM_NOTA = pegaTextos({
  titulo: 'Lo que salió mal por el camino',
  cuerpo:
    'Un mapa de flujos que llevaba semanas contradiciendo a la lista que tiene encima, un mismo pedido que valía dos precios distintos según quién lo mirara, botones que ofrecían hablar con un placero que había cerrado hacía seis horas. Está todo escrito, con su causa y con lo que se cambió para que no se repita.',
  enlace: 'Leer el post mortem',
  url: 'https://github.com/sandrahuerga-project/mercados-sevilla/blob/main/POSTMORTEM.md',
});

export const FOOTER = pegaTextos({
  note: 'Prototipo de diseño. No envía mensajes reales ni procesa pagos.',
  repoLabel: 'El proyecto en GitHub',
  repoUrl: 'https://github.com/sandrahuerga-project/mercados-sevilla',
  credit: 'Diseño y contenido: Sandra Huerga · 2026',
});
