# WhatsApp Business — Constraints reales + Mapping del DESIGN

> Documento técnico-funcional. Fuente: Meta Cloud API docs + proveedores BSP (8x8, Sleekflow, Infobip, Klaviyo, Wati). Actualizado a 2026.  
> Propósito: que **nada del DESIGN se diseñe sin saber si WA lo permite**.

---

## 0. TL;DR — Lo que rompe los supuestos del DESIGN actual

| Supuesto DESIGN | Realidad WA | Decisión |
|---|---|---|
| Chips múltiples bajo cada mensaje (3-4 chips) | Reply buttons: **máx 3**, **20 char cada uno**, sin emojis custom | Reducir chips a 3 máx, copy ≤20 char |
| "Hablar con Antonio" como tercer chip junto a Confirmar/Modificar | OK, pero entonces no caben más | Es lo correcto, ya estaba bien |
| Burbujas tipográficas custom (Playfair, DM Mono, colores) | **Imposible en WA real**: el chrome lo controla Meta | Solo válido para prototipo Lovable / Figma / case study |
| Vídeo del día embebido con play button verde custom | El vídeo se ve, el chrome de WA lo envuelve | OK, sin custom UI |
| Audio del usuario con waveform verde | El chrome es de WA. No puedes tematizarlo | Solo prototipo, no producción |
| Card de confirmación de pedido con tabla estructurada | Texto plano con `*` y `_` para bold/italic. **No hay cards** | Reformatear como texto + emojis funcionales |
| Broadcast diario a >256 personas | Listas de difusión: **máx 256** y receptor debe tener tu nº guardado | Usar **plantillas marketing** vía API, no listas |
| Fondo de chat con azulejo sevillano | Imposible. WA controla el fondo | Solo prototipo |
| "Modo asistido / audio-first" sin tocar nada | Sí funciona: WA tiene audio nativo, transcripción del lado del bot vía LLM | OK, depende del backend |

**Consecuencia gorda**: el DESIGN actual sirve al 100% como **prototipo de portfolio** (Lovable, Figma, case study Interface School). Para el bot real en producción hay que renunciar a la estética propia y trabajar dentro del chrome WA. Son dos entregables distintos. **No mezclarlos.**

---

## 1. Tipos de mensaje WA y cuándo se usan

```
─────────────────────────────────────────────────────────────────
TIPO                  USO                          VENTANA
─────────────────────────────────────────────────────────────────
Plantilla (template)  Iniciar conversación.         Siempre
                      Broadcasts. Notificaciones    (requiere
                      proactivas.                   aprobación
                                                    Meta)

Texto libre           Respuesta dentro de ventana   24h tras
                      24h tras input del usuario    último input
                                                    del usuario

Interactive Buttons   Hasta 3 botones de respuesta  24h
                      rápida

Interactive List      Menú desplegable hasta 10     24h
                      filas en hasta 10 secciones

Interactive Flow      Formulario multi-pantalla     24h
                      embebido (3-5 pantallas)

Media (img/vid/audio/ Adjuntos                      24h o
 doc)                                               template

Location              Mapa con coordenadas          24h

Contact card          vCard                         24h
─────────────────────────────────────────────────────────────────
```

**Regla clave**: cualquier mensaje proactivo (recordatorio, broadcast, "tu pedido está listo") **fuera de la ventana 24h** debe ser plantilla aprobada.

---

## 2. Límites duros (cheat sheet)

### Texto

| Elemento | Límite |
|---|---|
| Mensaje texto libre | 1600 char |
| Body de plantilla | 1024 char ({{n}} = 1 char) |
| Header de plantilla (texto) | 60 char |
| Footer de plantilla | 60 char |
| Variable name en plantilla | sin espacios, snake_case |

### Botones interactivos (free-form, dentro 24h)

| Tipo | Cantidad | Texto botón |
|---|---|---|
| Reply Buttons | máx **3** | máx **20 char** |
| (Sin sub-botones, sin anidamiento) | | |

### Listas interactivas (free-form)

| Elemento | Límite |
|---|---|
| Secciones | máx 10 |
| Filas (total entre todas las secciones) | máx **10** |
| Título de fila | 24 char |
| Descripción de fila | 72 char |
| Botón que abre la lista | 20 char |
| Header opcional | 60 char texto |
| Body | 4096 char |
| Footer opcional | 60 char |

**Importante**: 10 filas en total, no 10 por sección. Si tienes 5 mercados y 8 puestos por mercado, **no caben en una lista**. Hay que paginar.

### Botones en plantillas

| Tipo | Cantidad | Notas |
|---|---|---|
| Quick Reply | hasta 10 (combinado con otros) | 20 char |
| Call-To-Action URL | máx 2 | HTTPS válido y verificable (2026) |
| Call-To-Action Phone | 1 | |
| Copy Code (OTP) | no mezclable | |
| Flow trigger | mezcla con quick reply | abre WA Flow |
| **Total botones combinados** | **máx 10** | Mismos tipos consecutivos |

### Difusión / Broadcasting

| Vía | Límite |
|---|---|
| Lista de difusión (WA Business app) | 256 contactos, **requieren tener tu nº guardado** |
| Plantillas vía Cloud API | sin límite duro de destinatarios; sí límite de **messaging tier** (250/día número nuevo → 1k → 10k → 100k → ilimitado) |
| Frecuencia recomendada marketing | ≤1 mensaje/día por usuario |
| Truncado | Mensajes marketing se cortan a ~5 líneas + "Leer más" |

### Multimedia

| Tipo | Tamaño máx |
|---|---|
| Imagen | 5 MB |
| Vídeo | 16 MB |
| Audio | 16 MB |
| Documento | 100 MB |
| Sticker | 100 KB |

Si el vídeo del puesto supera 16 MB → comprimir o subir a Cloudinary y mandar link.

---

## 3. Reglas operativas (las que se olvidan y te bloquean cuenta)

1. **Ventana 24h**: cualquier mensaje libre del bot solo permitido dentro de 24h tras el último mensaje del usuario. Fuera de eso → plantilla.
2. **Opt-in explícito** antes de cualquier broadcast/marketing.
3. **Plantillas marketing**: revisión Meta (24-72h típico). Pueden rechazar por: misleading, formato similar a mensaje del sistema, contenido sensible, URL no verificable, errores ortográficos.
4. **Opt-out obligatorio**: incluir "Responde BAJA para dejar de recibir" en plantillas marketing.
5. **Quality rating**: si los usuarios marcan "spam" → cae el rating → reducción de tier → bloqueo.
6. **Política IA enero 2026**: "General purpose AI bots" prohibidos. **Task-specific bots OK** (ventas, soporte, pedidos). El bot de mercados cae en task-specific.
7. **URLs en plantillas**: desde 2026, HTTPS válida y verificable. Sin redirects raros.
8. **No se pueden borrar mensajes enviados** vía API. Cuidado con errores.
9. **24h tier scaling**: número nuevo arranca con 250 conversaciones business-initiated/24h. Sube con verificación + quality.

---

## 4. Componentes de WhatsApp Flows (lo más cercano a un DS oficial)

WA Flows = formulario multi-pantalla embebido en chat. Lo más potente para flujos complejos sin sacar al usuario del chat.

### Reglas globales
- **Máx 50 componentes por pantalla** (en la práctica usa ≤10).
- **Recomendado 3-5 pantallas máx**. >10 = abandono.
- Cada pantalla, una tarea.
- Validación nativa (required, input-type, min/max chars).
- No funciona en WA Web; el usuario ve "completa en móvil".

### Componentes disponibles (JSON spec)

```
─────────────────────────────────────────────────────────────────
LAYOUT
  SingleColumnLayout       Contenedor vertical (único layout)

TEXTO (read-only)
  TextHeading              Título principal (80 char)
  TextSubheading           Subtítulo (80 char)
  TextBody                 Cuerpo (4096 char)
  TextCaption              Texto pequeño / disclaimer
  RichText                 Markdown limitado

INPUTS
  TextInput                Línea única (80 char default,
                           configurable)
                           input-type: text, email, number,
                           password, phone, passcode
  TextArea                 Multilínea (600 char)
  Dropdown                 Selector con hasta 200 opciones
  RadioButtonsGroup        Selección única (hasta 20 opciones
                           visibles)
  CheckboxGroup            Selección múltiple
  DatePicker               Calendario nativo, min/max date
  OptIn                    Checkbox de consentimiento
                           (RGPD-friendly)

MEDIA
  Image                    Imagen estática
  EmbeddedLink             Link interno

NAVEGACIÓN
  Footer                   Botón único de pie de pantalla
                           Actions: navigate (siguiente
                           pantalla), complete (cerrar flow
                           y enviar data), data_exchange
                           (llamar a tu backend)
─────────────────────────────────────────────────────────────────
```

**Lo que NO tiene WA Flows**:
- Carruseles
- Mapas interactivos (solo coordenadas via mensaje Location)
- Vídeo embebido
- Audio
- Botones múltiples en una pantalla (solo 1 Footer)
- Tablas
- Gráficos
- Pagos integrados (en España aún no nativo)

---

## 5. Mapping DESIGN → componente WA real

### Atoms

| DESIGN | WA real (prod) | Equivalente prototipo (Lovable) |
|---|---|---|
| ATOM 01 Avatar puesto | Perfil del WA Business (foto + nombre, controlado por Meta) | Componente custom circular |
| ATOM 02 Badge estado | Emoji + texto en cuerpo de mensaje (`✓ Aceptado`) | Pill custom |
| ATOM 03 Chip respuesta rápida | **Reply Button** o **Quick Reply** (plantilla) | Chip custom |
| ATOM 04 Botón pago | CTA URL button → checkout web | Botón custom |
| ATOM 05 Typing indicator | **No existe vía API**. Es del cliente WA, no controlable | OK en prototipo |

### Molecules

| DESIGN | WA real | Notas |
|---|---|---|
| M01 Burbuja bot texto | Mensaje texto libre | ≤1600 char |
| M02 Burbuja audio usuario | Audio nativo entrante | Tú no controlas su UI |
| M03 Confirmación de pedido | Texto formateado con `*bold*` y `_italic_` + Reply Buttons | **No hay cards**, hay que reformatear |
| M04 Vídeo del día | Mensaje media (vídeo ≤16MB) o link Cloudinary | |
| M05 Broadcast diario | **Plantilla marketing aprobada** con media header + body + quick reply | No es libre |
| M06 Selector fulfillment | **List message** o 3 Reply Buttons | Si son 3 opciones, mejor buttons |
| M07 Alerta sustitución | Mensaje texto + 3 buttons (Aceptar/Quitar/Cancelar) | |
| M08 Recibo final | Texto formateado | Sin tabla. Usa emojis como bullets |
| M09 Notif sistema | Mensaje texto (dentro 24h) o plantilla utility (fuera) | |
| M10 Separador fecha | **No existe**. Lo pinta el cliente WA solo | Solo prototipo |

### Organisms

| DESIGN | WA real |
|---|---|
| O01 Header de chat | Perfil del WA Business Account. **No editable mensaje a mensaje** |
| O02 Conversación scrollable | El chat nativo |
| O03 Panel placero | **Fuera de WA**. Glide/Softr/web custom |
| O04 Input bar | Nativo del cliente WA |

### Patrón crítico: el "card" de confirmación

DESIGN propone:
```
📋 He entendido este pedido:
½ kg · Boquerones frescos · 1,75 €
2 ud · Acedías limpias · 2,40 €
─────
Total estimado: 4,15 €
📍 Recogida en puesto · Mañana 10:00-14:00
💳 Pago al entregar
```

En WA real funciona así (texto + 3 reply buttons):

```
📋 He entendido este pedido:

• ½ kg boquerones frescos — *1,75 €*
• 2 acedías limpias — *2,40 €*

*Total estimado: 4,15 €*

📍 Recogida en puesto, mañana 10:00-14:00
💳 Pago al entregar
```

Buttons: `[Confirmar]` `[Modificar]` `[Hablar con Antonio]` (18 char ✓, sin emojis — WA no renderiza emojis custom en reply buttons)

---

## 6. Decisiones derivadas para el proyecto

### 6.1 Audio fuera del MVP (tu decisión)
Confirmado: pedido por **texto + reply buttons + listas**. Mantener audio como fallback opcional (el usuario puede mandarlo, el bot transcribe vía Whisper/LLM y reformula como texto estructurado), pero no como flujo principal.

### 6.2 Sin pagos online en pedido estándar (tu decisión)
- Recogida y domicilio → pago al entregar (sin link de pago en el flujo).
- Taquilla refrigerada → pago previo con Bizum vía link (CTA URL button en plantilla utility, abre web externa con QR Bizum o link de pago).
- **Implica**: el flujo de pedido NO incluye pasarela, simplifica mucho.

### 6.3 Catálogo: list vs vídeo
- Vídeo del día = catálogo visual (modelo Antonio).
- Si el usuario pide algo no presente → bot devuelve "Lo mando a Antonio a ver si tiene".
- Lista interactiva solo para **categorías** (≤10) y **mercados** (≤10), no para productos.
- Productos disponibles → texto libre del usuario, NLU del lado del bot.

### 6.4 Onboarding
- 1ª vez: plantilla utility con CTA Flow → WA Flow de 2-3 pantallas (nombre, CP, mercado fav, opt-in marketing).
- Siguientes: detección de variable `mercado_fav` → mensaje con 2 reply buttons.

### 6.5 Broadcast diario
- Plantilla marketing aprobada con media header (vídeo o imagen), body con productos del día, footer con opt-out, 2-3 quick reply buttons: `[Pedir]` `[Ver más]` `[BAJA]`.
- Frecuencia: 1/día por usuario por puesto suscrito.

### 6.6 Estados de pedido (notificaciones proactivas)
Cada cambio de estado fuera de ventana 24h → plantilla utility. Plantillas a aprobar:
- `pedido_aceptado_v1`
- `pedido_preparando_v1`
- `pedido_listo_v1`
- `pedido_en_camino_v1`
- `pedido_entregado_v1`
- `pedido_incidencia_v1`

(Cada una con su variable de nombre puesto, items, hora.)

### 6.7 Plantillas del lado del placero

El placero también es un usuario de WhatsApp y la ventana de 24h le afecta
igual. El pedido de las 9:41 le llega sin que él haya escrito nada en todo el
día: **fuera de ventana, así que ese aviso es plantilla utility con quick
replies**, no texto libre. En cuanto contesta se abre su ventana y el resto de
la jornada va en libre, botones incluidos.

Plantillas a aprobar (hilo «Mercados de Sevilla · Asistente del placero», nunca
el número que ven los clientes — DESIGN.md §4.1):

- `placero_pedido_nuevo_v1` — quick replies `[Aceptar]` `[Producto agotado]` `[No puedo hoy]`
- `placero_pedido_sin_aceptar_v1` — recordatorio si un pedido lleva rato en «nuevo»
- `placero_cliente_no_recoge_v1` — el cliente no ha pasado y el puesto cierra (S02)
- `placero_escalado_v1` — un cliente pide hablar con él (C11), con nombre y nº de pedido
- `placero_cierre_dia_v1` — resumen del día (P04)
- `placero_video_pendiente_v1` — no ha subido el vídeo del día (S07, P02)

Los quick replies de estas plantillas se resuelven contra el estado actual del
pedido, no contra el mensaje: un botón viejo no repite una acción ya hecha
(DESIGN.md §4.3).

---

## 7. Plantillas-tipo para arrancar (borradores)

### Broadcast diario (marketing)
```
Nombre: broadcast_diario_v1
Categoría: MARKETING
Header: VIDEO (variable, URL)
Body:
  Buenos días {{1}} 👋
  Hoy en {{2}}:
  {{3}}
  
  Pide hasta las {{4}}. Recogida o reparto.
Footer:
  Responde BAJA para dejar de recibir.
Buttons (quick reply):
  [Pedir]  [Ver más]  [BAJA]
```

Variables: {{1}}=nombre cliente, {{2}}=nombre puesto, {{3}}=lista productos, {{4}}=hora cierre.

### Pedido aceptado (utility)
```
Nombre: pedido_aceptado_v1
Categoría: UTILITY
Body:
  ✓ {{1}} ha aceptado tu pedido #{{2}}.
  
  Te aviso cuando esté listo.
Buttons (quick reply):
  [Ver pedido]  [Cancelar]
```

### Pedido listo (utility)
```
Nombre: pedido_listo_v1
Categoría: UTILITY
Body:
  🔔 Tu pedido #{{1}} está listo en {{2}}.

  *Total: {{3}} €*
  {{4}}

  Pasa antes de las {{5}}.
Buttons (URL):
  [Cómo llegar] → mapa Google Maps
```
Variables: {{3}}=total final tecleado por el placero al marcar "Listo"
(post-pesaje, no el estimado inicial). {{4}}=texto método de pago,
p.ej. "Paga en efectivo, Bizum o tarjeta al recoger." Sin botón de pago:
el cobro es en persona, lo marca el placero en su panel (Organism 03),
no el cliente por chat. Excepción: taquilla, que usa CTA URL Bizum
aparte (§6.2).
```

---

## 8. Política 2026 (no romper esto)

- Bots IA general → prohibidos. **Bots task-specific OK** ← este lo es.
- URLs en plantillas → HTTPS verificables.
- Truncado marketing → primeras 2 líneas son críticas, lo demás se oculta tras "Leer más".
- Pagos nativos WA en España → no disponible aún. Confirma antes de arquitectura.

---

## 9. Stack técnico revisado

| Capa | Decisión | Por qué |
|---|---|---|
| Canal | Meta Cloud API (no 360dialog) | Más barato 2026, features primero |
| Orquestación | **Botpress** o **n8n + Cloud API directa** | Botpress más rápido prototipar, n8n más flexible |
| NLU pedido en texto | LLM via API (Claude/GPT) + diccionario sevillano | OK |
| Flows compuestos | WA Flows nativos para onboarding y datos estructurados | Mejor UX que cadenas de buttons |
| Panel placero | Glide o Softr sobre Airtable | OK |
| Webhook handler | n8n o Make | OK |
| Storage | Airtable MVP → Supabase fase 2 | OK |
| Hosting vídeo | Cloudinary (compresión auto + URL) | Resuelve el límite 16MB |

---

## 10. Recursos / referencias

- [Meta Cloud API docs](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [WhatsApp Flows reference](https://developers.facebook.com/docs/whatsapp/flows)
- [WA UI Kit Figma Community](https://www.figma.com/community/search?model_type=hub_files&q=whatsapp%20business) — para el prototipo
- Política IA 2026: comunicación oficial Meta enero 2026

---

*v1.0 — base para validar cualquier flujo nuevo. Si propones algo que no aparece aquí, primero verifica si WA lo permite.*
