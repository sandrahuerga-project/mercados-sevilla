# Plan de implementación — Plataforma conversacional Mercados de Sevilla

> Derivado de PRD v1.0, DESIGN.md v1.1, wa-constraints.md, flows-index.md, CONTENT_SYSTEM.md v2.0.
> Alcance de este documento: cómo se construye el MVP. Qué se construye ya está en el PRD.
> **Versión:** 1.0 · **Fecha:** 2026-07-26

---

## 0. TL;DR

MVP en 3 fases (~15 semanas) sobre 1 mercado piloto (San Gonzalo).
Stack no-code/low-code: Meta Cloud API + n8n + Airtable + Softr/Glide + Claude API + Cloudinary.
Cuello de botella real no es técnico: es **aprobación de plantillas Meta** (24-72h por plantilla) y **verificación de WhatsApp Business** (días-semanas). Empezar por ahí.
Riesgo mayor: que Fali (placero ancla) perciba el producto como intermediación. Mitigación: fase 1 gratis, sin comisión, sin rebranding.

---

## 1. Constraints — inventario completo

Todo lo que limita el diseño de la solución, agrupado por origen. Cada constraint tiene un ID para referenciarlo en tareas.

### 1.1 Constraints de WhatsApp Business / Meta

| ID | Constraint | Fuente | Impacto en implementación |
|---|---|---|---|
| WA-01 | Ventana 24h: mensaje libre solo dentro de 24h tras último input del usuario | wa-constraints §1,§3 | Todo mensaje proactivo fuera de 24h = plantilla aprobada. Diseñar tracking (C07) 100% con plantillas |
| WA-02 | Reply buttons: máx 3, máx 20 char, sin emojis custom | wa-constraints §2 | Copy de botones ≤20 char, texto plano (ya en CONTENT_SYSTEM §3.2) |
| WA-03 | List message: máx 10 filas totales (no por sección) | wa-constraints §2 | Mercados y puestos paginados si >10. Nunca productos en lista |
| WA-04 | Plantillas requieren aprobación Meta (24-72h típico), rechazables | wa-constraints §3 | Ruta crítica. Enviar plantillas a revisión en semana 1 |
| WA-05 | Opt-in explícito antes de cualquier marketing/broadcast | wa-constraints §3, PRD §10.8 | Capturar en onboarding (C01), campo OptIn en WA Flow |
| WA-06 | Opt-out obligatorio ("BAJA") en plantillas marketing | wa-constraints §3 | Footer fijo + handler de palabra BAJA |
| WA-07 | Messaging tier: nº nuevo arranca 250 conversaciones business-initiated/24h | wa-constraints §2 | 100 clientas piloto caben, pero broadcast diario a todos = vigilar tier. Escalar con verificación + quality |
| WA-08 | Quality rating: marcas de spam → baja tier → bloqueo | wa-constraints §3 | Frecuencia ≤1 marketing/día/usuario. Monitorizar rating en Meta Business |
| WA-09 | Política IA ene-2026: bots generalistas prohibidos, task-specific OK | wa-constraints §3,§8 | El bot es task-specific (pedidos). Documentarlo así ante Meta |
| WA-10 | URLs en plantillas: HTTPS válidas y verificables, sin redirects | wa-constraints §3,§8 | Links Bizum/PWA/Maps en dominio propio verificable |
| WA-11 | Multimedia: vídeo ≤16MB, imagen ≤5MB, audio ≤16MB | wa-constraints §2 | Vídeo del placero >16MB → Cloudinary + link. Pipeline de compresión |
| WA-12 | Pagos nativos WA no disponibles en España (2026) | wa-constraints §8 | Pago = "al entregar" o link Bizum externo. Sin pasarela en el flujo |
| WA-13 | Lista de difusión app WA: máx 256 y receptor debe tener tu nº guardado | wa-constraints §2 | No usar listas de difusión. Broadcast vía Cloud API + plantillas |
| WA-14 | WA Flows: 3-5 pantallas máx, 1 Footer/pantalla, no funciona en WA Web | wa-constraints §4 | Onboarding C01 en 3 pantallas. Aviso "completa en móvil" |
| WA-15 | No se pueden borrar mensajes enviados vía API | wa-constraints §3 | Validar copy antes de enviar. Cero margen de error en producción |

### 1.2 Constraints de usuario

| ID | Constraint | Fuente | Impacto |
|---|---|---|---|
| US-01 | Carmen (71) teme el pago digital | PRD §1.1,§5 | Pago al entregar por defecto. Nunca forzar pago online |
| US-02 | Carmen abandona ante cualquier paso digital extra o 2FA por SMS | PRD §5 | Onboarding mínimo. Teléfono se captura de WA, no se pide (CONTENT_SYSTEM §7.2) |
| US-03 | Flujo debe completarse sin asistencia por un mayor | PRD §3.3 | Lenguaje A2, confirmación explícita cada paso, salida a humano siempre |
| US-04 | Tiempo medio de pedido ≤4 min | PRD §3 KPI | Happy path 6 toques + 1 audio (DESIGN §21). Cero fricción innecesaria |
| US-05 | David (joven) pide de noche, necesita recoger/recibir tarde | PRD §1.1,§5 | Bot 24/7 acepta pedidos; fulfillment en franjas tarde |
| US-06 | David abandona si el catálogo está desactualizado | PRD §5 | Vídeo diario = catálogo vivo. Ventana de pedidos ligada al vídeo |
| US-07 | Antonio (placero) tolera ≤5 min/día de carga digital | PRD §7.2 | Sin catálogo manual. Panel de 1 toque por acción |
| US-08 | Antonio no quiere perder la relación con "su" cliente | PRD §5,§13 | Bot mantiene nombre del puesto, voz del placero, escalado humano (C11) |
| US-09 | Accesibilidad mayores: texto ≥15px, sin abreviaturas, botones ≥16px fuente | DESIGN §9 | Constraint de diseño del prototipo y de copy |
| US-10 | Idioma único: castellano (con léxico sevillano) | CLAUDE.md.txt, flows-index §5 | NLU con diccionario local. Sin multi-idioma en MVP |

### 1.3 Constraints técnicos

| ID | Constraint | Fuente | Impacto |
|---|---|---|---|
| TEC-01 | Stack no-code/low-code (perfil del equipo: diseño + marketing) | CLAUDE.md global, PRD §11 | Preferir herramientas visuales. Código solo donde inevitable (webhooks, NLU) |
| TEC-02 | El bot no calcula precios ni decide sustituciones | CLAUDE.md.txt | Lógica de negocio: bot secretario. Precio = "estimado" (CONTENT_SYSTEM §3.5) |
| TEC-03 | Airtable como BD MVP (límites: 1.200 registros/base plan free, 50k Team) | PRD §11 | Dimensionar: 100 clientas × pedidos/mes. Plan Team probable. Supabase en fase 2 |
| TEC-04 | NLU depende de LLM externo (Claude/GPT API) con latencia y coste/llamada | PRD §11, DESIGN §14 | Typing indicator si >5s. Fallback humano si confianza <60%. Presupuestar coste/token |
| TEC-05 | Panel placero fuera de WA (Glide/Softr sobre Airtable) | wa-constraints §5, PRD §7.3 | 2 superficies: chat (cliente) + panel web (placero). Sincronía vía Airtable |
| TEC-06 | Vídeo hosting con compresión auto (Cloudinary) por límite 16MB WA | wa-constraints §2, PRD §11 | Pipeline: placero envía → Cloudinary comprime → URL → broadcast |
| TEC-07 | Handover bidireccional bot↔humano requiere panel abierto del placero | flows-index C11 | Riesgo MVP: si panel cerrado, cae a "te llama después" |
| TEC-08 | Sin routing/multi-pantalla nativa en chat (es lineal) | DESIGN, wa-constraints | Estado de conversación en variables persistidas, no en navegación |
| TEC-09 | Webhooks Cloud API requieren endpoint HTTPS público verificable | Meta Cloud API | n8n/Make con URL pública. Verificación de webhook Meta |

### 1.4 Constraints legales / RGPD

| ID | Constraint | Fuente | Impacto |
|---|---|---|---|
| LEG-01 | Consentimiento de datos explícito en onboarding | PRD §10.9 | OptIn en WA Flow C01, texto RGPD llano (CONTENT_SYSTEM §7.2) |
| LEG-02 | Baja en 1 mensaje ("BAJA") + borrado de datos | PRD §10.9, CONTENT_SYSTEM M-BYE | Handler BAJA → borra registro Airtable → confirma |
| LEG-03 | Datos personales (nombre, tel, dirección, CP) → tratamiento RGPD | PRD §9 | Airtable en región UE o encargado de tratamiento. Registro de actividades |
| LEG-04 | Factura mensual (fiscalidad placero) + liquidación SEPA | PRD §7.5 | Fase 2/3. No bloquea MVP funcional pero sí facturación real |
| LEG-05 | Cadena de frío obligatoria mayo-octubre (seguridad alimentaria) | PRD §8.2 | Cajas isotérmicas, cierre reparto 15:00 verano, restricción por producto |

### 1.5 Constraints de negocio / operativos

| ID | Constraint | Fuente | Impacto |
|---|---|---|---|
| BIZ-01 | Comisión 5-8% (compite contra "cero comisión" de Fali) | PRD §10.6,§13 | Fase 1 sin comisión. Comisión solo cuando haya valor (multi-puesto, logística) |
| BIZ-02 | Ventana de pedidos: desde vídeo hasta 90 min antes del cierre | PRD §10.1 | Lógica temporal por puesto. Fuera de ventana → S01 |
| BIZ-03 | Sin mínimo recogida; mínimo 15€ domicilio | PRD §10.3 | Validación en fulfillment (C03) |
| BIZ-04 | Sustituciones opt-in producto a producto, default NO | PRD §10.4, CONTENT_SYSTEM M-ALERT | C08 nunca sustituye sin confirmación |
| BIZ-05 | Cancelación libre solo hasta estado "aceptado" | PRD §10.5 | C10 bifurca pre/post-aceptado |
| BIZ-06 | Operador logístico subcontratado (cooperativa local), no Glovo/Uber | PRD §8.3 | Dependencia externa. Franjas 13:30-15:00 / 19:00-21:00 |
| BIZ-07 | No degradar experiencia actual de clientas de Fali | PRD §3.1,§13 | Fase 1 debe ser ≥ que el WhatsApp manual actual de Fali |
| BIZ-08 | Convivencia con mercadosdesevilla.es (no competir de frente) | PRD §2,§14 | Arquitectura agnóstica, preparada para integración API futura |

---

## 2. Stack tecnológico

Confirmado en wa-constraints §9 (revisión sobre PRD §11). Decisiones cerradas en **negrita**.

| Capa | Herramienta | Alternativa | Por qué | Constraint |
|---|---|---|---|---|
| Canal | **Meta Cloud API** | 360dialog | Más barato 2026, features primero | WA-* |
| Orquestación | **n8n** | Botpress, Make | Flexible, self-host, maneja webhooks + lógica temporal | TEC-01, TEC-09 |
| NLU | **Claude API** + diccionario sevillano | GPT | Interpretar pedido en lenguaje natural local | TEC-04, US-10 |
| BD | **Airtable** (MVP) → Supabase (fase 2) | — | No-code, panel conectable | TEC-03 |
| Panel placero | **Softr** o Glide sobre Airtable | — | Vista pedidos editable, 1 toque | TEC-05, US-07 |
| PWA cliente | Softr o Glide | — | Historial, repetir, factura (complemento opcional) | — |
| Vídeo hosting | **Cloudinary** | Google Drive | Compresión auto + URL, resuelve 16MB | TEC-06, WA-11 |
| Pago online | Bizum link manual (MVP) → Stripe/Redsys | — | Solo taquilla. Nunca en flujo estándar | WA-12, US-01 |
| SMS crítico | Twilio | — | "Tu pedido está en la puerta" | PRD §4 |
| Dashboard institucional | Looker Studio o Softr | — | Métricas para Ayuntamiento | PRD §14 |
| Prototipo/portfolio | Lovable + Figma | — | Case study, NO producción (chrome WA propio imposible) | wa-constraints §0 |

**Nota crítica de arquitectura (wa-constraints §0):** el DESIGN.md con estética propia (Playfair, azulejo, colores custom) sirve **solo como prototipo/portfolio**. El bot real vive dentro del chrome de WhatsApp. Son dos entregables distintos, no mezclar.

---

## 3. Arquitectura de datos y flujo

### 3.1 Entidades (PRD §9)
`Usuario · Mercado · Puesto · VideoDia · Producto · Pedido · SubPedido`
Estados pedido: `nuevo → aceptado → preparando → listo → entregado/recogido → cerrado` + `cancelado` / `incidencia` (DESIGN §18 define transiciones permitidas).

### 3.2 Flujo de datos MVP
```
Placero (móvil)                Cliente (WhatsApp)
     │ 8:00 vídeo mostrador          │
     ▼                               │
 Cloudinary (comprime + URL)         │
     │                               │
     ▼                               │
   n8n ──── broadcast plantilla ────►│ (opt-in suscriptores)
     │                               │ toca [Pedir]
     │                               ▼
     │◄──── pedido lenguaje natural ─┤
     ▼                               │
 Claude API (NLU + dicc. sevillano)  │
     │                               │
     ▼                               │
  Airtable (Pedido) ────► Softr panel placero
     │                               │
     │ placero marca estado          │
     ▼                               │
   n8n ──── plantilla utility ──────►│ (tracking C07)
```

### 3.3 Dependencias entre flujos (flows-index §3)
```
C01 → C02 → C03/C04 → C05 (multi-puesto)
C03 → C07 (tracking)  ·  P03 → C07/C08  ·  C03 ↔ C11 (escalado)  ·  P02 → C03 (vídeo abre ventana)
```

---

## 4. Fases de implementación

Alineadas con el roadmap del PRD §12, con desglose de tareas y dependencias.

### Fase 0 — Fundaciones y validación (semanas 1-3)

**Objetivo:** desbloquear la ruta crítica Meta y validar hipótesis con usuarios reales.

Ruta crítica (empezar día 1, tardan solas):
- [ ] Crear cuenta Meta Business + WhatsApp Business Account (WABA) `WA-04,WA-07`
- [ ] Verificación de negocio en Meta (puede tardar días-semanas) `WA-07`
- [ ] Registrar número de teléfono dedicado del mercado
- [ ] Enviar a aprobación las 7 plantillas base (broadcast + 6 utility de tracking) `WA-04` → ver §5

En paralelo (no bloqueante):
- [ ] Entrevistas: Fali + 10 clientas + 5 mayores + 5 jóvenes + 3 placeros (PRD §12 Fase 0)
- [ ] Prototipo Figma navegable + test usabilidad con mayores `US-03,US-09`
- [ ] Alta manual de datos base en Airtable (San Gonzalo + 5 puestos + productos_base)
- [ ] Cerrar decisiones pendientes de flows-index §5 (ver §8 de este plan)

**Salida de fase:** WABA verificada, plantillas en revisión, prototipo validado con Carmen-tipo.

### Fase 1 — Réplica Fali, 1 puesto (semanas 4-7)

**Objetivo:** Pescadería Fali funcionando en el bot sin que sus clientas noten degradación (`BIZ-07`).

- [ ] n8n: webhook handler Cloud API + verificación `TEC-09,WA-*`
- [ ] Pipeline vídeo: recepción → Cloudinary → URL `TEC-06,WA-11`
- [ ] Flujo P02 (subida vídeo diario) + recordatorio 8:30
- [ ] Flujo C01 onboarding (WA Flow 3 pantallas + opt-in RGPD) `WA-14,LEG-01`
- [ ] Flujo C02 enrutamiento recurrente
- [ ] Flujo C03 pedido desde broadcast (núcleo) `US-04`
  - [ ] Integración Claude API + diccionario sevillano `TEC-04,US-10`
  - [ ] Confirmación con "estimado", sin precio calculado `TEC-02`
  - [ ] Fulfillment (recogida / taquilla / reparto) `BIZ-03`
- [ ] Flujo C07 tracking (plantillas utility) `WA-01`
- [ ] Flujo C11 escalado humano `TEC-07,US-08`
- [ ] Panel placero Softr (P03): aceptar / agotado / preparado / listo `US-07`
- [ ] Handler BAJA + borrado RGPD `LEG-02,WA-06`

**Salida de fase:** Fali cierra ≥10 pedidos/día por el bot. Clientas actuales migradas sin fricción.

### Fase 2 — Multi-puesto San Gonzalo (semanas 8-14)

**Objetivo:** 5 puestos, agregación de pedidos, logística unificada.

- [ ] Alta 4 puestos adicionales (P01)
- [ ] Flujo C05 multi-puesto (SubPedidos, aceptación independiente) `BIZ-01`
- [ ] Flujo C08 sustitución `BIZ-04`
- [ ] Flujo C10 cancelación (pre/post-aceptado) `BIZ-05`
- [ ] Flujo C04 pedido espontáneo, C06 repetir
- [ ] Capa logística: operador subcontratado, franjas, cadena de frío `BIZ-06,LEG-05`
- [ ] Flujos sistema: S01 fuera de horario, S02 no recoge
- [ ] PWA complementaria (historial, repetir, factura)
- [ ] Selector de mercado/puesto paginado si >10 `WA-03`

**Salida de fase:** pedido agregado multi-puesto entregado en una operación logística.

### Fase 3 — Pitch institucional (semana 15)

- [ ] Dashboard Looker Studio con KPIs reales vs mercadosdesevilla (PRD §3 KPIs)
- [ ] Dossier de métricas + argumentario (PRD §14)
- [ ] Reunión Ayuntamiento + Hermeneus World

### Fase 4 — Escalado (mes 5+)
2º mercado · Telegram espejo · integración API mercadosdesevilla · migración Supabase.

---

## 5. Plantillas Meta a aprobar (ruta crítica)

Enviar en Fase 0. Cada rechazo cuesta 24-72h (`WA-04`). Naming CONTENT_SYSTEM §8.

| Plantilla | Categoría | Bloquea flujo | Notas |
|---|---|---|---|
| `broadcast_diario_v1` | MARKETING | C03, P02 | Media header (vídeo/img), footer BAJA, info crítica en 2 primeras líneas `WA-08,WA-06` |
| `pedido_aceptado_v1` | UTILITY | C07 | Variable nombre puesto + ID |
| `pedido_preparando_v1` | UTILITY | C07 | — |
| `pedido_listo_v1` | UTILITY | C07 | CTA URL Maps verificable `WA-10` |
| `pedido_en_camino_v1` | UTILITY | C07 | — |
| `pedido_entregado_v1` | UTILITY | C07 | — |
| `pedido_incidencia_v1` | UTILITY | C07, C08 | → escalado humano |

Checklist de contenido pre-envío: CONTENT_SYSTEM §8 (léxico "placero", sin emoji en botones, ortografía perfecta, variables snake_case).

---

## 6. Dependencias externas (bloqueantes)

| Dependencia | Bloquea | Riesgo | Mitigación |
|---|---|---|---|
| Verificación Meta Business | Todo el canal | Alto (tiempos impredecibles) | Iniciar día 1 fase 0 |
| Aprobación plantillas | Broadcast + tracking | Alto | Enviar temprano, copy pulido |
| Fali acepta participar | Fase 1 entera (es el ancla) | Alto | Gratis, sin comisión, sin rebranding `BIZ-07,PRD §13` |
| Operador logístico (cooperativa) | Reparto fase 2 | Medio | MVP puede arrancar solo con recogida |
| Taquilla refrigerada en San Gonzalo | Fulfillment taquilla | Medio | Decisión pendiente (§8). Recogida no depende de esto |
| Coste Claude API por pedido | Margen unitario | Bajo | Medir en fase 1, cachear diccionario, fallback botones |
| Plan Airtable (límite registros) | Escala de datos | Bajo | Team plan; migrar Supabase fase 2 `TEC-03` |

---

## 7. Riesgos técnicos y mitigaciones

Complementa PRD §13 (riesgos de negocio) con los técnicos.

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| NLU falla con expresiones locales | Media | Alto | Diccionario sevillano + fallback humano <60% confianza `TEC-04` |
| Panel placero cerrado durante escalado C11 | Media | Medio | Fallback "te llama después" `TEC-07` |
| Vídeo >16MB rompe broadcast | Alta | Bajo | Cloudinary obligatorio, no envío directo `WA-11` |
| Tier Meta insuficiente para broadcast diario | Media | Medio | Vigilar quality rating, escalar con verificación `WA-07,WA-08` |
| Plantilla rechazada bloquea lanzamiento | Media | Alto | Buffer de tiempo en fase 0, copy revisado `WA-04` |
| Latencia LLM degrada tiempo de pedido >4min | Baja | Medio | Typing indicator, respuestas cacheadas `US-04,TEC-04` |
| Cadena de frío rota en verano | Media | Alto | Cierre reparto 15:00, cajas isotérmicas, restricción producto `LEG-05` |

---

## 8. Decisiones pendientes (bloquean detalle de flujos)

De flows-index §5 — resolver antes de construir C01/C03:

| # | Decisión | Bloquea | Recomendación |
|---|---|---|---|
| 1 | ¿Reparto a domicilio en MVP o solo recogida? | C03 fulfillment | Solo recogida en fase 1; reparto en fase 2 (reduce dependencia logística) |
| 2 | ¿Hay taquilla refrigerada en San Gonzalo? | C03 fulfillment | Confirmar con mercado; si no, ocultar opción |
| 3 | ¿NLU LLM en MVP o solo botones? | C03 | LLM desde fase 1 (es el diferenciador vs mercadosdesevilla) |
| 4 | ¿Mínimo 15€ domicilio en prototipo? | C03 | Sí, según BIZ-03 |
| 5 | ¿Onboarding asistido por familiar (flujo aparte)? | C01 | No flujo aparte; línea de voz humana de soporte `US-03` |

Idioma ya cerrado: castellano (`US-10`).

---

## 9. Definición de "hecho" del MVP (KPIs, PRD §3)

El MVP se valida contra estos umbrales a 3 meses, 1 mercado:

| KPI | Objetivo |
|---|---|
| Compradoras activas recurrentes (≥2 pedidos/mes) | 100 |
| Puestos activos | 5 |
| Tasa de finalización del flujo | ≥75% |
| Tiempo medio de pedido | ≤4 min |
| Errores de stock | <10% pedidos |
| NPS cliente mayor | ≥40 |
| NPS placero | ≥30 |

---

## 10. Primeros 5 pasos concretos (semana 1)

1. Crear Meta Business + WABA, iniciar verificación de negocio `WA-07`.
2. Redactar y enviar a revisión las 7 plantillas (§5) con checklist CONTENT_SYSTEM §8 `WA-04`.
3. Montar base Airtable con las 7 entidades (PRD §9) + datos de San Gonzalo/Fali.
4. Cerrar las 5 decisiones pendientes (§8) con Fali y el mercado.
5. Levantar n8n con webhook Cloud API verificado `TEC-09`.

---

*v1.0 — Plan de implementación. Vivo: se actualiza al cerrar decisiones (§8) y al avanzar fases. Fuente de constraints: los 5 documentos base del proyecto.*
