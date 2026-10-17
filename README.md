# Júlia & Jesús — Invitación digital

Invitación estática, responsive y sin dependencias de servidor. La dirección artística combina marfil, oliva y arena, tipografía serif editorial, trazos botánicos y una composición de papelería contemporánea.

## Ejecutar localmente

Desde esta carpeta, abre index.html directamente o sirve el directorio con cualquier servidor estático. Por ejemplo:

~~~powershell
python -m http.server 4173
~~~

Después abre http://localhost:4173.

## Editar la invitación

1. Abre config.js.
2. Cambia nombres, textos, lugar, enlace de Google Maps y paleta dentro de INVITATION_CONFIG.
3. Introduce los horarios en schedule. Mientras haya valores vacíos, la página muestra una nota no definitiva; al completar una fila, la fila se muestra.
4. Añade información de llegada, aparcamiento o transporte en logistics. Si todos los campos están vacíos, la sección completa desaparece.
5. Para fotos propias, colócalas en assets/ y escribe su ruta en images.hero o images.venue. La ilustración sigue disponible si no hay foto.

La cuenta atrás usa la zona Europe/Madrid y el valor configurable countdown.referenceTime. Como todavía no hay hora de inicio confirmada, está preconfigurada a las 12:00 como referencia técnica: cambia referenceTime cuando decidáis qué instante debe marcar el contador.

## Publicar gratis: GitHub Pages

Recomiendo GitHub Pages para este proyecto porque es una carpeta estática, no requiere build y permite HTTPS en una URL estable.

1. Crea un repositorio público nuevo en GitHub, por ejemplo invitacion-julia-jesus.
2. Sube el contenido de esta carpeta conservando index.html en la raíz del repositorio.
3. En GitHub, entra en Settings → Pages.
4. En Build and deployment, selecciona Deploy from a branch, la rama principal y la carpeta / (root).
5. Guarda y espera a que GitHub muestre la URL pública. No se debe considerar publicada hasta abrirla y comprobarla en una ventana privada.
6. Cuando tengas la URL definitiva, copia esa URL en sharing.publicUrl de config.js y también en og:url de index.html. Para una previsualización más compatible, puedes convertir assets/og-image.svg a PNG manteniendo 1200×630 y actualizar og:image/twitter:image con la ruta absoluta del PNG.

Cada actualización posterior consiste en editar config.js o los recursos y hacer commit/push; GitHub Pages volverá a desplegarlo.

## Vista previa de WhatsApp

Comparte la URL pública en un chat de prueba. Los sistemas de mensajería suelen guardar en caché los metadatos: si cambias título o imagen y no se actualiza, espera unos minutos, cambia temporalmente la URL con un parámetro como ?v=2 o utiliza un inspector de enlaces del proveedor para forzar una nueva lectura. Comprueba que la imagen es accesible sin contraseña y que sus dimensiones son 1200×630.

## Datos que faltan

- Hora de llegada, ceremonia y celebración.
- Indicaciones confirmadas de llegada, aparcamiento y transporte, si las hay.
- Fotografías propias y sus textos alternativos, si queréis incorporarlas.
- URL pública definitiva para completar los metadatos absolutos de compartir.

## Ampliación: asistencia, transporte, fotos y regalo

La ampliación mantiene una web estática sin base de datos ni backend propio. Los datos editables están centralizados en `config.js`:

- `images.hero` y `images.venue`: rutas de las dos fotografías dentro de `assets/`. La portada usa la primera como imagen adaptable con velo de contraste; Mas Les Lloses usa la segunda como imagen destacada. Si se dejan vacías, se mantiene la composición gráfica provisional.
- `schedule`: contiene ya la ceremonia a las `12:45`. Puedes añadir filas con hora y texto. Las filas vacías no se muestran.
- `transport`: completa `departureLocation`, `departureTime`, `departureMapUrl`, `return1Time`, `return2Time` y `note` cuando estén decididos. Rafelbunyol puede escribirse como `departureLocation` cuando queráis medir esa demanda.
- `forms.url`: único campo para la URL del formulario de Google. Mientras esté vacío no se muestra ningún botón roto; aparece un aviso de preparación.
- `galleryUrl`: enlace de la galería posterior. El botón permanece oculto hasta rellenarlo.
- `gift.iban`: IBAN editable. El número y el botón de copia permanecen ocultos hasta introducirlo.
- `privacy`: campos para completar el aviso de privacidad antes de utilizar el formulario con invitados reales.

### Recomendación para Google Forms

Recomiendo abrir el formulario en una pestaña nueva mediante botón, no incrustarlo. En móvil suele cargar mejor, permite usar la interfaz accesible de Google Forms y evita que un formulario largo rompa la composición de la invitación. Un iframe integrado se ve dentro de la página, pero añade carga, altura variable y más riesgo de desplazamiento incómodo. La web está preparada para el botón externo.

Usa un único formulario y una única hoja. Esta es la estructura práctica recomendada:

1. Sección `Confirmación de asistencia`.
   - `Nombre y apellidos`: respuesta corta, obligatorio.
   - `¿Podrás acompañarnos el día de nuestra boda?`: opción múltiple, obligatorio: `Sí, asistiré` / `No podré asistir`.
   - `Teléfono de contacto`: respuesta corta, obligatorio solo si lo necesitáis para la organización.
   - `Número total de asistentes, incluida la persona que responde`: lista desplegable con `1`, `2`, `3` y `4`, obligatorio. No uses respuesta numérica libre.
   - `Nombre y apellidos de cada acompañante`: párrafo, opcional si la respuesta es `1`; pide separar los nombres por líneas.

   Configura la pregunta de asistencia con `Ir a la sección según la respuesta`: `No podré asistir` va a la sección final de comentarios; `Sí, asistiré` va a Menú.

2. Sección `Menú por persona`.
   Google Forms no repite preguntas automáticamente según el número elegido en una respuesta. Para mantener una hoja fácil de filtrar, crea cuatro bloques fijos, `Persona 1`, `Persona 2`, `Persona 3` y `Persona 4`, cada uno con una lista obligatoria de menú: `Menú adulto`, `Menú infantil`, `Menú sin gluten`, `Menú vegano`. En `Persona 1` se responde siempre; en las demás añade una opción `No aplica` o deja la pregunta opcional y aclara que solo se rellena cuando existe esa persona. Añade un campo de párrafo `Alergias, intolerancias y observaciones alimentarias`.

 Esta solución limita el grupo a cuatro personas, pero produce columnas previsibles y fáciles de revisar. Un formulario individual por persona sería más limpio para el menú, pero obliga a cada acompañante a enviar una respuesta separada y complica saber qué grupo pertenece a cada reserva.

3. Sección `Transporte`.
   - `¿Te gustaría utilizar el servicio de autobús si finalmente se organiza?`: opción múltiple, obligatorio: `Sí` / `No`.
   - Si responde `Sí`: `Lugar de salida preferido`, lista con las localidades realmente disponibles y `Rafelbunyol` como opción de estudio, además de `Otro`; `Tipo de trayecto` con `Ida y vuelta`, `Solo ida`, `Solo vuelta`; `Preferencia de vuelta` con `Autobús de vuelta 1` y `Autobús de vuelta 2`, visible solo si ha pedido vuelta; `Número de plazas de autobús solicitadas`, lista `1` a `4`; y `Observaciones sobre transporte`, opcional.
   - Incluye este texto visible junto a la pregunta de localidad: `El transporte desde Rafelbunyol se valorará en función de las respuestas recibidas. La selección de esta opción no garantiza que se organice una salida desde esa localidad`.
   - Distingue siempre `Número total de asistentes` de `Número de plazas de autobús solicitadas`.

4. Sección final `Comentarios opcionales`.
   Usa un único campo de párrafo, `Comentarios sobre la asistencia o la organización`, opcional. La sección Sugerencias de la web abre el mismo formulario, evitando duplicar formularios y hojas. No publiques las respuestas.

### Vincular Google Forms con Sheets

1. En Google Forms, crea el formulario y configura las secciones y saltos anteriores.
2. Abre la pestaña `Respuestas` y pulsa el icono verde de Google Sheets.
3. Elige `Crear una hoja de cálculo nueva` y ponle un nombre privado, por ejemplo `Respuestas boda Júlia y Jesús`.
4. Copia la URL pública del formulario desde `Enviar` → icono de enlace y pégala solo en `forms.url`.
5. Comprueba en `config.js` que el resto de campos pendientes siguen vacíos hasta estar confirmados.
6. Haz una respuesta de prueba con datos ficticios y verifica en Sheets la columna de fecha/hora, nombre, teléfono, asistencia, asistentes, acompañantes, menú por persona, observaciones, transporte, localidad, trayecto, vuelta, plazas y comentarios.

Deja el archivo de Sheets restringido a las cuentas de la organización. Desde Sheets podrás filtrar por `Sí, asistiré`, localidad o menú, y exportar una copia mediante `Archivo` → `Descargar` → Excel o CSV. Crea una pestaña de resumen solo después de ver los encabezados reales generados por el formulario; no conviene publicar fórmulas prefabricadas que dependan de columnas distintas.

### Privacidad antes de enviarlo

Completa en `privacy` la identidad del responsable, contacto, periodo de conservación y canal para ejercer derechos. Añade esa información como descripción final del formulario o como texto de una sección informativa. Revisa que el formulario no publique resultados, que la hoja no tenga enlace público, que solo se soliciten datos necesarios y que teléfonos y preferencias no se compartan con invitados. La configuración de Google Forms no equivale por sí sola a una garantía de cumplimiento normativo.

### Fotos y publicación posterior

Coloca las imágenes optimizadas en `assets/`, por ejemplo `assets/foto-pareja.webp` y `assets/mas-les-lloses.webp`, y escribe esas rutas en `images.hero` e `images.venue`. Revisa especialmente que en móvil las caras queden fuera de la zona del título; si hace falta, ajusta `object-position` en `.hero__photo`.

Para publicar una actualización en el mismo GitHub Pages: sube o edita los archivos en la raíz del repositorio, conserva la rama `main` y espera a que termine la acción `pages-build-deployment`. Después comprueba la URL pública en un móvil y prueba todos los anclajes, el enlace de Maps, el formulario de prueba y la llegada de esa respuesta a Sheets.
