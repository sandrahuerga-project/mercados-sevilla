/**
 * Dónde NO puede partir una línea.
 *
 * El reparto de líneas lo hace el navegador (`text-wrap: balance` / `pretty`
 * en index.css), pero por su cuenta deja cosas feas: una preposición o un
 * artículo colgando al final de una línea, separados del sustantivo al que
 * acompañan. «...en el mercado como no sea los / sábados» o «...ellos por /
 * horarios incompatibles».
 *
 * Esto pega con espacio duro (U+00A0) toda palabra átona a la que le sigue,
 * de forma que el corte cae siempre en un sitio con sentido. Se aplica al
 * exportar los textos, así que en texts.ts se escribe en castellano normal y
 * no hay que acordarse de nada.
 *
 * Lo que NO hace: forzar saltos. Un <br> a mano cuadra a un ancho y descuadra
 * a los otros tres.
 */

const NBSP = ' ';

/**
 * Palabras que no pueden cerrar una línea: se leen apoyadas en la siguiente.
 * Artículos, preposiciones, conjunciones y pronombres átonos.
 */
const ATONAS = new Set([
  // artículos y contracciones
  'el', 'la', 'los', 'las', 'lo', 'un', 'una', 'unos', 'unas', 'al', 'del',
  // preposiciones
  'a', 'ante', 'bajo', 'con', 'contra', 'de', 'desde', 'en', 'entre', 'hacia',
  'hasta', 'para', 'por', 'según', 'sin', 'sobre', 'tras',
  // conjunciones y nexos
  'y', 'e', 'o', 'u', 'ni', 'que', 'pero', 'sino', 'si', 'como', 'aunque',
  'cuando', 'donde', 'mientras', 'porque', 'pues', 'ya',
  // pronombres y posesivos átonos
  'se', 'me', 'te', 'le', 'les', 'nos', 'su', 'sus', 'mi', 'mis', 'tu', 'tus',
  // negación y verbos de apoyo que arrastran al infinitivo
  'no', 'sea', 'ser', 'poder', 'hay',
]);

/** Cifras y fracciones: nunca se separan de su unidad («11 mercados», «¼ kg»). */
const ES_CIFRA = /^[\d¼½¾.,]+$/;

/** Lo mismo cuando la cifra va escrita: «once mercados», «tres pantallas». */
const NUMERALES = new Set([
  'un', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho',
  'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'veinte',
  'cien', 'ciento', 'mil', 'medio', 'media', 'cuarto', 'ambos', 'ambas',
]);

/**
 * Tope de la cadena pegada, en caracteres. Al pasarse se suelta el enlace más
 * a la izquierda, que es el más prescindible.
 *
 * Tiene que ir con el ancho de la columna, y por eso hay dos. Una cadena de 18
 * como «con consentimiento» es inofensiva en un párrafo de 60 caracteres, pero
 * en una tarjeta que da para 29 no cabe detrás de nada: se cae entera a la
 * línea siguiente y deja la anterior a medias. El resultado es peor que el
 * problema que venía a resolver.
 */
export const TOPE = {
  /** Portada, citas y párrafos de sección: la línea da de sí. */
  ancho: 20,
  /** Tarjetas de flujo y demás columnas estrechas. */
  estrecho: 12,
};

/** Tras un signo de puntuación hay pausa: ahí cortar está bien. */
const CIERRA_GRUPO = /[.,;:!?)»…—]$/;

const limpia = (palabra: string) =>
  palabra.replace(/^[«"'(¿¡]+/, '').replace(/[.,;:!?)»…—"']+$/, '').toLowerCase();

/** Pega las átonas a la palabra siguiente dentro de un tramo sin saltos. */
const pegaTramo = (tramo: string, maxCadena: number): string => {
  const palabras = tramo.split(' ');
  if (palabras.length < 2) return tramo;

  // enlaces[i] === true -> palabras[i] y palabras[i+1] van juntas.
  const enlaces = palabras.slice(0, -1).map((palabra, i) => {
    if (palabras[i + 1] === '') return false;
    if (CIERRA_GRUPO.test(palabra)) return false;
    const raiz = limpia(palabra);
    return ATONAS.has(raiz) || NUMERALES.has(raiz) || ES_CIFRA.test(raiz);
  });

  // Recorta las cadenas que se hayan hecho demasiado largas.
  let inicio = 0;
  while (inicio < enlaces.length) {
    if (!enlaces[inicio]) {
      inicio++;
      continue;
    }
    let fin = inicio;
    while (fin < enlaces.length && enlaces[fin]) fin++;

    let largo = palabras.slice(inicio, fin + 1).join(' ').length;
    let corte = inicio;
    while (largo > maxCadena && corte < fin) {
      enlaces[corte] = false;
      largo -= palabras[corte].length + 1;
      corte++;
    }
    inicio = fin + 1;
  }

  return palabras.reduce(
    (acc, palabra, i) => (i === 0 ? palabra : acc + (enlaces[i - 1] ? NBSP : ' ') + palabra),
    ''
  );
};

/** Aplica la regla respetando los saltos de línea que ya trae el texto. */
export const pegaAtonas = (texto: string, maxCadena: number = TOPE.ancho): string =>
  texto
    .split('\n')
    .map((tramo) => pegaTramo(tramo, maxCadena))
    .join('\n');

/**
 * Recorre un objeto de textos y aplica la regla a todas sus cadenas.
 * Devuelve el mismo tipo, para que quien lo usa no note nada.
 */
export const pegaTextos = <T>(valor: T, maxCadena: number = TOPE.ancho): T => {
  if (typeof valor === 'string') return pegaAtonas(valor, maxCadena) as T;
  if (Array.isArray(valor)) return valor.map((v) => pegaTextos(v, maxCadena)) as T;
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(
      Object.entries(valor).map(([clave, v]) => [clave, pegaTextos(v, maxCadena)])
    ) as T;
  }
  return valor;
};
