# Mercados de Sevilla — Instrucciones para Claude Code

## Principio rector
El bot es secretario, no árbitro. No decide sustituciones ni precios especiales.
El placero manda.
Excepción aritmética: el bot puede sumar precio de catálogo × cantidad para dar
un "total estimado" al confirmar el pedido. El total FINAL (tras pesaje real)
lo teclea el placero en su panel cuando marca "Listo" — el bot solo lo repite,
nunca lo recalcula ni lo decide.

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