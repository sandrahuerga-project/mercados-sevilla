/**
 * Genera el favicon a partir de la naranja del bodegón.
 *
 * Por qué la naranja y no la foto del mercado: un favicon se ve a 16 o 32 px.
 * La foto del Mercado de Triana es ancha, llena de detalle y con caras
 * reconocibles; a ese tamaño es una mancha marrón. La naranja es redonda —llena
 * el cuadro—, tiene una sola silueta y un color que se lee igual sobre pestaña
 * clara que oscura. Y es una ilustración de Sandra, no una foto de archivo.
 *
 * El original tiene mucho margen transparente alrededor, así que primero se
 * recorta: si no, la fruta acaba ocupando la mitad del icono.
 *
 * Se lanza a mano cuando cambie la ilustración:
 *   node scripts/generar-favicon.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const ORIGEN = 'public/ilustraciones/alimentos/naranja.png';

// 32 para la pestaña, 180 para el icono de Safari en iOS, 512 para Android
// y para cuando alguien lo guarda en la pantalla de inicio.
const TAMANOS = [
  { archivo: 'public/favicon.png', lado: 32 },
  { archivo: 'public/apple-touch-icon.png', lado: 180 },
  { archivo: 'public/icono-512.png', lado: 512 },
];

// Recorta el margen transparente una sola vez y se reutiliza.
const recortada = await sharp(await readFile(ORIGEN))
  .trim({ threshold: 10 })
  .toBuffer();

for (const { archivo, lado } of TAMANOS) {
  // Un pelo de margen: pegada al borde, la fruta se ve apretada.
  const margen = Math.round(lado * 0.06);
  const salida = await sharp(recortada)
    .resize(lado - margen * 2, lado - margen * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: margen, bottom: margen, left: margen, right: margen, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    // Paleta en vez de color verdadero: es una fruta, no un degradado, y baja
    // el de 512 de 424 kB a unas decenas sin que se note.
    .png({ palette: true, quality: 90, compressionLevel: 9 })
    .toBuffer();
  await writeFile(archivo, salida);
  console.log(`${archivo} · ${lado}×${lado} · ${(salida.length / 1024).toFixed(1)} kB`);
}
