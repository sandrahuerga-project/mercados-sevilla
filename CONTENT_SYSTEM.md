# CONTENT SYSTEM — Mercados de Sevilla

> Sistema de contenido basado en atomic design (Brad Frost aplicado a copy conversacional).
> Complementa DESIGN.md (visual) y wa-constraints.md (técnico). No los duplica: los referencia.
> **Jerarquía en conflicto:** wa-constraints.md > CLAUDE.md.txt > este documento > DESIGN.md §5-§7 (si hay contradicción de copy, se resuelve aquí y se propaga a DESIGN). PORTFOLIO_DESIGN.md nunca manda copy — es shell visual, no contenido.

**Versión:** 2.0
**Ámbito:** todo texto que ve un usuario — chat WhatsApp, plantillas Meta, panel placero, SMS, email de factura.

---

## 0. Por qué el contenido es EL sistema de diseño de este producto

El producto vive dentro del chrome de WhatsApp. Meta controla tipografía, color de burbuja, fondo, avatar. **El copy es el único material de diseño que controlamos al 100% en producción.** Merece la misma disciplina que un design system visual: piezas mínimas cerradas, reglas de combinación explícitas, y cero copy improvisado fuera del sistema.

Segunda razón: el usuario más frágil (Carmen, 71) no distingue "error de diseño" de "no sé usar esto". Un mensaje ambiguo no es un bug estético — es una clienta que vuelve a llamar por teléfono y no regresa. KPI en juego: tasa de finalización ≥75% y NPS mayor ≥40 (PRD §3).

---

## 1. Principios de contenido (no negociables)

Derivados de PRD §1.3, CLAUDE.md.txt y DESIGN.md §5:

1. **El bot es secretario, no árbitro.** No calcula precios, no decide sustituciones, no promete nada en nombre del placero. Todo precio que aparezca en copy es *"estimado"* y lo fija el placero; toda sustitución la propone el placero y la decide el cliente.
2. **Castellano nivel A2.** Frases cortas, presente e imperativo suave, vocabulario cotidiano. Si una palabra no la usaría Carmen en el mercado, no va en el copy. Excepción: el léxico propio del mercado (§3.1), que es justo lo contrario de tecnicismo.
3. **Cercano, no efusivo.** Cero chistes, cero ironía, cero celebración. El bot no es gracioso, es útil.
4. **Un mensaje, una idea.** Máx 2-3 líneas por burbuja. Si hay más, se divide en burbujas consecutivas (400ms entre ellas).
5. **Siempre hay salida.** Todo punto del flujo permite volver atrás o hablar con una persona. El copy nunca encierra.
6. **Mismo trato para todos los perfiles.** Carmen y David reciben el mismo registro. Se adapta la *densidad* (atajos para David, confirmación paso a paso para Carmen), nunca el respeto ni el tono. Prohibido "Carmencita", "cariño", "guapa".

---

## 2. Público objetivo → decisiones de contenido

| Perfil | Qué exige del copy | Qué lo expulsa |
|---|---|---|
| **Carmen, 71** | Confirmación explícita en cada paso. Cero jerga digital. Opción de persona siempre visible. Cantidades en formato de mercado ("½ kg", no "500 g"). | Abreviaturas, anglicismos, pasos implícitos, mensajes largos. |
| **David, 34** | Atajos verbales ("lo de siempre", "repetir"). Puede asumir contexto. Mensajes proactivos con la info completa en las 2 primeras líneas (truncado marketing WA). | Catálogo desactualizado, fricción repetida en pedidos recurrentes. |
| **Antonio, 52** | Verbos de acción de 1 palabra en su panel. Cero prosa, cero cortesía. Estados idénticos a los que ve el cliente. | Texto que le haga leer más de 2 segundos por pedido. |

**Regla de bifurcación:** el copy no se bifurca por perfil demográfico. Se bifurca por **contexto**: primera vez vs recurrente, dentro vs fuera de ventana 24h, confianza NLU alta vs baja, dentro vs fuera de horario.

---

## 3. ATOMS — unidades mínimas de contenido

Palabras, emojis y etiquetas con significado fijo. Idénticas en cualquier superficie (chat, panel, plantilla, email).

### 3.1 Léxico del mercado (obligatorio)

| Usar | No usar nunca |
|---|---|
| placero | vendedor, comerciante, seller |
| puesto | tienda, stand, comercio |
| mostrador | escaparate, catálogo |
| mercado | plataforma, marketplace, app |
| recogida | pickup |
| reparto a domicilio | delivery, envío |
| taquilla | locker |
| pedido | orden, order, compra online |
| vídeo del día | catálogo diario, feed |

> Nota de gobernanza: **decisión cerrada — "placero" en todo el sistema** (copy de usuario y documentación), alineado con CLAUDE.md.txt y flows-index. Propagado ya a DESIGN.md y wa-constraints.md; el PRD sigue diciendo "placista" (documento de negocio, actualizar en su próxima versión).

El habla sevillana del NLU (PRD §6.5) es léxico válido y protegido: *acedías, tagarninas, avío de puchero, papas nuevas, un cuarto de..., corte de cazón para adobo, pavías*. El bot **la entiende y la respeta en sus resúmenes** — si Carmen pide "un cuarto de gambas", el resumen dice "¼ kg gambas", no "250 gramos de camarón".

### 3.2 Emojis — whitelist cerrada (DESIGN.md §1, literal)

Permitidos, solo en posición fija:

```
👋  saludo inicial (1 vez por sesión)
✅  confirmación de pedido
⚠️  alerta de sustitución / stock
📍  fulfillment recogida
🔒  fulfillment taquilla
🚚  fulfillment reparto
💳  pago
🔔  pedido listo
📦  entregado
🛒  CTA pedir
🐟 🥩 🍅 🥖  identificadores de categoría
```

Prohibidos siempre: 🎉 ❤️ 🤗 😊 🙌 ✨ 🔥 💪 🚀 💯 y cualquier emoji decorativo, de celebración o cariño.

**Reglas numéricas:** máx **1 emoji por burbuja** (excepción: card de categorías, 1 por categoría). Un emoji = un significado en todo el sistema; 🔔 solo significa "pedido listo", nunca aviso genérico.

**Botones: sin emojis, punto.** Si WhatsApp Business no lo pinta de forma nativa, no va. Los símbolos ✓ ✏️ 💬 🛒 que aparecen en algunos mockups son válidos **solo en PORTFOLIO_DESIGN.md** (shell de demo/portfolio, nunca en el chat simulado). En producción y en el chat del prototipo todo botón es texto plano: `[Confirmar]` `[Modificar]` `[Hablar con Antonio]`. Ya propagado a DESIGN.md (§1 + catálogo §7), flows-index.md y wa-constraints.md (§5 y borradores §7). Los mockups ASCII de moléculas en PORTFOLIO_DESIGN.md conservan emoji porque documentan el shell, no el chat.

### 3.3 Etiquetas de estado (espejo de DESIGN.md §10 y PRD §9)

Copy cerrado, idéntico para cliente, placero y dashboard:

```
Pendiente (solo panel placero) · Aceptado · Preparando · Listo
Por cobrar (sub-estado interno del placero, no PRD) · En camino
Entregado · Cancelado · Incidencia
```

Estados sin mensaje al cliente: `pendiente` y `preparando` (cambios internos, no notifican — evita spam y protege quality rating). `Por cobrar` tampoco genera mensaje aparte: viaja dentro del mensaje de "Listo" (total final + método de pago, DESIGN.md §10).

### 3.4 Verbos de CTA (≤20 caracteres, wa-constraints.md §2)

Un solo modo verbal por mensaje. Inventario cerrado:

```
Confirmar · Modificar · Cancelar · Pedir · Repetir · Reintentar
Sí, allí voy · Cambiar de mercado · Ver del día · Avísame
Hablar con Antonio · Voy ahora · Espero · Mañana · Volver
```

CTA nuevo → se añade aquí primero, se verifica contra 20 char, luego se usa.

### 3.5 Formatos de dato (microcopy numérico)

| Dato | Formato | Nunca |
|---|---|---|
| Cantidad peso | ½ kg · ¼ kg · 1 kg · 100 g | 0,5 kg · 500grs |
| Cantidad unidad | 2 ud · 1 docena | 2x · 2 uds. |
| Precio | 4,15 € (coma decimal, espacio antes de €) | €4.15 · 4'15€ |
| Precio total (al confirmar pedido) | siempre precedido de "estimado" | "Total: X €" a secas |
| Precio total (al marcar Listo) | "Total: X €" a secas — ya es el real, tecleado por el placero tras pesaje, sin "estimado" | "Total estimado" en este punto (induce a duda) |
| Hora | 12:30 · "hasta las 14:00" | 12.30h · 2:30 PM |
| Franja | 13:30-15:00 | "por la tarde" |
| Nº pedido | #SGZ-2024-0387 | referencias largas o sin # |

---

## 4. MOLECULES — mensajes tipo

Estructura fija + atoms de §3. Cada molecule tiene un objetivo único. El copy aprobado de cada una vive en DESIGN.md §7 (catálogo) — aquí se define la **anatomía** para poder crear variantes sin romper el patrón.

### M-SAL — Saludo
`[👋 solo 1ª vez] + contexto conocido + pregunta cerrada`
Máx 80 char. Variantes aprobadas: primera vez / recurrente / fuera de horario (DESIGN §7.1).

### M-CONF — Confirmación de pedido
`"He entendido este pedido:" + líneas producto (cantidad · nombre · precio) + "Total estimado" + "¿Confirmas?"`
Botones: `[Confirmar] [Modificar] [Hablar con Antonio]`.
En WA real: texto plano con `*bold*`, sin card (wa-constraints §5). El adjetivo **"estimado" es obligatorio** — el bot no fija precios (principio 1).

**Variantes por confianza NLU (DESIGN §6):**
- \>85% → confirmación directa con resumen.
- 60-85% → *"¿He entendido bien? [resumen]"* `[Sí] [Modificar]`
- <60% → *"No estoy seguro. ¿Puedes repetirlo o mandarme un audio?"* `[Reintentar] [Hablar con Antonio]`

### M-ALERT — Alerta / sustitución
`⚠️ + hecho + pregunta con alternativa concreta (precio incluido si lo da el placero)`
Nunca pregunta abierta, nunca "lamentablemente". La alternativa la propone el placero, el bot solo la transmite.

### M-NOTIF — Notificación de estado (plantilla utility fuera de 24h)
`emoji de estado + hecho + siguiente acción del usuario (si existe)`
Solo estados críticos: aceptado, listo, en camino, entregado, incidencia. Máx 1 por cambio de estado.
Variante "Listo": incluye el total final tecleado por el placero (sin "estimado", ver §3.5) + método de pago disponible. Sin botones — el cobro es en persona, lo marca el placero en su panel (DESIGN §4), no el cliente por chat.

### M-SEL — Selección
`pregunta corta + ≤3 opciones, cada una con su condición (precio · tiempo · lugar)`
3 opciones → reply buttons; >3 → list message (≤10 filas totales); franjas de entrega → solo chips, nunca texto libre (DESIGN §9.4).

### M-ERR — Error
`reconocimiento sin culpar + alternativa de acción`
Máx 100 char. Nunca causa técnica ("el NLU...", "error 500"). Variantes aprobadas: NLU bajo / producto no existe / conexión / fuera de ventana (DESIGN §7.3).

### M-WAIT — Espera
`typing indicator + si >5s, texto explícito ("Entendiendo tu pedido...")`
Escalado humano: siempre con expectativa de tiempo (*"Antonio responde habitualmente en menos de 10 min."*).

### M-BYE — Despedida
`hecho cerrado + puerta abierta`
Variantes: entregado / cancelación / baja RGPD (DESIGN §7.5). La de baja es sagrada: *"Tus datos se han borrado. Si algún día quieres volver, escribe ALTA."*

### M-CAST — Broadcast diario (plantilla marketing)
`Buenos días {{nombre}} 👋 + qué hay hoy (máx 3-4 productos) + "Pide hasta las {{hora}}" + footer opt-out`
**Las 2 primeras líneas llevan toda la información crítica** — WA trunca marketing a ~5 líneas con "Leer más". Footer obligatorio: *"Responde BAJA para dejar de recibir."*

### M-DATA — Captura de dato
`pregunta + formato esperado + validación + error propio + persistencia`
Patrones cerrados en DESIGN §9 (nombre, teléfono, dirección, franja, cantidad). Regla: el teléfono nunca se pregunta (viene de WA); la franja nunca es texto libre.

---

## 5. ORGANISMS — flujos completos

Secuencias de molecules que resuelven una intención de principio a fin. Mapeo 1:1 con flows-index.md — **este sistema no inventa flujos, les da el copy.**

| Organism | Flujo | Composición de molecules | Prio |
|---|---|---|---|
| Alta | C01 | WA Flow (copy en pantallas Flow, §7) + M-BYE de cierre con promesa concreta (*"Mañana a las 9:00 te enseño lo que Antonio tenga en el mostrador."*) | P1 |
| Saludo recurrente | C02 | M-SAL recurrente | P1 |
| Pedido desde vídeo | C03 | M-CAST → M-SAL corta → [input libre] → M-WAIT → M-CONF → M-SEL fulfillment → M-NOTIF recibo | P1 |
| Pedido espontáneo | C04 | C02 + C03 sin M-CAST | P2 |
| Multi-puesto | C05 | M-SEL puestos → M-CONF por sub-pedido | P2 |
| Repetir | C06 | M-CONF precargada (*"¿Lo de siempre? ..."*) | P2 |
| Tracking | C07 | M-NOTIF × estados críticos | P1 |
| Sustitución | C08 | M-ALERT | P2 |
| Modificación | C09 | M-SEL cantidades + M-CONF; post-aceptado escala a C11 | P3 |
| Cancelación | C10 | pre-aceptado: M-BYE directa; post-aceptado: M-CONF de cancelación | P2 |
| Escalado humano | C11 | transición de voz (§6) | P1 |
| Fuera de horario | S01 | M-ERR variante + M-SEL aviso | P2 |
| No recoge | S02 | M-NOTIF progresiva ×2 (60 min / cierre−15) | P2 |
| Lista negra | S03 | mensaje único, sin flujo, sin chips | P3 |

**Regla de composición:** flujo nuevo = molecules existentes. Si ninguna encaja, se propone la molecule en §4 **antes** de escribir el flujo. Edge cases: todos los fallbacks de input inesperado ya tienen copy aprobado en DESIGN §12 (sticker → ignorar; foto sin contexto; audio >2 min; otro idioma; pedido duplicado...) — no reinventarlos.

---

## 6. Voz dual — bot vs persona (C11)

Único punto donde dos voces conviven. Reglas:

1. El bot nunca finge ser el placero. Firma implícita distinta: bot = "Pescadería Antonio" (nombre de puesto), humano = "Antonio" (nombre de persona, avatar foto real).
2. Transición de ida, una sola vez, con expectativa: *"Te paso con Antonio directamente. Habitualmente responde en menos de 10 min."*
3. Durante el handover: cero chips, cero mensajes del bot. El bot desaparece de verdad.
4. Transición de vuelta, neutra: *"Conversación con Antonio cerrada. Vuelves al asistente automático."* El bot no resume ni parafrasea lo que dijo el humano; si Antonio cerró un acuerdo ("te aparto medio kilo"), el bot lo convierte en M-CONF normal para que quede registrado.
5. **El copy del humano no se escribe.** Es la voz real del placero — es el activo del producto (evidencia Antonio, PRD §1.2). Lo único normado: etiquetas de transición y promesa de tiempo.

Disparadores del escalado (DESIGN §8.4): chip manual, 3 fallos NLU seguidos, palabras clave ("persona", "humano", "alguien real").

---

## 7. Superficies no-chat

### 7.1 Panel del placero (Glide/Softr)
- Verbos de 1-2 palabras: `Aceptar` · `Agotado` · `Listo` · `Marcar cobrado` · `Entregado` · `Problema`.
- Al tocar `Listo`: campo numérico obligatorio de total final (post-pesaje) — el placero lo teclea, el bot solo lo repite (DESIGN §4).
- `Marcar cobrado` lleva desplegable interno Efectivo/Bizum/Tarjeta — no afecta al copy que recibe el cliente.
- Cero cortesía, cero prosa. Antonio resuelve cada pedido en ≤2 segundos de lectura.
- Estados idénticos a §3.3 — lo que Antonio marca es literalmente lo que Carmen lee.

### 7.2 WhatsApp Flows (onboarding C01)
- Labels de input: sustantivo solo ("Nombre", "Código postal"), sin frase.
- TextHeading ≤80 char, 1 tarea por pantalla, máx 3 pantallas.
- OptIn con lenguaje RGPD llano: *"Quiero recibir el vídeo diario de mis puestos"* — el usuario entiende qué recibirá y cada cuánto, no "acepto términos".

### 7.3 SMS (solo entrega crítica)
- Sin emojis, sin formato. `Tu pedido #SGZ-0387 esta en la puerta.` Máx 160 char, sin tildes si el gateway lo exige.

### 7.4 Email (factura mensual)
- Asunto: `Factura [mes] — Mercados de Sevilla`. Cuerpo mínimo, el PDF es el contenido.

---

## 8. TEMPLATES — plantillas Meta

Un organism que sale de la ventana 24h se congela como plantilla aprobable. Registro obligatorio antes de enviar a revisión (rechazo = 24-72h perdidas).

**Naming:** `[flujo]_[evento]_v[n]` → `broadcast_diario_v1`, `pedido_aceptado_v1`, `pedido_listo_v1`, `pedido_en_camino_v1`, `pedido_entregado_v1`, `pedido_incidencia_v1` (inventario base en wa-constraints §6.6-§7).

**Checklist de contenido pre-Meta** (suma al técnico de wa-constraints §8):
- [ ] Solo atoms de §3 (léxico, emoji whitelist, formatos de dato)
- [ ] Anatomía de la molecule correspondiente (§4)
- [ ] Info crítica en las 2 primeras líneas (truncado marketing)
- [ ] Marketing → footer BAJA; utility → sin marketing encubierto
- [ ] Sin precios calculados por el bot; "estimado" donde haya importe
- [ ] Variables snake_case; body ≤1024, header ≤60, footer ≤60, botones ≤20 char
- [ ] Ortografía perfecta (Meta rechaza por erratas)

**Frecuencias máximas (DESIGN §6, vinculantes):** broadcast 1/puesto/día · notificaciones solo estados críticos · re-engagement 1/30 días de inactividad · NPS 1 cada 10 pedidos cerrados.

---

## 9. PAGES — la conversación real

Organism + variables de un usuario concreto (`{{nombre}}`, `{{puesto}}`, `{{hora}}`, `{{id_pedido}}`). Test de integridad del sistema: **toda conversación de producción debe poder reconstruirse solo con atoms → molecules → organisms.** Si aparece copy que no traza a este documento o a DESIGN §7, es deuda: se sistematiza o se elimina.

Excepciones únicas: la voz humana en C11 (§6.5) y el vídeo diario del placero (contenido vivo, no se guioniza — es la evidencia Antonio).

Validación de referencia: el happy path completo de DESIGN §13 (Carmen, 6 toques + 1 audio, ≤4 min).

---

## 10. Límites de longitud (DESIGN §6, vinculantes)

```
Saludo                  ≤80 char / 1-2 líneas
Mensaje informativo     ≤160 char / 2-3 líneas
Mensaje de error        ≤100 char / 1-2 líneas
Confirmación de pedido  resumen estructurado (texto formateado en WA real)
Botón                   ≤20 char
Body plantilla          ≤1024 char
```
Exceso → dividir en burbujas consecutivas (400ms). Nunca abreviar, nunca comprimir.

---

## 11. Checklist antes de publicar copy nuevo

```
□  ¿Solo atoms de §3? (léxico, emoji whitelist, CTA, formatos de dato)
□  ¿Máx 1 emoji, de la whitelist, en posición fija?
□  ¿Encaja en una molecule de §4 — o se ha añadido la molecule primero?
□  ¿El organism existe en flows-index.md?
□  ¿Cumple wa-constraints.md? (botones ≤3 y ≤20 char, listas ≤10 filas)
□  ¿Castellano A2, sin anglicismos, sin jerga digital?
□  ¿El bot calcula o promete algo que corresponde al placero? → reescribir
□  ¿Todo precio lleva "estimado"?
□  ¿Hay salida? (volver / hablar con persona)
□  ¿Sirve igual a Carmen y a David sin cambiar el registro?
□  ¿Si es plantilla: checklist §8 completo?
□  ¿Longitud dentro de §10?
```

---

## 12. Gobernanza

- **Fuente de verdad del copy aprobado:** DESIGN.md §7 (catálogo). Este documento define las reglas para crear/variar; aquel guarda los literales vigentes.
- **Cambio de atom** (léxico, emoji, estado, CTA): se cambia aquí primero → se propaga a DESIGN, flujos y plantillas. Un atom nunca diverge entre superficies.
- **Plantilla Meta aprobada = contenido congelado.** Cambiarla implica nueva versión (`_v2`) y nueva revisión Meta; presupuestar 24-72h.
- **Decisiones cerradas y propagadas** (DESIGN.md, flows-index.md, wa-constraints.md actualizados): "placero" en todo el sistema (§3.1) · botones de producción sin emojis (§3.2). Único resto: el PRD dice "placista" — actualizar en su próxima versión.

---

*v2.0 — Content System atómico. Toda pieza de contenido nueva nace aquí antes de existir en un flujo, una plantilla o el panel.*
