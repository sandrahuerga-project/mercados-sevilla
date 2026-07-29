# DESIGN.md — Conversation Design System (fiel a WhatsApp Business real)

> Sistema de diseño conversacional. No de UI visual: dentro del chat, WhatsApp
> controla el chrome (colores, tipografía, burbujas), no nosotros.
> Fuente de verdad de constraints técnicas: wa-constraints.md.
> Fuente de verdad de la capa visual de portfolio/demo (Playfair Display, paleta
> de marca, cards, motion): PORTFOLIO_DESIGN.md. **No mezclar los dos.**
> Principio rector del bot: CLAUDE.md.txt.

---

## 0. Qué es este documento y qué no es

| Aquí SÍ | Aquí NO |
|---|---|
| Copy exacto de cada mensaje | Colores, tipografías, cards |
| Componentes reales de WA (Reply Buttons, List, Flow, plantillas) | Ilustraciones, motion, shell de demo |
| Tono, voz, tokens conversacionales | Paleta de marca (→ PORTFOLIO_DESIGN.md) |
| Estados de pedido y transiciones | Panel del placero — visual (→ PORTFOLIO_DESIGN.md; funcional aquí) |

---

## 1. EMOJI — la única "iconografía" dentro del chat

WhatsApp no permite tipografía, colores ni iconos custom en el texto. El único
recurso visual disponible es el emoji nativo del teclado, usado con disciplina.

```
──────────────────────────────────────────────────────────────

  PERMITIDOS EN POSICIÓN FIJA

    👋  saludo inicial (1 vez por sesión)
    ✅  confirmación de pedido
    ⚠️  alerta de sustitución / stock
    📍  fulfillment recogida
    🔒  fulfillment taquilla
    🚚  fulfillment reparto
    💳  pago
    🔔  pedido listo
    📦  entregado
    🛒  CTA pedir (solo en texto, nunca en botón)
    🐟 🥩 🍅 🥖  identificadores de categoría

  PROHIBIDOS SIEMPRE

    🎉 ❤️ 🤗 😊 🙌 ✨ 🔥 💪 🚀 💯
    Cualquier emoji decorativo, de celebración o cariño.

  REGLA NUMÉRICA

    Máximo 1 emoji por mensaje.

  BOTONES Y REPLY BUTTONS

    NUNCA llevan emoji. WhatsApp no renderiza emoji custom en
    Reply Buttons (wa-constraints.md §5).
    "Confirmar", no "✓ Confirmar". "Recogida en puesto",
    no "📍 Recogida en puesto".
    El emoji con icono en botón solo existe en PORTFOLIO_DESIGN.md
    (mockup de portfolio), nunca en el prototipo que se presenta
    como simulación fiel ni en producción.

──────────────────────────────────────────────────────────────
```

Formato de texto disponible: `*negrita*`, `_cursiva_`, `~tachado~`, ```` ```monoespaciado``` ````. Nada de tamaños, familias ni colores custom — los controla el cliente WhatsApp de cada usuario.

---

## 2. COMPONENTES REALES DE WHATSAPP BUSINESS

Mapeo resumen. Detalle de límites, tipos de mensaje y plantillas: wa-constraints.md.

```
──────────────────────────────────────────────────────────────

  QUÉ NECESITO                      COMPONENTE WA REAL

  Opciones de respuesta (≤3)        Reply Buttons (≤20 char,
                                     sin emoji)

  Menú de categorías/mercados       List Message (máx 10 filas
  (≤10 opciones)                    en total, no por sección)

  Confirmación de pedido            Texto libre con *bold* +
  ("card" en mockup)                Reply Buttons — no hay cards
                                     en WA real

  Onboarding / datos estructurados  WA Flow nativo (ver §3)

  Vídeo del día / difusión          Plantilla marketing con
                                     media header + body + quick
                                     reply, aprobada por Meta

  Notificación de estado            Plantilla utility (fuera de
  (aceptado/listo/entregado...)     ventana 24h) o texto libre
                                     (dentro de ventana 24h)

  Audio del usuario                 Nativo del cliente WA, no
                                     estilizable (sin waveform
                                     custom)

  Indicador "escribiendo..."        Lo pinta el cliente WA solo.
                                     No se puede forzar ni
                                     estilizar vía API.

  Separador de fecha en el chat     Lo pinta el cliente WA solo.

──────────────────────────────────────────────────────────────
```

---

## 3. ONBOARDING — WA Flow real

El onboarding usa un **WA Flow** (formulario nativo embebido), no burbujas libres. Componentes disponibles: `TextHeading` (80 char), `TextBody` (4096 char), `TextInput`, `Dropdown`, `RadioButtonsGroup`, `OptIn`, `Footer` (un único botón por pantalla). Máx. recomendado: 3 pantallas, 1 tarea por pantalla (wa-constraints.md §4).

```
DISPARO: primer mensaje entrante → plantilla utility con
         CTA que abre el WA Flow.

PANTALLA 1 — Bienvenida y nombre
  TextHeading:   "Bienvenida a los Mercados de Sevilla"
  TextBody:      "Soy tu asistente para pedir fresco desde
                  casa. ¿Cómo te llamas?"
  TextInput:     nombre (2-40 caracteres)
  Footer:        [Continuar] → navigate

PANTALLA 2 — Código postal y mercado
  TextBody:      "¿Cuál es tu código postal en Sevilla?"
  Dropdown:      lista de CP o "Otro"
  RadioButtonsGroup: mercado favorito (si el CP tiene varios
                  cerca)
  Footer:        [Continuar] → navigate

PANTALLA 3 — Consentimiento RGPD
  TextBody:      "Usaré tu nombre y número para gestionar tus
                  pedidos. Puedes borrarte cuando quieras
                  escribiendo BAJA."
  OptIn:         "Estoy de acuerdo" (obligatorio para continuar)
  Footer:        [Enviar] → complete (cierra el Flow, entrega
                  los datos al backend)

Si el usuario no completa el Flow: reintento a las 24h con
plantilla utility recordatorio, máx. 1 vez.
WA Flows no funcionan en WA Web — el usuario ve "completa en
el móvil" si abre desde escritorio.
```

---

## 4. PANEL DEL PLACERO — spec funcional

Organism 03. Es la única pieza del sistema que **no** es WhatsApp — panel web (Glide/Softr sobre Airtable), sin constraints de Meta. La piel visual vive en PORTFOLIO_DESIGN.md; aquí solo el comportamiento.

```
ESTADOS VISIBLES PARA EL PLACERO (filtro):
  Todos · Nuevos · Aceptados · Preparando · Por cobrar

ACCIONES POR PEDIDO::
  Nuevo       → [Aceptar] [Problema]
  Aceptado    → (cambia a Preparando automáticamente al
                 empezar a prepararlo, o manual)
  Preparando  → [Listo] [Problema]
                 Al tocar [Listo]: campo obligatorio de TOTAL
                 FINAL (numérico, post-pesaje). El placero
                 teclea el número real — el bot no lo calcula
                 (CLAUDE.md.txt). Dispara plantilla
                 pedido_listo_v1 (wa-constraints.md §7) con
                 ese total y pasa el pedido a "Por cobrar".
  Por cobrar  → [Marcar cobrado] con desplegable de método
                 (Efectivo / Bizum / Tarjeta) — registro interno
                 del placero, no afecta al mensaje que recibe
                 el cliente. Tras marcar cobrado, el placero
                 marca [Entregado], que dispara la plantilla
                 de cierre.
  Cualquiera  → [Problema] → estado "incidencia", escalado
                 humano (§10).

Excepción taquilla: pago previo vía CTA URL Bizum en la
plantilla utility (wa-constraints.md §6.2), no pasa por "Por
cobrar" del mismo modo — el placero solo confirma que el pago
llegó antes de dejar el pedido en taquilla.
```

---

## 5. GUÍA DE VOZ Y TONO

```
──────────────────────────────────────────────────────────────

  PRINCIPIOS

  · Cercano, no efusivo. "Buenos días Carmen" y no
    "¡Bienvenida de nuevo! ¡Qué alegría verte!"

  · Concreto, no ambiguo. "Pide hasta las 12:30"
    y no "El período de pedidos está por cerrarse pronto".

  · Directo al grano. La confirmación de pedido primero.
    Las opciones después.

  · Respeta el léxico del mercado. "Placero", "puesto",
    "mostrador", "acedías", "pavías" son palabras válidas.
    No sustituir por "vendedor", "tienda" ni "filete de pescado".

  · Frases cortas. Máx. 2-3 líneas por mensaje.
    Si hay más información, dividir en varios mensajes.

──────────────────────────────────────────────────────────────

  EJEMPLOS DE TONO

  ✓  "¿Quieres añadir algo de otro puesto?"
  ✗  "¿Te gustaría explorar otros puestos del mercado?"

  ✓  "Las acedías se han agotado. ¿Las quitamos?"
  ✗  "Lamentablemente, el producto seleccionado no está
      disponible en este momento."

  ✓  "¡Listo! Antonio lo tiene preparado."
  ✗  "Tu pedido ha sido procesado exitosamente."

──────────────────────────────────────────────────────────────

  ADAPTAR POR PERFIL

  Carmen (mayor): frases más cortas, confirmación explícita
  en cada paso, sin abreviaturas, ofrecer siempre la opción
  de hablar con el placero directamente.

  David (joven): puede asumir más contexto, ofrecer atajos
  ("repetir último pedido"), tono más ágil.

──────────────────────────────────────────────────────────────
```

---

## 6. TOKENS CONVERSACIONALES

No son colores ni espaciados. Son las reglas que definen cómo "suena" y se comporta el bot. Igual de vinculantes que los límites técnicos de wa-constraints.md.

```
──────────────────────────────────────────────────────────────

  TONO DE VOZ

  Personalidad base:  Cercano profesional andaluz.
                      Trato de tú. Sin diminutivos forzados.
                      Sin "¡Hola guapa!" ni "cariño".

  Formalidad:         Media-baja con todos los perfiles.
                      Carmen (mayor) recibe el MISMO trato
                      que David (joven). No tutear con
                      condescendencia ("Carmencita").

  Humor:              Cero chistes. Cero ironía.
                      El bot no es gracioso, es útil.

──────────────────────────────────────────────────────────────

  LONGITUD MÁXIMA POR MENSAJE

  Mensaje informativo:    160 caracteres / 2-3 líneas
  Mensaje de error:       100 caracteres / 1-2 líneas
  Confirmación de pedido: texto con *bold* + Reply Buttons,
                           sigue el límite de 1600 char de
                           mensaje libre (wa-constraints §2)
  Saludo:                 80 caracteres / 1-2 líneas

  Si el mensaje supera el límite → dividir en mensajes
  consecutivos con 400ms entre ellos (sensación de escritura
  natural, no spam).

──────────────────────────────────────────────────────────────

  TIEMPO DE RESPUESTA ESPERADO

  Mensaje del usuario → respuesta del bot:
    Saludo inicial:                 <2s
    Selección de botón:             <1s (instantáneo)
    Pedido en lenguaje natural:     2-5s (con typing visible)
    Pedido por audio:               4-8s (con typing visible)
    Escalado a humano:              <3s (placero responde
                                         según horario)

  Si el bot va a tardar >5s → el typing indicator nativo de
  WA ya lo cubre; opcionalmente reforzar con un mensaje
  explícito: "Entendiendo tu pedido..."

──────────────────────────────────────────────────────────────

  NIVEL DE CONFIANZA DEL NLU

  Confianza >85%  →  Confirmación directa con resumen.
  Confianza 60-85% → "¿He entendido bien? [resumen]"
                     [Sí] [Modificar]
  Confianza <60%  →  "No estoy seguro. ¿Puedes repetirlo
                     o mandarme un audio?"
                     [Reintentar] [Hablar con placero]

──────────────────────────────────────────────────────────────

  FRECUENCIA DE MENSAJES PROACTIVOS

  Broadcast diario:           1 por puesto/día (8:00-9:00),
                              plantilla marketing (wa-constraints
                              §3.4 opt-out obligatorio)
  Notificaciones de pedido:   Solo cambios de estado críticos
                              (aceptado, listo, en camino,
                              entregado, incidencia)
  Re-engagement:              1 cada 30 días si inactividad
                              "¿Volvemos esta semana?"
  Encuesta NPS:               1 cada 10 pedidos cerrados

──────────────────────────────────────────────────────────────
```

---

## 7. CATÁLOGO DE MENSAJES POR FUNCIÓN

Copy aprobado, tal cual se envía. Sin cards: texto con `*bold*` + Reply Buttons (≤3, ≤20 char, sin emoji) donde aplique.

---

### 7.1 MENSAJES — Saludo

```
SALUDO PRIMERA VEZ  (plantilla utility → abre WA Flow, §3)
─────────────────────────────────────
"¡Bienvenida a los Mercados de Sevilla! 👋
 Soy tu asistente para pedir fresco desde casa."
[Abrir] → WA Flow onboarding

SALUDO RECURRENTE  (texto libre + Reply Buttons)
─────────────────────────────────────
"Buenos días [Nombre]. Tu mercado es [Mercado].
 ¿Compras allí hoy?"
[Sí, allí voy]  [Cambiar de mercado]

SALUDO FUERA DE HORARIO
─────────────────────────────────────
"Hola [Nombre]. Los puestos abren mañana a las 9:00.
 ¿Quieres que te avise cuando esté el vídeo del día?"
[Sí, avísame]  [No hace falta]
```

---

### 7.2 MENSAJES — Confirmación

```
CONFIRMACIÓN DE PEDIDO  (texto libre con *bold*, sin card)
─────────────────────────────────────────────────────
"He entendido este pedido:

• ½ kg boquerones frescos — *1,75 €*
• 2 acedías limpias — *2,40 €*

*Total estimado: 4,15 €*

📍 Recogida en puesto, mañana 10:00-14:00
💳 Pago al entregar"
[Confirmar]  [Modificar]  [Hablar c/Antonio]

CONFIRMACIÓN FINAL  (texto libre)
─────────────────────────────────────────────────────
"✅ ¡Pedido confirmado! #SGZ-2024-0387
 Te avisamos cuando esté preparado."
[Añadir puesto]  [Mi historial]
```

---

### 7.3 MENSAJES — Error

```
ERROR NLU BAJO  (texto libre, sin emoji)
─────────────────────────────────────
"No he entendido bien.
 ¿Puedes escribirlo de otra forma o mandarme un audio?"
[Reintentar]  [Hablar con Antonio]

ERROR PRODUCTO NO EXISTE  (texto libre)
─────────────────────────────────────
"En Pescadería Antonio no veo [producto].
 ¿Quieres ver lo que sí tiene hoy?"
[Ver del día]  [Cambiar puesto]

ERROR CONEXIÓN  (texto libre, sistema)
─────────────────────────────────────
"⚠️ Algo va lento. Vuelve a enviarlo en un momento."
Sin botones. Reintenta automáticamente a los 10s.

ERROR FUERA DE VENTANA DE PEDIDOS
─────────────────────────────────────
"Los pedidos en Antonio cerraron a las 12:30.
 Mañana a las 9:00 abrimos otra vez."
[Avísame mañana]  [Otro puesto abierto]
```

---

### 7.4 MENSAJES — Espera

```
INDICADOR DE ESCRITURA
─────────────────────────────────────
Nativo del cliente WA. No se controla vía API — aparece
solo mientras el bot procesa, sin poder forzarlo ni
estilizarlo.

ESPERA EXPLÍCITA (>5s, refuerzo opcional)
─────────────────────────────────────
"Entendiendo tu pedido..."

ESPERA RESPUESTA HUMANO  (texto libre, sistema)
─────────────────────────────────────
"Antonio responde habitualmente en menos de 10 min.
 Te aviso cuando conteste."
```

---

### 7.5 MENSAJES — Despedida

```
DESPEDIDA TRAS PEDIDO ENTREGADO  (plantilla utility)
─────────────────────────────────────
"📦 Pedido entregado. ¡Que aproveche!
 ¿Volvemos la próxima semana?"
[Sí, avísame]  [No, gracias]

DESPEDIDA TRAS CANCELACIÓN
─────────────────────────────────────
"Pedido cancelado.
 Cuando quieras pedir de nuevo, escríbeme aquí."
Sin botones.

DESPEDIDA RGPD (baja de servicio)
─────────────────────────────────────
"Tus datos se han borrado.
 Si algún día quieres volver, escribe ALTA."
Sin botones.
```

---

## 8. NAVEGACIÓN CONVERSACIONAL

Patrones para que el usuario nunca se sienta "atrapado" en un flujo.

---

### 8.1 Menú Principal

```
DISPARO: Usuario escribe "menú", "hola", "qué puedes hacer"
         tras la sesión inicial.

"¿Qué necesitas?"

[Hacer un pedido]  [Mis pedidos]        (fila 1, Reply Buttons)
[Cambiar de mercado]  [Mis datos]       (fila 2)
[Hablar con un placero]  [Ayuda]        (fila 3)

REGLA: Reply Buttons son máx 3 por mensaje. Si se necesitan
>3 opciones visibles a la vez → usar List Message (máx 10
filas) en vez de varias filas de botones sueltos.
```

---

### 8.2 Menú Contextual (durante un flujo)

```
Durante un flujo de pedido, si se necesita una 4ª opción más
allá de los 3 Reply Buttons del paso, usar List Message con
"Más opciones" como texto del botón que la abre:

  [Confirmar] [Modificar] [Más opciones]  ← 3er botón abre lista

Lista "Más opciones":
  Volver atrás
  Cancelar pedido
  Hablar con placero
```

---

### 8.3 Volver Atrás

```
SIEMPRE disponible mediante:
  · Reply Button "Volver" cuando el paso tiene >1 nivel
  · Comando texto: "atrás", "volver", "cancelar"

BOT acusa recibo:
"Vale, volvemos al paso anterior."
[Reaparecen los Reply Buttons del paso previo]
```

---

### 8.4 Hablar con una Persona (Escalado humano)

```
DISPARO 1 (manual): Usuario toca "Hablar con Antonio"
DISPARO 2 (automático): NLU baja confianza 3 veces seguidas
DISPARO 3 (palabra clave): "persona", "humano", "alguien real"

"Te paso con Antonio directamente.
 Habitualmente responde en menos de 10 min."

Las siguientes respuestas llegan desde el mismo número de
WhatsApp Business (no hay "avatar" distinto en real — el
placero escribe directamente desde el panel o su propio
teléfono conectado a la cuenta). Sin Reply Buttons automáticos
mientras dura el handover.

RETORNO AL BOT:
Cuando Antonio resuelve:
"Conversación con Antonio cerrada.
 Vuelves al asistente automático."
```

---

## 9. CAPTURA DE DATOS

Las preguntas que el bot hace al usuario. Cada una con su validación, su error y su retry.

---

### 9.1 Nombre

```
PREGUNTA:    "¿Cómo te llamas?"
INPUT:       Texto libre, sin botones.
VALIDACIÓN:  2-40 caracteres, sin números ni símbolos raros.
ERROR:       "Solo el nombre, por favor. Sin números."
PERSISTENCIA: @nombre  (capitalizar inicial automáticamente)
```

---

### 9.2 Teléfono

```
NO SE PREGUNTA. Se captura automáticamente desde WhatsApp.
@telefono = phone_number del contacto WhatsApp.

EXCEPCIÓN: si el teléfono de entrega es distinto al de WhatsApp.
PREGUNTA:  "¿El teléfono de contacto para la entrega es este
            mismo, o quieres dar otro?"
[Este mismo]  [Dar otro número]
```

---

### 9.3 Dirección

```
PREGUNTA:    "¿Cuál es la dirección de entrega?
              Escribe calle, número y planta/puerta."
INPUT:       Texto libre O ubicación nativa de WhatsApp (pin).
VALIDACIÓN:  Mínimo 10 caracteres, contiene número.
             Cruzar con radio de reparto del mercado.
ERROR:       "Esa dirección está fuera del radio de reparto
              de San Gonzalo (3 km).
              ¿Quieres recoger en taquilla?"
[Sí, taquilla]  [Cambiar dirección]
PERSISTENCIA: @direccion, @cp, @lat, @lng

VARIANTE CON PIN: WhatsApp permite compartir ubicación nativa.
Bot acepta cualquiera de las dos formas.
"Puedes escribirla o mandarme tu ubicación con el clip 📎"
```

---

### 9.4 Fecha / Franja de Entrega

```
PREGUNTA:    "¿Cuándo te viene bien?"
INPUT:       Solo Reply Buttons, nunca texto libre (evita
             ambigüedad).

Si son ≤3 franjas → 3 Reply Buttons directos.
Si son >3 → List Message con las franjas disponibles.

REGLA: solo mostrar franjas con stock logístico disponible.
       Si una franja está llena → no aparece, no se desactiva.
PERSISTENCIA: @fecha_entrega, @franja
```

---

### 9.5 Cantidad

```
PREGUNTA:    Implícita en el pedido en lenguaje natural.
             El usuario dice "medio kilo" o "tres unidades".
NLU extrae:  cantidad + unidad → {500, "g"} o {3, "ud"}

CONFIRMACIÓN: el resumen de texto muestra la cantidad parseada
(ej. "½ kg" no "500 g") para validación humana.

EDICIÓN: usuario toca [Modificar] → bot ofrece Reply Buttons
con ajustes comunes:
[-100g]  [Cantidad actual: 500g]  [+100g]
(si se necesita "Borrar producto" como 4ª opción, usar
List Message en vez de un 4º Reply Button)
```

---

## 10. ESTADOS DE PEDIDO — VISTA UNIFICADA

Resumen de los estados definidos en el PRD §9 y su mensaje real.

```
──────────────────────────────────────────────────────────────

  ESTADO         MENSAJE AUTOMÁTICO (texto real, sin card)

  nuevo          — (visible solo para placero, panel §4)

  aceptado       "✓ Antonio ha aceptado tu pedido y está
                  preparándolo."

  preparando     — (cambio interno, sin mensaje al cliente)

  listo          "🔔 Tu pedido está listo.

                  *Total: {{total_final}} €*
                  Paga en efectivo, Bizum o tarjeta al
                  recoger.

                  Pasa antes de las 14:00."

                 total_final lo teclea el placero al marcar
                 "Listo" (post-pesaje) — el bot solo lo repite,
                 nunca lo recalcula ni lo decide (CLAUDE.md.txt).
                 → pedido pasa a "Por cobrar" en el panel (§4)

  en_camino      "🚚 El repartidor está en camino.
                  Llega en ~20 min."

  entregado      "📦 Pedido entregado. ¡Que aproveche!"

  cancelado      "Pedido cancelado."

  incidencia     "Antonio necesita hablar contigo."
                 → escalado humano (§8.4)

──────────────────────────────────────────────────────────────

  TRANSICIONES PERMITIDAS

  nuevo → aceptado, cancelado
  aceptado → preparando, cancelado, incidencia
  preparando → listo, incidencia
  listo → en_camino, entregado
  en_camino → entregado, incidencia

  Cualquier estado puede ir a "incidencia".
  "cancelado" es terminal.
  "entregado" es terminal.

  "Por cobrar" (panel §4) es un sub-estado de pago dentro de
  "listo"/"entregado", no un estado de pedido nuevo del PRD.

──────────────────────────────────────────────────────────────
```

---

## 11. ESCALADO Y MANEJO DE EXCEPCIONES

---

### 11.1 Transferencia a Humano

Cubierto en §8.4 (Hablar con una Persona). El placero entra como interlocutor real desde el panel o su propio WhatsApp conectado a la cuenta. El handover es bidireccional.

---

### 11.2 Fuera de Horario

```
HORARIO BOT: 24/7 (siempre acepta mensajes)
HORARIO PEDIDOS: definido por puesto (típico 9:00-12:30)
HORARIO ESCALADO HUMANO: solo dentro del horario del puesto

MENSAJE FUERA DE HORARIO DE PEDIDOS:
"Los pedidos de Antonio están cerrados hasta mañana 9:00.
 ¿Quieres que te avise cuando abra?"
[Avísame]  [Otro puesto abierto]  [Cancelar]

MENSAJE FUERA DE HORARIO ESCALADO:
"Antonio no está atendiendo ahora.
 ¿Te dejo un aviso para que te conteste mañana?"
[Sí, mañana]  [Vuelvo más tarde]
```

---

### 11.3 Saturación de Consultas

```
DISPARO: >50 conversaciones concurrentes en un puesto.

MENSAJE:
"Hoy hay mucha demanda en Antonio.
 Tu pedido sigue activo, pero la confirmación
 puede tardar 10-15 min más de lo normal.
 ¿Esperas o lo dejamos para mañana?"
[Espero]  [Mañana]
```

---

### 11.4 Producto Agotado en Preparación

```
"⚠️ Las acedías se han agotado.
 ¿Las sustituimos por lenguado pequeño
 al mismo precio?"
[Aceptar]  [Quitar]  [Cancelar todo]

Si "Quitar":
"De acuerdo. Tu pedido queda:
 ½ kg Boquerones frescos     1,75 €
 ¿Confirmas así?"
[Sí]  [Cancelar pedido]
```

---

### 11.5 Cliente No Recoge

```
DISPARO: estado "listo" + 60 min sin recoger.

AVISO 1 (60 min):
"Tu pedido sigue esperándote en Antonio.
 El puesto cierra a las 14:00."

AVISO 2 (cierre - 15 min):
"⏰ Antonio cierra en 15 min. Pasa o se guarda
 para mañana (puede afectar al pescado)."
[Voy ahora]  [No puedo, mañana]  [Cancelar]
```

---

## 12. EDGE CASES Y FALLBACKS

Casos límite que el flujo principal no cubre. Cada uno con su respuesta predefinida.

```
──────────────────────────────────────────────────────────────

  CASO                              FALLBACK

  Usuario manda foto sin contexto   "¿Quieres pedir esto?
                                     Escríbeme qué producto
                                     y cantidad."

  Usuario manda sticker             [Ignorar, no responder.
                                     Mantener contexto previo.]

  Usuario manda audio >2 min        "El audio es muy largo.
                                     Mándamelo en partes o
                                     escríbelo, por favor."

  Usuario escribe en otro idioma    "Hablo español y un poco
                                     de inglés. ¿Lo intentamos
                                     en español?"

  Usuario pide producto de          "Eso lo tiene Carnicería López
  otro puesto                        del mismo mercado.
                                     ¿Quieres pedírselo a ellos?"
                                    [Sí, ir]  [No, sigo aquí]

  Usuario olvida confirmar pedido   Tras 10 min sin respuesta:
                                    "Tu pedido sigue pendiente
                                     de confirmar. ¿Lo cerramos?"
                                    [Confirmar]  [Descartar]

  Pedido duplicado (mismo usuario,  "Veo que ya pediste hoy
   mismo puesto, <1 hora)            en Antonio.
                                     ¿Es otro pedido distinto
                                     o el mismo de antes?"

  Cliente en lista negra            [Bot no responde.
   (2 incidencias previas)           Mensaje único:]
                                    "Para pedir en Antonio tienes
                                     que contactar directamente
                                     con el puesto."

  Mercado cerrado por fiesta        Override manual del placero.
                                    Mensaje: "Hoy Antonio está
                                     cerrado por [motivo].
                                     Volvemos [fecha]."

──────────────────────────────────────────────────────────────
```

---

## 13. HAPPY PATH RESUMIDO

Flujo ideal sin desvíos, para validación rápida con el equipo. Etiquetas entre corchetes = tipo de mensaje WA real, no componente visual.

```
1. Carmen recibe broadcast 9:02                 [plantilla marketing]
   → ve vídeo de Antonio + texto

2. Toca [Pedir]                                 [Reply Button]

3. Bot: "¿Qué quieres hoy?"                     [texto libre]

4. Carmen manda audio: "medio kilo de
   boquerones y dos acedías"                    [audio nativo WA]

5. Bot procesa NLU                              [typing nativo WA,
                                                  no controlable]

6. Bot devuelve resumen en texto + *bold*       [texto libre]
   + [Confirmar] [Modificar] [Hablar Antonio]      [Reply Buttons]

7. Carmen toca [Confirmar]

8. Bot ofrece fulfillment                       [Reply Buttons o
   Carmen toca [Recogida en puesto]              List Message]

9. Bot ofrece pago
   Carmen toca [Al entregar]                    [Reply Buttons]

10. Bot confirma pedido final                   [texto libre]
    → Pedido #SGZ-2024-0387

11. Placero recibe en panel                     [panel web, §4]
    → toca [Aceptar]

12. Bot envía a Carmen:                         [texto libre]
    "✓ Antonio ha aceptado tu pedido"

13. Placero marca [Listo] → teclea total final  [panel web, §4]
    (post-pesaje)

14. Bot envía plantilla pedido_listo_v1:        [plantilla utility]
    "🔔 Listo. Total: 4,15 €. Paga en efectivo,
    Bizum o tarjeta al recoger. Pasa antes de
    las 14:00"
    → pedido pasa a "Por cobrar" en el panel

15. Carmen recoge en puesto y paga en persona.
16. Placero marca [Marcar cobrado] (Efectivo/    [panel web, §4]
    Bizum/Tarjeta) y [Entregado].
17. Bot: "📦 Entregado. ¡Que aproveche!          [plantilla utility]
         ¿Volvemos la próxima semana?"
    [Sí, avísame]  [No, gracias]                 [Reply Buttons]

TIEMPO TOTAL FLUJO: ≤4 min activos de Carmen
NÚMERO DE INTERACCIONES: 6 toques + 1 audio
```

---

## 14. CHECKLIST FINAL DE CONSISTENCIA

```
ANTES DE LIBERAR UN MENSAJE / FLUJO NUEVO:

□  El mensaje cumple el límite de longitud (§6)
□  Usa máximo 1 emoji, y de la lista permitida (§1)
□  Tono coincide con la guía de voz (§5)
□  Máx 3 Reply Buttons por mensaje, ≤20 char, sin emoji (§1, §2)
□  Si necesita >3 opciones, usa List Message, no más botones (§8)
□  Si pide datos, sigue el patrón de captura (§9)
□  Si es proactivo, está dentro de la frecuencia permitida (§6)
□  Tiene fallback definido para input inesperado (§12)
□  El usuario puede [Volver] o [Hablar con persona] (§8)
□  El estado del pedido coincide con la tabla de §10
□  Está disponible en español sin tecnicismos
□  No usa cards, tipografía o colores custom — solo texto,
   *bold*, _italic_ y componentes reales de WA (§2)
□  Si es plantilla Meta: opt-in, frecuencia, baja visible
   (wa-constraints.md §3)
```

---

*Conversation Design System v2.0 — Mercados de Sevilla · Fiel a WhatsApp Business real.*
*La capa visual de portfolio/demo vive en PORTFOLIO_DESIGN.md — no aquí.*
*Constraints técnicas detalladas: wa-constraints.md · Principio rector del bot: CLAUDE.md.txt*
