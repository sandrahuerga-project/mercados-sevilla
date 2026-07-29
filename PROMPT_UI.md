## PROMPT

Construye una vista mobile-first (375×812px, iPhone) que simule una conversación de WhatsApp Business para una plataforma de pedidos a mercados municipales de Sevilla. Sigue al pie de la letra el sistema de diseño que adjunto (`DESIGN.md`).

### Stack técnico

- HTML + CSS + JS vanilla, o React con Tailwind si la plataforma lo prefiere.
- Sin librerías de componentes (Material, Chakra, shadcn). El sistema de diseño es propio.
- Iconos: Phosphor Icons vía CDN.
- Tipografías: Playfair Display (display), DM Mono (precios), system font (cuerpo) desde Google Fonts.
- Una sola pantalla scrollable verticalmente. Sin routing, sin estado.

### Reglas de diseño obligatorias

Usa los tokens CSS exactos de la sección 11 de `DESIGN.md`:

```
--color-mercado-green:    #2D6A4F
--color-whatsapp-green:   #25D366
--color-trust-dark:       #1A3A2A
--color-sevilla-tile:     #1B4F8A
--color-azafran:          #F4A533
--color-marmol:           #F7F5F0
--color-confirm:          #52B788
--color-cancel:           #E63946
--color-warning:          #FF9F1C
--bubble-bot:             #FFFFFF
--bubble-user:            #DCF8C6
--bubble-system:          #E8F4FD
--chat-bg:                #EBE5DC
```

Fondo del chat: `#EBE5DC` con patrón sutil de azulejo sevillano en SVG, opacity 0.04.

### Contenido a renderizar (en este orden, de arriba abajo)

**1. Header fijo superior (Organism 01)**

- bg `#2D6A4F`, height 56px, color blanco.
- Flecha atrás a la izquierda.
- Avatar circular 40px con un icono de pescado Phosphor sobre fondo `#1B4F8A`.
- Texto: "Mercado San Gonzalo" (16px bold) + "En línea" debajo (12px, opacity 0.8).
- Menú de 3 puntos a la derecha.

**2. Separador de fecha (Molecule 10)**

Pill gris central: "HOY, 24 ENERO"

**3. Broadcast diario (Molecule 05) — entrante**

- Avatar pequeño "Pescadería Antonio" a la izquierda.
- Burbuja blanca con tail superior izquierda redondeado distinto.
- Encima de la burbuja: "Pescadería Antonio" en `#2D6A4F`, 12px, bold.
- Thumbnail de vídeo 16:9, border-radius 8px, con play button blanco circular 44px y triángulo verde centrado. Pon una imagen de un mostrador de pescadería de fondo (puede ser un degradado azul si no hay imagen).
- Texto: "Buenos días Carmen 👋 Hoy en el puesto: boquerones de primera, acedías limpias y gambas blancas de Huelva. Pide hasta las 12:30. Recogida o reparto a domicilio."
- Timestamp "9:02" abajo derecha.

**4. Chips de respuesta rápida (Atom 03)**

Dos chips en fila bajo el broadcast:
- `[🛒 Pedir]` — chip principal, border `#2D6A4F`, texto `#2D6A4F`.
- `[🔕 No recibir más]` — chip secundario, border gris.

**5. Burbuja de audio del usuario (Molecule 02)**

- Burbuja `#DCF8C6`, alineada a la derecha, tail superior derecha.
- Contenido: botón play circular verde + waveform (15 barras de altura variable, color `#2D6A4F`) + duración "0:12" + checkmarks `✓✓` azules.
- Timestamp "9:04".

**6. Indicador de typing (Atom 05)**

- Burbuja blanca pequeña 56×36px, alineada izquierda.
- 3 dots `#8696A0` con animación bounce CSS (delay 0/150/300ms).

**7. Confirmación de pedido (Molecule 03)**

- Burbuja bot blanca con card de resumen estructurado dentro:
  - Título: "📋 He entendido este pedido:"
  - Fila 1: `½ kg` + `Boquerones frescos` + `1,75 €` (precio en DM Mono verde)
  - Fila 2: `2 ud` + `Acedías limpias` + `2,40 €`
  - Separador horizontal `#F0F0F0`.
  - Fila total: `Total estimado` + `4,15 €` (bold, 16px).
  - Fila info: `📍 Recogida en puesto · Mañana 10:00-14:00`
  - Fila info: `💳 Pago al entregar`
  - Timestamp "9:05".

**8. Chips de acción bajo la confirmación**

Tres chips en fila:
- `[✓ Confirmar]` — chip primario relleno, bg `#2D6A4F`, texto blanco.
- `[✏️ Modificar]` — chip outline.
- `[💬 Hablar c/Antonio]` — chip outline.

**9. Input bar fijo inferior**

- bg `#F0F2F5`, height 52px, border-top 1px `#E0E0E0`.
- Icono emoji 😊 a la izquierda, gris.
- Input redondeado blanco con placeholder "Escribe un mensaje...".
- Iconos micrófono 🎤 y cámara 📷 a la derecha.

### Detalles críticos

- **Sombras de burbuja:** `0 1px 1px rgba(0,0,0,.13)`. Sutiles. No exagerar.
- **Border radius de burbujas:** 18px excepto la esquina del tail (4px).
- **max-width burbujas:** 80% del contenedor.
- **Espaciado vertical entre burbujas del mismo autor:** 6px. Entre autores distintos: 12px.
- **Padding del chat:** 12px horizontal.
- **Tamaños de toque:** chips mínimo 44px de alto.
- **Sin animaciones de entrada salvo el typing indicator.**

### Lo que NO quiero ver

- Bordes gruesos ni biselados.
- Gradientes morados, neón, glassmorphism.
- Iconos de Font Awesome ni Material Icons.
- Texto en mayúsculas salvo el separador de fecha.
- Emojis fuera de la lista permitida en sección 14 del DESIGN.md.
- Botones cuadrados (todo lo interactivo es píldora).

### Resultado esperado

Una pantalla única que parezca un screenshot real de WhatsApp Business con la marca de Mercados de Sevilla. Si alguien que use WhatsApp a diario la ve por encima, debe pensar "esto es WhatsApp", no "esto es una app simulando WhatsApp".

Renderiza todo en un solo archivo HTML autocontenido o un único componente React. Que funcione al copiarlo y pegarlo.

---

## ALTERNATIVAS DE USO

**Versión para Figma Make / Figma AI:**
Misma copia, añadir al final: "Genera también las variantes de cada componente como auto-layout reutilizable en una página aparte llamada 'Components'."

**Versión para Midjourney / DALL·E (solo mockup estático):**
Reescribir como: "Mobile UI mockup of a WhatsApp Business chat for Sevilla market orders. Header in deep green #2D6A4F, chat background beige #EBE5DC with subtle Andalusian tile pattern, bubbles in white and pale green #DCF8C6, food order confirmation card visible, Phosphor icons, Playfair Display headers, mobile 9:16. Realistic, clean, no AI artifacts."

**Versión para Cursor / Claude Code:**
Pegar el prompt + adjuntar DESIGN.md como contexto. Pedirle: "Crea estructura de carpetas `/src/components` con Atoms, Molecules, Organisms separados, cada uno en su archivo .tsx con tipos."

**Versión iterativa:**
Tras la primera generación, pide cambios uno a uno: "Ahora añade el flujo de selección de fulfillment debajo de la confirmación." Evita pedir todo de golpe en plataformas con poca memoria de contexto.
