# Inventario de Flujos — Plataforma Conversacional Mercados de Sevilla

> Extracción exhaustiva de PRD v1.0 + DESIGN v1.1 + restricciones reales WA (`wa-constraints.md`).  
> Cada flujo será un archivo separado en `/docs/flows/NN-nombre-flujo.md` siguiendo la plantilla canónica del final.

---

## 0. Resumen ejecutivo

**Total flujos identificados: 24**

- 6 flujos de cliente (compra)
- 6 flujos de cliente (postventa / soporte)
- 4 flujos de placero (operación)
- 8 flujos de sistema / institucional

**Horarios (única fuente de verdad para todo el copy)**

| Qué | Cuándo |
| --- | --- |
| Pedidos del día | hasta las 12:30 (ventana típica del puesto) |
| Recogida en el puesto | hasta las 14:00 |
| Reparto a domicilio | de 10:00 a 14:00 |
| Taquilla refrigerada | hasta las 20:00 |

> v1.1 — S04 a S07 salieron de los edge cases que estaban sueltos dentro de C01,
> C03 y P02. Al prototiparlos se vio que no eran ramas menores: tienen decisión
> propia y consecuencias distintas, así que pasan a flujo con su propia ficha.
> Los 23 están implementados en `prototype/src/flows/`.
>
> v1.3 — S08 sale del mismo sitio: pedir algo que el placero no ha nombrado hoy
> estaba sin cubrir. Los tres flujos de producto agotado (C08, C06, C05) los
> dispara el placero **después** de aceptar; ninguno cubría el momento de pedir.
>
> v1.2 — C10 se parte en dos: C10 cancela lo que aún no ha tocado nadie y C12
> aparece cuando el placero ya está preparando el pedido y cancelar dejaría
> género tirado. Eran dos reglas de negocio distintas metidas en un selector de
> escenario.

**Para MVP curso Lovable (prototipo navegable)**: 5 flujos prioritarios (P1).  
**Para bot real producción**: los 18.

---

## 1. Mapa de flujos por actor

### CLIENTE — Compra

```
─────────────────────────────────────────────────────────────────
ID    NOMBRE                              PRIO   COMPLEJIDAD
─────────────────────────────────────────────────────────────────
C01   Onboarding primera vez               P1     Media
C02   Enrutamiento recurrente              P1     Baja
C03   Pedido desde broadcast diario        P1     Media
C04   Pedido espontáneo (sin broadcast)    P2     Media
C05   Pedido multi-puesto                  P2     Alta
C06   Repetir pedido anterior              P2     Baja
─────────────────────────────────────────────────────────────────
```

### CLIENTE — Postventa y soporte

```
─────────────────────────────────────────────────────────────────
C07   Tracking de pedido (estados)         P1     Baja
C08   Sustitución de producto agotado      P2     Media
C09   Modificación de pedido               P3     Media
C10   Cancelar antes de aceptar            P2     Baja
C11   Hablar con persona (escalado)        P1     Alta
C12   Cancelar con el pedido en marcha     P2     Media
─────────────────────────────────────────────────────────────────
```

### PLACERO — Operación

```
─────────────────────────────────────────────────────────────────
P01   Alta del puesto (onboarding placero) P3     Media
P02   Subida de vídeo diario               P1     Baja
P03   Gestión de pedido entrante           P1     Alta
P04   Cierre del día / liquidación         P3     Baja
─────────────────────────────────────────────────────────────────
```

### SISTEMA / INSTITUCIONAL

```
─────────────────────────────────────────────────────────────────
S01   Fuera de horario                     P2     Baja
S02   Cliente no recoge / no responde      P2     Media
S03   Lista negra / cliente bloqueado      P3     Baja
S04   NLU no entiende el pedido            P1     Media
S05   Alta abandonada a mitad              P2     Baja
S06   Código postal fuera de zona          P2     Baja
S07   El placero no sube el vídeo          P1     Media
S08   Pides algo que hoy no hay            P2     Media
─────────────────────────────────────────────────────────────────
```

**Leyenda prioridad**:
- P1 = MVP curso Lovable + base Antonio. Imprescindible.
- P2 = MVP producción. Sin esto el bot no es viable.
- P3 = Fase 2. Mejoras operativas y de escala.

---

## 2. Fichas resumen por flujo

### C01 — Onboarding primera vez

- **Trigger**: usuario manda primer mensaje al número del mercado (vía QR, cartel, recomendación).
- **Objetivo**: capturar `nombre`, `cp`, `mercado_fav`, `puestos_fav[]`, opt-in marketing.
- **Componente WA principal**: **WhatsApp Flow** de 2-3 pantallas.
  - Pantalla 1: bienvenida + TextInput nombre + TextInput CP.
  - Pantalla 2: Dropdown mercados disponibles + CheckboxGroup puestos.
  - Pantalla 3: OptIn marketing + Footer "Empezar".
- **Salida**: variables persistidas, ofrece al usuario broadcast del día siguiente.
- **Edge cases**: usuario sale a mitad del Flow, CP fuera de zona de servicio.
- **Dependencias**: lista de mercados activos en BD.

### C02 — Enrutamiento recurrente

- **Trigger**: usuario con `mercado_fav` ya guardado escribe al bot.
- **Objetivo**: 1 mensaje, 2 reply buttons. Cero fricción.
- **Mensaje**: *"Hola Carmen 👋 ¿Quieres ver lo que hay hoy en San Gonzalo?"* `[Sí, ver hoy]` `[Cambiar mercado]`
- **Componente WA**: texto + Reply Buttons (3 máx, aquí 2).
- **Edge cases**: mercado fav cerrado hoy, usuario quiere otro mercado.

### C03 — Pedido desde broadcast diario *(núcleo Antonio)*

- **Trigger**: usuario recibe broadcast 9:00, toca `[Pedir]`.
- **Objetivo**: cerrar pedido en ≤4 min.
- **Pasos**:
  1. Bot: *"¿Qué quieres hoy?"*
  2. Usuario escribe en lenguaje natural (texto. Audio opcional).
  3. Bot procesa NLU → devuelve resumen estructurado + `[Confirmar]` `[Modificar]` `[Hablar con alguien]`.
  4. Usuario confirma → bot ofrece fulfillment (List message con ≤3 opciones).
  5. Si reparto a domicilio y no hay dirección en la ficha del cliente → el bot la pide una sola vez en texto libre, la repite tal cual y la guarda. No la valida, no la normaliza y no decide si entra en la zona de reparto: eso lo mira el placero al aceptar. En los pedidos siguientes la recupera de la ficha y solo la enseña en el recibo (`C04`, `C06`, `C11`).
  6. Si recogida/domicilio → pago al entregar (sin pasarela).
  7. Si taquilla → CTA URL Bizum.
  8. Bot envía recibo con ID pedido, y la dirección en él cuando es reparto.
- **Componentes WA**: texto, Reply Buttons, List message, CTA URL.
- **Edge cases**: NLU falla, producto no disponible, fuera de horario de pedidos.

### C04 — Pedido espontáneo

- **Trigger**: usuario inicia conversación sin venir de broadcast (a media mañana, recordó algo).
- **Objetivo**: igual que C03 pero arrancando desde selector de mercado/puesto.
- Reusa C02 + C03.

### C05 — Pedido multi-puesto

- **Trigger**: tras C03 confirmado, bot pregunta *"¿Añadir productos de otro puesto?"* `[Ver puestos]` `[Finalizar]`.
- **Objetivo**: agregar SubPedidos al mismo Pedido (entidad PRD §9).
- **Componente WA**: List message con puestos del mercado.
- **Riesgo**: cada SubPedido es independiente operativamente (cada placero acepta el suyo), pero el cliente lo ve como uno solo.
- **Edge cases**: un placero rechaza, el otro acepta. Lógica de pedido parcial.

### C06 — Repetir pedido

- **Trigger**: usuario toca `[Repetir]` en notificación post-entrega, o escribe "lo de siempre".
- **Objetivo**: 1 toque → confirmación directa.
- **Mensaje**: *"¿Lo de siempre? ½ kg boquerones, 2 acedías. Recogida mañana 10:00."* `[Sí]` `[Cambiar]` `[Hablar]`
- **Componente**: texto + Reply Buttons.

### C07 — Tracking de pedido

- **Trigger**: cambio de estado en backend (placero marca Aceptado/Listo/etc.).
- **Objetivo**: notificación proactiva con plantilla utility.
- **Componente WA**: plantillas pre-aprobadas (`pedido_aceptado_v1`, `pedido_listo_v1`, etc.).
- **Frecuencia**: máx 1 por cambio de estado. Sin spam.
- Definidas en `wa-constraints.md` §6.6.

### C08 — Sustitución de producto agotado

- **Trigger**: placero marca producto agotado durante preparación.
- **Objetivo**: pregunta al cliente qué hacer.
- **Mensaje**: *"⚠️ Antonio no tiene gambas blancas hoy. ¿Te valen langostinos cocidos (8€/kg)?"* `[Aceptar]` `[Quitar del pedido]` `[Cancelar pedido]`
- **Componente**: texto + Reply Buttons.
- **Default RGPD**: NO sustituir sin consentimiento explícito.

### C09 — Modificación de pedido

- **Trigger**: cliente toca `[Modificar]` antes de confirmar, o escribe tras confirmar.
- **Objetivo**: editar items, cantidad, fulfillment.
- **Componente**: texto libre + Reply Buttons. Si el pedido ya está "aceptado" por placero, escala a C11.
- **Regla negocio (PRD §10.5)**: cancelación/modificación libre solo hasta estado "aceptado".

### C10 — Cancelar antes de aceptar

- **Trigger**: cliente pide cancelar mientras el pedido sigue en estado "pendiente".
- **Objetivo**: anular sin coste, pero nunca de un solo toque: siempre media una confirmación.
- **Mensaje**: *"Antonio todavía no ha visto tu pedido, así que puedo anularlo sin más. ¿Cancelo el #SGZ-2026-0387?"* `[Sí, cancélalo]` `[No, sigo con él]`
- **Sin incidencia**: nadie ha trabajado todavía en ese pedido.

### C12 — Cancelar con el pedido en marcha

- **Trigger**: cliente pide cancelar cuando el placero ya aceptó y está preparando.
- **Objetivo**: el pedido ya no se cancela. Se ofrecen las dos salidas que no tiran género.
- **Mensaje**: *"Antonio ya lo está preparando, así que este pedido ya no se puede cancelar."* `[Recojo mañana]` `[Déjalo en taquilla]` `[Hablar con Antonio]`
- **Regla**: quien puede anular un pedido ya preparado es el placero, no el bot. Por eso la tercera salida es C11. Rige en todos los flujos por igual, incluido el aviso de cierre de C07/S02: en cuanto el pedido está preparado desaparece el botón de cancelar.
- **Si mañana tampoco se recoge** → S02, con su incidencia, y siempre después de que el placero haya llamado.

### C11 — Hablar con persona (escalado)

- **Trigger**: cliente toca `[Hablar con {nombre}]` en cualquier punto. El botón se compone con el nombre del placero que hay en la ficha del puesto (`Hablar con Antonio`); si el nombre no cabe en los 20 caracteres de WhatsApp, cae a `Hablar con el puesto`.
- **Objetivo**: bidireccional. El bot se aparta, el placero responde desde panel Glide/Softr.
- **Componente**: handoff vía API. Mensaje al cliente: *"Te paso con Antonio. Suele responder en 5-10 min."*
- **Dónde le llega a él**: al hilo del asistente del placero en WhatsApp, con el nombre del cliente y el número de pedido por delante (`placero_escalado_v1`). Lo que escribe ahí lo reenvía el bot al chat del cliente. **Al panel no llega**: en la tablet no lo vería (DESIGN.md §4.1).
- **Horario**: solo dentro de horario del puesto. Fuera → S01.
- **Riesgo MVP**: el placero debe tener panel abierto. Si no, cae a "te llama después".

### P01 — Alta del puesto

- **Trigger**: visita comercial / alta manual por admin.
- **Objetivo**: capturar datos placero (PRD §7.1) + activar broadcast diario.
- **Componente**: NO es flujo de WA, es formulario admin (Airtable/Softr). Mencionado aquí por completitud.

### P02 — Subida de vídeo diario

- **Trigger**: placero a las 8:30 AM, manda vídeo del mostrador al bot administrador.
- **Objetivo**: bot recibe vídeo, lo asocia a puesto, dispara broadcast a suscriptores.
- **Componente**: mensaje media entrante + (opcional) Reply Buttons para confirmar productos del día.
- **Edge cases**: vídeo >16MB (comprimir o pedir reenvío), placero olvida (recordatorio 8:40), placero envía pero el broadcast falla (logging).

### P03 — Gestión de pedido entrante

- **Trigger**: cliente confirma pedido en C03/C05.
- **Objetivo**: el placero recibe el pedido y lo resuelve por donde le venga bien — WhatsApp o panel. Marca Aceptar / Producto agotado / No puedo hoy.
- **Componente**: los dos a la vez. WhatsApp es el mando a distancia y el panel la mesa de trabajo (DESIGN.md §4): un toque o una cifra caben en el chat, y lo que exige mirar la cola entera es panel. El aviso de pedido nuevo llega fuera de ventana 24h, así que es plantilla utility con quick replies (`placero_pedido_nuevo_v1`, wa-constraints §6.7).
- **Estado**: vive en una sola fila de la base (Airtable en el MVP), no en la conversación. WhatsApp y panel no se sincronizan entre sí porque los dos escriben ahí. **El aviso al cliente lo dispara el cambio de estado, nunca el botón**, así que aceptar desde el móvil y desde el panel producen el mismo mensaje una sola vez. Un botón antiguo del historial se resuelve contra el estado actual y no repite nada (DESIGN.md §4.2 y §4.3).
- **Acciones placero**: `[Aceptar]` `[Producto agotado]` `[Marcar preparado]` `[Listo]` (pide total final post-pesaje) `[Marcar cobrado]` (Efectivo/Bizum/Tarjeta) `[Entregado]`.
- **Cada acción dispara plantilla WA al cliente (C07)**, salvo `[Marcar cobrado]` que es registro interno del placero y no genera mensaje.
- Detalle del campo total final y el sub-estado "Por cobrar": DESIGN.md §4 y §10.

### P04 — Cierre del día / liquidación

- **Trigger**: 14:30 cierre del mercado, o cron diario.
- **Objetivo**: placero ve resumen del día. Mensual: liquidación.
- **Componente**: vista panel + email/PDF. No flujo WA estrictamente.

### S01 — Fuera de horario

- **Trigger**: usuario intenta pedir fuera del horario del puesto.
- **Objetivo**: el pedido se coge igual, pero queda pendiente de que el placero lo acepte al abrir.
- **Mensaje**: *"Antonio ya ha cerrado por hoy. Puedo apuntarte el pedido y él lo confirma mañana a las 9:00, cuando abra."* `[Apúntamelo]` `[Otro puesto abierto]` `[Ahora no]`
- **Regla**: el bot apunta, no compromete. Nada de dar por cerrado un pedido que el placero no ha visto (principio rector). La confirmación sale por P03 y llega como plantilla utility.
- **Nada de `[Cancelar]`**: aquí no hay ningún pedido que cancelar, solo una intención.
- **Componente**: texto + Reply Buttons.

### S02 — Cliente no recoge

- **Trigger**: estado "listo" + 60 min sin recoger (cron).
- **Objetivo**: 2 avisos progresivos antes del cierre del puesto.
- **Aviso 1 (60 min listo)**: *"Tu pedido sigue esperándote. Antonio cierra a las 14:00."*
- **Llamada del placero (cierre -15 min)**: antes del último aviso, Antonio llama por teléfono y anota lo que pase en su panel (P04). El bot no sustituye esa llamada.
- **Aviso 2 (cierre -15 min)**: *"⏰ Antonio cierra en 15 min."* `[Voy ahora]` `[Guárdalo para mañana]` `[Hablar con Antonio]`
- **Nada de `[Cancelar]`**: el pedido ya está pesado y envuelto, así que aquí rige la regla de C12 — un pedido preparado no lo anula el bot, lo anula el placero. Por eso la tercera salida es C11 y no una cancelación.
- **La incidencia llega después de la llamada, no del silencio**: si al día siguiente el cliente dice que no puede ir, Antonio llama, y solo entonces se cierra el pedido con incidencia. Un cliente que no contesta no genera incidencia por sí solo.
- **Redacción única**: la misma situación se llama igual en C07, S02 y P04 — «guardar para mañana», nunca «no puedo, mañana».
- **Componente**: plantillas utility (fuera ventana 24h).

### S03 — Cliente en lista negra

- **Trigger**: 2 incidencias previas no resueltas (PRD §13).
- **Mensaje único**: *"Para pedir en Pescadería Antonio tienes que contactar directamente con el puesto."*
- **Componente**: respuesta automática única, sin entrar al flujo normal.

### S04 — El bot no entiende el pedido

- **Trigger**: el audio o el texto no permiten extraer producto y cantidad con confianza suficiente.
- **Objetivo**: no apuntar nunca un pedido inventado. Reintentar una vez y, si sigue sin entenderse, dar salida.
- **Regla**: se pide lo que falta, no todo otra vez. Si se entendió el producto pero no la cantidad, solo se pregunta la cantidad.
- **Salidas**: `[Te lo escribo]` `[Hablar con alguien]` `[Lo de siempre]`.
- **Detalle**: al escalar a C11 el audio original viaja con el traspaso. El cliente no repite nada.

### S05 — Alta abandonada a mitad

- **Trigger**: el usuario cierra el WhatsApp Flow de C01 sin llegar al final.
- **Objetivo**: conservar lo ya introducido y retomar en la pantalla donde se salió, no desde cero.
- **Frecuencia de recordatorio**: **uno solo**, al día siguiente. Insistir es lo que hace que la gente bloquee el número.
- **RGPD**: un alta a medias también son datos personales. `[Borrar mis datos]` está en el mismo mensaje.

### S06 — Código postal fuera de zona

- **Trigger**: el CP introducido en C01 no está en zona de reparto.
- **Objetivo**: que quedarse fuera del reparto no signifique quedarse fuera de la plataforma.
- **Salidas**: los dos o tres mercados que sí tiene cerca, para darse de alta y recoger. Sin taquilla ni promesa de avisar cuando el reparto llegue a su zona: no se promete lo que no hay fecha de dar.
- **Producto**: los CP que quedan fuera se guardan. Es el dato que dice dónde abrir reparto después.

### S07 — El placero no sube el vídeo

- **Trigger**: son las 9:00 y no ha llegado vídeo del puesto (cron, tras recordatorio a las 8:40).
- **Objetivo**: no mandar difusión sin género verificado.
- **Regla dura**: no se reutiliza el vídeo de ayer. El vídeo vale porque es de hoy.
- **Estado del puesto**: *abierto, sin novedades del día*. Se puede pedir, pero no hay difusión.
- **Escalado**: tres días seguidos sin vídeo, aviso al gestor del mercado.

### S08 — Pides algo que hoy no hay

- **Trigger**: el cliente pide un producto que no está en la lista del día del puesto
  (la que el placero confirmó al mandar el vídeo, P02).
- **Objetivo**: avisar sin decidir. El bot no tiene inventario y no se lo inventa.
- **La distinción que sostiene el flujo**: que el placero **no haya nombrado** algo no
  prueba que no lo tenga —nombró tres cosas de un mostrador que tiene veinte—, así que
  se apunta con aviso. Que **haya dicho que se le acabó** sí lo prueba, y entonces no se
  apunta: prometerlo sabiendo que no está es peor que no tenerlo.
- **Salidas**: `[Ver lo de hoy]` (List message con la lista del día), `[Apúntalo igual]`
  y `[Hablar con {nombre}]`.
- **Alcance**: solo vale para pedidos del mismo día. En un pedido para mañana el vídeo
  de mañana todavía no existe, así que el bot no puede avisar de nada y la respuesta la
  da el placero al aceptar.

---

## 3. Dependencias críticas entre flujos

```
C01 → C02         (onboarding crea mercado_fav → recurrente lo lee)
C02 → C03/C04     (enrutamiento entra a pedido)
C03 → C05         (multi-puesto opcional tras confirmación)
C03 → C07         (todo pedido dispara tracking)
P03 → C07         (acciones placero disparan notificaciones cliente)
P03 → C08         (placero marca agotado → cliente decide)
C03 ↔ C11         (escalado humano puede salir en cualquier punto)
C07 → C10/S02     (tracking puede llevar a cancelación o no-recogida)
C10 → C12         (si el placero ya aceptó, la cancelación deja de ser libre)
P02 → C03         (vídeo diario abre la ventana de pedidos)
C01 → S05/S06     (el alta se puede abandonar o caer fuera de zona)
C03 → S04         (si no se entiende el pedido, se pregunta o se escala)
S04 → C11/C06     (salidas del malentendido: persona o «lo de siempre»)
P02 → S07         (sin vídeo no hay difusión)
P02 → S08         (la lista del día es lo que permite avisar de lo que falta)
C03 → S08         (se pide algo que no está en la lista de hoy)
S08 → C11         (para saber lo que hay de verdad, pregunta la persona)
S07 → S01         (si además no abre, los clientes caen en fuera de horario)
S02 → S03         (segunda incidencia sin resolver y el cliente queda bloqueado)
```

---

## 4. Roadmap de detalle (qué documentar primero)

### Sprint 2 — Flujos P1 (5 flujos)
Detallar en `/docs/flows/`:
1. `01-onboarding.md` (C01)
2. `02-recurrente.md` (C02)
3. `03-pedido-broadcast.md` (C03) ← **el más importante**
4. `04-tracking.md` (C07)
5. `05-escalado-humano.md` (C11)

### Sprint 3 — Flujos P2 (8 flujos)
C04, C05, C06, C08, C10, C12, P02, P03, S01

### Sprint 4 — Flujos P3 (5 flujos)
C09, P01, P04, S02, S03

---

## 5. Decisiones pendientes (te las pregunto al ir detallando cada uno)

| Tema | Decisión necesaria antes de | Tu input |
|---|---|---|
| Reparto a domicilio en MVP curso: ¿incluir o solo recogida? | C03 | Incluir reparto |
| Taquilla refrigerada: ¿hay en San Gonzalo? | C03 | Sí, hay |
| Idioma único castellano o multi | C01 | castellano |
| NLU LLM en MVP curso o solo botones | C03 | Todo lo que se pueda hacer con botones mejor |
| Mínimo 15€ domicilio: ¿incluir en prototipo? | C03 | Sí |
| Onboarding asistido por familiar para mayores: ¿flujo aparte? | C01 | No |

---

## 6. Plantilla canónica para `/docs/flows/NN-nombre.md`

Cada flujo detallado seguirá esta estructura:

```markdown
# Flujo NN — Nombre del flujo

**Actor:** Cliente / Placero / Sistema  
**Prioridad:** P1 / P2 / P3  
**Trigger:** Qué dispara el flujo  
**Objetivo:** Una frase. Qué consigue el actor al completarlo.  
**Tiempo objetivo:** ≤X min

## Precondiciones
- Variables que deben existir
- Estados previos del sistema

## Variables que usa / produce
| Variable | Lee | Escribe |
|---|---|---|

## Diagrama de turnos

```
USUARIO                        BOT                          SISTEMA
─────────────────────────────────────────────────────────────────
[manda mensaje]
                               [responde texto + buttons]
[toca botón X]
                                                            [actualiza BD]
                               [confirma + tracking]
─────────────────────────────────────────────────────────────────
```

## Mensajes literales

### Turno 1 — Bot
**Tipo WA**: Texto + Reply Buttons  
**Body**:  
> Hola {{nombre}} 👋 ¿En qué te ayudo?

**Buttons**: `[Pedir]` `[Repetir]` `[Hablar con Antonio]`

### Turno 2 — Bot (si usuario toca [Pedir])
...

## Variables y persistencia
- `@last_intent = "pedir"`
- ...

## Edge cases
| Caso | Respuesta bot |
|---|---|
| Usuario manda sticker | Ignorar |
| ... | ... |

## Validación WA
- [ ] Cumple límites de `wa-constraints.md`
- [ ] Botones ≤3 y ≤20 char
- [ ] Plantillas marketing fuera 24h: ¿cuáles necesita?

## Accesibilidad
- Lenguaje A2 castellano
- Funciona sin pulsar nada (alternativa texto)
- ...

## Dependencias
- Flujos previos: C0X
- Flujos siguientes: C0Y

## Métricas
- Tasa de finalización objetivo: X%
- Tiempo medio objetivo: Y min
```

---

*v1.0 — Inventario completo. Siguiente paso: detallar los 5 flujos P1.*
