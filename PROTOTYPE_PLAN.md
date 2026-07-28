# Plan de prototipo — Mercados de Sevilla

> Prototipo web navegable, enfoque **product design**. Público: portfolio (reclutadores)
> y cualquiera que visite la URL; también sirve de demo para la reunión institucional
> (esa parte vive en MAYOR_MEETING.md).
> **Stack:** React 19 + Vite + Tailwind 4 → GitHub → deploy automático en Vercel.
> **Punto de partida: el código exportado de Google AI Studio** (`Idea Google AI Studio/`),
> que ya trae 5 flujos de Carmen funcionando. A partir de ahí se itera desde Claude Code,
> con control total. AI Studio no se vuelve a tocar (no tiene viaje de vuelta).
> Base: PRD, DESIGN.md (conversation design fiel a WA), PORTFOLIO_DESIGN.md (shell
> visual), wa-constraints.md, flows-index.md, CONTENT_SYSTEM.md, wireframes/,
> PROMPT_UI*.md.
> **Versión:** 2.1 · **Fecha:** 2026-07-28

---

## 0. TL;DR

App React que **simula** el producto en 3 vistas (Carmen, David, Antonio) con un **viewer de flujos**: quien visita puede simular un flujo suelto (C01, C03, P03...) o el recorrido completo encadenado, al estilo del primer prototipo de AI Studio.
No conecta a Meta ni a un LLM real: NLU hardcodeado, taquilla visible aunque no exista aún (CLAUDE.md.txt). Todo scripteado.
Dentro del chat: fidelidad máxima a WA real (DESIGN.md — texto plano + *bold*, máx 3 botones sin emoji, sin cards). Fuera del chat (shell, navegación, panel Antonio): piel de marca PORTFOLIO_DESIGN.md.

**Lo que el prototipo NO es:** no es el MVP, no procesa pagos, no manda mensajes reales, no tiene backend. Es una película interactiva con final feliz garantizado.

---

## 1. Objetivos (vertiente product design)

| Objetivo | Audiencia | Cómo se mide |
|---|---|---|
| Case study de conversation design system | Reclutadores | DESIGN.md + CONTENT_SYSTEM.md trazables en el prototipo: cada mensaje sale del catálogo §7 |
| Demostrar inclusión (usuario mayor compra sin ayuda) | Todos | Flujo Carmen C03 completo sin fricción |
| Demostrar la cara operativa (placero) | Todos | Panel Antonio: 1 toque por acción, total final, cobro |
| Prototipo explorable en autonomía | Visitantes de la URL | Viewer de flujos: cualquiera lo recorre sin guía |
| Servir de demo en reunión | Alcalde (MAYOR_MEETING.md) | Modo "recorrido completo" en móvil |

---

## 2. Arquitectura de la app

### 2.1 Lo que ya existe (export de AI Studio, `Idea Google AI Studio/`)

```
src/
├── App.tsx                     ← dashboard oscuro: grid de móviles + tabs educativos
├── components/
│   ├── PhoneFrame.tsx            marco de móvil (base del DeviceFrame)
│   ├── ChatBubbles.tsx           burbujas bot/usuario
│   ├── WhatsAppFlowModal.tsx     WA Flow onboarding (3 pantallas)
│   ├── C01OnboardingScreen.tsx   ┐
│   ├── C02RecurrenteScreen.tsx   │  los 5 flujos de Carmen,
│   ├── C03BroadcastScreen.tsx    │  interactivos, ya construidos
│   ├── C07TrackingScreen.tsx     │
│   └── C11EscaladoScreen.tsx     ┘
└── data/mockData.ts              mercados, puestos, constraints WA
```

**Patrón de UI a conservar** (lo que gusta del original): dashboard con **todos los flujos visibles a la vez** en grid de móviles simulados, cada uno interactivo por separado; selector de escala (70/85/100%); tabs educativos arriba (contexto de producto / verificación de constraints API / glosario NLU andaluz). Ya respeta las constraints clave: botones sin emoji, sin cards, máx 3 reply buttons.

**Boilerplate de AI Studio a eliminar:** `@google/genai`, `express`, `dotenv` (no se usan — la app es 100% estática), `metadata.json`.

### 2.2 Hacia dónde evoluciona

```
prototype/                      ← el export, migrado y limpio
├── src/
│   ├── shell/                  ← App.tsx troceado: Home, grid, tabs, FlowPicker
│   ├── chat/                   ← ChatBubbles + ReplyButtons + ListMessage +
│   │                             WaFlowOverlay, generalizados
│   ├── panel/                  ← panel Antonio (nuevo, Organism 03)
│   ├── flows/                  ← scripts JSON por flujo (ver decisión abajo)
│   ├── engine/                 ← reproductor de scripts (nuevo)
│   └── data/                   ← mockData (dataset San Gonzalo)
└── public/                     ← assets: vídeo mostrador, fotos, avatares
```

**Decisión clave — flujos como datos, no como código:** hoy cada flujo es un componente con el copy hardcodeado (5 archivos `CxxScreen.tsx`). Se migran a JSON de turnos (quién habla, tipo de mensaje WA, copy literal de DESIGN.md §7, botones, siguiente paso) + un engine que los reproduce. Añadir/corregir un flujo = editar un JSON. Los flujos nuevos (David, Antonio) nacen ya como JSON; los 5 de Carmen se migran al pasar (auditando su copy contra DESIGN.md §7 a la vez).

**Modos del viewer** (amplían el grid actual, no lo sustituyen):
- **Grid general:** todos los flujos a la vista, cada móvil interactivo (el patrón AI Studio).
- **Flujo suelto:** foco en uno, tamaño real, botón reiniciar.
- **Recorrido completo:** happy path DESIGN.md §13 encadenado (Carmen pide → Antonio gestiona → Carmen recibe), con transición visible entre chat y panel placero (el puente C08/P03).

---

## 3. Alcance — las 3 vistas y los 10 flujos

### 3.1 Carmen, 71 — usuario mayor (la prueba de inclusión)
- Texto grande (≥15px), confirmación explícita en cada paso, salida a humano siempre visible.
- Pide por **audio** (nota de voz) → el bot lo entiende. Momento "wow".
- Pago al recoger, recogida en puesto. Cero pantallas externas.

### 3.2 David, 34 — usuario joven (la prueba de escala)
- Pide de noche, atajos ("repetir lo de siempre"), reparto a domicilio en franja tarde.
- Multi-puesto: pescado + fruta en un mismo pedido.
- PWA simulada para historial y factura.

### 3.3 Antonio, 52 — placero (la prueba de adopción)
- Panel web (no WhatsApp): pedidos del día, 1 toque por acción.
- Subida del vídeo diario en 30 segundos.
- Total final post-pesaje al marcar Listo + Marcar cobrado (Efectivo/Bizum/Tarjeta).

### 3.4 Flujos (mapeados a flows-index)

| # | Flujo | Vista | Prioridad | Por qué está |
|---|---|---|---|---|
| 1 | C01 Onboarding | Carmen | Alta | Alta sin fricción (WA Flow simulado) |
| 2 | C02 Recurrente | Carmen | Alta | Cero fricción del día a día |
| 3 | C03 Pedido desde broadcast (audio) | Carmen | **Máxima** | El corazón. Audio → NLU → confirmación |
| 4 | C07 Tracking | Carmen | Media | Notificaciones de estado |
| 5 | C11 Escalado humano | Carmen | Alta | "Hablar con Fali" — red de seguridad |
| 6 | C03+C05 Multi-puesto | David | Alta | Escala: pescado + fruta, reparto noche |
| 7 | C06 Repetir pedido | David | Media | Atajo de recurrencia |
| 8 | P02 Subida vídeo diario | Antonio | Alta | 30 segundos, cero curro |
| 9 | P03 Gestión de pedido | Antonio | **Máxima** | Aceptar / Listo (+total final) / cobrado |
| 10 | C08 Sustitución (desde panel) | Antonio→Carmen | Media | El puente placero↔cliente |

**Alcance ampliado (decisión 2026-07-28):** se construyen **todos los flujos**, cada uno con su happy path y sus unhappy paths (ramas de DESIGN.md §11-12: agotado, no recoge, fuera de horario, NLU falla, pedido sin confirmar...). Los 10 de la tabla marcan solo el orden de prioridad. Excepciones: P01 (alta de puesto) y P04 (liquidación) son admin/panel, se mencionan en el case study sin simulación conversacional; P02/P03 se construyen como vista panel de Antonio (Fase 3), no como chat.

---

## 4. Workflow de iteración (Claude Code → GitHub → Vercel)

```
1. git init + repo GitHub; migrar "Idea Google AI Studio/" → prototype/
2. Limpiar boilerplate AI Studio + npm install + verificar que arranca
3. Conectar repo a Vercel → cada push a main despliega (primer deploy: la app tal cual)
4. Por cada flujo:
   a. Escribir el JSON del flujo (copy de DESIGN.md §7, congelado)
   b. Construir/ajustar componentes que necesite
   c. Verificar en local (npm run dev) y en preview de Vercel
   d. Push → deploy → revisar en móvil real
5. Repetir hasta los 10 flujos + recorrido completo
```

Ramas: `main` = desplegado estable; trabajo en ramas por flujo si se quiere preview aislado (Vercel genera URL por rama).

---

## 5. Plan de construcción por fases

### Fase 0 — Migración y primer deploy
- [ ] Migrar `Idea Google AI Studio/` → `prototype/`, limpiar boilerplate (@google/genai, express, dotenv, metadata.json)
- [ ] Repo GitHub + Vercel conectado → **deploy de la app tal cual está** (URL desde el día 1)
- [ ] Revisar tokens: alinear Tailwind theme con PORTFOLIO_DESIGN.md §9 (shell) y neutros WA (chat)

### Fase 1 — Engine + auditoría de Carmen
- [ ] Engine de scripts: reproduce JSON turno a turno, typing entre turnos
- [ ] Generalizar componentes existentes (ChatBubbles, ReplyButtons, ListMessage, WhatsAppFlowModal) para que los alimente el engine
- [ ] Migrar C02 (el más corto) a JSON como prueba end-to-end

### Fase 2 — Vista Carmen (auditar lo construido)
- [ ] Migrar C01, C03, C07, C11 a JSON, **auditando el copy contra DESIGN.md §7** (el export de AI Studio es anterior al split DESIGN/PORTFOLIO — revisar botones, longitudes, léxico)
- [ ] C03: verificar audio → confirmación en texto (sin card) → fulfillment → recibo

### Fase 3 — Vista Antonio (panel)
- [ ] Panel Organism 03: resumen día, lista pedidos, filtros
- [ ] P03: Aceptar / Listo (modal total final) / Por cobrar / Marcar cobrado / Entregado
- [ ] P02 subida vídeo (mock)
- [ ] C08: agotado en panel → alerta en vista Carmen (puente visible)

### Fase 4 — Vista David + recorrido completo
- [ ] C03+C05 multi-puesto, C06 repetir, PWA historial simulada
- [ ] Modo "recorrido completo" encadenando los flujos (happy path §13)

### Fase 5 — Pulido
- [ ] Responsive: perfecto en móvil (la demo se hace en móvil)
- [ ] Página "sobre este prototipo" para portfolio: enlaza el sistema (DESIGN.md, CONTENT_SYSTEM.md como case study)
- [ ] Vídeo de respaldo (para MAYOR_MEETING.md)

---

## 6. Contenido y assets

- [ ] Congelar copy de los 10 flujos desde DESIGN.md §7 → JSONs (sin emoji en botones, "placero", léxico CONTENT_SYSTEM §3.1)
- [ ] Dataset falso: 5 puestos San Gonzalo, productos, precios "estimados"
- [ ] Assets: vídeo de mostrador **generado con IA** (similar al de Fali, sin usar su imagen) alojado en **Cloudinary** (no en el repo), fotos de puestos, avatares
- [ ] Ajustar PROMPT_UI.md y PROMPT_UI_flujos_P1.md al split DESIGN/PORTFOLIO (aún referencian cards y chips con emoji del DESIGN antiguo) — o retirarlos si los specs JSON los sustituyen

---

## 7. Riesgos del prototipo

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Vídeo real de mostrador de calidad | Credibilidad | Grabar con Fali o stock digno |
| Fali presta nombre/imagen | Autenticidad | Pedir permiso; alternativa: puesto ficticio |
| Perfeccionismo en el chrome WA | Tiempo | Fiel ≠ pixel-perfect; DESIGN.md manda en copy y componentes, no en clavar cada sombra |
| Scope creep (18 flujos) | No acabar | Solo los 10 de §3.4; el resto se menciona |

---

## 8. Estimación de esfuerzo (orientativa)

| Bloque | Esfuerzo |
|---|---|
| Fase 0 migración + primer deploy | 0,5-1 día |
| Fase 1 engine + generalizar componentes | 1-2 días |
| Fase 2 Carmen (migrar 5 flujos ya construidos + auditar copy) | 1-2 días |
| Fase 3 Antonio (panel, 3 flujos, desde cero) | 2 días |
| Fase 4 David + recorrido completo | 1-2 días |
| Fase 5 pulido + página case study | 1-2 días |
| Contenido/assets (paralelo) | 1-2 días |
| **Total** | **~7-11 días** (el export de AI Studio ahorra ~2 días de Carmen) |

Prioridad si hay poco tiempo: C03 Carmen + P03 Antonio + recorrido corto. Con eso ya se sostiene portfolio y reunión.

---

## 9. Primeros 3 pasos

1. Fase 0: migrar el export de AI Studio a `prototype/`, limpiar, repo GitHub + Vercel → URL compartible desde el día 1.
2. Congelar copy de C02 y C03 en JSON desde DESIGN.md §7.
3. Fase 1: engine + C02 migrado como prueba.

---

*v2.0 — Plan de prototipo, vertiente product design. Stack propio (React + GitHub + Vercel),
iterable desde Claude Code. La reunión institucional vive en MAYOR_MEETING.md.
Complementa IMPLEMENTATION_PLAN.md (el producto real en WhatsApp Business).*
