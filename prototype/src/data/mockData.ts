export const MERCADOS = [
  { id: 'san-gonzalo', name: 'San Gonzalo', location: 'Triana, Sevilla', active: true },
  { id: 'triana', name: 'Mercado de Triana', location: 'Plaza del Altozano', active: true },
  { id: 'feria', name: 'Mercado de la Feria', location: 'Calle Feria', active: true },
  { id: 'arenal', name: 'Mercado del Arenal', location: 'Calle Pastor y Landero', active: false },
  { id: 'encarnacion', name: 'Mercado de la Encarnación', location: 'Plaza de la Encarnación', active: false }
];

export const PUESTOS_SAN_GONZALO = [
  { id: 'antonio', name: 'Pescadería Antonio', category: 'Pescadería', icon: '🐟', active: true, tag: 'Antonio' },
  { id: 'manolo', name: 'Frutería Manolo', category: 'Frutería', icon: '🍅', active: true, tag: 'Manolo' },
  { id: 'lola', name: 'Carnicería Lola', category: 'Carnicería', icon: '🥩', active: true, tag: 'Lola' },
  { id: 'sanchez', name: 'Ibéricos Sánchez', category: 'Charcutería', icon: '🥖', active: true, tag: 'Sánchez' },
  { id: 'huerto', name: 'Verduras El Huerto', category: 'Verduras', icon: '🥦', active: true, tag: 'El Huerto' }
];

export const WHATSAPP_CONSTRAINTS = [
  {
    rule: "Botones de respuesta",
    limit: "Máximo 3 botones por mensaje",
    spec: "Máximo 20 caracteres por botón, sin emojis personalizados.",
    validation: "✓ Cumplido en todos los flujos."
  },
  {
    rule: "Listas de mensajes",
    limit: "Máximo 10 filas en total",
    spec: "Secciones con título. No se permiten listas vacías.",
    validation: "✓ Usado en C05 Multi-puesto y selector de puestos."
  },
  {
    rule: "Sin tarjetas nativas",
    limit: "WhatsApp no tiene HTML/CSS en burbujas",
    spec: "Simular con texto plano, saltos de línea, *negritas* y _cursivas_.",
    validation: "✓ Implementado con precisión visual de burbujas en el simulador."
  },
  {
    rule: "WhatsApp Flows",
    limit: "Formularios multipantalla nativos",
    spec: "Ideal para onboarding o captura de direcciones. Renderiza fullscreen sobre el chat.",
    validation: "✓ Simulador interactivo en C01 con 3 pantallas animadas."
  },
  {
    rule: "Plantillas de utilidad",
    limit: "Mensajes salientes fuera de 24h",
    spec: "Deben ser pre-aprobadas por Meta (por ejemplo, notificaciones de envío, recogida o taquilla).",
    validation: "✓ Utilizado en C07 para el tracking de estados."
  }
];
