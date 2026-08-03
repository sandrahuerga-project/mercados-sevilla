# Pendiente — Mercados de Sevilla

> Estado al cierre del 2026-08-03. Producción: https://mercados-sevilla.vercel.app
> **Todo el trabajo de hoy vive en la rama `revision-flujos`, sin mezclar.**
> Producción sigue con la versión del 29 de julio.

---

## Lo siguiente, por orden

1. **Sandra revisa los textos** (4 de agosto). Los guiones en texto plano están en
   `flows/guiones/*.md`, uno por flujo, generados desde los JSON.
2. **Desplegar**: mezclar `revision-flujos` en `main`. El push a `main` sale solo a
   producción, no hay nada más que hacer.

> Los guiones se generan: editar el `.md` a mano no sirve, se pierde al regenerar.
> El copy se cambia en `prototype/src/flows/*.json` y luego
> `node scripts/exportar-guiones.mjs`.

---

## Lo que queda abierto

4. **Vídeo del mostrador** generado con IA, subido a Cloudinary. Hoy hay una foto de
   stock de Unsplash. *Parcialmente resuelto*: Sandra subió el vídeo real de la
   pescadería a Cloudinary y ya sale en C03. Falta decidir si se genera alguno más.
5. **Fotos o ilustraciones de los puestos** para el vídeo del día. Los que se ven
   vacíos son Frutería Manolo y Carnicería Lola (salen en C05 y S01 sin foto de
   perfil) y la sección de mercados de la web.
6. **PWA de historial** de David (fase 4 del plan). Se menciona en los flujos pero no
   existe: hoy no se puede abrir desde ningún sitio.
7. **Entregables de la reunión** (`MAYOR_MEETING.md` §3): vídeo de respaldo de ~2 min
   por si falla el wifi, deck de viabilidad de 6-8 slides y one-pager del «ask» para
   dejarle al alcalde. De los cuatro entregables solo existe el prototipo.

---

## Decisiones que siguen en el aire

- **C05 se pide a las 21:40** y el pedido lo acepta Antonio a la mañana siguiente. Con
  la regla nueva de S01 (fuera de horario el bot apunta y el placero confirma al abrir)
  ya no se contradicen, pero el recibo de C05 dice «¡Pedido confirmado!» cuando en
  realidad está pendiente de aceptar. Copy por afinar.
- **La naranja del bodegón** de la portada es la pieza que peor encaja: es pequeña y cae
  en la zona donde la merluza ocupa más. Si sigue viéndose apelmazada, la salida limpia
  es dejar el bodegón en cuatro piezas.
- **Velocidad de la marquesina**: 46 s la vuelta completa. Sin criterio de Sandra todavía.

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

- **Veintitrés flujos** de chat con sus unhappy paths, más el panel del placero.
- **Horarios unificados** y escritos una sola vez en `flows/flows-index.md §0`: pedidos
  y recogida hasta las 14:00, reparto de 10:00 a 14:00, taquilla hasta las 20:00.
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
- **C09** acepta cantidades escritas a mano, no solo botones.
- **C11** pregunta cómo quiere recibirlo; **C03** y **C06** también.
- **S03** tiene salida: hablar con el placero, que es quien decide si readmite.

### Web

- **«De principio a fin»**: un recorrido elegido a mano por persona (la compra de Carmen,
  la de David, la jornada de Antonio), sin las excepciones por medio y sin costuras entre
  flujos. Las situaciones límite no tienen recorrido: son excepciones, no una historia.
- **Portada con movimiento**: cinco ilustraciones entran desde fuera del encuadre y se
  asientan escalonadas en 3,1 s, y una cinta con el género desfila al 20 % por detrás del
  titular. Sin WebGL y sin librería de animación: 0 kB de JavaScript añadido.
- **Friso en marquesina**: las doce ilustraciones en bucle, 46 s la vuelta, que se para al
  pasar el ratón por encima.
- Todo el movimiento se detiene con `prefers-reduced-motion`.
- **Mapa de flujos**: espinazo horizontal, rombos con Sí/No, flechas en ángulo recto y
  ninguna arista que retroceda. Es el único sitio donde se ven los códigos.
- **Ilustraciones de Sandra** por toda la página, con parallax y flotación. Optimizadas de
  21,23 MB a 0,74 MB (`scripts/optimizar-ilustraciones.mjs`).

### Infraestructura

- **Dos scripts de verificación**: `validar-flujos.mjs` (límites de WhatsApp y coherencia
  de guiones y recorridos) y el chequeo geométrico del mapa.
- Los flujos son datos (`prototype/src/flows/*.json`), no código: corregir copy es editar
  un JSON y regenerar los guiones.
- Sistema visual: crema #FCF6EC, Archivo + Archivo Narrow, base 17 px.
- Accesibilidad AA verificada: 115 elementos de texto, 0 fallos.
- Seudonimización del placero real (Antonio) en todo el repo.
- Despliegue automático: cada push a `main` sale a producción.
