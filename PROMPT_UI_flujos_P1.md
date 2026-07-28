# PROMPT — Pantallas UI flujos P1 Mercados de Sevilla

Genera pantallas mobile-first (375×812, iPhone) que simulen WhatsApp Business para 4 flujos conversacionales de pedidos a mercados municipales de Sevilla.

## Documentos adjuntos (léelos antes de generar)

1. `DESIGN.md` — sistema de diseño (tokens, componentes, copy).
2. `wa-constraints.md` — límites reales WhatsApp Business API.
3. `flows-index.md` — inventario de 18 flujos.
4. `03-pedido-broadcast.md` — flujo C03 ya detallado (referencia de estilo).
5. `PRD_Mercados_Sevilla.md` — contexto producto.

**Regla nº1:** si algo en este prompt contradice `DESIGN.md` o `wa-constraints.md`, ganan los documentos.

## Stack

- HTML+CSS+JS vanilla o React+Tailwind.
- Sin librerías de componentes (Material, shadcn, Chakra). Sistema propio.
- Phosphor Icons vía CDN.
- Google Fonts: Playfair Display (display), DM Mono (precios), system (cuerpo).
- Una pantalla scrollable por flujo. Sin routing.

## Tokens obligatorios (sección 11 DESIGN.md)

```
--color-mercado-green: #2D6A4F
--color-whatsapp-green: #25D366
--color-sevilla-tile: #1B4F8A
--color-azafran: #F4A533
--color-marmol: #F7F5F0
--color-confirm: #52B788
--color-cancel: #E63946
--color-warning: #FF9F1C
--bubble-bot: #FFFFFF
--bubble-user: #DCF8C6
--bubble-system: #E8F4FD
--chat-bg: #EBE5DC
```

Fondo chat `#EBE5DC` + patrón azulejo sevillano SVG opacity 0.04.

## Restricciones WhatsApp (no negociables)

- Reply buttons: máx 3, máx 20 char/botón, sin emojis custom.
- List messages: máx 10 items, secciones con título.
- Sin cards estructuradas nativas → simular con texto+`*bold*`+`_italic_`+saltos.
- Sin tipografías ni colores en burbujas (chrome WA).
- WhatsApp Flows (formulario multipantalla) **sí** se usan para onboarding/catálogo → renderizarlos como pantalla aparte fullscreen sobre el chat.
- Plantillas utility (tracking) → llegan como mensaje entrante normal del bot.

## Flujos a generar (4 pantallas, 1 por flujo)

### Pantalla 1 — C01 Onboarding primera vez

Conversación + WhatsApp Flow embebido.

**Secuencia visible (scroll):**
1. Bot bienvenida: *"Hola 👋 Soy el bot de Mercados de Sevilla. Te ayudo a comprar en los puestos del mercado sin moverte de casa."*
2. Bot CTA: *"Cuéntame quién eres en 30 segundos."* + botón único `[Empezar]` (CTA URL que abre Flow).
3. Renderiza el **Flow fullscreen** como overlay/modal sobre el chat, con 3 pantallas:
   - P1: TextInput "Nombre" + TextInput "Código postal".
   - P2: Dropdown "Mercado favorito" (San Gonzalo, Triana, Feria) + CheckboxGroup "Puestos que te interesan" (Pescadería Fali, Frutería Manolo, Carnicería Lola).
   - P3: OptIn "Quiero recibir el vídeo diario de mis puestos" + Footer `[Empezar a comprar]`.
4. Tras cerrar el Flow: bot confirma *"Listo Carmen. Mañana a las 9:00 te enseño lo que Fali tenga en el mostrador."* + chip `[Ver mercado ahora]`.

### Pantalla 2 — C02 Recurrente

Conversación corta, 2 burbujas.

1. Bot: *"Buenos días Carmen 👋 ¿Compras hoy en San Gonzalo?"* + Reply Buttons `[Sí, ver hoy]` `[Otro mercado]` `[Ahora no]`.
2. Estado "Carmen escribiendo…" abajo (typing indicator usuario, raro pero ocurre en WA Business cuando el cliente está pensando).

### Pantalla 3 — C11 Escalado humano

Conversación con handover visible.

1. Burbuja usuario: *"¿Las acedías de hoy son de Sanlúcar?"*
2. Bot: *"Te paso con Fali directamente. Suele responder en 5-10 min."* (burbuja `#E8F4FD` sistema).
3. Indicador sistema centrado tipo pill: *"— Fali se ha unido a la conversación —"*.
4. Burbuja entrante con avatar y nombre "Fali" (no "Pescadería Fali bot"): *"Hola Carmen, sí, llegaron esta mañana de la lonja de Sanlúcar. ¿Te aparto medio kilo?"*
5. Burbuja usuario: *"Sí porfa, para mañana."*
6. Pill sistema: *"— Fali ha pasado el chat al asistente —"*.
7. Bot retomando: *"Apuntado. ½ kg acedías de Sanlúcar para recogida mañana 10:00. ¿Confirmas?"* + `[✓ Confirmar]` `[✏️ Modificar]`.

Importante: visualmente diferenciar mensajes de Fali humano vs bot (mismo avatar puesto pero etiqueta sutil "Fali" sin "bot", o color tail ligeramente distinto).

### Pantalla 4 — C07 Tracking

Conversación con 4 notificaciones utility a lo largo del día (separadores de hora).

1. Pill hora: "10:15".
2. Bot plantilla `pedido_aceptado_v1`: *"✅ Fali ha aceptado tu pedido #SGZ-2024-0387. Empieza a prepararlo."*
3. Pill hora: "11:40".
4. Bot plantilla `pedido_listo_v1`: *"📦 Tu pedido está listo. Puedes recogerlo en Pescadería Fali, Mercado San Gonzalo. Abierto hasta 14:00."* + `[Cómo llegar]` (CTA URL Google Maps) + `[Avisar a Fali]`.
5. Pill hora: "12:30".
6. Bot plantilla `pedido_entregado_v1`: *"🎉 Gracias por tu compra, Carmen. ¿Repetimos mañana?"* + `[Repetir]` `[Valorar a Fali]`.

## Disclaimer obligatorio (decisión cerrada)

En **C03** (no hay que regenerarlo, solo referencia): antes de `[✓ Confirmar]`, burbuja sistema gris pequeña:
> *"Al confirmar, Fali empieza a prepararlo. No se puede cancelar después."*

Si renderizas C03 como pantalla extra, inclúyelo. Si no, ignóralo.

## Detalles visuales críticos

- Sombras burbuja: `0 1px 1px rgba(0,0,0,.13)`.
- Border-radius burbuja: 18px, tail 4px.
- Max-width burbuja: 80%.
- Espaciado intra-autor: 6px. Inter-autor: 12px.
- Padding chat: 12px horizontal.
- Chips: min-height 44px, píldora.
- Header fijo 56px `#2D6A4F` blanco con avatar+nombre+"En línea"+menú.
- Input bar fijo 52px `#F0F2F5` con 😊 + input redondeado + 🎤 📷.

## Lo que NO quiero

- Bordes gruesos, gradientes, glassmorphism, neón.
- Font Awesome o Material Icons.
- Mayúsculas salvo separadores de fecha.
- Emojis fuera de la whitelist sección 14 DESIGN.md.
- Botones cuadrados.
- Inventar copy distinto al de los flujos adjuntos.

## Entregable

4 pantallas, una por flujo, en un solo archivo HTML autocontenido (o 4 componentes React en un único archivo). Etiquetadas claramente: "C01 Onboarding", "C02 Recurrente", "C11 Escalado", "C07 Tracking". Maquetadas en grid o stack vertical para ver las 4 a la vez en desktop, cada una con frame de móvil 375×812.

Que un usuario de WhatsApp diario las mire y piense "es WhatsApp", no "simula WhatsApp".
