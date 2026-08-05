// Exporta los 23 flujos JSON a guiones legibles en Markdown, para revisar el copy
// sin abrir el prototipo. Salida: flows/guiones/. Regenerar con:
//   node scripts/exportar-guiones.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirFlujos = join(raiz, 'src/flows');
const dirSalida = join(raiz, '..', 'flows', 'guiones');
mkdirSync(dirSalida, { recursive: true });

const catalogo = readFileSync(join(raiz, 'src/content/flowCatalog.ts'), 'utf8');

// Variantes que solo viven dentro de un recorrido y no están en el catálogo.
const FUERA_DE_CATALOGO = {
  C07D: {
    nombre: 'Seguir el reparto hasta la puerta',
    sobre: 'Variante de C07 usada solo en el recorrido de David: reparto a domicilio con salida a taquilla.',
    persona: 'david',
  },
};

/** Saca name/about/audience del catálogo para cada código de flujo. */
function metaDe(codigo) {
  if (FUERA_DE_CATALOGO[codigo]) return FUERA_DE_CATALOGO[codigo];
  const bloque = catalogo.split(`code: '${codigo}'`)[1] ?? '';
  const corte = bloque.slice(0, 400);
  const saca = (clave) => corte.match(new RegExp(`${clave}: '([^']*)'`))?.[1] ?? '';
  return { nombre: saca('name'), sobre: saca('about'), persona: saca('audience') };
}

const sangrado = (texto, prefijo) =>
  texto.split('\n').map((linea) => prefijo + linea).join('\n');

/** Recorre el grafo desde `start`, ramificando en cada grupo de botones. */
function recorrer(guion) {
  const lineas = [];
  const vistos = new Set();

  const paso = (id, nivel) => {
    const margen = '  '.repeat(nivel);
    let actual = id;

    while (actual) {
      const s = guion.steps[actual];
      if (!s) {
        lineas.push(`${margen}⚠️ paso inexistente: \`${actual}\``);
        return;
      }
      if (vistos.has(actual) && s.kind !== 'end') {
        lineas.push(`${margen}↩︎ vuelve a \`${actual}\``);
        return;
      }
      vistos.add(actual);

      switch (s.kind) {
        case 'date':
          lineas.push(`${margen}\`— ${s.text} —\``);
          break;
        case 'bot':
          lineas.push(`${margen}**BOT** ${s.timestamp}${s.warning ? ' ⚠️' : ''}`);
          lineas.push(sangrado(s.text, `${margen}> `));
          break;
        case 'user':
          lineas.push(`${margen}**CLIENTE** ${s.timestamp}`);
          lineas.push(sangrado(s.text, `${margen}> `));
          break;
        case 'human':
          lineas.push(`${margen}**${s.name.toUpperCase()} (persona)** ${s.timestamp}`);
          lineas.push(sangrado(s.text, `${margen}> `));
          break;
        case 'system':
          lineas.push(`${margen}\`[sistema] ${s.text.replace(/\n/g, ' ')}\``);
          break;
        case 'audio':
          lineas.push(`${margen}\`[audio de ${s.sender === 'user' ? 'el cliente' : 'el bot'} · ${s.duration}]\``);
          break;
        case 'video':
          lineas.push(`${margen}\`[vídeo · ${s.duration} · ${s.puesto}]\` ${s.timestamp}`);
          lineas.push(sangrado(s.caption, `${margen}> `));
          if (s.footer) lineas.push(`${margen}> _${s.footer}_`);
          break;
        case 'waflow':
          lineas.push(`${margen}\`[formulario WhatsApp Flow · botón "${s.ctaLabel}"]\``);
          break;
        case 'end':
          lineas.push(`${margen}**FIN.**${s.note ? ` ${s.note}` : ''}`);
          return;
        case 'buttons': {
          const etiquetas = s.buttons.map((b) => `\`${b.label}\``).join('  ');
          lineas.push(`${margen}${etiquetas}`);
          for (const b of s.buttons) {
            lineas.push('');
            lineas.push(`${margen}**Si toca \`${b.label}\`:**`);
            paso(b.next, nivel + 1);
          }
          return;
        }
        case 'list': {
          lineas.push(`${margen}**BOT** ${s.timestamp}`);
          lineas.push(sangrado(s.text, `${margen}> `));
          lineas.push('');
          lineas.push(`${margen}\`[lista desplegable · botón "${s.buttonLabel}"]\``);
          for (const seccion of s.sections) {
            lineas.push('');
            lineas.push(`${margen}_${seccion.title}_`);
            for (const fila of seccion.rows) {
              lineas.push('');
              lineas.push(
                `${margen}**Si elige \`${fila.label}\`:**` +
                  (fila.description ? ` _(${fila.description})_` : '')
              );
              paso(fila.next, nivel + 1);
            }
          }
          return;
        }
      }
      lineas.push('');
      actual = s.next ?? null;
    }
  };

  paso(guion.start, 0);
  return lineas.join('\n');
}

const ficheros = readdirSync(dirFlujos).filter((f) => f.endsWith('.json')).sort();
const indice = [];

for (const fichero of ficheros) {
  const guion = JSON.parse(readFileSync(join(dirFlujos, fichero), 'utf8'));
  const meta = metaDe(guion.id);

  const botones = new Set();
  for (const s of Object.values(guion.steps)) {
    if (s.kind === 'buttons') s.buttons.forEach((b) => botones.add(b.label));
  }
  const tablaBotones = [...botones]
    .map((b) => `| \`${b}\` | ${b.length} |`)
    .join('\n');

  const md = `# ${guion.id} — ${meta.nombre || guion.label}

> ${meta.sobre}
>
> Persona: **${meta.persona || '—'}** · Cabecera del chat: ${guion.phone.title}
> Fuente: \`prototype/src/flows/${fichero}\` · ${guion.description}

---

## Guion

${recorrer(guion)}

---

## Botones de este flujo

| Botón | Caracteres (máx. 20) |
| --- | --- |
${tablaBotones}

---

_Generado por \`prototype/scripts/exportar-guiones.mjs\`. No editar a mano:
los cambios se hacen en el JSON y se vuelve a generar._
`;

  const nombreSalida = `${guion.id.toLowerCase()}.md`;
  writeFileSync(join(dirSalida, nombreSalida), md, 'utf8');
  indice.push({ codigo: guion.id, nombre: meta.nombre || guion.label, persona: meta.persona, fichero: nombreSalida });
}

const porPersona = {};
for (const f of indice) (porPersona[f.persona] ||= []).push(f);

const readme = `# Guiones de los flujos

Los flujos de WhatsApp en texto plano, para revisar el copy de un vistazo.

**Esto es una copia generada.** El original son los JSON de
\`prototype/src/flows/\`. Para corregir un texto se edita el JSON y se regenera:

\`\`\`
cd prototype
node scripts/exportar-guiones.mjs
\`\`\`

Las ramas de los botones van sangradas: cada \`**Si toca \\\`X\\\`:**\` abre el
camino que sale de ese botón.

${Object.entries(porPersona)
  .map(
    ([persona, flujos]) =>
      `## ${persona}\n\n${flujos.map((f) => `- [${f.codigo} — ${f.nombre}](${f.fichero})`).join('\n')}`,
  )
  .join('\n\n')}
`;

writeFileSync(join(dirSalida, 'README.md'), readme, 'utf8');
console.log(`${indice.length} guiones escritos en flows/guiones/`);
