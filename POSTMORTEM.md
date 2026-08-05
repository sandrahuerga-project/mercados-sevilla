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

### 1.10 Los flujos de David hablaban con Carmen

**Qué pasaba.** «Buenos días **Carmen**» en C04, que es un flujo de David. Antonio
le contestaba «Sin problema, Carmen» en C09. Y C09, C10 y C12 usaban el pedido de
Carmen entero —el número `#SGZ-2026-0387`, sus boquerones, su recogida a las
14:00— en la persona que compra en dos puestos y recoge al salir de trabajar.

**Causa de fondo.** Los flujos de David se escribieron copiando los de Carmen y
cambiando lo que saltaba a la vista. El nombre dentro de una frase no salta:
está en mitad de un párrafo que ya se ha leído tres veces.

**Qué se cambió.** Cada persona tiene su pedido y su número: Carmen el `#0387`
de recogida, David el `#0412` de reparto y el `#0429` de «lo de siempre». El
`#0412` es además el que aparece en el panel del placero, así que un dato mal
puesto ahora se ve en dos pantallas a la vez.

**Lección.** Copiar un flujo para adaptarlo deja el original entero por debajo.
Lo que no se cambia a propósito se queda, y lo que se queda contradice.

---

### 1.11 El recorrido daba por bueno cualquier final

**Qué pasaba.** «De principio a fin» encadena varios flujos en una conversación
sola. La regla era: **todo paso final salta al flujo siguiente**, salvo dos
excepciones apuntadas a mano. Consecuencia: en el recorrido de David pulsabas
«Modificar» y aparecía, sin transición, el recibo ya confirmado de otro pedido.
Pulsabas «Hablar con Manolo» y te salía Antonio aceptando el pedido de Carmen,
con su importe y su hora. En el de Carmen, «Pedir ahora» te llevaba a dormir y
amanecer en el saludo del día siguiente.

**Causa de fondo.** La regla se calibró con los finales felices, que sí encadenan,
y se aplicó a todos. Un final que dice «esto sigue en la ficha de C11» no es un
puente: es una salida.

**Qué se cambió.** Una **lista explícita de puentes por persona**: de qué final
concreto a qué paso concreto. Lo que no está en la lista termina donde termina,
con su nota, igual que en su ficha. Y el recorrido de David usa una variante de
tracking con su pedido de reparto, en vez del tracking de recogida de Carmen.

---

### 1.12 «Modificar» solo modificaba una cosa, y «Quitar» sumaba

**Qué pasaba.** En C09, tocar «Modificar» saltaba directo a «¿qué cantidad de
boquerones quieres?». No preguntaba qué se quería cambiar: elegía por el cliente.
No había forma de tocar el otro producto ni la entrega, que es justo lo que el
flujo dice hacer en su ficha.

Y peor: el botón **«Quitar del pedido» llevaba al mismo paso que «1 kg»**. Pedías
quitar y el bot te subía la cantidad y el precio.

**Causa de fondo.** La rama se montó para **enseñar el patrón de edición**, no
para cubrir el flujo. Como demostración estaba bien; como flujo, era un camino
único disfrazado de tres botones. Nadie volvió a mirarlo porque «C09 ya está».

**Qué se cambió.** C09 pregunta primero qué cambiar, cada producto tiene cantidad
rápida y cantidad escrita a mano, y quitar quita. El mismo repaso encontró botones
sin salida en C03, C05 y C06: mirar el vídeo sin pedir, cerrar el pedido sin
añadir otro puesto, corregir lo que trae «lo de siempre».

---

### 1.13 El mismo pedido valía 4,15 € y 12,40 €

**Qué pasaba.** Antonio pesaba el pedido `#0387` y tecleaba **12,40 €** en su
flujo. El aviso que le llegaba a Carmen por ese mismo pedido decía **4,15 €**,
que era el estimado. Tres veces la diferencia, en el número que el proyecto entero
existe para no calcular.

**Causa de fondo.** El total vive escrito a mano en dos flujos que nunca se leen
seguidos: uno es del placero y otro de la clienta. Es el fallo 1.1 otra vez, en
datos en vez de en nombres.

**Qué se cambió.** El pedido `#0387` vale lo mismo en los tres sitios donde
aparece: estimado 4,15 €, pesado real 4,30 €. Y el aviso enseña las dos cifras
juntas, que además es lo que hace creíble la regla: **el bot repite el número del
placero, no lo calcula**.

---

### 1.14 El validador decía OK, y la persona veía los fallos

**Qué pasaba.** Los cuatro fallos anteriores estaban en producción con el
validador en verde. `validar-flujos.mjs` comprobaba que ningún paso apunte a un
sitio inexistente, que no haya pasos sueltos y que se respeten los límites de
WhatsApp. Todo eso era cierto. Un botón que lleva a la rama equivocada **también
enlaza bien**.

Se descubrió porque Sandra abrió el prototipo y dijo «en los de David se dice
buenos días Carmen». Es la tercera vez en este documento que pasa lo mismo.

**Qué se cambió.** El validador ahora comprueba también los puentes del
recorrido: que cada uno salga de un final de verdad y llegue a un paso que
existe. Sigue sin poder juzgar si el destino tiene sentido.

**Lección, y es la del documento entero.** Verificar que **enlaza** no es
verificar que **encaja**. Lo primero lo hace una máquina; lo segundo hay que
leerlo. Un guion de conversación se revisa leyéndolo de principio a fin, en voz
alta si hace falta, igual que se revisa un texto.

---

### 1.15 Tres botones, cuatro opciones necesarias, y siempre se caía la misma

**Qué pasaba.** WhatsApp admite tres botones por mensaje. Cada vez que hicieron
falta cuatro, alguien quitó uno — y no fue una vez, fue un goteo por todo el
proyecto, siempre en la misma dirección:

- **Los seis sitios** donde el bot enseña el pedido ya modificado ofrecían solo
  `[Confirmar]`. Los seis, sin excepción. Quien se equivocaba al modificar no
  podía volver a cambiarlo, ni echarse atrás, ni pedir ayuda.
- **`[Cancelar pedido]` no existía como botón en todo el proyecto.** Cancelar
  antes de que el placero acepte es un derecho del cliente y tiene flujo propio
  (C10), pero solo se llegaba a él escribiéndolo a mano.
- **`[Ver todos]` no enseñaba nada.** Se pulsaba, salía una pastilla gris con
  cinco puestos y la conversación seguía en el primero igualmente. Se leía como
  una lista y no se podía elegir.
- **En los submenús no se podía volver.** En C09 entrabas en «quitar algo» y las
  únicas salidas eran quitar una cosa u otra.

**Causa de fondo.** El límite de tres no es el problema: el problema es que
nadie había escrito **qué ocupa esas tres plazas** en cada tipo de momento. Sin
esa regla, cada pantalla la decide quien la escribe, y bajo presión se cae
siempre lo mismo: la marcha atrás. Y cuando de verdad hacen falta más de tres
opciones, WhatsApp tiene otro componente —el List Message, hasta diez filas— que
el prototipo fingía con una pastilla en vez de tenerlo.

**Qué se cambió.** Las tres plazas quedan fijadas por momento: propuesta de
pedido es `Confirmar · Modificar · Hablar con X`; pedido ya modificado son las
mismas tres, no solo confirmar; recibo es `Añadir puesto · Cancelar · Así está
bien`; y un submenú siempre lleva su «déjalo como está». El List Message existe
de verdad, con sus filas pulsables y sus límites verificados. Y el validador
falla si un mensaje propone un pedido sin las tres salidas, o si el bot pregunta
algo y la rama muere sin poder contestar.

**Lección.** Una restricción de plataforma no se absorbe improvisando en cada
pantalla. O se decide una vez qué entra y qué sale, o se decide setenta veces
distinto, que es lo que había.

---

### 1.16 El camino principal era el único que no llegaba al final

**Qué pasaba.** El recorrido de David se titula «comprar en dos puestos». Si
pulsabas `[Añadir puesto]`, el segundo placero **siempre** rechazaba: daba igual
elegir a Manolo o a Lola, los dos se quedaban sin género. No existía ningún
camino en el que un pedido a dos puestos se completara y se entregara. La
historia solo llegaba al reparto si decías «así está bien», es decir, **si no
comprabas en dos puestos**.

**Causa de fondo.** El flujo se escribió para enseñar el caso difícil, que es el
interesante de diseñar, y el caso fácil no se llegó a escribir nunca. Es el
patrón 1.12 otra vez —la rama de muestra tomada por rama completa— pero a escala
de recorrido en vez de a escala de botón.

**Qué se cambió.** Los dos puestos cuentan historias distintas y las dos son
reales: con Manolo el pedido sale entero y llega, con Lola falta género y el
pedido queda parcial. El caso difícil sigue estando; ya no es el único.

---

### 1.17 Botones que decían lo que no era

Dos correcciones de Sandra sobre los botones recién puestos, y las dos van al
mismo sitio: **un botón es una promesa, y las dos promesas eran falsas.**

**«Dejarlo estar» en vez de «Cancelar pedido».** Al separar el borrador del
pedido ya enviado se buscó una palabra más suave para el primero, con el
argumento de que antes de confirmar no hay nada que cancelar. El argumento es
correcto y la etiqueta no: quien la lee no sabe qué va a pasar si la pulsa.
Sandra: *«no uses frases ambiguas porque suenen más cercanas»*. La distinción
sigue existiendo —cancelar un borrador no deja incidencia ni le consta al
placero—, pero eso se explica **después**, en el mensaje que confirma. El botón
dice lo que hace.

**«Hablar con Manolo» a las 21:42.** El pedido a dos puestos ocurre por la noche,
y ahí el botón ofrecía hablar con un placero que cerró a las 15:00. La regla
estaba escrita desde el primer inventario —`flows-index.md`, C11: «solo dentro
de horario del puesto; fuera → S01»— y aun así se coló, porque el botón se copió
del flujo de la mañana sin mirar la hora que tenía encima.

Ahora, de noche, la salida es **«Mensaje a Manolo»** y el bot contesta la verdad:
que ha cerrado, que le deja el recado y que responde al abrir. Los recibos
también lo dicen: los dos puestos han cerrado, cada uno acepta su parte mañana.

**Qué se cambió en el sistema.** El validador comprueba la hora: si un botón
ofrece «hablar con» alguien y el paso ocurre fuera de 9:00-14:00, falla. Se
verificó devolviendo el fallo a propósito.

**Lección.** Un botón no vive en el vacío: hereda la hora, el estado del pedido
y si hay alguien al otro lado. Copiar un botón de una pantalla a otra se lleva la
etiqueta pero no el contexto, y la etiqueta sola miente sin que se note.

---

## 2. Los patrones

Los diecisiete fallos se reducen a seis formas:

| Patrón | Dónde apareció |
|---|---|
| **Dos fuentes de verdad para el mismo dato** | 1.1 mapa vs catálogo · 1.2 valor por defecto silencioso · 1.13 el total en dos flujos |
| **Regla calibrada en un sitio, aplicada en todos** | 1.3 contraste de texto · 1.5 tope tipográfico · 1.9 cinta en porcentaje · 1.11 puentes del recorrido |
| **Lo heredado que nadie relee** | 1.8 plantilla, documento privado, cifras viejas · 1.10 el flujo copiado de otra persona |
| **El principio escrito que no se comprueba** | 1.6 recibos · 1.13 el total que el bot no debe decidir |
| **La rama de muestra tomada por rama completa** | 1.7 botón de C05 · 1.12 la edición de C09 · 1.16 el multi-puesto que siempre fallaba |
| **La restricción absorbida improvisando** | 1.15 tres botones y cuatro opciones |
| **La etiqueta que viaja sin su contexto** | 1.17 «dejarlo estar» y el escalado de noche |

Ninguno era un fallo de programación. Todos eran de **organización de la
información**.

Y por encima de los cinco, uno de método: **lo que la verificación automática no
mira, no existe**. Los tres hallazgos peores —los dos del puntero y el de los
flujos de David— los vio una persona mirando la pantalla después de que los
scripts dieran el visto bueno (1.3, 1.4, 1.14).

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
  comprueba los límites de WhatsApp, los enlaces entre pasos, que cada puente del
  recorrido salga de un final y llegue a un paso existente, y que no queden ramas
  muertas. `exportar-guiones.mjs` regenera la documentación desde los datos.
- **Nada de reglas que adivinan.** El recorrido ya no deduce qué finales
  encadenan: están escritos uno a uno. Una lista a mano de doce líneas es más
  barata de mantener que una regla lista que acierta el ochenta por ciento.
- **Los guiones se leen enteros, no se auditan por partes.** `flows/guiones/*.md`
  existe para eso: el copy de los veinticuatro guiones en texto plano, con las
  ramas de cada botón sangradas, para leerlo de principio a fin sin abrir el
  prototipo. Y `leer-recorrido.mjs` hace lo mismo con los recorridos cosidos,
  que es donde estaban los fallos que más costó ver: entre un flujo y el
  siguiente, no dentro de ninguno.
- **Las tres plazas de botones, decididas una vez.** Qué ocupa los tres botones
  en cada tipo de momento está escrito y lo comprueba el validador, en vez de
  resolverse pantalla por pantalla.
- **Y el juicio final lo da una persona.** Los dos fallos del puntero y los
  cuatro de los flujos pasaron una verificación numérica. Medir no sustituye a
  mirar, y enlazar no sustituye a leer.

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
