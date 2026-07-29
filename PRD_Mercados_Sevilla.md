# PRD — Plataforma Conversacional para Mercados de Abastos de Sevilla

**Versión:** 1.0 MVP  
**Alcance:** Funcional. Sin UI, sin código.

---

## 1. Contexto e hipótesis de partida

### 1.1 Demanda existente, no inventada

Tres perfiles con motivaciones distintas pero convergentes en la necesidad de un canal digital para comprar fresco en mercado:

- **Mayor (65+):** quiere seguir comprando en su puesto sin desplazarse. Usa WhatsApp pero teme el pago digital.
- **Joven (25-45):** quiere comprar fresco y local, pero el horario de mercado (9-14:30) choca con su jornada laboral.
- **Placista:** quiere más facturación sin romper el ritmo del puesto físico ni asumir comisiones abusivas.

### 1.2 Dos evidencias contrapuestas en el mismo territorio

> **Nota de investigación:** «Antonio» es un seudónimo. Corresponde a un placero real del Mercado de San Gonzalo cuya operación se observó de primera mano. Se anonimiza porque no ha dado permiso para aparecer con su nombre en materiales públicos. El hallazgo es real; el nombre, no.

**Evidencia A — Pescadería Antonio (Mercado San Gonzalo):** lleva años funcionando con éxito vía WhatsApp. Vídeo diario del mostrador a lista de difusión, pedidos por chat en lenguaje natural, pago al entregar (efectivo/tarjeta/Bizum), recogida o domicilio. Cero plataforma, cero comisión, alta recurrencia. **El modelo conversacional ya está validado por el mercado real.**

**Evidencia B — mercadosdesevilla.es:** plataforma institucional (Ayuntamiento + Hermeneus World) operando en 11 mercados, con app, web, taquillas y reparto. Infrautilizada. **El modelo e-commerce clásico no ha resuelto el problema** pese a tener infraestructura, presupuesto público y respaldo institucional.

### 1.3 Diagnóstico sin sesgo

El éxito de Antonio no demuestra que WhatsApp sea la única respuesta. Demuestra que el modelo ganador combina:

- Canal cotidiano del usuario (no exige aprender nada nuevo).
- Contenido vivo y diario (vídeo del mostrador = catálogo + stock + confianza).
- Relación directa con un placista identificable.
- Pago flexible y diferido.
- Cero fricción de registro/instalación.

mercadosdesevilla falla porque rompe los cinco puntos a la vez. Cualquier nuevo producto debe respetarlos.

### 1.4 Qué falta a Antonio para escalar

- No escala más allá de su lista de difusión (límite técnico 256 y operativo del placista).
- No agrega pedidos de varios puestos del mismo mercado.
- No hay logística unificada.
- No genera datos para placista ni institución.
- Depende 100% de la disponibilidad y atención del placista.

**La oportunidad es industrializar Antonio sin romperlo, y resolver lo que mercadosdesevilla intentó (multi-puesto, logística, taquillas) pero por la vía conversacional.**

---

## 2. Tesis del producto

Capa conversacional multi-canal sobre los mercados de abastos de Sevilla que:

1. Replica el modelo Antonio como unidad mínima funcional.
2. Añade agregación multi-puesto, logística unificada y datos.
3. Convive (o se integra) con mercadosdesevilla en lugar de competir.
4. Es agnóstica de canal: WhatsApp primero, pero arquitectura preparada para Telegram, PWA, voz e integración con la app municipal.

---

## 3. Objetivos del MVP

1. Replicar Antonio con 5 puestos en 1 mercado piloto (San Gonzalo) sin que sus clientas actuales noten degradación.
2. Validar agregación multi-puesto y logística unificada.
3. Validar que un mayor completa un pedido sin asistencia.
4. Validar que un placista gestiona ≥10 pedidos/día sin frenar la venta presencial.
5. Generar datos defendibles ante Ayuntamiento y Hermeneus World.

**KPIs piloto — 3 meses, 1 mercado:**

| KPI | Objetivo |
|---|---|
| Compradoras activas recurrentes (≥2 pedidos/mes) | 100 |
| Puestos activos | 5 |
| Tasa de finalización del flujo | ≥75% |
| Tiempo medio de pedido | ≤4 min |
| Errores de stock | <10% pedidos |
| NPS cliente mayor | ≥40 |
| NPS placista | ≥30 |

---

## 4. Análisis multi-canal (decisión sin sesgo)

| Canal | Pro | Contra | Rol en MVP |
|---|---|---|---|
| **WhatsApp Business API** | Penetración total. Caso Antonio validado. Audio, vídeo, listas. | Coste por conversación. Plantillas con aprobación Meta. Restricciones de difusión. | **Canal primario** |
| **Telegram Bot API** | Gratis. Sin restricciones de difusión. Bots potentes. Canales sin límite. | Baja adopción en mayores y placistas. | Fase 2 — espejo para jóvenes |
| **PWA ligera** | Sin instalación. Pago online integrado. Historial. Cumple requisitos institucionales. | Requiere abrir navegador. Rompe el hábito chat. | **Complemento opcional** desde WhatsApp |
| **SMS** | Universal, sin app. | Sin multimedia. Coste alto. | Solo notificaciones críticas de entrega |
| **Llamada de voz / IVR** | Mínima fricción +75. | No escalable, caro. | Fallback humano de soporte |
| **App nativa** | Push, mejor UX continua. | Fricción instalación. mercadosdesevilla ya probó que no basta. | No MVP |
| **Email** | Universal, asincrónico. | Mayores no revisan. | Facturas y resúmenes |
| **iMessage / RCS** | Calidad alta. | Fragmentación iOS/Android. Sin masa crítica mayores. | No MVP |
| **Instagram DM / TikTok DM** | Captación perfil joven. | Inutilizable para mayores y placistas. | Fase 2 captación |

**Arquitectura de canales MVP:**
- **Primario:** WhatsApp Business API.
- **Complemento opcional:** PWA enlazada desde WhatsApp para checkout online, historial, repetir pedido, factura.
- **Notificaciones críticas:** SMS para "tu pedido está en la puerta".
- **Soporte:** línea de voz humana en horario de mercado.
- **Datos para institución:** dashboard web no-code.

---

## 5. Perfiles de usuario y motivaciones críticas

| Perfil | Canal | Necesidad funcional crítica | Riesgo de abandono |
|---|---|---|---|
| **Carmen, 71 (mayor)** | WhatsApp puro, audios | Flujo guiado. Pago al entregar. Validación humana. Confianza en el placista. | Cualquier paso digital extra. SMS de doble factor. |
| **David, 34 (joven)** | WhatsApp asincrónico + PWA | Pedir de noche, recoger/recibir tarde, repetir pedido en 1 toque. | Catálogo desactualizado. Sin entrega tarde. |
| **Antonio, 52 (placista)** | WhatsApp + tablet con vista web | Pedidos ordenados. Marcar stock en 1 toque. Comisión baja. Cliente sigue siendo "suyo". | Catálogo manual. Comisión alta. Pérdida de relación con cliente. |

---

## 6. Modelo funcional — Cliente

### 6.1 Onboarding

- Punto de entrada: QR en el puesto, cartel en el mercado, recomendación familiar, redes del Ayuntamiento.
- Usuario escribe al número WhatsApp del mercado.
- Bot pide: nombre, CP/dirección, mercado preferente, puestos de interés.
- Persistencia: `@user_id`, `@nombre`, `@cp`, `@mercado_fav`, `@puestos_fav[]`, `@pago_pref`, `@ultimo_pedido_id`.

### 6.2 Enrutamiento recurrente vs nuevo

- `IF @mercado_fav IS SET` → *"Tu mercado es San Gonzalo. ¿Compras allí hoy?"* [Sí] [Cambiar mercado].
- `ELSE` → Lista de mercados disponibles.

### 6.3 Difusión diaria (núcleo Antonio, industrializado)

- Cada placista activo manda 1 vídeo de mostrador al bot administrador entre 7-9h.
- Bot distribuye automáticamente a su lista de suscriptores opt-in del puesto.
- Plantilla: *"Buenos días. Hoy en Pescadería Antonio: boquerones, acedías, gambas blancas. Pide hasta las 12:30 — recogida o reparto."*
- Cumplimiento Meta: opt-in explícito, frecuencia controlada, plantillas aprobadas, listas <256.

### 6.4 Embudo de compra (flujo conversacional)

1. **Selección de mercado** (o confirmación del favorito).
2. **Selección de puesto** o entrada directa desde vídeo del día.
3. **Pedido en lenguaje natural** (texto o audio). Bot interpreta vía NLU + LLM y devuelve confirmación estructurada: *"He entendido ½ kg boquerones, 2 acedías limpias. ¿Confirmas?"* [Sí] [Modificar] [Hablar con Antonio].
4. **Multi-puesto:** *"¿Añadir productos de otro puesto del mercado?"* [Ver puestos] [Finalizar].
5. **Sustituciones:** opt-in por producto. Default = NO sustituir.
6. **Fulfillment:** [Recogida en puesto] / [Taquilla refrigerada si disponible] / [Reparto a domicilio + franja].
7. **Pago:**
   - Default *"al entregar"* (efectivo/tarjeta/Bizum) — respetando modelo Antonio.
   - Opción *"pago ahora"* → link Bizum o Stripe/Redsys (obligatorio solo si reparto a domicilio operado por tercero).
8. **Confirmación** con ticket digital, hora y desglose por puesto.

### 6.5 NLU local

Diccionario sevillano cargado en el LLM: *avío de puchero*, *manojo de tagarninas*, *papas nuevas*, *acedías*, *corte de cazón para adobo*, *un cuarto de…*, etc. Fallback humano al placista cuando la confianza del NLU baja del umbral.

### 6.6 Postcompra y recurrencia

- Notificaciones de estado: `aceptado → preparando → listo / en reparto → entregado`.
- Valoración breve (1 pregunta).
- Botón *"Repetir este pedido"* disponible 30 días.
- Lista *"Mis habituales"* (ej. *½ kg boquerones todos los viernes*).
- Factura mensual por email (PWA o adjunto WhatsApp).

---

## 7. Modelo funcional — Vendedor (Backend)

### 7.1 Alta del placista

Visita comercial + alta en 10 min. Datos: nombre puesto, mercado, móvil, horario, radio de entrega, métodos de pago aceptados, comisión acordada, productos típicos base.

### 7.2 Operación diaria (≤5 min de carga digital)

1. **8:00** — Placista graba vídeo del mostrador con su móvil.
2. **8:00-8:15** — Lo manda al bot administrador. Bot lo distribuye.
3. **8:30-12:30** — Pedidos entran a una vista Glide/Softr ordenada cronológicamente.
4. **12:30** — Cierre. Placista marca "preparado". Logística recoge.

### 7.3 Panel del placista

- Tablet/móvil con vista Glide/Softr conectada a Airtable.
- Pedidos del día: cliente, productos, hora de fulfillment, método de pago.
- Estados: `recibido → aceptado → preparando → preparado → entregado/recogido → cerrado` + `cancelado` / `incidencia`.
- Acciones rápidas: [Aceptar] / [Producto agotado → sustituto] / [Marcar preparado].
- Histórico de clientas habituales (refuerza relación que ya existe offline).

### 7.4 Gestión de stock sin catálogo manual

**El vídeo diario sustituye al catálogo.** No se exige al placista mantener una base de datos.

- Lista base de productos típicos del puesto cargada al alta.
- Productos disponibles del día se infieren de: transcripción del audio del vídeo (fase 2), aprendizaje de pedidos previos, marcado opcional en 30 segundos.
- Si producto no disponible → bot pregunta al cliente: [Aceptar sustituto] / [Quitar producto] / [Cancelar].

### 7.5 Liquidación

- Vista mensual: pedidos cerrados, bruto, comisión, neto.
- Exportable a PDF.
- Facturación SEPA al placista.

---

## 8. Capa logística unificada

El salto cualitativo respecto a Antonio aislado: agregar pedidos de N puestos del mismo mercado en una sola operación logística.

### 8.1 Modalidades

- **Recogida en puesto** (modelo Antonio, gratis): cliente pasa por cada puesto.
- **Click & Collect en mercado:** punto único de recogida 24/7 o taquilla refrigerada donde el mercado disponga (mercadosdesevilla ya tiene taquillas en algunos).
- **Reparto a domicilio:** repartidor del mercado (no Glovo/Uber), franjas 13:30-15:00 y 19:00-21:00.

### 8.2 Cadena de frío

- Cajas isotérmicas homologadas obligatorias mayo-octubre.
- Cierre de reparto a 15:00 en meses de calor extremo.
- Producto fresco delicado (pescado, carne) solo en franjas con frío garantizado.

### 8.3 Operador

- **MVP:** subcontratado (cooperativa local o asociación de comerciantes).
- **Fase 2:** evaluar acuerdo con la logística de mercadosdesevilla si está infrautilizada.

---

## 9. Lógica de datos

**Entidades:**

| Entidad | Campos principales |
|---|---|
| `Usuario` | id, nombre, teléfono, CP, dirección, mercado_fav, puestos_fav[], pago_pref, último_pedido_id, habituales[] |
| `Mercado` | id, nombre, dirección, horario, taquillas (Sí/No), radio_reparto_km |
| `Puesto` | id, mercado_id, nombre, placista, categoría, teléfono, comisión%, activo, productos_base[] |
| `VideoDia` | id, puesto_id, fecha, url_video, transcripción_opcional |
| `Producto` | id, puesto_id, nombre, precio, unidad, disponible_hoy |
| `Pedido` | id, usuario_id, mercado_id, sub_pedidos[], total, fulfillment_tipo, franja, pago_tipo, pago_estado, estado |
| `SubPedido` | id, pedido_id, puesto_id, productos[], estado_puesto |

**Estados de pedido:** `nuevo → aceptado → preparando → listo → entregado/recogido → cerrado` + `cancelado` / `incidencia`

---

## 10. Reglas de negocio

1. **Ventana de pedidos:** desde envío del vídeo del puesto hasta 90 min antes del cierre del mercado.
2. **Pago diferido por defecto.** Pago online opcional, obligatorio solo en reparto operado por tercero.
3. **Sin mínimo para recogida.** Mínimo 15€ para domicilio.
4. **Sustituciones:** opt-in producto a producto. Default NO.
5. **Cancelación libre** hasta que el puesto marca "aceptado".
6. **Comisión placista:** 5-8% en MVP (rango bajo, hay que competir contra "cero comisión Antonio").
7. **Cuota institucional:** a negociar con Ayuntamiento como servicio complementario.
8. **Cumplimiento WhatsApp/Meta:** opt-in explícito, plantillas aprobadas, frecuencia ≤1 mensaje promocional/día por puesto.
9. **RGPD:** consentimiento de datos en onboarding, baja en 1 mensaje.

---

## 11. Stack no-code

| Capa | Herramienta | Función |
|---|---|---|
| Canal WhatsApp | Meta Cloud API o 360dialog | Mensajería oficial |
| Bot conversacional | Botpress (preferente) o Manychat | Lógica, variables, NLU |
| LLM auxiliar | Claude / GPT vía API | Interpretar lenguaje natural local |
| BD | Airtable (MVP) → Supabase fase 2 | Modelo de datos completo |
| Panel placista | Glide o Softr sobre Airtable | Vista pedidos editable |
| PWA cliente | Softr o Glide | Historial, repetir, pagar, facturas |
| Automatizaciones | Make o n8n | Webhooks, difusión, notificaciones |
| Pago online | Bizum link manual MVP → Stripe/Redsys | Cobro |
| Vídeos | Cloudinary o Google Drive | Hosting vídeos del día |
| SMS notificaciones | Twilio | Avisos críticos de entrega |
| Dashboard institucional | Softr o Looker Studio | Métricas para Ayuntamiento |

---

## 12. Roadmap

| Fase | Plazo | Hitos |
|---|---|---|
| **Fase 0 — Validación** | Semanas 1-3 | Entrevistas Antonio + 10 clientas + 5 mayores + 5 jóvenes + 3 placistas. Prototipo Figma. Test usabilidad mayores. |
| **Fase 1 — Réplica Antonio** | Semanas 4-7 | Bot funcional con 1 puesto. Listas de difusión, pedido por NLU, panel placista. Clientas actuales sin degradación. |
| **Fase 2 — Multi-puesto San Gonzalo** | Semanas 8-14 | 4 puestos adicionales. Agregación de pedidos. Logística unificada. PWA complementaria. |
| **Fase 3 — Pitch institucional** | Semana 15 | Dossier con métricas reales vs mercadosdesevilla. Reunión Ayuntamiento + Hermeneus World. |
| **Fase 4 — Escalado** | Mes 5+ | 2º mercado (Triana o Feria). Telegram como canal espejo. Integración API con mercadosdesevilla si hay acuerdo. |

---

## 13. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Antonio rechaza intermediación | Herramienta gratuita en fase 1, sin comisión hasta multi-puesto. Su marca y voz se mantienen intactas. |
| Clientas de Antonio notan cambio | El bot mantiene el nombre del puesto, el vídeo del propio placista, la voz en audios. Cero rebranding. |
| Placista no actualiza nada | El modelo NO depende de catálogo manual. Solo del vídeo diario, que ya graba. |
| Comisión percibida abusiva (vs cero de Antonio) | Comisión baja + valor añadido demostrable: más clientes, logística, datos. |
| Logística rompe cadena de frío en verano | Cajas isotérmicas obligatorias, cierre 15:00, restricciones por producto. |
| Ayuntamiento ve competencia | Pitch como capa complementaria. Ofrecer integración API con mercadosdesevilla. Convivencia win-win. |
| Hermeneus World bloquea integración | Mantener autonomía técnica. No depender de su API para operar. |
| WhatsApp restringe difusión masiva | Cumplimiento estricto Meta: opt-in, plantillas, frecuencia, listas <256. |
| NLU falla con expresiones locales | Diccionario sevillano + fallback humano al placista cuando la confianza baja. |
| Pago al entregar genera fraude/impagos | Cliente verificado por número desde el primer pedido. Lista negra automática tras 2 incidencias. |
| Adopción mayor depende de familiar | Onboarding asistido. Vídeo tutorial. Línea de voz humana de soporte. |

---

## 14. Argumentario para Ayuntamiento e instituciones

1. **Diagnóstico honesto:** mercadosdesevilla.es es una buena infraestructura con baja adopción. El problema no es de tecnología, es de canal y modelo.
2. **Evidencia local:** Pescadería Antonio, sin presupuesto público, mueve más pedidos digitales recurrentes que la plataforma municipal en su mercado.
3. **Propuesta:** capa conversacional sobre canal nativo (WhatsApp) que activa a placistas reacios y a clientes mayores excluidos por la app.
4. **Métricas piloto** (San Gonzalo, 3 meses): pedidos, recurrencia, ticket medio, NPS placista, NPS cliente mayor, comparativa vs mercadosdesevilla.
5. **Plan de integración:**
   - **Opción A — Convivencia:** ambos productos coexisten, públicos distintos.
   - **Opción B — Integración:** este producto se convierte en capa conversacional oficial de mercadosdesevilla, alimentando su infraestructura logística y de pago.
6. **Plan de escalado:** 5 mercados en 12 meses, 11 en 24.
