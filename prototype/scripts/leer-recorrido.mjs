/**
 * Escribe un recorrido entero —«De principio a fin»— como texto legible, con
 * las ramas de cada botón sangradas.
 *
 * Por qué hace falta, si ya están los guiones: `exportar-guiones.mjs` saca un
 * archivo por flujo, y los recorridos son varios flujos cosidos. Los fallos que
 * más han costado no estaban dentro de un flujo, sino en la costura entre dos:
 * un botón que llevaba al recibo confirmado del flujo siguiente, un pedido que
 * cambiaba de dueño a mitad de conversación. Leyendo fichas sueltas eso no se
 * ve, y el validador tampoco lo ve: comprueba que los pasos enlacen, no que lo
 * enlazado tenga sentido.
 *
 *   node scripts/leer-recorrido.mjs david
 *   node scripts/leer-recorrido.mjs            (los tres)
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirFlujos = join(raiz, 'src/flows');
const js = readFileSync(join(raiz, 'src/content/journeys.ts'), 'utf8');

const bloque = (nombre) =>
  js.match(new RegExp(`const ${nombre}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`))?.[1] ?? '';

const RECORRIDOS = new Map(
  [...bloque('RECORRIDOS').matchAll(/(\w+):\s*\[([^\]]*)\]/g)].map((m) => [
    m[1],
    [...m[2].matchAll(/'(\w+)'/g)].map((c) => c[1]),
  ])
);

const importes = new Map(
  [...js.matchAll(/import (\w+) from '\.\.\/flows\/([\w-]+)\.json'/g)].map((m) => [m[1], m[2]])
);

const ALTERNATIVOS = new Map(
  [...bloque('GUIONES_ALTERNATIVOS').matchAll(/(\w+):\s*\{([^}]*)\}/g)].map((m) => [
    m[1],
    new Map([...m[2].matchAll(/(\w+):\s*(\w+)/g)].map((p) => [p[1], importes.get(p[2])])),
  ])
);

const PUENTES = new Map(
  [...bloque('PUENTES').matchAll(/(\w+):\s*\{([\s\S]*?)\}/g)].map((m) => [
    m[1],
    new Map([...m[2].matchAll(/'([\w:-]+)':\s*'([\w:-]+)'/g)].map((p) => [p[1], p[2]])),
  ])
);

const sangrar = (texto, prefijo) =>
  texto
    .split('\n')
    .map((l) => prefijo + l)
    .join('\n');

function montar(audiencia) {
  const codigos = RECORRIDOS.get(audiencia);
  if (!codigos) return null;
  const alt = ALTERNATIVOS.get(audiencia) ?? new Map();
  const puentes = PUENTES.get(audiencia) ?? new Map();

  const pasos = {};
  let arranque = null;

  for (const code of codigos) {
    const flujo = JSON.parse(
      readFileSync(join(dirFlujos, `${alt.get(code) ?? code.toLowerCase()}.json`), 'utf8')
    );
    if (!arranque) arranque = `${code}:${flujo.start}`;

    for (const [nombre, paso] of Object.entries(flujo.steps)) {
      const id = `${code}:${nombre}`;
      if (paso.kind === 'buttons') {
        pasos[id] = {
          ...paso,
          buttons: paso.buttons.map((b) => ({ ...b, next: `${code}:${b.next}` })),
        };
      } else if (paso.kind === 'list') {
        pasos[id] = {
          ...paso,
          sections: paso.sections.map((s) => ({
            ...s,
            rows: s.rows.map((r) => ({ ...r, next: `${code}:${r.next}` })),
          })),
        };
      } else if (paso.kind === 'end') {
        pasos[id] = paso;
      } else {
        pasos[id] = { ...paso, next: paso.next ? `${code}:${paso.next}` : null };
      }
    }
  }

  return { codigos, pasos, arranque, salta: (id) => puentes.get(id) ?? id };
}

function recorrer({ pasos, arranque, salta }) {
  const lineas = [];
  const vistos = new Set();

  const anda = (id, nivel) => {
    const margen = '  '.repeat(nivel);
    let actual = id;

    while (actual) {
      const s = pasos[actual];
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
          lineas.push(`${margen}**BOT** ${s.timestamp} · ${s.puesto ?? ''}${s.warning ? ' ⚠️' : ''}`);
          lineas.push(sangrar(s.text, `${margen}> `));
          break;
        case 'user':
          lineas.push(`${margen}**CLIENTE** ${s.timestamp}`);
          lineas.push(sangrar(s.text, `${margen}> `));
          break;
        case 'human':
          lineas.push(`${margen}**${s.name.toUpperCase()} (persona)** ${s.timestamp}`);
          lineas.push(sangrar(s.text, `${margen}> `));
          break;
        case 'system':
          lineas.push(`${margen}\`[sistema] ${s.text.replace(/\n/g, ' ')}\``);
          break;
        case 'audio':
          lineas.push(
            `${margen}\`[audio de ${s.sender === 'user' ? 'el cliente' : 'el bot'} · ${s.duration}]\``
          );
          break;
        case 'video':
          lineas.push(`${margen}\`[vídeo · ${s.duration} · ${s.puesto}]\` ${s.timestamp}`);
          lineas.push(sangrar(s.caption, `${margen}> `));
          break;
        case 'waflow':
          lineas.push(`${margen}\`[formulario WhatsApp Flow · botón "${s.ctaLabel}"]\``);
          break;
        case 'end':
          lineas.push(`${margen}**FIN.**${s.note ? ` ${s.note}` : ''}`);
          return;
        case 'list': {
          lineas.push(`${margen}**BOT** ${s.timestamp} · ${s.puesto ?? ''}`);
          lineas.push(sangrar(s.text, `${margen}> `));
          lineas.push('');
          lineas.push(`${margen}\`[lista desplegable · botón "${s.buttonLabel}"]\``);
          for (const seccion of s.sections) {
            lineas.push('');
            lineas.push(`${margen}_${seccion.title}_`);
            for (const fila of seccion.rows) {
              lineas.push('');
              lineas.push(`${margen}**Si elige \`${fila.label}\`:**`);
              anda(salta(fila.next), nivel + 1);
            }
          }
          return;
        }
        case 'buttons':
          lineas.push(`${margen}${s.buttons.map((b) => `\`${b.label}\``).join('  ')}`);
          for (const b of s.buttons) {
            lineas.push('');
            lineas.push(`${margen}**Si toca \`${b.label}\`:**`);
            anda(salta(b.next), nivel + 1);
          }
          return;
      }
      lineas.push('');
      actual = s.next ? salta(s.next) : null;
    }
  };

  anda(arranque, 0);
  return lineas.join('\n');
}

const pedidas = process.argv[2] ? [process.argv[2]] : [...RECORRIDOS.keys()];

for (const audiencia of pedidas) {
  const montado = montar(audiencia);
  if (!montado) {
    console.log(`No hay recorrido para «${audiencia}». Hay: ${[...RECORRIDOS.keys()].join(', ')}`);
    continue;
  }
  console.log(`\n${'='.repeat(70)}`);
  console.log(`RECORRIDO ${audiencia.toUpperCase()} — ${montado.codigos.join(' → ')}`);
  console.log('='.repeat(70) + '\n');
  console.log(recorrer(montado));
}
