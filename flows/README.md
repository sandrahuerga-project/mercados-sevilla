# Los flujos

Las 23 conversaciones que sostienen el producto, con sus caminos que salen mal.

| Aquí | Qué es |
|---|---|
| [`flows-index.md`](flows-index.md) | El inventario: qué flujo es cada código, los horarios escritos una sola vez y la plantilla canónica para escribir uno nuevo |
| [`guiones/`](guiones/) | Los 23 en texto plano, uno por archivo, para leer el copy de un vistazo |

**Los guiones son una copia generada.** El original son los JSON de
`../prototype/src/flows/`. Para corregir una frase se edita el JSON y se regenera:

```bash
cd ../prototype
node scripts/exportar-guiones.mjs
```

Los códigos agrupan por quién habla: **C** el cliente, **P** el placero, **S** las
situaciones límite. Se ven en la web solo dentro del mapa de flujos; en el resto de la
página cada flujo va por su nombre.
