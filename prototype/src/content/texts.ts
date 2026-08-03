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
  lead: 'Para potenciar la compra en los mercados de abastos de Sevilla, no hacía falta una web app como la actual. Hacía falta WhatsApp, que es el canal que utilizan sus usuarios. Este proyecto rediseña la compra en los mercados de Sevilla siguiendo el ejemplo de un exitoso placero.',
  ctaPrimary: 'Ver los flujos',
  ctaSecondary: 'Por qué WhatsApp',
  meta: [
    { label: 'Rol', value: 'Diseño de producto y contenido' },
    { label: 'Ámbito', value: 'Sistema conversacional y panel de gestión' },
    { label: 'Estado', value: 'Prototipo navegable' },
  ],
};

export const PROBLEM = {
  eyebrow: 'El problema',
  headline: 'Los mercados cada vez más vacíos y la gente que no puede comprar en ellos.',
  columns: [
    {
      title: 'Una plataforma que casi nadie usa',
      body: 'El Ayuntamiento tiene web app, app, taquillas refrigeradas y reparto para once mercados. La infraestructura está construida y financiada, pero el uso es bajo: pide registro exhaustivo, aprendizaje y una app nueva en el móvil. No muestra fotos de productos reales y la interfaz es compleja para usuarios no tecnológicos.',
    },
    {
      title: 'Un WhatsApp que funciona solo',
      body: 'Un pescadero de un mercado de barrio graba cada mañana un vídeo de su mostrador, lo manda por difusión y recibe los pedidos en lenguaje natural. Ahí reside su éxito: entra por los ojos, engancha cada día a gente que mira WhatsApp a primera hora, pedido rápido y cobro al entregar o recoger.',
    },
    {
      title: 'Lo que separa a un canal del otro',
      body: 'WhatsApp ya está en el móvil del cliente, la compra ocurre dentro de una conversación y la relación con el placero se mantiene. La actual web app requiere aprendizaje, es fría y está llena de fotografías de producto de stock.',
    },
  ],
};

export const EVIDENCE = {
  eyebrow: 'De la investigación',
  headline: 'Qué piensan los clientes',
  note: 'Citas de las entrevistas. Los nombres no son reales.',
  quotes: [
    {
      person: 'Carmen',
      age: '71 años',
      role: 'Compra en el mercado de toda la vida',
      quote:
        'Lo único que uso del móvil es el WhatsApp y, la verdad, es que ver los vídeos de la pescadería todas las mañanas me da ideas de comidas y me entran ganas de comprarle.',
      insight:
        'El vídeo diario no es un catálogo: es lo que despierta las ganas de comprar. Por eso el flujo empieza en el vídeo y no en una lista de productos.',
    },
    {
      person: 'David',
      age: '34 años',
      role: 'Trabaja de 8 a 17h y le gusta comprar fresco',
      quote:
        'Aunque me encanta comprar en negocios locales, con el trabajo es imposible comprar en el mercado como no sea los sábados. Y siempre tengo planes. Me gustaría poder venir a por lo encargado por la tarde cuando salga de trabajar.',
      insight:
        'No es falta de intención, es incompatibilidad de horarios. De aquí salen la taquilla refrigerada y el reparto en franja de tarde.',
    },
  ],
};

export const SOLUTION = {
  eyebrow: 'La propuesta',
  headline:
    'Más que un puesto en el mercado: un asistente que acerca el negocio a los usuarios y les impacta a diario.',
  lead: 'El bot habla con los clientes, toma nota y avisa al placero. No calcula precios, no decide sustituciones y no sustituye al vendedor: le quita el trabajo administrativo y le deja la relación con el cliente, potenciando el negocio con un impacto diario en la mente del usuario.',
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
      body: 'Él acepta, él pesa y él teclea el total final. El bot solo repite ese número al cliente.',
    },
    {
      title: 'Se paga como siempre',
      body: 'Efectivo, Bizum o tarjeta al recoger o al recibir. Sin pasarela de pago que aprender ni que desarrollar tecnológicamente.',
    },
  ],
};

export const FLOWS_SECTION = {
  eyebrow: 'El prototipo',
  headline: 'Elige de quién quieres ver la experiencia',
  lead: 'Cada pantalla es interactiva: pulsa dentro y la conversación avanza.',
  hint: 'Los unhappy paths también están: producto agotado, cliente que no recoge, pedido fuera de horario.',
};

export const AUDIENCES = {
  carmen: {
    name: 'Carmen',
    age: '71 años',
    label: 'Clienta no tecnológica y movilidad reducida',
    blurb:
      'Solo usa WhatsApp. Necesita confirmación en cada paso y poder hablar con una persona en cualquier momento.',
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
      'Si su producto no se ve, no lo vende. Sus pedidos recibidos no están en el chat, sino en panel donde cada uno de ellos se resuelve en un toque.',
  },
  limite: {
    name: 'Situaciones límite',
    age: '',
    label: 'Sistema',
    blurb:
      'Lo que pasa cuando el puesto está cerrado, se ha terminado el producto o cuando un cliente acumula incidencias sin resolver.',
  },
};

export const PANEL_SECTION = {
  eyebrow: 'La otra mitad',
  headline: 'El panel del placero',
  lead: 'Antonio no usa WhatsApp para trabajar: usa un panel web. Recibe el pedido, teclea el total real tras pesarlo, y el total le llega al cliente junto al estado de «en preparación». Tras el pago, Antonio lo marca como cobrado y entregado.',
};

export const CONTEXT = {
  eyebrow: 'Contexto y restricciones',
  tabs: {
    producto: {
      label: 'Contexto de producto',
      blocks: [
        {
          title: 'El modelo que ya funcionaba',
          body: 'Un pescadero en un mercado de barrio demostró que el canal conversacional gana al comercio electrónico clásico, pese a estar presente en ambos: vídeo del mostrador por la mañana en el chat, pedidos en lenguaje natural y cobro en mano, Bizum o tarjeta. Recoger o a domicilio. Este proyecto lleva ese modelo a WhatsApp Business y engloba más puestos y mercados.',
        },
        {
          title: 'Aprovechar la infraestructura',
          body: 'La plataforma municipal creada para la web app ya tiene taquillas y reparto (en algunos, pero extensible a todos) en once mercados. La capa conversacional se apoya en esa infraestructura y le da un uso que hasta ahora ha sido mínimo.',
        },
        {
          title: 'Voz y tono',
          body: 'Lenguaje cercano y cotidiano, sin diminutivos ni condescendencia. Carmen recibe el mismo trato que David. Cambia la densidad de la información y la posibilidad de acceder a llamadas con el vendedor.',
        },
      ],
    },
    restricciones: {
      label: 'Restricciones de WhatsApp Business',
      intro:
        'WhatsApp Business controla el aspecto del chat (la UI). Todo el diseño ocurre dentro de estos límites, verificados contra la documentación de Meta.',
    },
  },
};

export const FOOTER = {
  note: 'Prototipo de diseño. No envía mensajes reales ni procesa pagos.',
  credit: 'Diseño y contenido: Sandra Huerga · 2026',
};
