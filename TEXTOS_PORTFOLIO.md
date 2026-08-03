# Textos del portfolio

> Todo el texto visible de https://mercados-sevilla.vercel.app, para revisarlo y reescribirlo
> sin tocar código. Cuando cambies algo aquí, dímelo y lo llevo a
> `prototype/src/content/texts.ts`, que es de donde lee la web.
>
> **Regla de estilo:** solo la primera palabra en mayúscula, salvo nombres propios.
> "Guía de configuración", nunca "Guía De Configuración".
>
> El copy de dentro del chat NO está aquí: vive en DESIGN.md §7 y en
> `prototype/src/flows/*.json`, porque son mensajes de producto, no de portfolio.

---

## 1. Cabecera y portada

| Pieza | Texto actual |
|---|---|
| Nombre (arriba izquierda) | Mercados de Sevilla |
| Descriptor (arriba derecha) | Diseño de producto conversacional |
| Etiqueta | Case study · Diseño de producto |
| **Titular** | Comprar en el mercado sin salir de WhatsApp |
| Entradilla | Para potenciar la compra en los mercados de abastos de Sevilla, no hacía falta una web app como la actual. Hacía falta WhatsApp, que es el canal que utilizan sus usuarios. Este proyecto rediseña la compra en los mercados de Sevilla siguiendo el ejemplo de un exitoso placero.|
| Botón principal | Ver los flujos |
| Botón secundario | Por qué WhatsApp |

**Ficha del proyecto**

| Etiqueta | Valor |
|---|---|
| Rol | Diseño de producto y contenido |
| Ámbito | Sistema conversacional y panel de gestión |
| Estado | Prototipo navegable |

---

## 2. El problema

**Etiqueta:** El problema
**Titular:** Los mercados cada vez más vacíos y la gente que no puede comprar en ellos.

**Una plataforma que casi nadie usa**
El Ayuntamiento tiene web app, app, taquillas refrigeradas y reparto para once mercados. La infraestructura está construida y financiada, pero el uso es bajo: pide registro exhaustivo, aprendizaje y una app nueva en el móvil. No muestra fotos de productos reales y la interfaz es compleja para usuarios no tecnológicos.

**Un WhatsApp que funciona solo**
Un pescadero de un mercado de barrio graba cada mañana un vídeo de su mostrador, lo manda por difusión y recibe los pedidos en lenguaje natural. Ahí reside su éxito: entra por los ojos, engancha cada día a gente que mira WhatsApp a primera hora, pedido rápido y cobro al entregar o recoger.

**Lo que separa a un canal del otro**
WhatsApp ya está en el móvil del cliente, la compra ocurre dentro de una conversación y la relación con el placero se mantiene. La actual web app requiere aprendizaje, es fría y está llena de fotografías de producto de stock.

---

## 3. De la investigación

**Etiqueta:** De la investigación
**Titular:** Qué piensan los clientes
**Nota al pie:** Citas de las entrevistas. Los nombres no son reales.

### Carmen · 71 años · Compra en el mercado de toda la vida

> «Lo único que uso del móvil es el WhatsApp y, la verdad, es que ver los vídeos de la pescadería todas las mañanas me da ideas de comidas y me entran ganas de comprarle.»

**Qué importa:** el vídeo diario no es un catálogo: es lo que despierta las ganas de comprar. Por eso el flujo empieza en el vídeo y no en una lista de productos.

### David · 34 años · Trabaja de 8 a 17h y le gusta comprar fresco

> «Aunque me encanta comprar en negocios locales, con el trabajo es imposible comprar en el mercado como no sea los sábados. Y siempre tengo planes. Me gustaría poder venir a por lo encargado por la tarde cuando salga de trabajar.»

**Qué es clave:** no es falta de intención, es incompatibilidad de horarios. De aquí salen la taquilla refrigerada y el reparto en franja de tarde.

---

## 4. La propuesta

**Etiqueta:** La propuesta
**Titular:** Más que un puesto en el mercado: un asistente que acerca el negocio a los usuarios y les impacta a diario.
**Entradilla:** El bot habla con los clientes, toma nota y avisa al placero. No calcula precios, no decide sustituciones y no sustituye al vendedor: le quita el trabajo administrativo y le deja la relación con el cliente, potenciando el negocio con un impacto diario en la mente del usuario.

| Pilar | Texto |
|---|---|
| El vídeo abre el día | Cada mañana le llega a los usuarios un vídeo del mostrador real del puesto. Lo que se ve es lo que hay, sin inventario que mantener. |
| Se pide hablando | Audio o texto, en lenguaje natural. «Un cuarto de gambas» se entiende como ¼ kg. |
| El placero manda | Él acepta, él pesa y él teclea el total final. El bot solo repite ese número al cliente. |
| Se paga como siempre | Efectivo, Bizum o tarjeta al recoger o al recibir. Sin pasarela de pago que aprender ni que desarrollar tecnológicamente. |

---

## 5. El prototipo

**Etiqueta:** El prototipo
**Titular:** Elige de quién quieres ver la experiencia
**Entradilla:**  Cada pantalla es interactiva: pulsa dentro y la conversación avanza.
**Nota final:** Los unhappy paths también están: producto agotado, cliente que no recoge, pedido fuera de horario.

### Selector de personas

| Persona | Etiqueta | Descripción |
|---|---|---|
| Carmen, 71 años | Clienta no tecnológica y movilidad reducida | Solo usa WhatsApp. Necesita confirmación en cada paso y poder hablar con una persona en cualquier momento. |
| David, 34 años | Cliente joven con poco tiempo | Compra mientras desayuna en el trabajo. Hace pedidos en varios puestos y recoge fuera del horario de mercado. |
| Antonio, 52 años | Placero | Si su producto no se ve, no lo vende. Sus pedidos recibidos no están en el chat, sino en panel donde cada uno de ellos se resuelve en un toque. |
| Situaciones límite | Sistema | Lo que pasa cuando el puesto está cerrado, se ha terminado el producto o cuando un cliente acumula incidencias sin resolver. |

### Modos de vista

- Flujo a flujo
- Recorrido completo
- Filtros por grupo: Todos · Empezar · Comprar · Después de pedir (Carmen) · Comprar rápido · Pedido grande · Cambios de última hora (David) · Fuera de lo normal (situaciones límite)

### Nombres de los flujos

| Código | Nombre visible | Descripción |
|---|---|---|
| C01 | Darse de alta | Alta en tres pantallas dentro del chat, con consentimiento explícito. |
| C02 | El saludo de cada mañana | Un mensaje, dos botones. La rutina diaria sin fricción. |
| C03 | Pedir mandando un audio | El flujo central: vídeo, nota de voz, confirmación y recogida. |
| C07 | Seguir el pedido hasta recogerlo | Avisos de estado y el total real una vez pesado el pedido. |
| C08 | Cuando se agota un producto | El placero marca agotado y el cliente decide qué hacer. |
| C11 | Hablar con el placero | El bot se aparta, entra la persona y luego devuelve el control. |
| C06 | Repetir el pedido de siempre | «Lo de siempre» resuelto en un toque. |
| C04 | Pedir sin esperar al vídeo | El cliente arranca la conversación por su cuenta a media mañana. |
| C05 | Comprar en dos puestos a la vez | Un pedido, dos placeros, una entrega. Y qué pasa si uno no puede. |
| C09 | Cambiar algo del pedido | Libre antes de que el placero acepte; a partir de ahí, decide él. |
| C10 | Cancelar un pedido | Sin fricción si nadie ha empezado; con confirmación si ya está en marcha. |
| S01 | Pedir con el puesto cerrado | El bot atiende siempre, aunque el mercado no. |
| S03 | Cliente bloqueado | Dos incidencias sin resolver y el pedido deja de entrar por el bot. |

Etiqueta en flujos con ramas que fallan: **Unhappy paths**

Botón del diagrama: **Ver el mapa de flujos** / **Ocultar el mapa de flujos**

Pie del diagrama: Los códigos vienen del inventario de flujos del proyecto. Cada uno es una conversación completa; las flechas indican por dónde continúa.

### Panel del placero

**Etiqueta:** La otra mitad
**Titular:** El panel del placero
**Entradilla:** Antonio no usa WhatsApp para trabajar: usa un panel web. Recibe el pedido, teclea el total real tras pesarlo, y el total le llega al cliente junto al estado de "en preparación". Tras el pago, Antonio lo marca como cobrado y entregado. 

---

## 6. Cómo está hecho

**Etiqueta:** Contexto y restricciones 
**Pestañas:** Contexto de producto · Restricciones de WhatsApp Business

### Contexto de producto

| Bloque | Texto |
|---|---|
| El modelo que ya funcionaba | Un pescadero en un mercado de barrio demostró que el canal conversacional gana al comercio electrónico clásico, pese a estar presente en ambos: vídeo del mostrador por la mañana en el chat, pedidos en lenguaje natural y cobro en mano, Bizum o tarjeta. Recoger o a domicilio. Este proyecto lleva ese modelo a WhatsApp Business y engloba más puestos y mercados. |
| Aprovechar la infraestructura | La plataforma municipal creada para la web app, ya tiene taquillas, reparto (en algunos, pero extensible a todos) en 11 mercados. La capa conversacional se apoya en esa infraestructura y le da un uso que hasta ahora ha sido mínimo. |
| Voz y tono | Lenguaje cercano y cotidiano, sin diminutivos ni condescendencia. Carmen recibe el mismo trato que David. Cambia la densidad de la información y la posibilidad de acceder a llamadas con el vendedor.

### Restricciones de WhatsApp Business

**Entradilla:** WhatsApp Business controla el aspecto del chat (la UI). Todo el diseño ocurre dentro de estos límites, verificados contra la documentación de Meta.

La tabla de restricciones sale de `prototype/src/data/mockData.ts` (botones, listas, ausencia de tarjetas, WhatsApp Flows y plantillas de utilidad).

---

## 7. Pie

- Prototipo de diseño. No envía mensajes reales ni procesa pagos.
- Diseño y contenido: Sandra Huerga · 2026

---

## Retirado del diseño anterior

Por decisión de la revisión del 2026-07-29, ya no aparecen:

- **Diccionario NLU andaluz** — no aportaba al relato del case study.
- **Verificación de coherencia visual y accesibilidad** — auditar el propio diseño dentro de la página resultaba redundante.
- Todos los títulos en mayúscula inicial por palabra. Corregidos también dentro del formulario de alta ("Tu nombre", "Código postal", "Mercado favorito", "Difusión y privacidad") y en la tabla de restricciones.
- **Overlines en versalitas** (ETIQUETA EN MAYÚSCULAS con una regla encima). Sustituidos por un rótulo en minúscula que corta la línea de sección.
- **Numeración 01, 02, 03** en "El problema". La regla ya separa los apartados.
- **"Sigue bajando"** y otras muletillas de guía.
