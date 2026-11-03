# A Morriña — Web (maqueta)

Maqueta de la web de A Morriña, café bar familiar en la Avenida de Sousas, 56, Verín.
Página estática (HTML + CSS, con un JS pequeño para el cambio de idioma ES/GL, el menú del móvil y el aviso de "abierto ahora").

## Estructura
```
index.html    ← Toda la web (textos en castellano y gallego)
styles.css    ← Estilos, pensados primero para móvil
main.js       ← Idioma, menú móvil y "abierto ahora"
favicon.svg   ← Icono provisional (disco de vinilo)
```

## Ver en local
```bash
python3 -m http.server 8123
```
Y abrir http://localhost:8123

## Datos pendientes (no inventados: hay un hueco marcado en la web)
- [ ] Fotos reales: portada, Fran/Nuria/Lucía, fachada, interior, concierto, croquetas, desayuno, mercadillo
- [ ] Logo (ahora el nombre va en tipografía)
- [ ] Carta: platos y precios de desayunos, croquetas, empanadas y tapas
- [ ] Agenda: más fechas de conciertos y de mercadillos (ya está Lucas de Mulder, sábado 7/11 a las 21:00, sacado de sus historias de Instagram)
- [ ] Opiniones: 2-3 reseñas reales de Google elegidas
- [ ] Historia familiar: desde cuándo abren, cómo empezó, de dónde viene el nombre
- [ ] Revisar con ellos el eslogan y el texto de "Sobre nosotros" (marcados como borrador)

Cada evento de la agenda lleva `data-until="AAAA-MM-DD"` y se oculta solo al día siguiente de esa fecha. Su fila en "Ya pasaron por aquí" lleva `data-from` con el día siguiente y aparece sola en ese momento.

"Ya pasaron por aquí" recoge los eventos de 2026 comprobados en Instagram (carteles y publicaciones de los artistas). Robert Pier va solo con el mes: un cartel dice 29/09 y otro parece decir 26/09. Pendiente de confirmar con ellos.

Los huecos llevan la etiqueta `tag-pending` y los textos en borrador `tag-draft`: al rellenarlos, se borran esas etiquetas.

## Publicar en GitHub Pages
1. Crear en GitHub un repositorio público vacío, por ejemplo `a-morrina`.
2. Subir esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Maqueta inicial de la web de A Morriña"
   git branch -M main
   git remote add origin https://github.com/Juanito2003/a-morrina.git
   git push -u origin main
   ```
3. En el repositorio: Settings → Pages → Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`.
4. La web queda en https://juanito2003.github.io/a-morrina/ (tarda uno o dos minutos).
