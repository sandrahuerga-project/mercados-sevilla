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
>
> **Cortes de línea:** no se escriben `<br>`. Un salto fijo cuadra a un ancho y
> descuadra a los otros tres. El reparto lo hace el navegador con
> `text-wrap: balance` en titulares y `pretty` en párrafos.
>
> Encima de eso, `prototype/src/content/tipografia.ts` pega con espacio duro toda
> palabra átona a la siguiente —artículos, preposiciones, conjunciones, pronombres
> y cifras—, así que el corte nunca cae después de «con el», «por» o «los». Se
> aplica sola al exportar: aquí se escribe en castellano normal y no hay que
> acordarse de nada.
>
> El tope de cada cadena va con el ancho de la columna, y por eso hay dos:
> **20 caracteres** en portada, citas y párrafos de sección, y **12** en las
> tarjetas de flujo. Una cadena de 18 como «con consentimiento» es inofensiva en
> un párrafo de 60 caracteres, pero en una tarjeta que da para 29 no cabe detrás
> de nada: se cae entera a la línea siguiente y deja la anterior a medias.
>
> La contrapartida, asumida el 5 de agosto: en las tarjetas sí puede quedar un
> «con» o un «y» al final de línea de vez en cuando. Con 29 caracteres de ancho
> no se puede tener las dos cosas.

---

## 1. Cabecera y portada

| Pieza | Texto actual |
|---|---|
| Nombre (arriba izquierda) | Mercados de Sevilla |
| Descriptor (arriba derecha) | Diseño de producto conversacional |
| Etiqueta | Case study · Diseño de producto |
| **Titular** | Comprar en el mercado sin salir de WhatsApp |
| Entradilla | Los mercados de abastos de Sevilla tienen una web para vender online que no se usa. El problema es el canal. Este proyecto rediseña la compra a través de WhatsApp tras el caso de éxito de un pescadero.|
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
**Titular:** Los mercados cada vez están más vacíos. La gente no compra en ellos por horarios incompatibles o por no poder acudir.

**Una plataforma que casi nadie usa**
El Ayuntamiento tiene web app, app, taquillas refrigeradas y reparto para once mercados. La infraestructura está construida y financiada, pero el uso es bajo: pide registro, aprendizaje y descargar una app nueva en el móvil. No muestra fotos de productos reales y la interfaz es compleja para usuarios no tecnológicos.

**Un WhatsApp que funciona solo**
Un pescadero de un mercado de barrio graba cada mañana un vídeo de su mostrador, lo manda por difusión y recibe los pedidos en lenguaje natural. Ahí reside su éxito: entra por los ojos, engancha cada día a gente que mira WhatsApp a primera hora, hacen un pedido rápido y el cobro se realiza al entregar o recoger.

**Lo que separa a un canal del otro**
WhatsApp ya está en el móvil del cliente, la compra ocurre dentro de una conversación y la relación con el placero se mantiene. La actual web app requiere una curva de aprendizaje alta, es fría y está llena de fotografías de producto de stock que no convencen a los usuarios.

---

## 3. De la investigación

**Etiqueta:** De la investigación
**Titular:** Qué piensan los clientes
**Nota al pie:** Citas de las entrevistas. Los nombres no son reales.

### Carmen · 71 años · Compra en el mercado de toda la vida

> «Lo único que uso del móvil es WhatsApp y, la verdad, cuando veo los vídeos de la pescadería todas las mañanas me vienen ideas de comidas y me entran ganas de comprar.»

**Qué importa:** el vídeo diario no es un catálogo: es lo que despierta las ganas de comprar. Por eso el flujo empieza en el vídeo y no en una lista de productos.

### David · 34 años · Trabaja de 8 a 17h y le gusta comprar fresco

> «Aunque me encanta comprar en negocios locales, con el trabajo es imposible comprar en el mercado como no sea los sábados. Y siempre tengo planes. Me gustaría poder recoger lo que encargue por la tarde cuando salga de trabajar.»

**Qué es clave:** no es falta de intención, es incompatibilidad de horarios. De aquí salen la taquilla refrigerada y el reparto en franja de tarde.

---

## 4. La propuesta

**Etiqueta:** La propuesta
**Titular:** Un asistente que acerca el negocio a los usuarios y les impacta a diario.
**Entradilla:** El bot habla con los clientes, toma nota y avisa al placero. No calcula precios, no decide sustituciones y no sustituye al vendedor. Potencia sus ventas y le deja la relación con el cliente, creando un impacto diario en la mente del usuario y fidelizándolo.

| Pilar | Texto |
|---|---|
| El vídeo abre el día | Cada mañana le llega a los usuarios un vídeo del mostrador real del puesto. Lo que se ve es lo que hay, sin inventario que mantener. |
| Se pide hablando | Audio o texto, en lenguaje natural. «Un cuarto de gambas» se entiende como ¼ kg. |
| El placero manda | Acepta, pesa y teclea el total final. El bot solo repite ese número al cliente. |
| Se paga como siempre | Efectivo, Bizum o tarjeta al recoger o al recibir. Sin pasarela de pago que aprender ni que desarrollar tecnológicamente. |

---

## 5. El prototipo

**Etiqueta:** El prototipo
**Titular:** Elige de qué persona quieres ver la experiencia
**Entradilla:**  Cada pantalla es interactiva: pulsa dentro y la conversación avanza.
**Nota final:** Los unhappy paths también están: producto agotado, cliente que no recoge, pedido fuera de horario, etc.

### Selector de personas

| Persona | Etiqueta | Descripción |
|---|---|---|
| Carmen, 71 años | Clienta no tecnológica y dificultad para salir de casa sola | WhatsApp es la única app que usa. Necesita confirmación en cada paso y poder hablar con una persona en cualquier momento. |
| David, 34 años | Cliente joven con poco tiempo | Compra mientras desayuna en el trabajo. Hace pedidos en varios puestos y recoge fuera del horario de mercado. |
| Antonio, 52 años | Placero | Si su producto no se ve fresco, no lo vende igual. Sus pedidos recibidos le llegan a un panel donde cada uno de ellos se resuelve en un toque. |
| Situaciones límite | Sistema | Lo que pasa cuando el puesto está cerrado, se ha terminado el producto o cuando un cliente acumula incidencias sin resolver, entre otros casos. |

### Modos de vista

- Flujo a flujo
- Recorrido completo
- Filtros por grupo, que cambian según la persona elegida:
  - Carmen: Todos · Empezar · Comprar · Después de pedir
  - David: Todos · Comprar rápido · Pedido grande · Cambios de última hora
  - Antonio: Todos · Empezar · Cada mañana · Durante el día · Al cerrar
  - Situaciones límite: Todos · Horario y sitio · Cuando algo falla · Cuando se rompe la confianza

### Nombres de los flujos

Los 23 que hay en el prototipo, tal cual salen de `prototype/src/content/flowCatalog.ts`.
⚠ marca los que tienen ramas que salen mal.

**Carmen · clienta no tecnológica**

| Código | Nombre visible | Grupo | Descripción |
|---|---|---|---|
| C01 | Darse de alta | Empezar | Alta en tres pantallas dentro del chat, con consentimiento explícito. |
| C02 | El saludo de cada mañana | Empezar | Un mensaje y dos botones. La rutina diaria sin complicaciones. |
| C03 | Pedir mandando un audio ⚠ | Comprar | El flujo central: vídeo, nota de voz, confirmación y recogida. |
| C07 | Seguir el pedido hasta recogerlo ⚠ | Después de pedir | Avisos de estado y el total real una vez pesado el pedido. |
| C08 | Cuando se agota un producto ⚠ | Después de pedir | El placero marca agotado y el cliente decide qué hacer. |
| C11 | Hablar con el placero | Después de pedir | El bot se aparta, entra la persona y luego devuelve el control. |

**David · cliente con poco tiempo**

| Código | Nombre visible | Grupo | Descripción |
|---|---|---|---|
| C06 | Repetir el pedido de siempre ⚠ | Comprar rápido | «Lo de siempre» resuelto en un toque, eligiendo cómo lo quiere recibir. |
| C04 | Pedir sin esperar al vídeo | Comprar rápido | El cliente arranca la conversación por su cuenta a media mañana. |
| C05 | Comprar en dos puestos a la vez ⚠ | Pedido grande | Un pedido, dos placeros y una entrega. Y qué pasa si uno no puede. |
| C09 | Cambiar algo del pedido ⚠ | Cambios de última hora | Libre antes de que el placero acepte; a partir de ahí, decide él. |
| C10 | Cancelar antes de que lo acepten | Cambios de última hora | Se anula sin coste, pero nunca sin preguntar dos veces. |
| C12 | Cancelar con el pedido en marcha ⚠ | Cambios de última hora | Ya está preparado: en vez de anularlo, se guarda para mañana o va a la taquilla. |

**Antonio · placero**

| Código | Nombre visible | Grupo | Descripción |
|---|---|---|---|
| P01 | Dar de alta el puesto | Empezar | Horario, formas de recogida y el acceso al panel. Una vez y ya está. |
| P02 | Mandar el vídeo del día ⚠ | Cada mañana | El vídeo del mostrador es lo que abre los pedidos. Sin él no sale la difusión. |
| P03 | Resolver un pedido ⚠ | Durante el día | Aceptar, pesar y teclear el total. Cada toque avisa al cliente. |
| P04 | Cerrar el día ⚠ | Al cerrar | Cuánto ha entrado, qué queda suelto y la liquidación del mes. |

**Situaciones límite · sistema**

| Código | Nombre visible | Grupo | Descripción |
|---|---|---|---|
| S01 | Pedir con el puesto cerrado | Horario y sitio | El bot atiende siempre, aunque el mercado no. |
| S06 | Vive fuera de la zona de reparto | Horario y sitio | No llega el reparto: se le ofrecen los mercados que sí tiene cerca. |
| S04 | El bot no entiende el pedido ⚠ | Cuando algo falla | Nunca se inventa lo que no ha oído: pregunta, o pasa con Antonio. |
| S05 | Se sale a mitad del alta | Cuando algo falla | Se retoma donde lo dejó, y se pueden borrar los datos a medias. |
| S07 | El placero no manda el vídeo ⚠ | Cuando algo falla | Sin vídeo no hay difusión. No se enseña el mostrador de ayer como si fuera hoy. |
| S02 | El cliente no recoge ⚠ | Cuando se rompe la confianza | Dos avisos antes del cierre y la incidencia se anuncia antes de ponerla. |
| S03 | Cliente bloqueado | Cuando se rompe la confianza | Dos incidencias sin resolver y el pedido deja de entrar por el bot. |

Etiqueta en flujos con ramas que fallan: **Unhappy paths**

Botón del diagrama: **Ver el mapa de flujos** / **Ocultar el mapa de flujos**

Pie del diagrama: Los códigos vienen del inventario de flujos del proyecto. Cada uno es una conversación completa; las flechas indican por dónde continúa.

### Panel del placero

**Etiqueta:** La otra mitad
**Titular:** El panel del placero
**Entradilla:** Antonio no usa WhatsApp para trabajar, sino que tiene un panel web. Recibe el pedido, teclea el total real tras pesarlo y el total le llega al cliente junto al estado de «en preparación». Tras el pago, Antonio lo marca como «cobrado» y, cuando lo entrega, como «entregado».

---

## 6. Cómo está hecho

**Etiqueta:** Contexto y restricciones 
**Pestañas:** Contexto de producto · Restricciones de WhatsApp Business

### Contexto de producto

| Bloque | Texto |
|---|---|
| El modelo que ya funcionaba | Un pescadero en un mercado de barrio demostró que el canal conversacional en WhatsApp gana al comercio electrónico clásico, pese a estar presente en ambos. Lo hace a través de un vídeo del mostrador por la mañana en el chat, pedidos en lenguaje natural y cobro en mano, Bizum o tarjeta. Recoger o a domicilio. Este proyecto lleva ese modelo a WhatsApp Business y engloba más puestos y mercados. |
| Aprovechar la infraestructura | La plataforma municipal creada para la web app ya tiene taquillas y reparto (en algunos, pero extensible a todos) en once mercados. La capa conversacional se apoya en esa infraestructura y le da un uso que hasta ahora ha sido mínimo. |
| Voz y tono | Lenguaje cercano y cotidiano, entendible por todos los usuarios. Carmen recibe el mismo trato que David. Cambia la densidad de la información y la posibilidad de acceder a llamadas con el vendedor. |
| Decir que es un bot | El reglamento europeo de IA obliga a avisar de que se está hablando con una máquina. Aquí se dice en la primera frase del alta y sin tecnicismos: «un asistente automático, no una persona». A Carmen «sistema de IA» no le dice nada; que no es una persona, sí. Y el aviso no va solo: viene con la salida, que es hablar con el placero. |

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
