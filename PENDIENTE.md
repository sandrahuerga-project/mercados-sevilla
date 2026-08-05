# Pendiente — Mercados de Sevilla

> Estado al cierre del 2026-08-05. Producción: https://mercados-sevilla.vercel.app
> **Todo está mezclado en `main` y desplegado.** No queda trabajo sin publicar,
> y `revision-flujos` ya no existe: se fusionó y se borró de local y del remoto.

---

## Lo siguiente

Nada pendiente del prototipo. `main` está desplegado y al día.

> Los guiones se generan: editar el `.md` a mano no sirve, se pierde al regenerar.
> El copy se cambia en `prototype/src/flows/*.json` y luego
> `node scripts/exportar-guiones.mjs`.

---

## Lo que queda abierto

**Solo una cosa, y está aparcada a propósito.**

1. **Entregables de la reunión** (doc de reunión §3, fuera del repo): vídeo de respaldo de
   ~2 min por si falla el wifi, deck de viabilidad de 6-8 slides y one-pager del «ask»
   para dejarle al alcalde. De los cuatro entregables solo existe el prototipo.
   Aparcado por decisión del 5 de agosto: se retoma cuando haya fecha de reunión.
   Se trabajan desde `../mercados-sevilla-privado/`, no desde este repo.

Si algún corte de línea concreto sigue sin gustar, el número a tocar es uno de los dos
topes de `prototype/src/content/tipografia.ts`. No es un pendiente: es dónde se ajusta.

---

## Decisiones que siguen en el aire

Ninguna. Las tres que había se cerraron el 5 de agosto:

- **El recibo antes de que el placero acepte** ya no dice «¡Pedido confirmado!». Dice
  «📝 Pedido recibido» y avisa de que falta que Antonio lo acepte. La confirmación de
  verdad llega después, cuando él le da a Aceptar en su panel. Cambiado en C03, C05,
  C06 y C11.
- **La naranja del bodegón** se queda como está.
- **La velocidad de la marquesina** se queda en 46 s.

---

## Aviso sobre la verificación

El navegador headless con el que compruebo tiene un fallo de repintado con esta
página: devuelve capturas en blanco o con bandas de color que no existen. Todo lo
visual se ha validado midiendo el DOM (posiciones, tamaños, solapes, contraste), no
mirándolo.

**Consecuencia práctica:** el juicio visual lo tiene que dar Sandra. Cualquier cosa
puramente estética hay que verla en el navegador de verdad antes de darla por buena.

---

## Lo que sí está cerrado

### Flujos

- **Veintitrés flujos** de chat con sus unhappy paths, más el panel del placero. Hay un
  guion más, `c07-david.json`, que es la variante de reparto del seguimiento y solo se
  usa dentro del recorrido de David: no es un flujo del catálogo.
- **Horarios unificados** y escritos una sola vez en `flows/flows-index.md §0`: pedidos
  hasta las 12:30, recogida hasta las 14:00, reparto de 10:00 a 14:00, taquilla hasta
  las 20:00. Pedidos y recogida iban juntos en la misma línea y no son la misma hora.
- **Cada persona con su pedido**: Carmen el `#0387` de recogida, David el `#0412` de
  reparto —el mismo que se ve en el panel de Antonio— y el `#0429` de «lo de siempre».
  Los flujos de David venían copiados de los de Carmen y le llamaban Carmen.
- **El total del pedido vale lo mismo en todas las pantallas**: `#0387` es 4,15 €
  estimados y 4,30 € reales tras pesar, en el flujo de Carmen, en el de Antonio y en
  DESIGN.md. Antes el placero tecleaba 12,40 € y a la clienta le llegaban 4,15 €.
- **C10 partido en dos**: C10 cancela lo que nadie ha tocado (siempre con confirmación,
  nunca de un toque) y **C12** aparece cuando el placero ya está preparando, donde no se
  cancela: se ofrece recogerlo mañana o dejarlo en taquilla.
- **S01 coge el pedido** fuera de horario y el placero lo confirma al abrir. Fuera el
  botón `Cancelar`, que no cancelaba nada.
- **Una sola redacción** para la misma situación en C07, S02 y P04: «Guárdalo para mañana».
- El **total estimado** avisa siempre de que el definitivo lo pone el placero al pesar.
- **S02**: Antonio llama por teléfono antes de cerrar y lo anota en su panel.
- **S06** ofrece los mercados cercanos y no promete un reparto que no tiene fecha.
- **C08**: la sustitución puede costar más, y se dice antes de aceptarla.
- **C09 pregunta primero qué se quiere cambiar** —un producto, el otro o quitar algo— y
  cada uno acepta cantidad de botón o escrita a mano. Antes saltaba directo a la cantidad
  de un solo producto, y «Quitar del pedido» llevaba al paso que la subía a 1 kg.
- **Ningún botón sin salida**: mirar el vídeo sin pedir (C03), cerrar el pedido sin añadir
  otro puesto (C03, C05), corregir lo que trae «lo de siempre» (C06) y modificar la parte
  de cada puesto en un pedido a dos (C05).
- **Las tres plazas de botones están decididas y las comprueba el validador**: proponer un
  pedido es `Confirmar · Modificar · Hablar con X`; el pedido ya modificado lleva las
  mismas tres y no solo «Confirmar»; el recibo lleva `Añadir puesto · Cancelar · Así está
  bien`; y todo submenú tiene su «déjalo como está». Antes, cada vez que hacían falta
  cuatro opciones en un sitio de tres, se caía la marcha atrás.
- **Lista desplegable de verdad** (List Message, hasta 10 filas): elegir puesto en C04 y
  C05 enseña los cinco del mercado con su categoría, y desde ahí se cambia de mercado.
  Antes «Ver todos» sacaba una pastilla gris y seguía por el primer puesto igualmente.
- **El pedido a dos puestos puede salir bien**: con Manolo llega entero, con Lola falta
  género y queda parcial. Antes rechazaban los dos, así que la única forma de terminar el
  recorrido era no comprar en dos puestos.
- **C11** pregunta cómo quiere recibirlo; **C03** y **C06** también.
- **S03** tiene salida: hablar con el placero, que es quien decide si readmite.
- **C05 tiene dos ramas de verdad**: el botón de Frutería Manolo lleva a la frutería y
  el de Carnicería Lola a la carnicería, cada una con su producto, su recibo y su
  unhappy path. Antes los dos llevaban a la misma.
- **Fuera el botón «Mi historial»** de C03: prometía una PWA que no existe. Era la
  única promesa del prototipo sin nada detrás.
- **C01 avisa de que es un bot** en la primera frase: «un asistente automático, no una
  persona», y a continuación la salida para hablar con el placero. Lo pide el reglamento
  europeo de IA, cuyas obligaciones de transparencia pasaron a ser aplicables el 2 de
  agosto de 2026. Al prototipo hoy no le obliga —no habla con nadie real—, pero el aviso
  entra como restricción de diseño, igual que los tres botones por mensaje.
  **Sin verificar por un abogado**: si esto llega a desplegarse, que lo revise uno.

### Web

- **«De principio a fin»**: un recorrido elegido a mano por persona (la compra de Carmen,
  la de David, la jornada de Antonio), sin las excepciones por medio y sin costuras entre
  flujos. Las situaciones límite no tienen recorrido: son excepciones, no una historia.
  **Los saltos de un flujo al siguiente están escritos uno a uno** en `journeys.ts`: de
  qué final concreto a qué paso concreto. Antes encadenaba cualquier final, así que tocar
  «Modificar» o «Hablar con el placero» te dejaba en el recibo confirmado del flujo
  siguiente, y a veces con el pedido de otra persona.
- **Portada con movimiento**: cinco ilustraciones entran desde fuera del encuadre y se
  asientan escalonadas en 3,1 s, y una cinta con el género desfila al 20 % por detrás del
  titular. Sin WebGL y sin librería de animación: 0 kB de JavaScript añadido.
- **La cinta en móvil tiene su hueco propio** dentro del flujo, no colocada en porcentaje
  de la altura de la portada. Antes el aire por debajo salía distinto en cada móvil —30 px
  a 360, 19 a 390 y 69 a 430— porque el titular parte en distinto número de líneas. Ahora
  son 16 px arriba y 32 abajo en todos. De tablet para arriba no cambia nada: allí sigue
  por detrás del titular.
- **Friso en marquesina**: las doce ilustraciones en bucle, 46 s la vuelta, que se para al
  pasar el ratón por encima.
- Todo el movimiento se detiene con `prefers-reduced-motion`.
- **Mapa de flujos**: espinazo horizontal, rombos con Sí/No, flechas en ángulo recto y
  ninguna arista que retroceda. Es el único sitio donde se ven los códigos.
- **Ilustraciones de Sandra** por toda la página, con parallax y flotación. Optimizadas de
  27,96 MB a 0,98 MB (`scripts/optimizar-ilustraciones.mjs`).
- **Cada puesto con su cara**: el rótulo verde de cada burbuja lleva la foto de perfil
  del puesto que firma. En un pedido a dos puestos el nombre solo no bastaba.
- **Cortes de línea**: `text-wrap: balance` en titulares y `pretty` en párrafos, y una
  regla que pega las palabras átonas a la siguiente para que no quede una preposición
  ni un artículo colgando al final de línea. Sin un solo `<br>` a mano: un salto fijo
  cuadra a un ancho y descuadra a los otros tres.
- **El nombre del flujo ya no sale dos veces**: estaba en la tarjeta y otra vez encima
  del móvil. Se conserva como nombre accesible del marco, que es donde hace falta.
- **Contexto de producto, en cuatro columnas**, para que el cuarto bloque no baje solo
  a una segunda fila.
- **El enlace del menú dice «Contexto»** y no «Cómo», que no decía nada.
- **El puntero se tiñe según la zona que pisa**: verde hondo sobre claro, crema sobre
  el verde oscuro, 13,19:1 en los dos sentidos. Manda la zona marcada más cercana y no
  la sección, porque la pantalla del móvil es una isla clara dentro de la sección
  oscura. Por zonas y no por elemento, para que no parpadee al cruzar cada burbuja.

### Infraestructura

- **Tres scripts de verificación**: `validar-flujos.mjs` (límites de WhatsApp incluidas las
  listas, enlaces entre pasos, puentes del recorrido, las tres plazas de botones y que
  ninguna pregunta del bot muera sin poder contestarla), `leer-recorrido.mjs` (escribe un
  recorrido entero con sus ramas, para leerlo sin ir pulsando) y el chequeo geométrico del
  mapa. Lo que ningún script puede decir es si el destino de un botón tiene sentido: eso
  se lee, en `flows/guiones/` o con el lector de recorridos.
- **README que abre el repo**: qué mirar y por dónde, el mapa de los documentos y las
  decisiones con enlace a dónde está el razonamiento. Enlazado desde el pie de la web.
- **El documento de la reunión, fuera del repo.** Es la posición negociadora con el
  ayuntamiento y el repositorio es público. Sigue en el historial de commits: se decidió
  el 5 de agosto no reescribirlo, porque es estrategia y no credenciales.
- **Favicon** con la naranja del bodegón (`scripts/generar-favicon.mjs`), más
  apple-touch-icon y tarjeta al compartir el enlace. La foto del mercado se descartó: a
  32 px no se lee y tiene caras reconocibles.
- Los flujos son datos (`prototype/src/flows/*.json`), no código: corregir copy es editar
  un JSON y regenerar los guiones.
- Sistema visual: crema #FCF6EC, Archivo + Archivo Narrow, base 17 px.
- Accesibilidad AA verificada: 115 elementos de texto, 0 fallos.
- Seudonimización del placero real (Antonio) en todo el repo.
- Despliegue automático: cada push a `main` sale a producción.
- **Historial reescrito** el 5 de agosto: mensajes de commit cortos y en castellano, y
  el documento de la reunión eliminado de todos los commits. Los objetos huérfanos
  siguen accesibles en GitHub por identificador hasta que purguen; se puede pedir a
  soporte que lo hagan ya. Copia completa del historial anterior en
  `../mercados-sevilla-privado/respaldo-repo-20260805.bundle`.
