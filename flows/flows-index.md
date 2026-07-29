# Inventario de Flujos — Plataforma Conversacional Mercados de Sevilla

> Extracción exhaustiva de PRD v1.0 + DESIGN v1.1 + restricciones reales WA (`wa-constraints.md`).  
> Cada flujo será un archivo separado en `/docs/flows/NN-nombre-flujo.md` siguiendo la plantilla canónica del final.

---

## 0. Resumen ejecutivo

**Total flujos identificados: 18**

- 6 flujos de cliente (compra)
- 5 flujos de cliente (postventa / soporte)
- 4 flujos de placero (operación)
- 3 flujos de sistema / institucional

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
C10   Cancelación                          P2     Baja
C11   Hablar con persona (escalado)        P1     Alta
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
- **Mensaje**: *"Hola Carmen 👋 ¿Compras hoy en San Gonzalo?"* `[Sí, ver hoy]` `[Cambiar mercado]`
- **Componente WA**: texto + Reply Buttons (3 máx, aquí 2).
- **Edge cases**: mercado fav cerrado hoy, usuario quiere otro mercado.

### C03 — Pedido desde broadcast diario *(núcleo Antonio)*

- **Trigger**: usuario recibe broadcast 9:00, toca `[Pedir]`.
- **Objetivo**: cerrar pedido en ≤4 min.
- **Pasos**:
  1. Bot: *"¿Qué quieres hoy?"*
  2. Usuario escribe en lenguaje natural (texto. Audio opcional).
  3. Bot procesa NLU → devuelve resumen estructurado + `[Confirmar]` `[Modificar]` `[Hablar c/Antonio]`.
  4. Usuario confirma → bot ofrece fulfillment (List message con ≤3 opciones).
  5. Si recogida/domicilio → pago al entregar (sin pasarela).
  6. Si taquilla → CTA URL Bizum.
  7. Bot envía recibo con ID pedido.
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
- **Mensaje**: *"⚠️ Antonio no tiene gambas blancas hoy. ¿Te valen langostinos cocidos (8€/kg)?"* `[Sí, cambio]` `[No, quítalo]` `[Cancelar]`
- **Componente**: texto + Reply Buttons.
- **Default RGPD**: NO sustituir sin consentimiento explícito.

### C09 — Modificación de pedido

- **Trigger**: cliente toca `[Modificar]` antes de confirmar, o escribe tras confirmar.
- **Objetivo**: editar items, cantidad, fulfillment.
- **Componente**: texto libre + Reply Buttons. Si el pedido ya está "aceptado" por placero, escala a C11.
- **Regla negocio (PRD §10.5)**: cancelación/modificación libre solo hasta estado "aceptado".

### C10 — Cancelación

- **Trigger**: cliente toca `[Cancelar]` desde tracking o desde confirmación.
- **Objetivo**: cancelar sin fricción si pre-aceptado; pedir confirmación si post-aceptado.
- **Mensaje pre-aceptado**: *"Pedido cancelado. ¿Algo más?"*
- **Mensaje post-aceptado**: *"Antonio ya está preparándolo. ¿Confirmas cancelar?"* `[Sí, cancelar]` `[No, lo recojo]`

### C11 — Hablar con persona (escalado)

- **Trigger**: cliente toca `[Hablar c/Antonio]` en cualquier punto.
- **Objetivo**: bidireccional. El bot se aparta, el placero responde desde panel Glide/Softr.
- **Componente**: handoff vía API a panel humano. Mensaje al cliente: *"Te paso con Antonio. Suele responder en 5-10 min."*
- **Horario**: solo dentro de horario del puesto. Fuera → S01.
- **Riesgo MVP**: el placero debe tener panel abierto. Si no, cae a "te llama después".

### P01 — Alta del puesto

- **Trigger**: visita comercial / alta manual por admin.
- **Objetivo**: capturar datos placero (PRD §7.1) + activar broadcast diario.
- **Componente**: NO es flujo de WA, es formulario admin (Airtable/Softr). Mencionado aquí por completitud.

### P02 — Subida de vídeo diario

- **Trigger**: placero a las 8:00 AM, manda vídeo del mostrador al bot administrador.
- **Objetivo**: bot recibe vídeo, lo asocia a puesto, dispara broadcast a suscriptores.
- **Componente**: mensaje media entrante + (opcional) Reply Buttons para confirmar productos del día.
- **Edge cases**: vídeo >16MB (comprimir o pedir reenvío), placero olvida (recordatorio 8:30), placero envía pero el broadcast falla (logging).

### P03 — Gestión de pedido entrante

- **Trigger**: cliente confirma pedido en C03/C05.
- **Objetivo**: placero recibe pedido en panel Glide/Softr, marca Aceptar / Sustitución / Rechazar.
- **Componente**: panel web fuera de WA + notificación WA opcional al placero ("Nuevo pedido #SGZ-2024-0387").
- **Acciones placero**: `[Aceptar]` `[Producto agotado]` `[Marcar preparado]` `[Listo]` (pide total final post-pesaje) `[Marcar cobrado]` (Efectivo/Bizum/Tarjeta) `[Entregado]`.
- **Cada acción dispara plantilla WA al cliente (C07)**, salvo `[Marcar cobrado]` que es registro interno del placero y no genera mensaje.
- Detalle del campo total final y el sub-estado "Por cobrar": DESIGN.md §4 y §10.

### P04 — Cierre del día / liquidación

- **Trigger**: 14:30 cierre del mercado, o cron diario.
- **Objetivo**: placero ve resumen del día. Mensual: liquidación.
- **Componente**: vista panel + email/PDF. No flujo WA estrictamente.

### S01 — Fuera de horario

- **Trigger**: usuario intenta pedir fuera del horario del puesto.
- **Mensaje**: *"Los pedidos de Antonio están cerrados hasta mañana 9:00. ¿Te aviso cuando abra?"* `[Avísame]` `[Otro puesto abierto]` `[Cancelar]`
- **Componente**: texto + Reply Buttons.

### S02 — Cliente no recoge

- **Trigger**: estado "listo" + 60 min sin recoger (cron).
- **Objetivo**: 2 avisos progresivos antes del cierre del puesto.
- **Aviso 1 (60 min listo)**: *"Tu pedido sigue esperándote. Antonio cierra a las 14:00."*
- **Aviso 2 (cierre -15 min)**: *"⏰ Antonio cierra en 15 min."* `[Voy ahora]` `[No puedo, mañana]` `[Cancelar]`
- **Componente**: plantillas utility (fuera ventana 24h).

### S03 — Cliente en lista negra

- **Trigger**: 2 incidencias previas no resueltas (PRD §13).
- **Mensaje único**: *"Para pedir en Antonio tienes que contactar directamente con el puesto."*
- **Componente**: respuesta automática única, sin entrar al flujo normal.

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
P02 → C03         (vídeo diario abre la ventana de pedidos)
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
C04, C05, C06, C08, C10, P02, P03, S01

### Sprint 4 — Flujos P3 (5 flujos)
C09, P01, P04, S02, S03

---

## 5. Decisiones pendientes (te las pregunto al ir detallando cada uno)

| Tema | Decisión necesaria antes de | Tu input |
|---|---|---|
| Reparto a domicilio en MVP curso: ¿incluir o solo recogida? | C03 | ? |
| Taquilla refrigerada: ¿hay en San Gonzalo? | C03 | ? |
| Idioma único castellano o multi | C01 | castellano |
| NLU LLM en MVP curso o solo botones | C03 | ? |
| Mínimo 15€ domicilio: ¿incluir en prototipo? | C03 | ? |
| Onboarding asistido por familiar para mayores: ¿flujo aparte? | C01 | ? |

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

**Buttons**: `[Pedir]` `[Repetir]` `[Hablar c/Antonio]`

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
