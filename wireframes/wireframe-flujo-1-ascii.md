# Wireframe ASCII — Flujo 1 (C01 Onboarding primera vez)

> Estilo: pantalla WhatsApp Business, chrome según `wireframe flujo 1.png` y DESIGN.md.
> Copy según PROMPT_UI_flujos_P1.md + CONTENT_SYSTEM.md (botones sin emoji en producción).
> Nota: el PNG de referencia muestra contenido del flujo C03 (broadcast); este wireframe es C01.

---

## Frame 1 — Chat: bienvenida y CTA al Flow

```
┌──────────────────────────────────────────────────────┐
│ ◄  (🏪)  Mercados de Sevilla                      ⋮  │  header 56px
│          ● En línea                                  │  #2D6A4F blanco
├──────────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░ fondo chat #EBE5DC ░░░░░░░░░░░░░░░░░░░ │
│                                                      │
│                ( HOY, 24 ENERO )                     │  pill fecha
│                                                      │
│  Mercados de Sevilla                                 │
│ (🏪) ┌─────────────────────────────────┐             │
│      │ Hola 👋 Soy el bot de Mercados  │             │  burbuja bot
│      │ de Sevilla. Te ayudo a comprar  │  #FFFFFF    │
│      │ en los puestos del mercado sin  │  tail sup.  │
│      │ moverte de casa.          9:00  │  izquierda  │
│      └─────────────────────────────────┘             │
│                                                      │
│      ┌─────────────────────────────────┐             │
│      │ Cuéntame quién eres en          │             │
│      │ 30 segundos.              9:00  │             │
│      └─────────────────────────────────┘             │
│                                                      │
│         ╭─────────────────────╮                      │
│         │       Empezar       │  ← CTA único         │
│         ╰─────────────────────╯    (abre WA Flow)    │
│                                                      │
│                                                      │
├──────────────────────────────────────────────────────┤
│ 😊 ( Escribe un mensaje...              )  📷  🎤    │  input bar 52px
└──────────────────────────────────────────────────────┘  #F0F2F5
```

---

## Frame 2 — WA Flow overlay, pantalla 1/3: identidad

```
┌──────────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓ chat atenuado detrás (overlay) ▓▓▓▓▓▓▓▓▓ │
│ ┌──────────────────────────────────────────────────┐ │
│ │  ✕                    Mercados de Sevilla   1/3  │ │  header Flow
│ ├──────────────────────────────────────────────────┤ │
│ │                                                  │ │
│ │  Cuéntame quién eres           ← TextHeading     │ │
│ │                                                  │ │
│ │  Nombre                                          │ │
│ │  ┌────────────────────────────────────────────┐  │ │  TextInput
│ │  │                                            │  │ │
│ │  └────────────────────────────────────────────┘  │ │
│ │                                                  │ │
│ │  Código postal                                   │ │
│ │  ┌────────────────────────────────────────────┐  │ │  TextInput
│ │  │                                            │  │ │  (number)
│ │  └────────────────────────────────────────────┘  │ │
│ │                                                  │ │
│ │                                                  │ │
│ ├──────────────────────────────────────────────────┤ │
│ │  ┌────────────────────────────────────────────┐  │ │
│ │  │                 Siguiente                  │  │ │  Footer
│ │  └────────────────────────────────────────────┘  │ │  (navigate)
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## Frame 3 — WA Flow overlay, pantalla 2/3: mercado y puestos

```
┌──────────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ┌──────────────────────────────────────────────────┐ │
│ │  ◄                    Mercados de Sevilla   2/3  │ │
│ ├──────────────────────────────────────────────────┤ │
│ │                                                  │ │
│ │  ¿Dónde compras?               ← TextHeading     │ │
│ │                                                  │ │
│ │  Mercado favorito                                │ │
│ │  ┌────────────────────────────────────────────┐  │ │  Dropdown
│ │  │  San Gonzalo                            ▼  │  │ │
│ │  └────────────────────────────────────────────┘  │ │
│ │     · San Gonzalo / Triana / Feria               │ │
│ │                                                  │ │
│ │  Puestos que te interesan      ← CheckboxGroup   │ │
│ │  [x] Pescadería Fali                             │ │
│ │  [ ] Frutería Manolo                             │ │
│ │  [ ] Carnicería Lola                             │ │
│ │                                                  │ │
│ ├──────────────────────────────────────────────────┤ │
│ │  ┌────────────────────────────────────────────┐  │ │
│ │  │                 Siguiente                  │  │ │  Footer
│ │  └────────────────────────────────────────────┘  │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## Frame 4 — WA Flow overlay, pantalla 3/3: opt-in RGPD

```
┌──────────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ┌──────────────────────────────────────────────────┐ │
│ │  ◄                    Mercados de Sevilla   3/3  │ │
│ ├──────────────────────────────────────────────────┤ │
│ │                                                  │ │
│ │  Último paso                   ← TextHeading     │ │
│ │                                                  │ │
│ │  [x] Quiero recibir el vídeo   ← OptIn           │ │
│ │      diario de mis puestos       (consentimiento │ │
│ │                                   marketing)     │ │
│ │                                                  │ │
│ │  Usaré tu nombre y número para  ← TextCaption    │ │
│ │  gestionar tus pedidos. Escribe                  │ │
│ │  BAJA cuando quieras borrarte.                   │ │
│ │                                                  │ │
│ │                                                  │ │
│ ├──────────────────────────────────────────────────┤ │
│ │  ┌────────────────────────────────────────────┐  │ │
│ │  │             Empezar a comprar              │  │ │  Footer
│ │  └────────────────────────────────────────────┘  │ │  (complete)
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## Frame 5 — Chat: confirmación post-Flow

```
┌──────────────────────────────────────────────────────┐
│ ◄  (🏪)  Mercados de Sevilla                      ⋮  │
│          ● En línea                                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│                ( HOY, 24 ENERO )                     │
│                                                      │
│      ┌─────────────────────────────────┐             │
│      │ Cuéntame quién eres en          │             │
│      │ 30 segundos.              9:00  │             │
│      └─────────────────────────────────┘             │
│                                                      │
│          (  ✓ Formulario completado  )               │  pill sistema
│                                                      │
│  Mercados de Sevilla                                 │
│ (🏪) ┌─────────────────────────────────┐             │
│      │ Listo Carmen. Mañana a las      │             │
│      │ 9:00 te enseño lo que Fali      │             │
│      │ tenga en el mostrador.    9:01  │             │
│      └─────────────────────────────────┘             │
│                                                      │
│         ╭─────────────────────╮                      │
│         │  Ver mercado ahora  │                      │
│         ╰─────────────────────╯                      │
│                                                      │
├──────────────────────────────────────────────────────┤
│ 😊 ( Escribe un mensaje...              )  📷  🎤    │
└──────────────────────────────────────────────────────┘
```

---

## Anotaciones

| Elemento | Spec |
|---|---|
| Header | 56px, #2D6A4F, avatar 40px, "● En línea" 12px |
| Burbuja bot | #FFFFFF, radius 18px (tail 4px sup. izq.), max-width 80%, sombra 0 1px 1px rgba(0,0,0,.13) |
| Pill fecha / sistema | centrada, uppercase, #667781 sobre rgba(0,0,0,.12) |
| Botones | píldora, min-height 44px, borde #2D6A4F, **sin emoji** (CONTENT_SYSTEM §3.2) |
| CTA único [Empezar] | abre WA Flow (CTA URL / flow trigger, wa-constraints §4) |
| WA Flow | overlay fullscreen, 3 pantallas, 1 Footer por pantalla, no funciona en WA Web |
| Input bar | 52px, #F0F2F5, emoji + input redondeado + cámara + micro |
| 👋 en burbuja | permitido: whitelist §14 DESIGN, saludo inicial 1 vez por sesión |
```
