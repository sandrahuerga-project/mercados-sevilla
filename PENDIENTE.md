# Pendiente — Mercados de Sevilla

> Estado al cierre del 2026-07-29. Web desplegada: https://mercados-sevilla.vercel.app

---

## Lo que trae Sandra

Sin esto no se puede avanzar en la parte visual.

- [X] **Textos revisados** en `TEXTOS_PORTFOLIO.md` (raíz del repo). Todo el copy del portfolio está ahí en tablas.
- [x] **Ilustraciones de personaje** en `prototype/public/ilustraciones/`:
  - `carmen.png`, `david.png`, `antonio.png` — 400×400, recorte circular seguro, se ven a 40 px en la cabecera del chat (sin detalle fino).
  - `carmen-retrato.png`, `david-retrato.png`, `antonio-retrato.png` — ~1200 px de ancho, composición libre.
  - Aparecen solas al soltarlas: no hay que tocar código. Respuesta Sandra: subidas más ilustraciones de alimentos y vídeo de la pescadería con URL de Cloudinary, que es esta: https://res.cloudinary.com/aukfnzkn/video/upload/v1785482482/V%C3%ADdeo_pescader%C3%ADa_pxwa33.mp4 + fotos perfil pescadería y mercados para whatsapp
- [x] **Referencia visual para los rótulos de sección.** Van dos versiones descartadas (versalitas con regla encima; regla que el rótulo corta). **No proponer una tercera sin ver su referencia.** Respuesta Sandra: lo dejamos así, me gusta.
- [x] **Revisar los flujos de las conversaciones en WhatsApp porque he visto errores. También los botones tienen textos como "Sí, allí voy" que no se entienden. Revisar y cambiar**
  Repaso hecho sobre `flows/guiones/`: horarios unificados (pedidos y recogida hasta 14:00, reparto 10:00-14:00, taquilla hasta 20:00), `[Cancelar]` fuera de S01, una sola redacción para «Guárdalo para mañana», C10 partido en C10 + C12, y el total estimado avisa siempre de que el definitivo llega al pesar.

---

## Bugs confirmados por Sandra

### El mapa de flujos se ve mal en escritorio

Las flechas quedan raras. Diagnóstico hecho, pendiente de arreglar:

1. **Dos aristas van hacia atrás.** El trazado asume siempre izquierda → derecha (sale por el borde derecho del origen y entra por el izquierdo del destino), pero hay dos pares en la misma columna o invertidos:
   - `C01 → C02`: ambos en x=30.
   - `S01 → C06`: S01 en x=290, C06 también en x=290.

   Resultado: la curva retrocede y dibuja un lazo.

2. **Dieciséis aristas cruzándose** en poco espacio: parece espagueti aunque cada una sea correcta.

**Cómo abordarlo:** rehacer la disposición para que todo nodo conectado esté en una columna estrictamente posterior a su origen, reducir aristas a las imprescindibles (o agrupar las que comparten destino), y valorar trazado ortogonal en vez de curvas Bézier. Archivo: `prototype/src/shell/FlowMap.tsx`.

---

## Trabajo mío, por orden

1. Meter textos e ilustraciones cuando lleguen.
2. Rehacer los rótulos de sección con la referencia de Sandra.
3. Arreglar el mapa de flujos (ver arriba).
4. **Vídeo del mostrador** generado con IA, subido a Cloudinary. Hoy hay una foto de stock de Unsplash.
5. **Fotos o ilustraciones de los puestos** para el vídeo del día.
6. **Recorrido completo**: hoy apila los flujos de la persona con "paso N de M", pero no encadena la historia de principio a fin. Merece ser un recorrido de verdad.
7. **PWA de historial** de David (fase 4 del plan).
8. Entregables de la reunión: deck, one-pager y vídeo de respaldo (`MAYOR_MEETING.md`).

---

## Aviso sobre la verificación

El navegador headless con el que compruebo tiene un fallo de repintado con esta
página: devuelve capturas con bandas de color que no existen. Todo lo visual se ha
validado midiendo el DOM (posiciones, tamaños, contraste, estructura), no mirándolo.
Por eso el mapa de flujos pasó la comprobación estructural (13 nodos, 16 flechas,
sin desbordamiento) y aun así se ve mal.

**Consecuencia práctica:** el juicio visual lo tiene que dar Sandra. Cualquier cosa
puramente estética hay que verla en el navegador de verdad antes de darla por buena.

---

## Lo que sí está cerrado

- **Veintitrés flujos** de chat con sus unhappy paths, más el panel del placero.
  Los cuatro del placero (P01-P04) y las siete situaciones límite (S01-S07) son nuevos.
- **Recorrido continuo**: cada persona tiene un solo hilo de principio a fin, navegable
  a botones. Se acabó el «paso N de M» con móviles apilados.
- **Mapa de flujos rehecho**: espinazo horizontal, rombos con Sí/No, flechas en ángulo
  recto y ninguna arista que retroceda. Es el único sitio donde se ven los códigos.
- **Ilustraciones de Sandra** por toda la página, con parallax y flotación.
  Optimizadas de 21,23 MB a 0,74 MB (`scripts/optimizar-ilustraciones.mjs`).
- **Dos scripts de verificación**: `validar-flujos.mjs` (límites de WhatsApp y coherencia
  de los guiones y los recorridos) y el chequeo geométrico del mapa.
- Los flujos son datos (`prototype/src/flows/*.json`), no código: corregir copy es editar un JSON.
- Sistema visual: crema #FCF6EC, Archivo + Archivo Narrow, base 17 px.
- Accesibilidad AA verificada: 115 elementos de texto, 0 fallos.
- Seudonimización del placero real (Antonio) en todo el repo.
- Despliegue automático: cada push a main sale a producción.
