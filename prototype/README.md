# El prototipo

La web navegable: [mercados-sevilla.vercel.app](https://mercados-sevilla.vercel.app)

Simula WhatsApp lo bastante bien como para que se entienda la experiencia, pero **no es
WhatsApp**: no envía mensajes, no llama a ninguna API y no guarda nada. El reconocimiento
del lenguaje está fijado en los guiones, no lo resuelve un modelo.

React 19 · Vite · Tailwind 4. Estático, sin backend. Cada push a `main` se despliega solo
en Vercel.

## Arrancarlo

```bash
npm install
npm run dev
```

## Los scripts

```bash
npm run build                             # build de producción
npm run lint                              # comprobación de tipos
node scripts/validar-flujos.mjs           # límites de WhatsApp y coherencia de los flujos
node scripts/exportar-guiones.mjs         # regenera ../flows/guiones/*.md desde los JSON
node scripts/optimizar-ilustraciones.mjs  # WebP ligeros de las ilustraciones
node scripts/generar-favicon.mjs          # favicon e iconos, desde la naranja del bodegón
```

## Por dónde anda cada cosa

| Carpeta | Qué hay |
|---|---|
| `src/flows/` | Los 24 flujos, en JSON. **Aquí se toca el copy del chat**, no en los guiones |
| `src/engine/` | El reproductor que convierte un JSON en una conversación paso a paso |
| `src/components/` | Las piezas de la interfaz de WhatsApp: burbujas, botones, el marco del móvil |
| `src/shell/` | La web que envuelve al prototipo: portada, secciones, mapa de flujos |
| `src/panel/` | El panel del placero, que es la otra mitad del producto |
| `src/content/` | Textos del portfolio, catálogo de flujos y las reglas de composición |
| `public/ilustraciones/` | Las ilustraciones de Sandra. Los `web/` son las versiones ligeras |
| `scripts/` | Verificación y generación. Se lanzan a mano |

## Dos reglas que conviene saber antes de editar

**El copy del chat vive en los JSON.** Los `.md` de `../flows/guiones/` son una copia
generada: editarlos a mano no sirve, se pierde al regenerar.

**Los saltos de línea no se escriben.** Nada de `<br>`: los reparte el navegador. Lo único
fijado es dónde *no* puede partir una línea, en `src/content/tipografia.ts`.
