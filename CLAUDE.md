# Mercados de Sevilla — Instrucciones para Claude Code

## Principio rector
El bot es secretario, no árbitro. No decide sustituciones ni precios especiales.
El placero manda.
Excepción aritmética: el bot puede sumar precio de catálogo × cantidad para dar
un "total estimado" al confirmar el pedido. El total FINAL (tras pesaje real)
lo teclea el placero al marcar "Listo", en su panel o por WhatsApp, como
prefiera — el bot solo lo repite, nunca lo recalcula ni lo decide.

## El lado del placero
WhatsApp es su mando a distancia; el panel, su mesa de trabajo. El estado del
pedido vive en una sola fila de la base (Airtable en el MVP), nunca en la
conversación, y los avisos al cliente los dispara el cambio de estado, no el
botón. Detalle en DESIGN.md §4.

## Docs de referencia obligatoria
- docs/wa-constraints.md → antes de diseñar cualquier componente WA
- docs/flows/flows-index.md → antes de escribir cualquier flujo
- docs/PRD_Mercados_Sevilla.md → contexto de negocio

## Stack
Meta Cloud API · Botpress/n8n · Claude/GPT API (NLU) · Airtable · Glide/Softr · Cloudinary · Bizum (link manual MVP)

## Convenciones
- Flujos: plantilla canónica de flows-index.md §6
- Botones WA: ≤3 por mensaje, ≤20 char cada uno
- Sin precios calculados en ningún flujo
- Idioma: castellano A2

## Prototipo curso
Lovable · simula WA-like · NLU hardcodeado · taquilla visible aunque no exista aún