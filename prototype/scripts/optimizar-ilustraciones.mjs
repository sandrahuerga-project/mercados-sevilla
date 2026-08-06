/**
 * Genera versiones ligeras de las ilustraciones para la web.
 *
 * Los originales de Sandra pesan mucho para lo que son: los alimentos son PNG
 * de 1200×1200 y ~1 MB, y las fotos de perfil llegan a 4 MB para acabar
 * pintadas en un avatar de 40 px. Servirlos tal cual son más de 20 MB de
 * decoración.
 *
 * Esto escribe WebP en una subcarpeta `web/` al lado de cada original, y no
 * toca ni un archivo de Sandra.
 *
 * Se lanza a mano cuando lleguen ilustraciones nuevas:
 *   node scripts/optimizar-ilustraciones.mjs
 *
 * OJO: los PNG originales ya no viven en el repo, están en
 * ../mercados-sevilla-privado/ilustraciones-master/. Pesaban 28 MB para acabar
 * generando 880 KB de WebP, y esos WebP sí están versionados: la web tira de
 * ellos y no necesita este script para nada. Si algún día hay ilustración
 * nueva, copiar los masters de vuelta a public/ilustraciones/ (el .gitignore
 * los ignora), lanzar esto, y commitear solo el WebP resultante.
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const BASE = 'public/ilustraciones';

// Ancho de salida por carpeta. Las personas se ven más grandes que los
// alimentos (retrato en la sección de investigación), por eso van a 640.
const CARPETAS = [
  { dir: BASE, ancho: 640 },
  { dir: join(BASE, 'alimentos'), ancho: 480 },
];

const ES_IMAGEN = /\.(png|jpe?g)$/i;
let antes = 0;
let despues = 0;
let total = 0;

for (const { dir, ancho } of CARPETAS) {
  const destino = join(dir, 'web');
  await mkdir(destino, { recursive: true });

  const archivos = (await readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isFile() && ES_IMAGEN.test(e.name))
    .map((e) => e.name);

  for (const archivo of archivos) {
    const entrada = join(dir, archivo);
    const salida = join(destino, `${parse(archivo).name}.webp`);

    await sharp(entrada)
      .resize(ancho, ancho, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(salida);

    antes += (await stat(entrada)).size;
    despues += (await stat(salida)).size;
    total++;
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(
  `${total} ilustraciones: ${mb(antes)} MB -> ${mb(despues)} MB ` +
    `(${Math.round((1 - despues / antes) * 100)}% menos)`
);
