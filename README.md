# Sabor de Barranco

Sitio web de un restaurante de cocina peruana ubicado en Providencia, Santiago de Chile.
Está hecho con HTML, CSS y JavaScript puros: sin frameworks, sin dependencias y sin paso de compilación.

> Proyecto de práctica creado durante el curso *Programación con Claude: la IA generativa para desarrollo web*.
> El restaurante, las personas, la dirección y los teléfonos son ficticios.

---

## Cómo verlo

1. Clona o descarga el repositorio.
2. Abre `index.html` en el navegador.

No hace falta instalar nada. Si usas VS Code, también puedes abrirlo con la extensión **Live Server** para que la página se recargue sola al guardar.

---

## Páginas

| Página | Archivo | Qué contiene |
|---|---|---|
| Inicio | `index.html` | Portada, presentación, tres platos destacados y llamado a reservar |
| Carta | `Pages/menu.html` | Los 10 platos con precios en pesos chilenos y filtros por categoría |
| Nosotros | `Pages/nosotros.html` | Historia del local, valores y equipo |
| Reservaciones | `Pages/reservaciones.html` | Formulario de reserva e información útil |
| Contacto | `Pages/contacto.html` | Dirección, horario, plano de ubicación y formulario de mensajes |

---

## Estructura del proyecto

```
PAGINARESTAURANT/
├── index.html                 Portada
├── Pages/                     Páginas internas
│   ├── menu.html
│   ├── nosotros.html
│   ├── reservaciones.html
│   └── contacto.html
├── css/
│   └── estilos.css            Hoja de estilos única, dividida en 16 secciones
├── js/
│   └── script.js              Interacciones del sitio
├── img/
│   ├── platos/                Ilustraciones de los platos
│   ├── equipo/                Retratos del equipo
│   ├── portada.svg            Fondo de la portada
│   ├── casona.svg             Fachada del local
│   ├── mapa.svg               Plano de ubicación
│   └── icono.svg              Favicon
└── plantillas/
    └── plantilla.html         Esqueleto base para crear páginas nuevas
```

---

## Funcionalidades

**Diseño**
- Adaptable a celular, tablet y escritorio, con menú hamburguesa en pantallas pequeñas.
- Barra de navegación fija que marca automáticamente la página actual.
- Animación de aparición de los contenidos al hacer scroll.
- Respeta la preferencia del sistema de reducir animaciones.

**Carta**
- Filtros por categoría: entradas, fondos, postres y bebidas.
- Tarjetas con ilustración, descripción, precio y etiquetas (por ejemplo, *Picante*).

**Formularios**
- Validación de campos obligatorios y del formato del correo.
- Mensaje de confirmación en pantalla.

> Los formularios **no envían datos a ningún lado**: el sitio no tiene servidor. Para recibir reservas de verdad habría que conectarlos a un servicio como Formspree o a un backend propio.

---

## Tecnologías

- **HTML5** semántico (`header`, `nav`, `main`, `section`, `article`, `figure`).
- **CSS3** con variables, Grid, Flexbox y `clamp()` para tipografía fluida.
- **JavaScript** sin librerías (`IntersectionObserver` para las animaciones).
- **Google Fonts**: Playfair Display para títulos e Inter para texto.
- **SVG** para todas las imágenes.

---

## Identidad visual

La paleta está inspirada en el ají amarillo, la chicha morada y el rojo de la bandera peruana.
Los colores están definidos como variables al inicio de `css/estilos.css`, así que se pueden cambiar en un solo lugar.

| Variable | Color | Uso |
|---|---|---|
| `--rojo` | `#C1121F` | Botones, precios, enlaces activos |
| `--rojo-oscuro` | `#7A0B14` | Fondos y estados *hover* |
| `--aji` | `#F0A500` | Detalles y degradados |
| `--dorado` | `#D4A24C` | Acentos secundarios |
| `--morado` | `#4A1E3D` | Acentos oscuros |
| `--crema` | `#FBF7F0` | Fondo general |
| `--carbon` | `#1E1A17` | Texto y pie de página |

---

## Crear una página nueva

1. Copia `plantillas/plantilla.html` dentro de la carpeta `Pages/`.
2. Cambia el `<title>` y los textos del `<header>`.
3. Escribe el contenido dentro de `<main>`.
4. Agrega el enlace en la barra de navegación y en el pie de página de **todas** las páginas.

Las rutas de la plantilla ya están escritas como si el archivo estuviera dentro de `Pages/`, así que funcionan sin cambios después de copiarla.

**Clases CSS útiles para el contenido**

| Clase | Para qué sirve |
|---|---|
| `titulo-seccion` / `subtitulo-seccion` | Título centrado con línea decorativa y su bajada |
| `columnas` | Bloques de igual ancho que se apilan en celular |
| `tarjeta` | Caja blanca con sombra |
| `platos` + `plato` | Rejilla de tarjetas de platos |
| `boton boton-principal` | Botón rojo |
| `formulario` + `campo` | Formulario con estilos del sitio |
| `figura` | Imagen con pie de foto |
| `cita` | Cita destacada |
| `aparece` | Activa la animación al hacer scroll |

---

## Imágenes

Todas las imágenes actuales son ilustraciones SVG. Si se reemplazan por fotografías, estas son las medidas recomendadas:

| Uso | Proporción | Tamaño sugerido |
|---|---|---|
| Platos (`img/platos/`) | 4:3 | 1200 × 900 px |
| Fachada (`casona`) | 3:2 | 1600 × 1067 px |
| Plano (`mapa`) | 9:5 | 1800 × 1000 px |
| Retratos (`img/equipo/`) | 1:1 | 400 × 400 px |
| Portada | 16:9 | 1920 × 1080 px |

Las fotos de platos se recortan desde los bordes, así que conviene dejar el plato centrado.
Si cambia la extensión del archivo (por ejemplo, de `.svg` a `.jpg`), hay que actualizar el `src` en el HTML.

---

## Pendientes

- Conectar los formularios a un servicio de envío.
- Reemplazar las ilustraciones por fotografías reales.
- Crear las páginas de Política de Privacidad y Términos y Condiciones (hoy apuntan a `#`).
- Agregar los enlaces reales de las redes sociales.
