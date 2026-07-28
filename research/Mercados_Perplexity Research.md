# Investigación de usuarios
## Plataforma de compra en mercados de abastos de Sevilla

## 1. Resumen ejecutivo

Esta investigación analiza la oportunidad de crear una plataforma o chatbot de WhatsApp para comprar en los mercados de abastos de Sevilla. El foco está en tres perfiles: mujeres mayores de 65 años con movilidad reducida, personas jóvenes con poco tiempo pero sensibilidad por el consumo local, y vendedores que gestionarían pedidos y negocio desde el backend. [file:1][file:22]

El proyecto se apoya en una realidad ya existente en Sevilla: el Ayuntamiento ha impulsado una plataforma de comercio electrónico para los mercados, con compra en varios puestos, pedido unificado y opciones de entrega o recogida. Eso convierte el reto en un problema de experiencia de usuario, adopción y operación, más que en una simple idea conceptual. [web:3][web:11]

## 2. Contexto del proyecto

Los mercados de abastos de Sevilla combinan producto fresco, trato cercano y confianza, pero esa fortaleza no siempre se traslada bien a lo digital. El valor diferencial de la propuesta está en mantener la identidad del mercado y resolver al mismo tiempo la fricción de desplazamiento, tiempo y complejidad tecnológica. [file:1]

WhatsApp aparece como canal estratégico porque es cotidiano para los tres perfiles y permite una interacción más natural que una app tradicional. El reto no es solo vender por chat, sino diseñar un flujo que reduzca pasos, refuerce la confianza y funcione bien tanto para el cliente como para el vendedor. [file:1][web:7]

Además, tu trabajo previo ya apunta a una dirección muy útil: validar el servicio como experiencia conversacional, no como e-commerce clásico. La investigación de Landbot mostró que el uso de variables como `mercado_fav` y decisiones tipo “IS SET / NO” ayuda a construir una experiencia repetible, con primer acceso y usuarios recurrentes. [file:22]

## 3. Objetivos de investigación

- Entender cómo compran hoy los distintos perfiles y qué les motiva a seguir comprando en el mercado.
- Detectar barreras emocionales, funcionales y tecnológicas para adoptar una solución digital.
- Identificar expectativas sobre pedido, pago, entrega y seguimiento.
- Evaluar qué condiciones necesita el vendedor para operar sin aumentar su carga de trabajo.
- Definir oportunidades de producto, servicio y comunicación para una solución por WhatsApp o similar.
- Validar un flujo conversacional que pueda convertirse en prototipo o MVP. [file:1][file:22]

## 4. Metodología recomendada

La investigación debería combinar entrevistas en profundidad, observación contextual en mercados y pruebas de prototipo conversacional. Esta mezcla permite contrastar lo que la gente dice con lo que realmente hace, algo especialmente importante en usuarios mayores y en entornos con mucha relación personal. [file:1]

También conviene validar un flujo mínimo con usuarios reales antes de diseñar una solución completa. En este tipo de servicios, los detalles operativos importan tanto como la interfaz: disponibilidad, sustituciones, tiempos y entrega determinan la experiencia final. [web:3][file:1]

Tu investigación previa añade una capa muy valiosa: la viabilidad de prototipar la experiencia en Figma cuando Landbot o Twilio no encajan. Eso convierte el proyecto en algo testable, presentable y útil incluso antes de construir una solución funcional. [file:22]

## 5. Hallazgos por perfil

### 5.1 Compradora mayor

La usuaria mayor prioriza la confianza, la cercanía y la facilidad por encima de la complejidad tecnológica. Su principal fricción es el esfuerzo físico y logístico de desplazarse, no necesariamente el deseo de seguir comprando en el mercado. [file:1]

WhatsApp puede funcionar muy bien si el flujo está guiado con mensajes simples, audios y confirmaciones claras. La desconfianza aparecerá si hay demasiados pasos, si el pago no está bien explicado o si el servicio parece excesivamente automatizado. [file:1][web:7]

### 5.2 Comprador joven

El comprador joven busca ahorrar tiempo sin renunciar a calidad ni al valor simbólico del comercio local. Su motivación no es solo comprar comida, sino comprar mejor y sentir que apoya un modelo de consumo más cercano y sostenible. [file:1]

Para este perfil, la fricción principal es la falta de tiempo y la necesidad de resolver la compra rápidamente. La propuesta le interesará si la experiencia es ágil, flexible y sin complicaciones en el pago o la entrega. [file:1][web:3]

### 5.3 Vendedor de mercado

El vendedor necesita que la digitalización no rompa el ritmo del puesto. Su mayor temor no es la tecnología en sí, sino que aumente su carga de trabajo, genere errores de stock o reduzca el control sobre el cliente y los márgenes. [file:1]

También es clave su percepción de las comisiones y de los intermediarios. Si la plataforma no deja claro cuánto gana, cuánto tiempo le exige y cómo se gestionan incidencias, la adopción será limitada aunque la idea le resulte atractiva. [file:1]

## 6. Insights clave

- La confianza pesa más que la sofisticación. Los usuarios del mercado valoran más saber con quién tratan que usar una interfaz compleja. [file:1]
- El canal debe ser conversacional, no transaccional. WhatsApp funciona mejor como extensión del trato humano del mercado que como una tienda digital fría. [web:7]
- El vendedor es un usuario crítico, no secundario. Si el backend no simplifica su trabajo, el modelo no escala. [file:1]
- La operación logística forma parte del producto. Entrega, recogida y horarios son tan importantes como el catálogo. [web:3][file:1]
- El proyecto debe contemplar el carácter perecedero y variable del producto fresco. [file:1]
- La experiencia recurrente debe reconocer al usuario habitual. Tu investigación previa sobre `mercado_fav` apunta a un mecanismo clave: detectar si el usuario ya compró antes y devolverle su mercado preferido sin fricción. [file:22]

## 7. Oportunidades

### 7.1 Compra asistida por WhatsApp

Crear un flujo conversacional donde el usuario pueda escribir o enviar audio para pedir productos, recibir confirmación y cerrar el pedido sin navegar por una app compleja. Esto reduce barreras de acceso para mayores y acelera la compra para jóvenes. [file:1][web:7]

### 7.2 Relación digital con el puesto

Mantener la identidad del vendedor dentro del canal digital mediante el nombre del puesto, recomendaciones personalizadas y seguimiento de pedidos. Así se preserva la dimensión humana del mercado, que es una de sus principales ventajas competitivas. [file:1]

### 7.3 Backend simple para vendedores

Diseñar un panel mínimo centrado en tres tareas: ver pedidos, marcar disponibilidad y confirmar preparación. Un sistema con pocas funciones y muy claras favorecerá la adopción real. [file:1]

### 7.4 Logística flexible

Ofrecer varias opciones de entrega o recogida, porque no todos los usuarios necesitan lo mismo. En Sevilla ya existe una base institucional para este tipo de modelos híbridos, con entrega domiciliaria o recogida en taquillas inteligentes. [web:3][web:11]

### 7.5 Prototipo validable en Figma

Tu investigación previa deja claro que, si no puedes montar el flujo final en una herramienta no-code, Figma es una buena alternativa para prototipar la conversación. Eso permite representar el recorrido como pantallas encadenadas y testear la experiencia antes del desarrollo real. [file:22]

## 8. Hipótesis de trabajo

1. Si la compra se hace por WhatsApp y no por app, la adopción entre mayores aumentará.
2. Si el vendedor puede gestionar pedidos en un flujo muy simple, reducirá su resistencia a digitalizarse.
3. Si el servicio conserva la relación con el puesto y no la sustituye por un marketplace anónimo, aumentará la confianza.
4. Si la experiencia resuelve sustituciones y stock con claridad, disminuirán incidencias y abandono.
5. Si la propuesta ahorra tiempo real al comprador joven, habrá recurrencia.
6. Si el sistema reconoce al usuario recurrente y recuerda su mercado favorito, aumentará la retención. [file:1][file:22]

## 9. Personas

### Persona 1: Carmen, 71 años

Vive en Sevilla y tiene movilidad reducida. Compra poco a poco, confía en vendedores de toda la vida y usa WhatsApp a diario para hablar con familia y conocidos. Necesita un servicio muy guiado, con mensajes simples, audios y una confirmación fácil de entender. [file:1]

Necesidades: facilidad, confianza, acompañamiento y poca carga cognitiva. Miedos: equivocarse, no entender el proceso, pagar mal o recibir algo distinto. Motivación principal: seguir comprando en el mercado sin desplazarse. [file:1]

### Persona 2: David, 34 años

Trabaja muchas horas, valora comer bien y apoya el comercio local. Quiere resolver la compra de forma rápida desde el móvil y acepta pagar algo más si ahorra tiempo y mantiene calidad. [file:1]

Necesidades: rapidez, comodidad, productos frescos y entrega fiable. Miedos: perder tiempo, hablar con demasiados puestos, que falte producto. Motivación principal: comprar mejor sin complicarse. [file:1]

### Persona 3: Antonio, 52 años

Es vendedor en un mercado de abastos y gestiona el puesto con ayuda de su familia o de personal limitado. Usa el móvil para llamadas y WhatsApp, pero no quiere sistemas complicados. [file:1]

Necesidades: pedidos claros, poco trabajo extra, control de stock y comisión razonable. Miedos: errores, saturación, dependencia de terceros y pérdida de margen. Motivación principal: vender más sin desordenar la operación. [file:1]

## 10. Customer journey

### 10.1 Descubrimiento

El usuario conoce el servicio por el propio mercado, por familiares o por el Ayuntamiento. En esta fase, la confianza se construye con mensajes simples, presencia local y claridad sobre quién gestiona la compra. [web:11][file:1]

### 10.2 Primer acceso

El comprador entra por WhatsApp y el sistema le pide lo mínimo: nombre, dirección, mercado o puestos favoritos y tipo de compra. El objetivo es evitar formularios largos o registros innecesarios. [file:1]

### 10.3 Selección de productos

Puede dictar la lista por texto o audio, o elegir de un catálogo básico. El sistema debe responder con confirmaciones, cantidades y posibles sustituciones cuando haya falta de stock. [file:1]

### 10.4 Confirmación y pago

La experiencia debe ser muy clara: precio final, gastos de envío, horario estimado y método de pago. La transparencia es crítica para evitar abandono. [file:1]

### 10.5 Preparación y entrega

El vendedor recibe el pedido de forma ordenada, prepara el encargo y la logística lo entrega o gestiona la recogida. El usuario necesita trazabilidad sencilla y puntualidad. [web:3][file:1]

### 10.6 Postcompra

El servicio puede pedir una valoración breve, guardar puestos favoritos y facilitar la repetición del pedido. Eso ayuda a generar hábito y recurrencia. [file:1]

### 10.7 Recurrente y personalizado

Si el usuario ya ha comprado antes, el sistema debería detectar su mercado favorito y ofrecer una confirmación rápida tipo “Tu mercado favorito es X, ¿quieres comprar allí hoy?”. Esa lógica, que ya exploraste con `mercado_fav`, reduce pasos y mejora la sensación de servicio personalizado. [file:22]

## 11. Recomendaciones de producto

- Priorizar WhatsApp como interfaz principal, no como canal secundario.
- Diseñar un flujo de compra de pocos pasos y muy guiado.
- Mantener la identidad de cada puesto dentro del servicio.
- Crear un backend mínimo para vendedores, centrado en pedidos, stock y confirmación.
- Incorporar gestión explícita de sustituciones y disponibilidad variable.
- Ofrecer métodos de pago y entrega muy transparentes.
- Permitir repetir pedidos anteriores con un solo toque o mensaje.
- Diseñar mensajes accesibles para personas mayores, con lenguaje simple y confirmaciones claras.
- Diseñar un estado recurrente del usuario para recuperar mercado favorito y hábitos previos. [file:1][file:22][web:7]

## 12. Riesgos

El principal riesgo es intentar que el servicio se comporte como una app de e-commerce estándar cuando en realidad necesita funcionar como un asistente de compra local. Si se impone demasiada complejidad, perderá al usuario mayor y también al vendedor. [file:1]

Otro riesgo es no resolver la operativa interna del mercado: stock, tiempos, pedidos cruzados entre puestos y logística. En este tipo de negocio, la parte invisible del servicio es la que decide si el proyecto funciona o no. [file:1][web:3]

También existe un riesgo de prototipado pobre: si la solución se presenta con una herramienta demasiado rígida o poco visual, el usuario no entenderá bien la experiencia. Tu investigación previa sugiere que Figma puede ser una vía más clara para mostrar la lógica de conversación y el recorrido completo. [file:22]

## 13. Próximos pasos

El siguiente paso recomendable es validar el flujo con usuarios reales en Sevilla. Lo ideal sería testear el prototipo con compradores mayores, compradores jóvenes y varios vendedores de mercados concretos para refinar la solución antes de diseñarla por completo. [file:1][web:3]

También conviene comparar el concepto con la plataforma municipal ya existente para identificar huecos y oportunidades de mejora. Ese contraste servirá para justificar decisiones de producto y dar más solidez al proyecto. [web:3][web:11]

A nivel de prototipo, el camino más práctico es construir primero el flujo en Figma: bienvenida, selección de mercado, categorías, producto, cantidad, entrega y confirmación. Después puedes usar ese prototipo para tests rápidos y para presentar el concepto de forma clara. [file:22]