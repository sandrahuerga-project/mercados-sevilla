// TODOS los textos del portfolio viven aquí.
// Copia editable para revisión: TEXTOS_PORTFOLIO.md (raíz del repo).
// Regla de estilo: solo la primera palabra en mayúscula (sentence case),
// salvo nombres propios. Nada de "Título Con Todas Las Iniciales".

export const SITE = {
  title: 'Mercados de Sevilla',
  subtitle: 'Diseño de producto conversacional',
  author: 'Sandra Huerga',
};

export const HERO = {
  eyebrow: 'Case study · Diseño de producto',
  headline: 'Comprar en el mercado sin salir de WhatsApp',
  lead: 'Los mercados de abastos de Sevilla tienen una plataforma municipal completa y poco usada. Mientras tanto, un pescadero vende cada día por WhatsApp sin plataforma ninguna. Este proyecto diseña lo segundo a escala de lo primero.',
  ctaPrimary: 'Ver los flujos',
  ctaSecondary: 'Cómo está hecho',
  meta: [
    { label: 'Rol', value: 'Diseño de producto y contenido' },
    { label: 'Ámbito', value: 'Sistema conversacional y panel de gestión' },
    { label: 'Estado', value: 'Prototipo navegable' },
  ],
};

export const PROBLEM = {
  eyebrow: 'El problema',
  headline: 'La tecnología no era el problema. El canal sí.',
  columns: [
    {
      title: 'Una plataforma que casi nadie usa',
      body: 'El Ayuntamiento tiene web, app, taquillas refrigeradas y reparto para once mercados. La infraestructura está construida y financiada, pero el uso es bajo: pide registro, aprendizaje y una app nueva en el móvil.',
    },
    {
      title: 'Un WhatsApp que funciona solo',
      body: 'Un pescadero de San Gonzalo graba cada mañana un vídeo de su mostrador, lo manda por difusión y recibe los pedidos en lenguaje natural. Cobra al entregar. Sin plataforma, sin comisiones y con clientela que repite.',
    },
    {
      title: 'Lo que separa a uno del otro',
      body: 'El canal ya está en el móvil del cliente, la compra ocurre dentro de una conversación y la relación con el placero se mantiene. Ninguna de las tres cosas depende de tener mejor tecnología.',
    },
  ],
};

export const EVIDENCE = {
  eyebrow: 'De la investigación',
  headline: 'Lo dijeron ellos, no yo',
  note: 'Citas de las entrevistas. Los nombres son de perfil, no reales.',
  quotes: [
    {
      person: 'Carmen',
      age: '71 años',
      role: 'Compra en el mercado toda la vida',
      quote:
        'Lo único que uso del móvil es el WhatsApp, y la verdad es que al ver los vídeos todas las mañanas me da ideas de comidas y me entran ganas de comprarle.',
      insight:
        'El vídeo diario no es un catálogo: es lo que despierta las ganas de comprar. Por eso el flujo empieza en el vídeo y no en una lista de productos.',
    },
    {
      person: 'David',
      age: '34 años',
      role: 'Trabaja fuera, compra los sábados',
      quote:
        'Aunque me encanta comprar a negocios locales, con el trabajo es imposible comprar en el mercado como no sea los sábados, y siempre tengo planes. Me gustaría poder venir a por lo encargado por la tarde cuando salga de trabajar.',
      insight:
        'No es falta de intención, es incompatibilidad de horarios. De aquí salen la taquilla refrigerada y el reparto en franja de tarde.',
    },
  ],
};

export const SOLUTION = {
  eyebrow: 'La propuesta',
  headline: 'Un secretario, no una tienda',
  lead: 'El bot toma nota y avisa. No calcula precios, no decide sustituciones y no sustituye al placero: le quita el trabajo administrativo y le deja la relación con el cliente.',
  pillars: [
    {
      title: 'El vídeo abre el día',
      body: 'Cada mañana llega el mostrador real del puesto. Lo que se ve es lo que hay, sin inventario que mantener.',
    },
    {
      title: 'Se pide hablando',
      body: 'Audio o texto, en lenguaje de mercado. «Un cuarto de gambas» se entiende como ¼ kg, no como 250 gramos de camarón.',
    },
    {
      title: 'El placero manda',
      body: 'Él acepta, él pesa y él teclea el total final. El bot solo repite ese número al cliente.',
    },
    {
      title: 'Se paga como siempre',
      body: 'Efectivo, Bizum o tarjeta al recoger o al recibir. Sin pasarela de pago que aprender.',
    },
  ],
};

export const FLOWS_SECTION = {
  eyebrow: 'El prototipo',
  headline: 'Trece conversaciones y un panel',
  lead: 'Cada pantalla es interactiva: se pulsa dentro y la conversación avanza. Elige de quién quieres ver la experiencia.',
  hint: 'Los unhappy paths también están: producto agotado, cliente que no recoge, pedido fuera de horario.',
};

export const AUDIENCES = {
  carmen: {
    name: 'Carmen',
    age: '71 años',
    label: 'Cliente mayor',
    blurb:
      'Solo usa WhatsApp. Necesita confirmación en cada paso y poder hablar con una persona en cualquier momento.',
  },
  david: {
    name: 'David',
    age: '34 años',
    label: 'Cliente joven',
    blurb:
      'Compra de noche y con atajos. Aporta volumen, pedidos de varios puestos y recogida fuera del horario de mercado.',
  },
  antonio: {
    name: 'Antonio',
    age: '52 años',
    label: 'Placero',
    blurb:
      'Sin él no hay producto. Su vista no es WhatsApp: es un panel donde cada pedido se resuelve en un toque.',
  },
  limite: {
    name: 'Situaciones límite',
    age: '',
    label: 'Sistema',
    blurb:
      'Lo que pasa cuando el puesto está cerrado o cuando un cliente acumula incidencias sin resolver.',
  },
};

export const PANEL_SECTION = {
  eyebrow: 'La otra mitad',
  headline: 'El panel del placero',
  lead: 'Antonio no usa WhatsApp para trabajar: usa un panel web. Al marcar un pedido como listo, teclea el total real tras pesarlo, y ese número es el que le llega al cliente.',
};

export const CONTEXT = {
  eyebrow: 'Cómo está hecho',
  tabs: {
    producto: {
      label: 'Contexto de producto',
      blocks: [
        {
          title: 'El modelo que ya funcionaba',
          body: 'Un pescadero del Mercado de San Gonzalo demostró que el canal conversacional gana al comercio electrónico clásico: vídeo del mostrador por la mañana, pedidos en lenguaje natural y cobro en mano. El proyecto industrializa ese modelo sin romperlo.',
        },
        {
          title: 'Convivir, no competir',
          body: 'La plataforma municipal ya tiene taquillas, reparto y once mercados. La capa conversacional se apoya en esa infraestructura en lugar de duplicarla.',
        },
        {
          title: 'Voz y tono',
          body: 'Andaluz cercano y profesional, sin diminutivos ni condescendencia. Carmen recibe el mismo trato que David: cambia la densidad de la información, nunca el respeto.',
        },
      ],
    },
    restricciones: {
      label: 'Restricciones de WhatsApp',
      intro:
        'WhatsApp controla el aspecto del chat. Todo el diseño ocurre dentro de estos límites, verificados contra la documentación de Meta.',
    },
  },
};

export const FOOTER = {
  note: 'Prototipo de diseño. No envía mensajes reales ni procesa pagos.',
  credit: 'Diseño y contenido: Sandra Huerga · Sevilla, 2026',
};
