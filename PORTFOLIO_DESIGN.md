# PORTFOLIO DESIGN — Sistema visual del case study

> La capa visual de la web de portfolio: https://mercados-sevilla.vercel.app
> **No** describe lo que WhatsApp renderiza. El chat simulado es fiel a WhatsApp real
> y se rige por DESIGN.md; este documento manda en todo lo que lo envuelve.
> Textos: TEXTOS_PORTFOLIO.md · Implementación: `prototype/src/index.css` y `prototype/src/shell/`
> **Versión:** 2.0 · **Fecha:** 2026-07-29

---

## 0. Qué manda cada documento

| Pieza | Documento |
|---|---|
| Chat simulado: burbujas, botones, cabecera del móvil | DESIGN.md — fiel a WhatsApp |
| Portada, secciones, navegación, tipografía, color, animación | Este documento |
| Panel del placero: comportamiento | DESIGN.md §4 |
| Panel del placero: aspecto | Este documento |
| Textos visibles del portfolio | TEXTOS_PORTFOLIO.md |

---

## 1. Intención

Sobrio, claro y con espacio. Editorial más que corporativo: la estructura la marcan
**líneas de 1 px y espacio en blanco**, no cajas con sombra ni tarjetas redondeadas.
La referencia de partida fue fitosauna.com, de la que se toman el fondo crema, los
titulares grandes de tracking negativo, la estructura por reglas finas
y el par de botones (rectángulo + círculo con flecha). A eso se le añade más blanco
y el verde de mercado como color propio.

Regla de fondo: **el prototipo es el protagonista**. Todo lo demás lo enmarca.

---

## 2. Color

Paleta clara. Nada de modo oscuro global: el único bloque oscuro es la zona de
prototipos, y está oscura a propósito, para que los móviles destaquen.

```
SUPERFICIES
  Crema            #FCF6EC   fondo general
  Crema profundo   #F4EBDD   franjas alternas
  Papel            #FFFFFF   tarjetas del panel

TINTA (contrastes verificados sobre crema)
  Tinta            #1A1A18   15,9:1   texto principal
  Tinta suave      #57544E    7,0:1   texto secundario
  Tinta tenue      #6E6A61    5,0:1   etiquetas y metadatos
  Línea            #E3D9C9            reglas de 1 px

VERDE
  Verde mercado    #2D6A4F    5,9:1 sobre crema   acento y acciones
  Verde profundo   #143026            fondo de la zona de prototipos
  Verde bruma      #EAF1EC            fondo de la sección de propuesta
  Verde WhatsApp   #25D366            solo dentro del chat simulado

ACENTOS
  Azafrán          #B8791D   sobre crema
  Azafrán claro    #E0A63F   sobre verde profundo (6,6:1)
  Azulejo          #1B4F8A   voz humana en el chat
```

**Regla de accesibilidad:** todo texto cumple **WCAG AA** (4,5:1 normal, 3:1 grande).
Verificado sobre los 115 elementos de texto de la página; 0 fallos.
El chat simulado queda fuera de la auditoría: replica los colores de WhatsApp,
que no son decisión nuestra.

Dos valores concretos hubo que corregir para llegar a AA: la tinta tenue pasó de
`#8A857C` (3,4:1) a `#6E6A61`, y el azafrán sobre verde oscuro necesitó una versión
clara propia.

---

## 3. Tipografía

**Archivo** y **Archivo Narrow**, ambas de Google Fonts. Sustituyen a Playfair Display
y DM Mono, que daban un aire más clásico del que pide el proyecto.

```
TITULARES  (clase .display)
  Archivo 500 · interlineado 0,92 · tracking -0,035em
  Portada       48-84 px
  Sección       36-64 px
  Flujo         28 px

CUERPO
  Archivo 400 · interlineado 1,6
  Base          17 px      ← antes 14 px; las etiquetas bajaban a 10 px
  Entradilla    19-22 px
  Secundario    15 px

RÓTULOS Y ETIQUETAS
  Archivo Narrow 400 · 17-19 px · minúscula normal.
  Nada de versalitas con tracking amplio: resultaban genéricas.

RÓTULO DE SECCIÓN  (componente SectionLabel)
  Una regla de 1 px cruza la columna y el nombre de la sección se apoya
  encima recortándola, con el fondo de la sección como máscara.
  Verde mercado sobre claro, crema sobre verde profundo.

CHAT SIMULADO
  Fuente del sistema, 13-15 px. No se toca: WhatsApp no permite tipografía propia.
```

**Aviso de implementación:** ninguna clase propia debe fijar `color`. Si lo hace,
gana por orden de cascada a las utilidades `text-*` de Tailwind y puede dejar texto
oscuro sobre fondo oscuro. Ya ocurrió con la clase `.eyebrow`, hoy retirada.

**Mayúsculas:** solo la primera palabra de cada frase, salvo nombres propios.
Nunca "Título Con Todas Las Palabras En Alta".

---

## 4. Estructura de página

1. **Barra superior** — nombre y descriptor, separada por una línea.
2. **Portada** — etiqueta, titular grande, entradilla, botones y ficha del proyecto en filas separadas por líneas.
3. **El problema** — titular fijo a la izquierda mientras a la derecha pasan tres apartados, separados por reglas y sin numerar.
4. **De la investigación** — dos citas reales a dos columnas, cada una con su ilustración y su conclusión de diseño.
5. **La propuesta** — sobre verde bruma; cuatro pilares en columnas separadas por reglas.
6. **El prototipo** — sobre verde profundo. Ver §5.
7. **Cómo está hecho** — dos pestañas: contexto de producto y restricciones de WhatsApp.
8. **Pie** — una línea.

Contenedor máximo 1400 px, con 24 px de margen lateral en móvil y 40 px a partir de tableta.

---

## 5. Zona de prototipos

Es la única sección oscura, y sigue tres pasos de selección para no soltar trece
móviles de golpe:

1. **De quién** — cuatro fichas: Carmen, David, Antonio y situaciones límite. La activa se invierte a crema.
2. **Cómo verlo** — flujo a flujo o recorrido completo.
3. **De qué tipo** — pills que agrupan los flujos por momento (empezar, comprar, después de pedir…).

En "flujo a flujo" los flujos son una lista tipo acordeón: cada fila muestra el nombre
en cristiano, el código discreto y, si procede, la etiqueta "unhappy paths".
Solo se abre uno cada vez.

Encima de todo, el botón **ver el mapa de flujos** despliega un diagrama SVG con los
trece flujos, sus enlaces y una leyenda por momento del recorrido. Existe para que los
códigos (C03, C11, S01…) dejen de ser jerga sin contexto. En móvil se desplaza en
horizontal.

Antonio no tiene chat: al elegirlo aparece directamente su panel.

---

## 6. Navegación

Una barra fija aparece al superar los 520 px de scroll: el nombre del proyecto vuelve
al inicio y, en pantallas medianas o mayores, hay enlaces a cada sección. En móvil solo
queda el botón "arriba", que era el problema real: llegar al pie sin forma de volver.

Las secciones llevan `scroll-mt-14` para que la barra no tape sus titulares.

---

## 7. Motivos e ilustraciones

Dibujos de línea de pescado, naranja, gamba y pimiento (`Motifs.tsx`), en trazo de 1,5
y sin relleno, a juego con las reglas de la página. Son míos y provisionales: están para
que la página no quede desnuda y para que Sandra los sustituya por los suyos.

Van siempre en tono suave (25-40% de opacidad) y solo en pantallas anchas, para que
acompañen sin competir con el texto.

### Ilustraciones de personaje

Dibujos propios de los tres personajes. Sirven en dos sitios y por eso hacen falta
en dos formatos:

```
/public/ilustraciones/
  carmen.png · david.png · antonio.png
      400×400, cuadradas, recorte circular seguro.
      Se ven a 40 px en la cabecera del chat: sin detalle fino.

  carmen-retrato.png · david-retrato.png · antonio-retrato.png
      ~1200 px de ancho, composición libre.
      Para encabezar cada sección de persona.
```

Mientras no existan, el componente `PersonaImage` cae en un marcador con la inicial
sobre color plano. Nunca se ve un icono roto.

**Nota:** antes había iconos de Phosphor por CDN que nunca llegaron a renderizar
(el elemento salía a 0×0). Se han eliminado: las ilustraciones los sustituyen.

---

## 8. Movimiento

```
APARICIÓN AL SCROLL  (clase .reveal)
  opacidad 0 → 1 y desplazamiento 22 px → 0
  700 ms, cubic-bezier(0.16, 1, 0.3, 1)
  Se dispara con IntersectionObserver al 12% de visibilidad.
  Los hermanos se escalonan de 60 a 120 ms.

CURSOR PERSONALIZADO
  Punto de 9 px que sigue al ratón sin retardo.
  Anillo de 38 px que lo persigue con inercia (0,18 por fotograma)
  y crece a 62 px sobre cualquier elemento pulsable.
  Se desactiva por completo en táctil y con prefers-reduced-motion.

TRANSICIONES
  Color y borde: 250 ms.
  Apertura de flujo: fundido de 280 ms.
```

`prefers-reduced-motion: reduce` desactiva apariciones, desplazamiento suave y cursor.

**Nota de implementación:** las apariciones no dejan `will-change` puesto de forma
permanente. Con decenas de elementos, mantenerlo crea capas compuestas que penalizan
la memoria sin ganar nada.

---

## 9. Componentes

```
BOTÓN PRINCIPAL
  Rectángulo sin redondeo, borde de 1 px, texto de etiqueta.
  Al pasar el ratón invierte a tinta con texto crema.
  Suele ir acompañado de un botón circular de 56 px con flecha.

PILL
  Redondeo completo, borde de 1 px.
  Activa: relleno sólido; inactiva: solo borde.

FILA DE LISTA
  Separada por regla de 1 px, sin caja ni sombra.
  Numeración o código a la izquierda en Archivo Narrow.

FICHA DE PERSONA
  Rejilla sin espacio entre celdas, separadas por la propia línea de fondo.
  La activa invierte fondo y texto.

TARJETA (solo en el panel del placero)
  Fondo blanco, borde izquierdo de 4 px con el color del estado.
```

---

## 10. Tokens

Definidos en `prototype/src/index.css` dentro de `@theme`. Tailwind v4 genera las
utilidades a partir de ahí, así que **el nombre del token es el nombre de la clase**:
`--color-cream` da `bg-cream` y `text-cream`.

```css
--color-cream: #fcf6ec;        --color-ink: #1a1a18;
--color-cream-deep: #f4ebdd;   --color-ink-soft: #57544e;
--color-paper: #ffffff;        --color-ink-faint: #6e6a61;
                               --color-line: #e3d9c9;
--color-mercado-green: #2d6a4f;
--color-green-deep: #143026;   --color-azafran: #b8791d;
--color-green-mist: #eaf1ec;   --color-azafran-light: #e0a63f;
--color-whatsapp-green: #25d366;

--font-sans: "Archivo";        --text-base: 1.0625rem;  /* 17px */
--font-narrow: "Archivo Narrow";
--font-chat: system-ui;        /* el chat no usa fuente propia */
```

Aviso: Tailwind v4 calcula los colores en `oklab`. Si auditas contraste leyendo
`getComputedStyle`, resuelve el color pintándolo en un canvas: interpretar los
números de `oklab()` como si fueran RGB da resultados sin sentido.

---

## 11. Pendiente

### Decisión abierta: los rótulos de sección

Van por la segunda versión y siguen sin convencer. La primera (versalitas con regla
encima) se descartó por genérica. La actual (regla que el rótulo corta) está a la
espera de que Sandra traiga referencias visuales. **No proponer una tercera versión
a ciegas.**

### Tareas

- [ ] Ilustraciones de Carmen, David y Antonio (Sandra)
- [ ] Vídeo del mostrador generado con IA, alojado en Cloudinary
- [ ] Fotos o ilustraciones de los puestos para el vídeo del día
- [ ] Revisar la web en móvil real
- [ ] Revisar textos en TEXTOS_PORTFOLIO.md y aplicar cambios

---

*v2.1 — Segunda revisión: fuera versalitas y numeración, mapa de flujos, motivos de mercado y navegación fija.
v2.0 — Rediseño completo tras la primera revisión. Sustituye al sistema anterior
(Playfair Display, fondo oscuro, rejilla de trece móviles).*
