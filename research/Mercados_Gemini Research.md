# Research y Diseño de Servicio: Plataforma de Comercio Conversacional en Mercados de Abastos de Sevilla

Este documento consolida la investigación de usuarios, el análisis de comportamiento del consumidor, las preguntas de investigación clave y la estrategia de comercio local con la arquitectura conversacional y el framework de prototipado técnico desarrollados para la plataforma. El ecosistema digital está diseñado bajo un modelo híbrido: **Frontend conversacional en WhatsApp, lógica automatizada de persistencia de datos y un modelo logístico unificado.**

---

## 📊 Matriz Estratégica de Perfiles (User Personas)

| Dimensión | Usuario A — Mayor (65+) | Usuario B — Joven (25–45) | Usuario C — Vendedor (Placista) |
| :--- | :--- | :--- | :--- |
| **Canal Principal** | WhatsApp (Audios/Fotos). | WhatsApp / Web-App integrada. | Backend simplificado (Tablet/Móvil). |
| **Motivación** | Salud, movilidad y arraigo cultural. | Sostenibilidad, calidad y optimización del tiempo. | Incremento de facturación y blindaje frente al súper. |
| **Barrera Crítica** | Brecha digital y desconfianza en pasarelas de pago. | Incompatibilidad horaria con la jornada laboral. | Saturación operativa durante las horas punta de venta. |
| **Método de Pago** | Contrareembolso o Bizum básico. | Bizum, Tarjeta o Apple/Google Pay. | Liquidación diaria limpia y sin comisiones abusivas. |

---

## 👤 Análisis Profundo de Perfiles

### 1. Usuario A — La Compradora Mayor (65+)
Representa al cliente tradicional de los mercados sevillanos. Su adopción tecnológica es instrumental y delegada.
* **Comportamiento y Patrones:** Su rutina gira en torno al menú diario (*el avío*). Compra varias veces por semana en cantidades pequeñas, priorizando la conversación y el consejo del tendero de confianza.
* **Relación con la Tecnología:** Utiliza WhatsApp de forma diaria, pero su interacción se limita a patrones sencillos: **notas de voz (audios) y fotografías** de listas de la compra en papel. No interactúa con árboles de decisiones complejos ni menús de botones infinitos.
* **Fricciones de Confianza:** Teme perder el control sobre la calidad del producto (*"que me pongan lo peor si no estoy allí"*). Exige validación humana. El pago digital con doble factor de autenticación SMS le genera ansiedad y abandono.

### 2. Usuario B — El Comprador Joven (25–45)
Profesionales con alta conciencia eco-social pero con severas restricciones de tiempo.
* **El Conflicto Horario:** El horario habitual de los mercados de abastos (9:00 a 14:30) coincide plenamente con su jornada laboral. El sábado por la mañana genera fricción por competir con su tiempo de ocio y descanso.
* **Motivaciones:** Buscan huir del ultraprocesado y del plástico de las grandes superficies. Valoran el concepto de "Km 0", el comercio justo y la economía de barrio.
* **Expectativas UX:** Demandan un servicio **asincrónico**. Quieren dejar el pedido listo a las 22:00 desde el sofá y delegar la entrega en franjas tardías (19:00 a 21:00) o mediante puntos de recogida inteligente.

### 3. Usuario C — El Vendedor de Mercado (Placista)
Profesionales analógicos cuyo negocio vive de la velocidad y el volumen presencial.
* **Contexto Operativo:** Su jornada arranca de madrugada en MercaSevilla. Durante la mañana, su atención es física y simultánea. No pueden pausar el despacho de carne o pescado para responder un chat.
* **La Barrera del Stock Dinámico:** El stock del mercado es hipervariable y depende de las capturas o la estacionalidad diaria. Los precios cambian cada mañana. Cualquier sistema que les exija actualizar manualmente un catálogo digital de 100 productos fracasará por falta de tiempo.
* **Rechazo a los Agregadores (Delivery Tradicional):** Ven las comisiones de plataformas tipo Glovo o Uber Eats como un ataque directo a sus estrechos márgenes y desconfían del trato que los *riders* dan al producto fresco y perecedero.

---

## ❓ Cuestionario de Campo y Preguntas de Investigación (User Research)

Para profundizar en la validación de estos perfiles durante las fases de entrevista y testeo, se establece el siguiente árbol de preguntas clave:

### Bloque 1: Compradores (Usuarios A y B)
* **Comportamiento actual:** ¿Cómo compran hoy en mercados de abastos? ¿Qué canales usan para hacer compra online de alimentación? ¿Con qué frecuencia compran y qué productos priorizan?
* **Barreras y fricciones:** ¿Qué les impide ir físicamente al mercado? ¿Qué barreras tienen para adoptar una solución digital de compra? ¿Qué experiencias negativas han tenido con apps o plataformas existentes?
* **Motivaciones y valores:** ¿Por qué prefieren el mercado frente a supermercados o plataformas como Mercadona o Glovo? ¿Qué significa para ellos "consumo local y de proximidad"? ¿Qué valoran más: precio, frescura, relación con el vendedor o variedad?
* **Relación con la tecnología:** ¿Qué nivel de uso tienen de WhatsApp en su día a día? ¿Usan WhatsApp para hacer pedidos informales a comercios hoy? ¿Qué funciones dominan (texto, audio, fotos, listas)? ¿El perfil mayor necesita asistencia de un familiar para operar digitalmente?
* **Expectativas del servicio:** ¿Qué esperan del proceso de pedido (catálogo, confirmación, pago, entrega)? ¿Qué métodos de pago usarían y cuáles generan desconfianza? ¿Qué plazo y franja horaria de entrega necesitan? ¿Cuánto pagarían por el servicio de entrega a domicilio?
* **Relación con el mercado:** ¿Tienen puestos o vendedores de confianza? ¿Es importante mantener la relación personal con el vendedor en un canal digital? ¿Confiarían en un intermediario o prefieren contacto directo con el puesto?
* **Contexto local (Sevilla):** ¿Qué mercados frecuentan o frecuentaban (Triana, Feria, Arenal, Cerro, San Gonzalo, etc.)? ¿Conocen alguna iniciativa similar en Sevilla o España? ¿Qué haría que recomendaran el servicio a su entorno?

### Bloque 2: Vendedores de Mercado (Usuario C)
* **Contexto y situación actual:** ¿Cómo gestionan hoy los pedidos online o por teléfono? ¿Usan ya WhatsApp para recibir pedidos de clientes habituales? ¿Qué herramientas digitales tienen y cuáles usan realmente? ¿Cuánto tiempo dedican a gestionar pedidos frente a atender el puesto físicamente?
* **Barreras de adopción:** ¿Qué les frena para digitalizar su negocio? ¿Han tenido experiencias previas con plataformas de venta online? ¿Cómo fueron? ¿Qué percepción tienen de las comisiones que cobran intermediarios como Glovo o Uber Eats?
* **Motivaciones:** ¿Qué les haría adoptar una nueva plataforma? ¿Priorizan más clientes, más comodidad operativa o más control sobre su negocio? ¿Les importa mantener la relación directa con el cliente en un canal digital?
* **Capacidad operativa:** ¿Trabajan solos o tienen personal de apoyo en el puesto? ¿Tienen smartphone y acceso a datos durante el horario de mercado? ¿Qué nivel de alfabetización digital tienen? ¿Podrían gestionar un catálogo digital de productos y precios? ¿Con qué frecuencia lo actualizarían?
* **Gestión de pedidos y stock:** ¿Cómo manejan la disponibilidad de producto en tiempo real (estacionalidad, roturas de stock)? ¿Qué ocurre cuando un producto pedido no está disponible? ¿Cómo lo gestionan hoy? ¿Qué información necesitan de cada pedido para prepararlo sin errores? ¿Qué franja horaria pueden dedicar a preparar pedidos sin interferir con la venta presencial?
* **Logística y entrega:** ¿Gestionarían ellos la entrega o necesitan que la plataforma lo resuelva? ¿Han entregado a domicilio alguna vez? ¿Cómo fue la experiencia? ¿Qué radio de entrega consideran viable?
* **Modelo de negocio y confianza:** ¿Qué modelo de comisión o tarifa encontrarían justo? ¿Qué necesitarían ver para confiar en la plataforma y comprometerse con ella? ¿Qué haría que la recomendaran a otros vendedores del mercado?
* **Contexto Sevilla:** ¿En qué mercado trabajan y desde cuándo? ¿Tienen clientela habitual que ya compra de forma recurrentemente? ¿Conocen otros puestos o mercados que hayan probado venta online?

---

## 🛠️ Arquitectura del Flujo Lógico y Conversacional

Para dar respuesta a estos perfiles sin añadir fricción tecnológica, la plataforma se apoya en una estructura lógica conversacional que discrimina inteligentemente entre usuarios nuevos y recurrentes mediante variables de contexto.

### 1. Enrutamiento Condicional de Entrada (Check de Recurrencia)
El sistema implementa una propiedad de memoria para ahorrar fricción en el proceso de compra habitual:
* **Bloque Condicional Inicial:** Al recibir el mensaje de entrada, el sistema ejecuta la comprobación `IF @mercado_fav IS SET`.
* **Rama YES (Usuario Recurrente):** Salta directamente a un mensaje de confirmación interactivo: *"Tu mercado favorito es **@mercado_fav**. ¿Quieres comprar allí hoy?"*. Ofrece dos botones: `[Usar este mercado]` (avanza al subflujo de pedido) y `[Cambiar mercado]` (redirige al listado general).
* **Rama ELSE / NO (Usuario Nuevo):** Conecta de forma automática con el bloque `Elegir Mercado`, desplegando la lista de plazas de abastos de Sevilla (Triana, Feria, Cerro, San Gonzalo, El Arenal). Una vez que el usuario selecciona una, la respuesta se almacena en la variable `@mercado_fav` para habilitar la persistencia en las siguientes sesiones.

### 2. El Embudo de Compra de Extremo a Extremo (End-to-End Funnel)
Una vez determinado el mercado, el flujo conversacional sigue una secuencia de pasos optimizada de 8 pantallas o bloques lógicos:
1. **Pantalla 1: Bienvenida + Selección de Mercado:** Enrutamiento inicial y check de favoritos.
2. **Pantalla 2: Elección de Categoría:** El bot ofrece botones de navegación rápida estructurados por gremios: Carnicería, Pescadería, Frutería/Verdulería, Recova.
3. **Pantalla 3: Selección de Puesto (*Stall ID*):** El usuario elige su puesto de confianza, respetando la identidad del comercio local frente al anonimato del supermercado.
4. **Pantalla 4: Vídeo del Mostrador / Producto:** Factor diferencial del servicio. El placista puede subir un vídeo corto por la mañana enseñando el género fresco del día (ej. *"¡Mira qué boquerones acaban de entrar!"*). Actúa como gancho visual para el Usuario B y aporta la seguridad del directo que exige el Usuario A.
5. **Pantalla 5: Selección de Cantidad:** Configuración de unidades o peso de manera flexible adaptada al lenguaje del fresco.
6. **Pantalla 6: Tipo de Entrega + Horario (Fulfillment):** Selección crítica para la conciliación horaria:
    * *Recogida en Puesto:* Para el cliente tradicional que pasea por la plaza.
    * *Taquilla Refrigerada (Click & Collect):* Ubicadas en el propio mercado, operativas 24/7 para el Usuario B que sale tarde de trabajar.
    * *Reparto a Domicilio:* Centralizado con logística en frío.
7. **Pantalla 7: Resumen + Pago:** Integración de pasarela segura mediante enlaces nativos de Bizum, tarjeta de crédito o la opción de pago contrareembolso para mitigar la desconfianza del perfil mayor.
8. **Pantalla 8: Confirmación Final:** Emisión de un ticket digital con el resumen de la compra, desglose de puestos y la franja horaria asignada.

---

## 🏛️ El Contexto Local: Especificidades de Sevilla

El éxito del servicio pasa por adaptarse por completo a la idiosincrasia de la capital andaluza:
* **Tratamiento del Lenguaje Natural (NLP Local):** La IA conversacional integrada en el bot de WhatsApp debe estar entrenada para interpretar expresiones idiomáticas de compra sevillanas y medidas tradicionales. Debe mapear conceptos como *"un cuarto de avío de puchero"*, *"un manojo de tagarninas"*, *"papas nuevas"*, *"acedías"* o *"un corte de cazón para adobo"*.
* **La Barrera Climática:** En Sevilla, la gestión de la cadena de frío es crítica debido a las altas temperaturas estivales. La última milla no puede basarse en reparto convencional en ciclomotor. El modelo exige **cajas de transporte con aislamiento térmico activo o pasivo homologado**, especialmente para los trayectos desde mercados clave a zonas residenciales periféricas.

---

## 🗺️ Roadmap de Prototipado y Despliegue Técnico

Para validar la viabilidad del producto reduciendo costes de desarrollo iniciales, se establece un plan evolutivo en dos fases bien diferenciadas:

### Fase 1: Prototipado de Alta Fidelidad (Figma)
Antes de invertir en infraestructura tecnológica compleja como APIs de Twilio o integraciones de código, se construye un prototipo interactivo en Figma para realizar tests de usabilidad reales.
* **Construcción Visual:** Se diseña sobre un lienzo móvil (ej. iPhone 14, 390x844 px). Se emplean *UI Kits* de WhatsApp para replicar de forma exacta las burbujas de texto izquierda/derecha, el fondo del chat y los botones interactivos de acción rápido (*quick replies*).
* **Simulación de Interacciones:** Mediante la pestaña *Prototype* de Figma, se conectan los disparadores de forma que simulen una conversación fluida: al pulsar sobre el botón "Mercado de Triana", la pantalla navega de forma instantánea al menú de categorías, emulando la respuesta en tiempo real del bot. Esto permite capturar el *feedback* de las personas mayores respecto al tamaño de la letra y la claridad de los botones sin escribir una sola línea de código.

### Fase 2: MVP No-Code / Low-Code
Una vez validado el flujo visual en Figma, la transición a un bot real en producción se ejecuta mediante plataformas accesibles y de rápido despliegue:
* **Tiledesk / Manychat:** Herramientas con constructores visuales de arrastrar y soltar que permiten dar vida a la lógica conversacional planteada. Permiten realizar un despliegue inmediato en un widget web o canales alternativos de prueba gratuitos antes de saltar a la API oficial de pago de WhatsApp Business.
* **Botpress:** Para una segunda iteración avanzada. Su motor permite gestionar de forma nativa la memoria a largo plazo del usuario (guardar variables complejas como el histórico de pedidos o los puestos favoritos de cada cliente) y conectarse mediante webhooks sencillos a las bases de datos de los placistas.