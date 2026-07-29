# PORTFOLIO DESIGN — Shell de presentación · Mercados de Sevilla

> Sistema visual para el **case study de portfolio** y el **shell de demo** (Lovable/Figma).
> No es lo que WhatsApp renderiza. WhatsApp controla su propio chrome — ver DESIGN.md
> para el sistema de conversación fiel a WA real (wa-constraints.md).
> Este documento es la capa de marca: tipografía propia, paleta propia, cards,
> ilustraciones, motion. Se usa para envolver la demo (tipo el shell de AI Studio
> que mostraba los flujos) y para el case study de diseño (deck, PDF, web).

---

## 0. Cuándo usar este documento vs DESIGN.md

| Pieza | Documento |
|---|---|
| Chat simulado dentro del prototipo (burbujas, botones, header) | DESIGN.md — fiel a WA real |
| Shell/wrapper que envuelve la demo (marco, navegación entre vistas Carmen/David/Antonio, portada) | Este documento |
| Deck de la reunión, case study, one-pager | Este documento |
| Panel del placero (Organism 03) — es web libre, no WhatsApp | Puede usar este documento como piel visual |

---

## 1. PALETA DE COLORES

### Origen de la paleta

La paleta toma el verde oscuro corporativo de mercadosdesevilla.es como color de autoridad institucional, lo combina con el verde característico de WhatsApp Business, y añade acentos cálidos que evocan el azulejo sevillano y el azafrán de los puestos de mercado.

---

### Colores primarios

```
──────────────────────────────────────────────────────────────────

  MERCADO GREEN        WHATSAPP GREEN       TRUST DARK
  ███████████████      ███████████████      ███████████████
  #2D6A4F              #25D366              #1A3A2A
  Institucional        Acción / CTAs        Texto sobre claro
  Botones secundarios  Burbujas enviadas    Fondos premium
  Headers              Iconos activos       Navbar oscura

──────────────────────────────────────────────────────────────────
```

### Colores secundarios

```
──────────────────────────────────────────────────────────────────

  SEVILLA TILE         AZAFRÁN              MÁRMOL BLANCO
  ███████████████      ███████████████      ███████████████
  #1B4F8A              #F4A533              #F7F5F0
  Links / Info         Urgencia / Stock     Fondo principal
  Estados de envío     Precios / Badges     Chat background
  Notificaciones info  Alertas suaves       Cards neutras

──────────────────────────────────────────────────────────────────
```

### Colores de sistema

```
──────────────────────────────────────────────────────────────────

  CONFIRMACIÓN         CANCELACIÓN          INCIDENCIA
  ███████████████      ███████████████      ███████████████
  #52B788              #E63946              #FF9F1C
  Pedido aceptado      Error / Cancelado    Sustitución
  Stock disponible     Agotado              Advertencia

──────────────────────────────────────────────────────────────────
```

### Fondos de burbuja (chat, solo prototipo/case study)

```
──────────────────────────────────────────────────────────────────

  BURBUJA BOT          BURBUJA USUARIO      BURBUJA SISTEMA
  ███████████████      ███████████████      ███████████████
  #FFFFFF              #DCF8C6              #E8F4FD
  Bot / Mercado        Cliente enviado      Notificación
  Texto: #1A3A2A       Texto: #1A3A2A       Texto: #1B4F8A
  Sombra: 0 1px 1px    Sombra: 0 1px 1px    Sin sombra
  rgba(0,0,0,.13)      rgba(0,0,0,.13)

──────────────────────────────────────────────────────────────────
```

### Tokens de color (CSS / Design tokens)

```css
:root {
  /* Primarios */
  --color-mercado-green:    #2D6A4F;
  --color-whatsapp-green:   #25D366;
  --color-trust-dark:       #1A3A2A;

  /* Secundarios */
  --color-sevilla-tile:     #1B4F8A;
  --color-azafran:          #F4A533;
  --color-marmol:           #F7F5F0;

  /* Sistema */
  --color-confirm:          #52B788;
  --color-cancel:           #E63946;
  --color-warning:          #FF9F1C;

  /* Chat (solo prototipo, no producción WA) */
  --bubble-bot:             #FFFFFF;
  --bubble-user:            #DCF8C6;
  --bubble-system:          #E8F4FD;
  --chat-bg:                #EBE5DC;

  /* Texto */
  --text-primary:           #1A3A2A;
  --text-secondary:         #667781;
  --text-placeholder:       #8696A0;
  --text-inverse:           #FFFFFF;

  /* UI */
  --border-radius-bubble:   18px;
  --border-radius-card:     12px;
  --border-radius-btn:      24px;
  --border-radius-chip:     100px;
}
```

---

## 2. TIPOGRAFÍA

```
──────────────────────────────────────────────────────────────────

  DISPLAY / NOMBRES DE MERCADO
  Typeface: Playfair Display (Google Fonts)
  Uso: shell de la demo, portada, case study, panel Antonio
  Peso: 700 (bold)
  Tamaño: 20–28px
  Color: --color-trust-dark

  CUERPO / TEXTO DE SHELL
  Typeface: SF Pro Text / Roboto (sistema nativo)
  Peso: 400 regular / 500 medium
  Tamaño: 14–16px
  Color: --text-primary

  MONOSPACE / PRECIOS Y CANTIDADES (dentro de la simulación)
  Typeface: DM Mono (Google Fonts)
  Peso: 500
  Tamaño: 14px
  Color: --color-mercado-green

  NOTA: dentro del chat simulado, si se busca máxima fidelidad
  a WA real, usar system font (sin Playfair/DM Mono) — ver
  DESIGN.md §2. Esta tipografía es para el shell que envuelve
  el chat, no para las burbujas mismas.

──────────────────────────────────────────────────────────────────
```

---

## 3. ICONOGRAFÍA

### Sistema de iconos base

Librería recomendada: **Phosphor Icons** (MIT License).
Estilo: `regular` para UI general, `fill` para estados activos.
Tamaño base: 20px (shell) / 24px (navegación) / 32px (categorías).
Uso: shell de demo, panel Antonio, case study. Nunca dentro de
las burbujas del chat simulado (ahí solo emoji, ver DESIGN.md §2).

```
──────────────────────────────────────────────────────────────────

  DOMINIO                 ICONO PHOSPHOR        COLOR

  Pescadería              fish                  #1B4F8A
  Carnicería              cow                   #E63946
  Frutería / Verdura      apple                 #52B788
  Charcutería             cutting-board         #F4A533
  Varios / General        storefront            #2D6A4F

  Recogida en puesto      map-pin               #2D6A4F
  Taquilla refrigerada    lock-key              #1B4F8A
  Reparto a domicilio     truck                 #25D366

  Pago al entregar        hand-coins            #1A3A2A
  Pago online / Bizum     qr-code               #2D6A4F
  Tarjeta                 credit-card           #1B4F8A

  Audio / Nota de voz     microphone            #667781
  Vídeo del día           video-camera          #F4A533
  Catálogo                list-dashes           #667781

  Pedido nuevo            shopping-cart-simple  #25D366
  Pedido aceptado         check-circle          #52B788
  Pedido preparando       fire                  #F4A533
  Pedido listo            bell-ringing          #2D6A4F
  Entregado               package               #667781
  Cancelado               x-circle              #E63946
  Incidencia              warning               #FF9F1C

──────────────────────────────────────────────────────────────────
```

---

## 4. ATOMS

Los átomos son la unidad mínima indivisible del shell/prototipo visual. Viven en la capa de presentación, no en el chat WA real (DESIGN.md).

---

### ATOM 01 — Avatar de Puesto

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌──────┐                                                  │
│   │  🐟  │  ← imagen real del puesto (foto del mostrador)   │
│   │      │     o inicial del nombre sobre fondo verde       │
│   └──────┘                                                  │
│   Tamaño S: 36×36px  │  M: 48×48px  │  L: 56×56px          │
│   Border-radius: 50%                                        │
│   Border: 2px solid --color-whatsapp-green (si activo hoy) │
│   Sin border si puesto cerrado hoy                         │
│                                                             │
│   ESTADO ACTIVO HOY:                                        │
│   ┌──────┐ ← anillo verde exterior (#25D366, 2px)           │
│   │ foto │                                                  │
│   └──────┘                                                  │
│     [●]   ← dot 8×8px #52B788 esquina inferior derecha     │
│                                                             │
│   ESTADO CERRADO:                                           │
│   ┌──────┐ ← sin anillo, opacidad 50%                       │
│   │ foto │                                                  │
│   └──────┘                                                  │
│     [●]   ← dot 8×8px #8696A0                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ATOM 02 — Badge de Estado de Pedido

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Badge = píldora (border-radius: 100px) con icono + texto  │
│                                                             │
│  ╔════════════════╗  bg: #52B788  text: #fff               │
│  ║ ✓  Aceptado   ║  padding: 4px 10px                      │
│  ╚════════════════╝  font-size: 12px  font-weight: 500      │
│                                                             │
│  ╔════════════════╗  bg: #F4A533  text: #fff               │
│  ║ 🔥 Preparando ║                                          │
│  ╚════════════════╝                                         │
│                                                             │
│  ╔════════════════╗  bg: #2D6A4F  text: #fff               │
│  ║ 🔔 Listo      ║                                          │
│  ╚════════════════╝                                         │
│                                                             │
│  ╔════════════════╗  bg: #8696A0  text: #fff               │
│  ║ 📦 Entregado  ║                                          │
│  ╚════════════════╝                                         │
│                                                             │
│  ╔════════════════╗  bg: #E63946  text: #fff               │
│  ║ ✕  Cancelado  ║                                          │
│  ╚════════════════╝                                         │
│                                                             │
│  ╔════════════════╗  bg: #FF9F1C  text: #fff               │
│  ║ ⚠  Incidencia ║                                          │
│  ╚════════════════╝                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ATOM 03 — Chip de Respuesta Rápida (versión visual de demo)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Los chips son las opciones de respuesta del chatbot         │
│  DENTRO DE LA DEMO. Representan visualmente los Reply        │
│  Buttons de WhatsApp, pero con más libertad estética         │
│  porque este es el shell de presentación.                    │
│                                                             │
│  ESTADO NORMAL:                                             │
│  ┌──────────────────┐                                       │
│  │   Sí, confirmo   │  border: 1.5px solid #2D6A4F         │
│  └──────────────────┘  color: #2D6A4F                       │
│                         bg: transparent                     │
│                         border-radius: 100px                │
│                         padding: 8px 16px                   │
│                         font-size: 14px                     │
│                         font-weight: 500                    │
│                                                             │
│  ESTADO HOVER / PRESSED:                                    │
│  ┌──────────────────┐                                       │
│  │   Sí, confirmo   │  bg: #2D6A4F  color: #fff            │
│  └──────────────────┘                                       │
│                                                             │
│  IMPORTANTE — si el objetivo es máxima fidelidad a WA real:  │
│  usa la versión de DESIGN.md ATOM/componente equivalente,     │
│  SIN emoji e igual al texto exacto del botón (≤20 char,       │
│  máx 3). Este chip decorado (con icono, colores custom) es    │
│  válido solo si el prototipo prioriza portfolio sobre         │
│  fidelidad literal a WA — decisión de proyecto (ver DESIGN.md │
│  §0 y wa-constraints.md §0).                                  │
│                                                             │
│  DISPOSICIÓN:                                               │
│  Chips en fila horizontal con overflow scroll               │
│  Gap: 8px                                                   │
│  Máx. visible sin scroll: 3 chips                           │
│  Si >3 opciones: scroll horizontal + fadeout derecha       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ATOM 04 — Precio

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Font: DM Mono, 500                                         │
│  Color: --color-mercado-green (#2D6A4F)                     │
│                                                             │
│  PRECIO PRODUCTO:         3,50 €/kg                         │
│  font-size: 16px                                            │
│                                                             │
│  PRECIO TOTAL PEDIDO:     12,40 €                           │
│  font-size: 20px  font-weight: 700                          │
│  Color: --color-trust-dark                                  │
│                                                             │
│  PRECIO TACHADO (agotado):   ~~4,20 €~~                     │
│  text-decoration: line-through                              │
│  Color: --text-secondary                                    │
│                                                             │
│  PRECIO MÍNIMO DOMICILIO:                                   │
│  ╔═══════════════════╗  bg: --color-marmol                  │
│  ║  Mín. domicilio:  ║  border-left: 3px solid #F4A533     │
│  ║     15,00 €       ║  padding: 6px 10px                   │
│  ╚═══════════════════╝  font-size: 12px                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ATOM 05 — Indicador de Escritura (Typing)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Aparece mientras el bot "piensa" la respuesta (en real WA   │
│  este indicador lo pinta el cliente, no es controlable).     │
│                                                             │
│  ┌─────────┐                                                │
│  │ ● ● ●  │  ← 3 dots animados (bounce in secuencia)       │
│  └─────────┘                                                │
│  bg: --bubble-bot (#FFFFFF)                                 │
│  border-radius: 18px 18px 18px 4px (tail izquierda)        │
│  width: 56px  height: 36px                                  │
│  Dots: 8×8px  color: #8696A0                                │
│  Animación: bounce 1.2s infinite                            │
│  Delay dots: 0ms / 150ms / 300ms                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ATOM 06 — Tick de Mensaje (Estado de entrega)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Solo aparece en burbujas de usuario (mensajes enviados).   │
│  Nativo del cliente WA en real, aquí simulado para la demo. │
│                                                             │
│  ✓    Enviado        color: #8696A0   (un tick gris)        │
│  ✓✓   Entregado      color: #8696A0   (dos ticks grises)    │
│  ✓✓   Leído por bot  color: #53BDEB  (dos ticks azules)    │
│                                                             │
│  Tamaño: 14px  Posición: esquina inferior derecha           │
│  de la burbuja, junto al timestamp                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ATOM 07 — Timestamp

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Font: sistema nativo, 11px                                 │
│  Color: --text-placeholder (#8696A0)                        │
│  Posición: esquina inferior derecha de cada burbuja         │
│                                                             │
│  Formato: 9:34       (solo hora en conversación activa)     │
│           Hoy 9:34   (si es del día actual, vista historial)│
│           Lun 9:34   (conversaciones anteriores)            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. MOLECULES

Moléculas del shell de presentación / demo. Para el texto y estructura reales que se enviarían por WhatsApp, ver DESIGN.md §7 (Catálogo de mensajes).

---

### MOLECULE 01 — Burbuja de Mensaje Bot

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [Avatar]  ┌─────────────────────────────────────────┐    │
│   puesto    │ Buenos días Carmen. Hoy en Pescadería   │    │
│   48×48px   │ Antonio: boquerones frescos, acedías       │    │
│             │ limpias, gambas blancas de Huelva.       │    │
│             │                               9:03  │    │
│             └─────────────────────────────────────────┘    │
│                                                             │
│  ANATOMÍA:                                                  │
│  bg: --bubble-bot (#FFFFFF)                                 │
│  border-radius: 4px 18px 18px 18px  (tail esquina sup. izq)│
│  padding: 8px 12px                                          │
│  max-width: 80% del contenedor                              │
│  box-shadow: 0 1px 1px rgba(0,0,0,.13)                      │
│  margin-left: 60px (espacio para avatar)                    │
│                                                             │
│  Nombre del puesto sobre la burbuja:                        │
│  "Pescadería Antonio"  font-size: 12px  color: #2D6A4F         │
│  font-weight: 600                                           │
│                                                             │
│  BURBUJA SISTEMA (sin avatar):                              │
│  bg: --bubble-system  color: #1B4F8A                        │
│  Centrado en pantalla, max-width: 65%                       │
│  Ej: "Tu pedido llega hoy entre 13:30 y 15:00"             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 02 — Burbuja de Mensaje Usuario

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ┌──────────────────────────────────────────────┐         │
│    │ Quiero medio kilo de boquerones y un par de │         │
│    │ acedías ya limpias, para mañana por la tarde│         │
│    │                           9:04  ✓✓        │         │
│    └──────────────────────────────────────────────┘         │
│                                                             │
│  ANATOMÍA:                                                  │
│  bg: --bubble-user (#DCF8C6)                                │
│  border-radius: 18px 4px 18px 18px  (tail esquina sup. der)│
│  margin-right: 8px                                          │
│  alineación: flex-end (derecha)                             │
│  max-width: 80%                                             │
│                                                             │
│  BURBUJA DE AUDIO (nota de voz):                            │
│    ┌────────────────────────────────────────┐               │
│    │ ▶  ──────────────────────  0:12  ✓✓  │               │
│    └────────────────────────────────────────┘               │
│    Waveform: barras de amplitud #2D6A4F                     │
│    Color botón play: #2D6A4F                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 03 — Confirmación de Pedido (Resumen estructurado, versión visual)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Avatar Antonio]  Pescadería Antonio                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋  He entendido este pedido:                      │   │
│  │                                                     │   │
│  │  ½ kg  Boquerones frescos              1,75 €      │   │
│  │  2 ud  Acedías limpias                 2,40 €      │   │
│  │  ─────────────────────────────────────────────     │   │
│  │  Total estimado                        4,15 €      │   │
│  │                                                     │   │
│  │  📍 Recogida en puesto · Mañana 10:00-14:00        │   │
│  │  💳 Pago al entregar                                │   │
│  │                                  9:05          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Confirmar  │  │   Modificar  │  │   Hablar c/Antonio  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│                                                             │
│  ANATOMÍA DE LA CARD DE RESUMEN (solo demo, no existe        │
│  como card en WA real — allí es texto plano, DESIGN.md §7):  │
│  bg: #FFFFFF                                                │
│  border: 1px solid rgba(0,0,0,.08)                          │
│  border-radius: 12px                                        │
│  padding: 12px 14px                                         │
│  Separador línea: #F0F0F0                                   │
│                                                             │
│  Fila de producto:                                          │
│  cantidad (DM Mono, 12px, gris) + nombre (14px, dark) +    │
│  precio (DM Mono, 14px, verde) — todo en una línea          │
│                                                             │
│  Los botones van SIN emoji (fidelidad WA real en el copy,    │
│  aunque el contenedor sea card de demo). Van FUERA de la     │
│  burbuja, pegados debajo. Sin contenedor extra.              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 04 — Card de Puesto del Mercado

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ┌──────┐  Pescadería Antonio               🟢 Abierto │   │
│  │  │ foto │  Mercado San Gonzalo                      │   │
│  │  │ 56px │  🐟 Pescadería                            │   │
│  │  └──────┘                                           │   │
│  │                                                     │   │
│  │  [▶ Ver vídeo de hoy]                               │   │
│  │                                                     │   │
│  │  Boquerones · Acedías · Gambas blancas             │   │
│  │                                                     │   │
│  │  Pide hasta las 12:30                 [Pedir aquí] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ANATOMÍA:                                                  │
│  bg: --bubble-bot (#FFFFFF)                                 │
│  border-radius: 12px                                        │
│  overflow: hidden                                           │
│  box-shadow: 0 1px 3px rgba(0,0,0,.15)                      │
│                                                             │
│  Header con foto: altura 80px, object-fit: cover            │
│  Si no hay foto: bg degradado #2D6A4F→#1A3A2A              │
│  con icono de categoría centrado (blanco, 32px)            │
│                                                             │
│  Badge "Abierto": chip #52B788 con dot parpadeante         │
│  Badge "Cierra en 45min": chip #F4A533                      │
│  Badge "Cerrado hoy": chip #8696A0                          │
│                                                             │
│  CTA "Pedir aquí":                                          │
│  bg: #25D366  color: #fff  border-radius: 100px             │
│  padding: 6px 14px  font-size: 13px  font-weight: 600      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 05 — Mensaje de Difusión Diaria (Broadcast, versión visual)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Avatar Antonio]  Pescadería Antonio                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │               [THUMBNAIL VÍDEO]             │   │   │
│  │  │               ▶  0:38                       │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │  Buenos días Carmen 👋                              │   │
│  │  Hoy en el puesto: boquerones de primera,          │   │
│  │  acedías limpias y gambas blancas de Huelva.       │   │
│  │  Pide hasta las 12:30.                             │   │
│  │                                                     │   │
│  │  Recogida o reparto a domicilio.            9:02  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐  ┌─────────────────────┐                 │
│  │    Pedir     │  │    No recibir más   │                 │
│  └──────────────┘  └─────────────────────┘                 │
│                                                             │
│  ANATOMÍA DEL THUMBNAIL DE VÍDEO:                          │
│  Relación de aspecto: 16:9                                  │
│  border-radius: 8px                                         │
│  Overlay semitransparente + icono play centrado             │
│  Icono play: círculo blanco 44px + triángulo #2D6A4F        │
│  Duración: esquina inferior derecha, bg negro 50%           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 06 — Selector de Opción de Fulfillment

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Avatar bot]  Mercado San Gonzalo                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ¿Cómo quieres recibir tu compra?          9:07   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📍  Recogida en puesto        Gratis · Hoy         │   │
│  │      Mercado San Gonzalo                            │   │
│  │      Hasta las 14:00                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔒  Taquilla refrigerada      Gratis · 24h         │   │
│  │      Planta baja, cerca entrada principal           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🚚  Reparto a domicilio       2,50 € · Mín. 15 €  │   │
│  │      Franjas: 13:30–15:00 / 19:00–21:00             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ANATOMÍA DE CADA OPCIÓN (en WA real serían 3 Reply          │
│  Buttons o una List, sin cards — DESIGN.md §7):              │
│  bg: --bubble-bot                                           │
│  border: 1.5px solid #E0E0E0                                │
│  border-radius: 12px                                        │
│  padding: 12px 14px                                         │
│                                                             │
│  ESTADO SELECCIONADO:                                       │
│  border-color: #2D6A4F  bg: #F0F7F4                         │
│  Checkmark ✓ esquina superior derecha #2D6A4F               │
│                                                             │
│  Layout interno: icono 24px + columna texto izquierda +     │
│  precio/detalle derecha                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 07 — Alerta de Stock / Sustitución

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Avatar Antonio]  Pescadería Antonio                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ⚠️  Las acedías se han agotado.                   │   │
│  │      ¿Quieres que Antonio las sustituya               │   │
│  │      por lenguado pequeño al mismo precio?         │   │
│  │                                           9:11   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  bg burbuja: #FFF9ED  (amarillo muy suave)                  │
│  border-left: 3px solid #F4A533                             │
│                                                             │
│  ┌─────────────────┐  ┌─────────────┐  ┌────────────────┐  │
│  │  Aceptar sust. │  │   Quitar    │  │  Cancelar todo │  │
│  └─────────────────┘  └─────────────┘  └────────────────┘  │
│                                                             │
│  Chip "Aceptar": bg #F4A533  color: #fff                    │
│  Chip "Quitar": border #E63946  color #E63946               │
│  Chip "Cancelar": border #8696A0  color #8696A0             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 08 — Confirmación de Pedido Final (Recibo, versión visual)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Avatar bot sistema]                                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✅  ¡Pedido confirmado!                            │   │
│  │                                                     │   │
│  │  Número de pedido:  #SGZ-2024-0387                  │   │
│  │                                                     │   │
│  │  PESCADERÍA ANTONIO                                    │   │
│  │  ½ kg Boquerones frescos          1,75 €           │   │
│  │  2 ud Acedías limpias             2,40 €           │   │
│  │                                                     │   │
│  │  ─────────────────────────────────────────         │   │
│  │  TOTAL                            4,15 €           │   │
│  │                                                     │   │
│  │  📍 Recogida en puesto · Hoy hasta 14:00           │   │
│  │  💳 Pago al entregar                                │   │
│  │                                                     │   │
│  │  Te avisamos cuando esté preparado.       9:12   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────────────┐  ┌─────────────────────────────┐   │
│  │   Añadir puesto    │  │    Ver en mi historial      │   │
│  └────────────────────┘  └─────────────────────────────┘   │
│                                                             │
│  Header de la card: bg #2D6A4F  color: #fff                 │
│  Icono ✅: 24px  "¡Pedido confirmado!" Playfair 16px bold   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 09 — Notificación de Estado (versión visual)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔔  Tu pedido #SGZ-0387 está listo               │   │
│  │      Total: 4,15 €. Paga en efectivo, Bizum o      │   │
│  │      tarjeta al recoger.                            │   │
│  │      Pasa antes de las 14:00.             13:15  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Variantes por estado:                                      │
│                                                             │
│  ACEPTADO:                                                  │
│  bg: #F0F7F4  border-left: 3px #52B788                      │
│  "✓ Antonio ha aceptado tu pedido y está preparándolo"        │
│                                                             │
│  LISTO (con total final, sin card en WA real — DESIGN.md §7):│
│  bg: #F0F7F4  border-left: 3px #2D6A4F                      │
│                                                             │
│  EN CAMINO (reparto):                                       │
│  bg: #EBF5FB  border-left: 3px #1B4F8A                      │
│  "🚚 El repartidor está en camino. Llega en ~20 min."      │
│                                                             │
│  ENTREGADO:                                                 │
│  bg: --marmol  border-left: 3px #8696A0                     │
│  "📦 Pedido entregado. ¡Que aproveche!"                    │
│                                                             │
│  Todas son burbujas de sistema: centradas, max-width 75%   │
│  Sin avatar. font-size: 13px.                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### MOLECULE 10 — Separador de Fecha en Chat

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│               ─────── HOY, 24 ENERO ───────                 │
│                                                             │
│  bg: chip redondeado                                        │
│  color chip: rgba(0,0,0,.12)                                │
│  text: #667781  font-size: 12px  font-weight: 500           │
│  UPPERCASE + letter-spacing: 0.04em                         │
│  Centrado horizontalmente                                   │
│  Margen vertical: 16px arriba y abajo                       │
│  (En WA real lo pinta el cliente, no es diseñable)           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. ORGANISMS

---

### ORGANISM 01 — Pantalla de Chat Principal (shell de demo)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (fijo, top)                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ←  [Avatar mercado]  Mercado San Gonzalo     ⋮    │   │
│  │                       ● En línea                    │   │
│  └─────────────────────────────────────────────────────┘   │
│  bg: #2D6A4F  color: #fff  height: 56px                     │
│  Avatar: 40×40px  Nombre: SF Pro 16px bold                  │
│  Subtítulo "En línea": 12px, opacity 0.8                    │
│  Menú ⋮: opciones [Mi historial] [Mis puestos fav]          │
│          [Configuración] [Ayuda]                            │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ÁREA DE CHAT (scrollable)                                  │
│  bg: --chat-bg (#EBE5DC)                                    │
│  padding: 8px 12px                                          │
│                                                             │
│  Patrón de fondo (opcional, sutil):                         │
│  SVG pattern de azulejo sevillano, opacity: 0.04            │
│  color: #2D6A4F                                             │
│                                                             │
│  [Separador de fecha]                                       │
│  [Burbuja bot — bienvenida]                                 │
│  [Chips de respuesta rápida]                                │
│  [Burbuja usuario]                                          │
│  [Typing indicator]                                         │
│  [Burbuja bot — confirmación]                               │
│  [Chips]                                                    │
│  ...                                                        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  INPUT BAR (fijo, bottom)                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  😊  Escribe un mensaje...                  🎤  📷  │   │
│  └─────────────────────────────────────────────────────┘   │
│  bg: #F0F2F5  height: 52px  border-top: 1px #E0E0E0        │
│  Input: bg #fff  border-radius: 24px  padding: 10px 14px   │
│  Placeholder color: --text-placeholder                      │
│  Icono micrófono (nota de voz): #8696A0                     │
│  Icono cámara (enviar foto al bot): #8696A0                 │
│  Cuando hay texto: icono enviar ▶ color: #25D366            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ORGANISM 02 — Onboarding (versión visual, demo)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  PASO 1 — Bienvenida                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │  [Logo Mercados de Sevilla — Playfair 20px]   │  │   │
│  │  │  Bienvenida a los Mercados de Sevilla         │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  │  Hola 👋 Soy el asistente del Mercado San          │   │
│  │  Gonzalo. Te ayudo a comprar fresco desde casa,    │   │
│  │  igual que si estuvieras en el puesto.             │   │
│  │                                                     │   │
│  │  ¿Cómo te llamas?                         9:00   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  PASO 2 — Datos de entrega                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Para poder enviarte los pedidos o avisarte de      │   │
│  │  dónde recogerlos, necesito tu código postal.      │   │
│  │                                                     │   │
│  │  ¿Cuál es tu CP en Sevilla?               9:01   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ 41001  │  │ 41010  │  │ Otro   │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                             │
│  PASO 3 — Consentimiento RGPD (obligatorio)                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📋 Para continuar necesito tu permiso.             │   │
│  │                                                     │   │
│  │  Usaré tu nombre y número para gestionar           │   │
│  │  tus pedidos. Puedo borrarte en cualquier          │   │
│  │  momento si me escribes "BAJA".                    │   │
│  │                                                     │   │
│  │  ¿De acuerdo?                             9:02   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────┐  ┌───────────────────────────┐    │
│  │   Sí, de acuerdo    │  │   No, no quiero seguir    │    │
│  └─────────────────────┘  └───────────────────────────┘    │
│                                                             │
│  NOTA: en WA real, el onboarding usa un WA Flow nativo       │
│  (formulario embebido), no burbujas libres como aquí —       │
│  ver DESIGN.md §3 para el spec fiel con componentes reales.  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ORGANISM 03 — Panel del Placero (Vista Glide/Softr)

Este organismo es 100% libre de constraints de WhatsApp: es un panel web aparte. El spec funcional (campos, estados, transiciones) vive en DESIGN.md §4; aquí solo la piel visual.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  HEADER                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🐟 Pescadería Antonio          Jueves 24 Enero        │   │
│  │  [● Activo hoy]             Cierra: 14:00           │   │
│  └─────────────────────────────────────────────────────┘   │
│  bg: #1A3A2A  color: #fff                                   │
│                                                             │
│  RESUMEN DEL DÍA                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  7 pedidos      4 aceptados    2 en prep.   1 nuevo │   │
│  │  Total: 87,30 €                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  bg: #2D6A4F  color: #fff  4 columnas iguales               │
│                                                             │
│  FILTRO DE ESTADO                                           │
│  [ Todos ] [ Nuevos 1 ] [ Aceptados 4 ] [ Preparando 2 ]   │
│  [ Por cobrar 1 ]                                           │
│                                                             │
│  LISTA DE PEDIDOS (cronológico, nuevo arriba)               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔴 NUEVO · Carmen García · 9:04                   │   │
│  │  ½ kg Boquerones · 2 Acedías limpias               │   │
│  │  Recogida · Pago al entregar · 4,15 €              │   │
│  │                              [Aceptar] [Problema]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🟡 PREPARANDO · Rosa Morales · 8:47               │   │
│  │  1 kg Gambas blancas · 1 kg Coquinas               │   │
│  │  Taquilla · Pago al entregar · ~18,00 € (estimado) │   │
│  │                              [Listo]   [Problema]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💶 POR COBRAR · Manolo Ruiz · 8:20                │   │
│  │  ½ kg Boquerones · 1 kg Sardinas                    │   │
│  │  Recogida · Total final: 6,80 €                     │   │
│  │                        [Marcar cobrado ▾] [Problema]│   │
│  │  ▾ Efectivo · Bizum · Tarjeta                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ANATOMÍA DE CADA FILA DE PEDIDO:                          │
│  bg: #fff  border-radius: 8px                               │
│  border-left: 4px (color por estado)                        │
│  Nuevo: #E63946  Aceptado: #52B788  Preparando: #F4A533    │
│  Listo/Por cobrar: #2D6A4F  Entregado: #8696A0               │
│                                                             │
│  Botón Aceptar: bg #52B788  color: #fff                     │
│  Botón Listo:   bg #2D6A4F  color: #fff                     │
│  Botón Marcar cobrado: bg #2D6A4F  color: #fff  con         │
│  desplegable de método (Efectivo/Bizum/Tarjeta)              │
│  Botón Problema: border #E63946  color: #E63946             │
│  Todos border-radius: 100px  font-size: 13px                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ORGANISM 04 — Selección de Mercado y Puesto

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  FLUJO RECURRENTE (usuario con mercado favorito):           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ¡Buenos días Carmen! Tu mercado es San Gonzalo.   │   │
│  │  ¿Compras allí hoy?                       9:00   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────┐    │
│  │   Sí, allí voy   │  │    Cambiar de mercado        │    │
│  └──────────────────┘  └──────────────────────────────┘    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  SELECCIÓN DE PUESTO (lista horizontal scrollable):         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ¿A qué puesto quieres pedir hoy?          9:01   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ← scroll horizontal →                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ [foto/icon] │ │ [foto/icon] │ │ [foto/icon] │        │
│  │ Pesc. Antonio  │ │ Carn. López │ │ Verduras M. │        │
│  │ 🟢 Abierto  │ │ 🟢 Abierto  │ │ 🟠 Cierra!  │        │
│  │  [Pedir]    │ │  [Pedir]    │ │  [Pedir]    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
│  Cards: width 140px  height 160px  border-radius: 12px     │
│  Gap: 8px  Contenedor: overflow-x: scroll                   │
│  Padding: 0 12px (para ver que hay más)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### ORGANISM 05 — Historial de Pedidos (PWA complementaria)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  HEADER                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ←  Mis pedidos                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  bg: #2D6A4F  color: #fff  height: 56px                     │
│                                                             │
│  FILTRO TEMPORAL                                            │
│  [ Esta semana ] [ Este mes ] [ Todo ]                      │
│                                                             │
│  PEDIDO RECIENTE (destacado):                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✅ Entregado · Hoy 13:40                           │   │
│  │  Pescadería Antonio · Mercado San Gonzalo             │   │
│  │                                                     │   │
│  │  ½ kg Boquerones      1,75 €                       │   │
│  │  2 ud Acedías         2,40 €                       │   │
│  │  ────────────────────────────                       │   │
│  │  Total                4,15 €   Recogida en puesto  │   │
│  │                                                     │   │
│  │  [Repetir este pedido]    [Ver factura]            │   │
│  └─────────────────────────────────────────────────────┘   │
│  bg: #F0F7F4  border: 1px solid #52B788                     │
│                                                             │
│  PEDIDOS ANTERIORES (lista compacta):                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Lun 22 Ene · Pesc. Antonio · 8,30 €    [Repetir]  ›  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Vie 19 Ene · Carn. López · 12,50 €  [Repetir]  ›  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  CTA "Repetir": bg #25D366  color: #fff                     │
│  border-radius: 100px  padding: 6px 14px                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. ESTADOS DE INTERFAZ (versión visual, demo)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ESTADO VACÍO (primera vez, sin pedidos)                   │
│                                                             │
│  [Icono ilustración: puesto de mercado, trazo simple]       │
│  "Aún no has hecho ningún pedido.                          │
│   ¿Empezamos?"                                              │
│  [CTA: Explorar mercados]                                   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ESTADO DE CARGA (bot procesando NLU)                       │
│                                                             │
│  [Typing indicator — MOLECULE 01 variant]                   │
│  "Entendiendo tu pedido..."                                 │
│  Aparece máx. 3 segundos antes de la confirmación.          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Textos exactos de error/fuera de horario: ver DESIGN.md §7 (catálogo de mensajes, fuente de verdad para el copy).

---

## 8. MOTION Y MICROINTERACCIONES

```
──────────────────────────────────────────────────────────────

  ENTRADA DE BURBUJA (bot)
  transform: translateY(8px) → translateY(0)
  opacity: 0 → 1
  duration: 200ms  easing: ease-out
  Aplica solo a la última burbuja. Las anteriores son estáticas.

  ENTRADA DE CHIPS
  Aparecen 100ms después de la burbuja precedente.
  Animación idéntica a la burbuja.

  TYPING INDICATOR
  3 dots, animación bounce secuencial.
  Keyframe: translateY(0) → -6px → 0
  duration: 600ms por dot  delay: 0 / 150 / 300ms
  Repeat: infinite

  PRESIÓN DE CHIP (tap)
  scale: 1 → 0.96 → 1  duration: 100ms
  Chip seleccionado → desaparecen todos los chips
  fade-out 150ms + el chat hace scroll suave hacia abajo.

  BADGE DE ESTADO
  Cambio de estado: cross-fade 200ms entre badge anterior y nuevo.
  No usar animaciones de entrada llamativas en cambios de estado.

  VÍDEO THUMBNAIL
  tap → expand a pantalla completa con fade-in 200ms.
  Fondo negro. X para cerrar esquina superior derecha.

──────────────────────────────────────────────────────────────

  LO QUE NO ANIMAR:
  - El scroll del chat (solo smooth-scroll nativo).
  - Las burbujas ya visibles en pantalla.
  - Las cards del panel del placero (rendimiento).

──────────────────────────────────────────────────────────────
```

---

## 9. TOKENS COMPLETOS DE ESPACIADO Y ACCESIBILIDAD VISUAL

```css
:root {
  /* Espaciado */
  --space-xs:   4px;
  --space-s:    8px;
  --space-m:    12px;
  --space-l:    16px;
  --space-xl:   24px;
  --space-2xl:  32px;

  /* Chat específico (shell de demo) */
  --chat-padding-h:         12px;
  --chat-bubble-gap:        6px;
  --chat-turn-gap:          12px;
  --chat-date-separator-v:  16px;

  /* Tipografía */
  --font-display:  'Playfair Display', Georgia, serif;
  --font-body:     -apple-system, 'Roboto', sans-serif;
  --font-mono:     'DM Mono', 'Courier New', monospace;

  --text-xs:   11px;
  --text-sm:   12px;
  --text-base: 14px;
  --text-md:   15px;   /* perfil mayor */
  --text-lg:   16px;
  --text-xl:   20px;
  --text-2xl:  24px;
  --text-3xl:  28px;

  /* Sombras */
  --shadow-bubble: 0 1px 1px rgba(0,0,0,.13);
  --shadow-card:   0 1px 3px rgba(0,0,0,.15);
  --shadow-modal:  0 8px 24px rgba(0,0,0,.20);

  /* Durations */
  --duration-fast:   100ms;
  --duration-base:   200ms;
  --duration-slow:   350ms;
  --easing-out:      ease-out;
}
```

```
──────────────────────────────────────────────────────────────

  CONTRASTE DE COLOR

  Texto primario (#1A3A2A) sobre blanco:        ratio 12.5:1  ✓ AAA
  Texto blanco sobre Mercado Green (#2D6A4F):   ratio 7.1:1   ✓ AAA
  Texto blanco sobre WhatsApp Green (#25D366):  ratio 2.5:1   ⚠ Solo uso en CTA grandes
  Texto #667781 sobre blanco:                   ratio 4.6:1   ✓ AA

──────────────────────────────────────────────────────────────

  TAMAÑOS DE TOQUE

  Área mínima interactiva: 44×44px
  Chips de respuesta: mín. 44px de alto
  Botones de acción en panel placero: mín. 48×48px

──────────────────────────────────────────────────────────────

  TIPOGRAFÍA PARA MAYORES (perfil Carmen, 71)

  Texto de burbuja: mín. 15px (vs 14px estándar)
  Chips: mín. 16px de fuente
  Respuestas del bot: frases cortas, máx. 2-3 líneas por burbuja
  Sin abreviaturas. Sin jerga digital.

──────────────────────────────────────────────────────────────
```

---

*Portfolio Design v1.0 — Shell de presentación para Mercados de Sevilla.*
*Complementa DESIGN.md (conversation design fiel a WA real). No mezclar los dos: DESIGN.md
manda dentro del chat simulado; este documento manda en el shell, el panel y el case study.*
