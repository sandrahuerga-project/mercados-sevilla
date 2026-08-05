# Post mortem — Mercados de Sevilla

> Qué se rompió, por qué, y qué se cambió para que no vuelva a pasar.
> Del 28 de julio al 5 de agosto de 2026. Prototipo en producción.
>
> Esto no es la lista de lo que se hizo: eso está en [`PENDIENTE.md`](PENDIENTE.md).
> Aquí solo hay lo que salió mal y qué se aprendió.

---

## 0. Por qué existe este documento

Un case study enseña el resultado. Este archivo enseña el camino, que es donde
está el criterio. Ningún proyecto sale limpio a la primera, y un portfolio que
lo insinúa está escondiendo la parte interesante.

Sin culpables y sin adornos: los fallos son del sistema de trabajo, no de quien
tecleó. Varios los detectó Sandra mirando la pantalla después de que la
verificación automática los diera por buenos. Eso también es un hallazgo.

---

## 1. Los fallos

### 1.1 El mapa de flujos llevaba semanas mintiendo

**Qué pasaba.** El diagrama de flujos tenía su propia lista de nombres escrita a
mano, abreviados para que cupieran en cajas de 190 px. El resto de la web leía
los nombres del catálogo. **21 de los 23 flujos decían cosas distintas en cada
sitio**: el mapa decía «Pedir con un audio» y la lista «Pedir mandando un
audio»; el mapa «Ya no se puede anular» y la lista «Cancelar con el pedido en
marcha».

**Causa de fondo.** Dos fuentes de verdad para el mismo dato, leídas en
pantallas distintas. Nunca se ven juntas, así que la desviación no salta.

**Qué se cambió.** El mapa lee `flowCatalog.ts`. Si un código no está en el
catálogo, **revienta al construir** en vez de enseñar otra cosa en silencio. Los
nombres largos se parten en dos líneas y la caja creció de 56 a 72 px.

**Coste de no haberlo visto antes.** Se descubrió porque Sandra dijo «los textos
que veo no son los que escribí». Si no lo llega a decir, el mapa iba a producción
contradiciendo a la lista que tiene justo encima.

---

### 1.2 La misma trampa, esperando dos metros más allá

**Qué pasaba.** `FlowScreen` hacía `label ?? script.label`. Si alguien lo usaba
sin pasar el título, salía el nombre interno del JSON: «C05 Multi-puesto»,
«Vista David: añadir un segundo puesto…». Jerga de inventario, en el portfolio.

**Por qué no se veía.** Nunca llegó a pasar: el único sitio que lo usaba sí
pasaba el título bueno. Era un fallo latente, del mismo tipo exacto que el 1.1.

**Qué se cambió.** Los dos parámetros son obligatorios. Si alguien los olvida,
**no compila**. Un valor por defecto silencioso es peor que un error ruidoso.

---

### 1.3 Medir con el instrumento equivocado

**Qué pasaba.** El puntero personalizado era verde de marca sobre cualquier
fondo. Sobre la sección verde oscura daba 2,22:1 y era casi invisible, justo
donde todo es pulsable. Se detectó midiendo, se cambió a crema sobre oscuro, y
se dio por resuelto.

**Y seguía mal.** Sobre crema el verde daba 5,94:1, que para texto es correcto.
Sandra: «en los fondos claros no se ve». Tenía razón: **un anillo de 1 px y un
punto de 9 px no se leen como se lee una letra**. El umbral de texto no vale
para un trazo fino.

**Qué se cambió.** Verde hondo, 13,19:1 sobre crema, y el anillo a 2 px. El par
crema / verde hondo da la misma cifra en los dos sentidos. Y se comprobó con una
captura, no solo con el número.

**Lección.** Un ratio de contraste describe una superficie de color, no un
dibujo de una hoja de grosor. Medir da tranquilidad falsa si se mide otra cosa.

---

### 1.4 Arreglar un fallo e introducir otro en el mismo sitio

**Qué pasaba.** Para que el puntero cambiara de color se eligió mirar **la
sección**, no el elemento bajo el ratón, para que no parpadeara al cruzar
elementos. Se escribió en un comentario como si fuera una ventaja.

Rompía el caso más importante: la pantalla del móvil es **una isla clara dentro
de la sección oscura**. El puntero se ponía crema sobre un chat casi blanco. Es
decir: quedaba invisible exactamente encima del prototipo, que es lo que la
gente viene a tocar.

**Causa de fondo.** Se eligió la granularidad por un motivo real (el parpadeo) y
no se probó en el sitio que más importa. Y el comentario del código
racionalizaba la decisión, que es la peor forma de dejarla fijada.

**Qué se cambió.** Manda la **zona marcada más cercana**, no la sección. La
pantalla del chat y la barra de escribir se declaran claras y ganan a la sección
que las contiene. Sigue siendo por zonas, así que no parpadea.

---

### 1.5 Una regla buena aplicada donde no tocaba (dos veces)

**Qué pasaba.** Para que ninguna línea acabe en preposición, las palabras átonas
se pegan a la siguiente con espacio duro, con un tope de 20 caracteres por
cadena. Bien en la portada, que tiene líneas de 60 caracteres.

En las tarjetas de flujo, de 29 caracteres, `con consentimiento` (18) no cabe
detrás de nada: se cae entera a la línea siguiente y deja la anterior a medias.
El arreglo producía el defecto que venía a resolver.

**Y volvió a pasar.** Al poner «Contexto de producto» en cuatro columnas de
300 px, esos textos entraron en el mismo caso. Esta vez se vio antes de
publicar, porque ya se sabía qué mirar.

**Qué se cambió.** Dos topes según el ancho de la columna: 20 donde el texto es
ancho, 12 en columnas estrechas.

**Lección.** Una regla tipográfica no es universal: depende del ancho de medida.
Calibrarla en un sitio y aplicarla a todos es el fallo, no el número.

---

### 1.6 El bot confirmaba lo que nadie había aceptado

**Qué pasaba.** Los recibos decían «✅ ¡Pedido confirmado!» nada más recibir el
pedido, cuando el placero todavía no lo había aceptado. En C03, C05, C06 y C11.

**Por qué importa más que un fallo de copy.** El principio rector del proyecto es
que **el bot es secretario, no árbitro**. Confirmar algo que decide otro es
exactamente lo contrario. No era una palabra mal elegida: era el producto
contradiciéndose.

**Qué se cambió.** «📝 Pedido recibido» y, a continuación, quién falta que lo
acepte. La confirmación llega cuando el placero la da en su panel.

**Lección.** Un principio rector escrito en un documento no se aplica solo. Si no
se comprueba mensaje por mensaje, el copy se escribe por inercia.

---

### 1.7 Un botón que llevaba al puesto equivocado

En C05 se elegía entre «Frutería Manolo» y «Carnicería Lola», y **los dos
llevaban a la rama de la frutería**. Pulsabas Lola y te contestaba Manolo.

Un atajo de cuando el flujo se montó deprisa, que nadie volvió a mirar porque
«C05 ya está hecho». Ahora cada botón tiene su rama, con su producto, su recibo
y su unhappy path.

---

### 1.8 Lo que venía de fuera y nadie volvió a leer

Tres cosas entraron en el primer commit y sobrevivieron una semana:

- **`prototype/README.md` era la plantilla de Google AI Studio**: banner de
  Google, enlace a la app de AI Studio e instrucciones para configurar una
  `GEMINI_API_KEY` que este proyecto no usa. En la carpeta principal de un repo
  público de portfolio.
- **El documento de negociación con el ayuntamiento** —objetivos de la reunión y
  el «ask» al alcalde— **era legible por cualquiera**, incluido quien gestiona
  la plataforma contra la que compite el proyecto.
- **La descripción de la página decía «13 flujos»** cuando ya había 23.

**Causa de fondo.** Lo importado se revisa una vez y se deja de ver. Y nadie se
preguntó, al hacer el repo público, **qué de lo que hay dentro no debería
leerse**.

**Qué se cambió.** README real por carpeta; el documento de reunión y las notas
de trabajo fuera del repo y en `.gitignore`; el historial reescrito el 5 de
agosto para borrarlo de todos los commits.

**Lo que no se puede deshacer.** Los objetos huérfanos siguen accesibles en
GitHub por identificador hasta que purguen. Reescribir el historial no es un
botón de borrar: llega tarde por definición.

---

### 1.9 Cifras que solo cuadraban en una pantalla

La cinta de la portada se colocaba en **porcentaje de la altura de la portada**.
Como esa altura depende de en cuántas líneas parte el titular, el aire por
debajo salía distinto en cada móvil: **30 px a 360, 19 a 390 y 69 a 430**.

Ajustar el porcentaje lo habría arreglado en un móvil y roto en otro. Ahora la
cinta tiene su propia caja de alto fijo dentro del flujo: 16 px arriba y 32
abajo, iguales en todos.

Del mismo tipo: el vídeo del mostrador decía `0:38` cuando dura 10 segundos.

---

## 2. Los patrones

Los nueve fallos se reducen a cuatro formas:

| Patrón | Dónde apareció |
|---|---|
| **Dos fuentes de verdad para el mismo dato** | 1.1 mapa vs catálogo · 1.2 valor por defecto silencioso |
| **Regla calibrada en un sitio, aplicada en todos** | 1.3 contraste de texto · 1.5 tope tipográfico · 1.9 cinta en porcentaje |
| **Lo heredado que nadie relee** | 1.8 plantilla, documento privado, cifras viejas |
| **El principio escrito que no se comprueba** | 1.6 recibos · 1.7 botón de C05 |

Ninguno era un fallo de programación. Todos eran de **organización de la
información**.

---

## 3. Qué se cambió en el sistema, no solo en el síntoma

Arreglar el caso concreto no evita el siguiente. Lo que de verdad cierra la
puerta:

- **Una sola fuente por dato.** El mapa, la lista y los guiones leen
  `flowCatalog.ts`. El copy del chat vive en los JSON y los `.md` de
  `flows/guiones/` se generan.
- **Que falle ruidoso.** Un código que no está en el catálogo lanza un error. Los
  títulos son obligatorios: si faltan, no compila.
- **Reglas con parámetro, no constantes globales.** El tope tipográfico y el
  color del puntero se declaran por contexto.
- **Verificación automática de lo que se puede contar.** `validar-flujos.mjs`
  comprueba los límites de WhatsApp, los enlaces entre pasos y la coherencia de
  los recorridos. `exportar-guiones.mjs` regenera la documentación desde los
  datos.
- **Y el juicio visual lo da una persona.** Los dos fallos peores del puntero
  pasaron una verificación numérica. Medir no sustituye a mirar.

---

## 4. Lo que queda, y con qué plan

| Qué | Estado | Plan |
|---|---|---|
| Entregables de la reunión: vídeo de respaldo, deck de viabilidad, one-pager del «ask» | Aparcado el 5 de agosto | Se retoma cuando haya fecha. Se trabajan fuera del repo, en la carpeta privada |
| Purga de los objetos huérfanos en GitHub | Sin pedir | Escribir a soporte citando el repo. Si no, se limpia solo sin plazo |
| Revisión legal del aviso de IA | Sin hacer | Solo hace falta si el proyecto llega a desplegarse de verdad. Hoy no habla con nadie |
| Base de datos: Airtable → Supabase | Decidido, no ejecutado | Fase 2. El disparador realista es la residencia de datos en la UE, no el número de registros |

---

## 5. Lo que se decidió no hacer

Tan informativo como lo que sí:

- **No reescribir el historial la primera vez** que apareció el documento de
  negociación. Se valoró el coste y se descartó. Cuando días después se
  reescribió por otro motivo, se aprovechó para borrarlo: el coste ya estaba
  pagado.
- **No poner Supabase.** Quien mantiene esto es perfil de diseño y marketing.
  Airtable con un panel Softr encima da la mitad del producto sin escribir
  código. Supabase no añadiría una base de datos: añadiría un proyecto de
  desarrollo.
- **No escribir un CHANGELOG.** El historial de git ya lo cuenta. Un segundo
  archivo que hay que mantener a mano envejece mal, y un changelog desfasado
  resta más de lo que suma.
- **No hacer una PWA de historial.** Se mencionaba en un flujo pero no existía.
  Se quitó el botón: era la única promesa del prototipo sin nada detrás.

---

*Redactado el 5 de agosto de 2026, al cerrar el prototipo.
Diseño y contenido: Sandra Huerga.*
