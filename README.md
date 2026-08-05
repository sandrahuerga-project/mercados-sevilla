# Mercados de Sevilla

Diseño de producto conversacional: comprar en el mercado de abastos sin salir de WhatsApp.

**→ [Prototipo navegable](https://mercados-sevilla.vercel.app)**

---

## El problema

El Ayuntamiento de Sevilla tiene una web app, una app, taquillas refrigeradas y reparto
para once mercados. La infraestructura está construida y financiada, y casi nadie la usa:
pide registro, aprendizaje y una app nueva en el móvil.

Mientras tanto, un pescadero de un mercado de barrio graba cada mañana un vídeo de su
mostrador, lo manda por difusión de WhatsApp y recibe los pedidos hablando. Le funciona.

El problema no era la plataforma. Era el canal.

Este proyecto lleva ese modelo a WhatsApp Business, apoyado en la infraestructura
municipal que ya existe.

---

## Qué mirar y por dónde

El prototipo se recorre eligiendo persona. Cada pantalla es interactiva: se pulsa dentro
y la conversación avanza.

| Persona | Qué demuestra |
|---|---|
| **Carmen**, 71 años | Compra sin ayuda alguien para quien WhatsApp es la única app del móvil |
| **David**, 34 años | Pedir en dos puestos, cambiar y cancelar con el trabajo de por medio |
| **Antonio**, placero | La otra mitad: un panel donde cada pedido se resuelve en un toque |
| **Situaciones límite** | Puesto cerrado, producto agotado, el bot que no entiende, cliente bloqueado |

Cada persona tiene además un modo **«De principio a fin»**: la compra entera en una sola
conversación, sin las excepciones por medio.

Son **24 flujos** con sus caminos que salen mal, no solo los felices.

---

## Qué hay en este repo

El prototipo es la parte visible. Debajo está el trabajo de producto que lo sostiene.

**Empezar por aquí**

| Documento | Qué es |
|---|---|
| [`PRD_Mercados_Sevilla.md`](PRD_Mercados_Sevilla.md) | El producto: usuarios, alcance, modelo de datos, reglas de negocio |
| [`flows/`](flows/) | Los 24 flujos: el inventario y los guiones en texto plano |
| [`DESIGN.md`](DESIGN.md) | El sistema de diseño conversacional y el catálogo de mensajes aprobados |
| [`research/`](research/) | De dónde salió todo: la investigación de partida, tal cual |
| [`wireframes/`](wireframes/) | El primer flujo dibujado a mano, antes de que hubiera pantallas |

**Cómo se construiría de verdad**

| Documento | Qué es |
|---|---|
| [`wa-constraints.md`](wa-constraints.md) | Lo que WhatsApp Business deja y no deja hacer, verificado contra la documentación de Meta |
| [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) | Stack, fases, riesgos y las restricciones técnicas TEC-01 a TEC-09 |
| [`CONTENT_SYSTEM.md`](CONTENT_SYSTEM.md) | Voz, tono y sistema de contenido |

**El prototipo**

| Documento | Qué es |
|---|---|
| [`prototype/`](prototype/) | El código: cómo arrancarlo, los scripts y por dónde anda cada cosa |
| [`PROTOTYPE_PLAN.md`](PROTOTYPE_PLAN.md) | Por qué el prototipo es como es |
| [`PORTFOLIO_DESIGN.md`](PORTFOLIO_DESIGN.md) | El sistema visual de la web |
| [`TEXTOS_PORTFOLIO.md`](TEXTOS_PORTFOLIO.md) | Todo el texto de la web, para revisarlo sin tocar código |
| [`PENDIENTE.md`](PENDIENTE.md) | Estado real: lo cerrado, lo abierto y lo que sigue en el aire |
| [`POSTMORTEM.md`](POSTMORTEM.md) | Qué se rompió por el camino, por qué, y qué se cambió para que no se repita |

---

## Cómo está construido

**El prototipo** es React 19 + Vite + Tailwind 4. Estático, sin backend y sin base de
datos: los flujos son JSON que entran en el bundle y el panel del placero es estado en
memoria. Cuatro dependencias en total. Cada push a `main` se despliega solo en Vercel.

**El producto real** iría con Meta Cloud API, n8n, Claude o GPT para entender los pedidos,
Airtable con un panel Softr encima, Cloudinary para los vídeos y Bizum para el cobro.

Es un stack no-code a propósito, y está razonado en `TEC-01`: quien mantiene esto es
perfil de diseño y marketing, no de backend. Airtable con Softr da la mitad del producto
sin escribir código. Supabase entraría en fase 2, cuando lo pidan la escala o la
residencia de datos en la UE.

---

## Decisiones que se pueden defender

- **El bot no calcula precios ni decide sustituciones.** Suma catálogo × cantidad para dar
  un «total estimado»; el total real lo teclea el placero tras pesar. El bot es secretario,
  no árbitro. → [`CLAUDE.md`](CLAUDE.md), `TEC-02`

- **El vídeo diario sustituye al catálogo.** No se le pide al placero que mantenga un
  inventario: lo que se ve en el mostrador es lo que hay. → [`PRD`](PRD_Mercados_Sevilla.md)

- **Nada se «confirma» antes de que el placero acepte.** El recibo dice «Pedido recibido»
  y avisa de que falta que lo acepte. La confirmación llega cuando él la da.

- **El bot dice que es un bot** en la primera frase, y sin tecnicismos: «un asistente
  automático, no una persona». Lo pide el reglamento europeo de IA, pero además a Carmen
  «sistema de IA» no le dice nada y «no soy una persona» sí. El aviso va con la salida:
  hablar con el placero está a un mensaje.

- **Cero `<br>` escritos a mano.** Los cortes de línea los reparte el navegador; lo único
  fijado es dónde *no* puede partir, para que no quede una preposición colgando al final
  de una línea. → `prototype/src/content/tipografia.ts`

- **Los 24 flujos son datos, no código.** Corregir una frase es editar un JSON y regenerar
  los guiones. Un script valida los límites de WhatsApp y la coherencia de los recorridos.

---

## Correr en local

```bash
cd prototype
npm install
npm run dev
```

Otros comandos:

```bash
npm run build                             # build de producción
npm run lint                              # comprobación de tipos
node scripts/validar-flujos.mjs           # límites de WhatsApp y coherencia de flujos
node scripts/exportar-guiones.mjs         # regenera flows/guiones/*.md desde los JSON
node scripts/optimizar-ilustraciones.mjs  # genera los WebP ligeros
```

---

## Aviso

Prototipo de diseño. **No envía mensajes reales, no procesa pagos y no guarda datos de
nadie.** Los nombres de clientes y placeros son ficticios: el pescadero real en el que se
basa el proyecto está seudonimizado en todo el repositorio.

Sin relación oficial con el Ayuntamiento de Sevilla ni con `mercadosdesevilla.es`.

---

Diseño y contenido: **Sandra Huerga** · 2026
