# DarkUI CSS

Librería CSS moderna y ligera diseñada específicamente para interfaces dark-first. Perfecta para landing pages de documentación.

## Características

- **Dark-First**: Diseñado desde cero con un theme dark optimizado
- **Sistema Grid**: Grid flexible basado en flexbox (hasta 6 columnas)
- **Responsive**: Breakpoints sm (≤680px), md (≤1024px), lg (default)
- **Personalizable**: Variables CSS para configuración completa
- **Nomenclatura**: kebab-case descriptivo y fácil de recordar
- **Ligero**: Sin dependencias, solo CSS puro

## Instalación

Incluye el archivo CSS y el script JavaScript opcional en tu HTML:

```html
<!-- CSS (requerido) -->
<link rel="stylesheet" href="src/darkui.css">

<!-- JavaScript (opcional - solo para componentes interactivos) -->
<script src="src/darkui.js" defer></script>
```

**Nota:** El JavaScript solo es necesario si usas componentes interactivos (modales, sidebars, dropdowns) y quieres funcionalidades adicionales como cierre con click fuera o tecla Escape.

## Estructura del Proyecto

```
darkui-css/
├── src/
│   ├── base/
│   │   ├── variables.css    # Variables CSS personalizables
│   │   ├── reset.css        # CSS Reset moderno
│   │   └── typography.css   # Sistema de tipografía
│   ├── layout/
│   │   ├── container.css    # Contenedores responsive
│   │   ├── flexbox.css      # Utilities de flexbox
│   │   └── grid.css         # Sistema de grid (6 columnas)
│   ├── utilities/
│   │   ├── display.css      # Display utilities (block, flex, grid, etc.)
│   │   ├── spacing.css      # Padding y margin (0-12)
│   │   ├── colors.css       # Colores (bg, text, border)
│   │   ├── borders.css      # Bordes y border-radius
│   │   ├── shadows.css      # Box-shadows (3 niveles)
│   │   ├── position.css     # Position utilities
│   │   └── responsive.css   # Clases responsive
│   ├── components/
│   │   ├── buttons.css      # Botones (primary, secondary, ghost)
│   │   ├── forms.css        # Formularios completos (inputs, selects, etc.)
│   │   ├── accordion.css    # Acordeones con <details>
│   │   ├── dropdown.css     # Menús desplegables
│   │   ├── modal.css        # Modales/popups
│   │   └── sidebar.css      # Sidebar fijo con toggle
│   ├── darkui.css           # Archivo principal CSS
│   └── darkui.js            # Script de interactividad (opcional)
└── index.html               # Demo y documentación
```

## Guía Rápida

### Grid System

**Sistema CSS Grid (6 columnas):**

Usa `grid` como contenedor y `column-X` en los hijos (grid-column: span X).

```html
<!-- 2 columnas de 50% cada una -->
<div class="grid gap-4">
  <div class="column-3">Columna 1 (span 3 = 50%)</div>
  <div class="column-3">Columna 2 (span 3 = 50%)</div>
</div>

<!-- Layout asimétrico: 66% + 33% -->
<div class="grid gap-4">
  <div class="column-4">Principal (span 4 = 66%)</div>
  <div class="column-2">Sidebar (span 2 = 33%)</div>
</div>

<!-- Responsive: full en móvil, mitad en tablet, tercio en desktop -->
<div class="grid sm-gap-2 md-gap-3 gap-4">
  <div class="sm-column-6 md-column-3 column-2">Item 1</div>
  <div class="sm-column-6 md-column-3 column-2">Item 2</div>
  <div class="sm-column-6 md-column-3 column-2">Item 3</div>
</div>
```

**Columnas disponibles (grid-column: span X):**
- `column-1` = span 1 (16.67%)
- `column-2` = span 2 (33.33%)
- `column-3` = span 3 (50%)
- `column-4` = span 4 (66.67%)
- `column-5` = span 5 (83.33%)
- `column-6` = span 6 (100%)

**Posicionamiento de columnas:**

Control total de posición usando `column-X-Y` donde X es el inicio y Y es el fin:

```html
<!-- Ejemplo básico: elemento centrado -->
<div class="grid gap-4">
  <div class="column-2-5">
    Ocupa desde la línea 2 hasta la 5 (3 columnas, centrado)
  </div>
</div>

<!-- Ejemplo práctico: 3 elementos, el tercero centrado -->
<div class="grid gap-4">
  <div class="column-3">Elemento 1 (automático izquierda)</div>
  <div class="column-3">Elemento 2 (automático derecha)</div>
  <div class="column-2-5">Elemento 3 (centrado en la siguiente fila)</div>
</div>

<!-- Layout personalizado: sidebar izquierdo + contenido + sidebar derecho -->
<div class="grid gap-4">
  <div class="column-1-2">Sidebar izq (línea 1 a 2)</div>
  <div class="column-2-5">Contenido principal (línea 2 a 5)</div>
  <div class="column-5-7">Sidebar der (línea 5 a 7)</div>
</div>

<!-- Combinando con responsive -->
<div class="grid gap-4">
  <div class="sm-column-1-7 md-column-1-4 column-2-5">
    Móvil: full width
    Tablet: primera mitad
    Desktop: centrado
  </div>
</div>
```

**Todas las combinaciones disponibles (21 en total):**

*Desde línea 1:*
- `column-1-2` (1 col), `column-1-3` (2 cols), `column-1-4` (3 cols), `column-1-5` (4 cols), `column-1-6` (5 cols), `column-1-7` (6 cols, full width)

*Desde línea 2:*
- `column-2-3` (1 col), `column-2-4` (2 cols), `column-2-5` (3 cols), `column-2-6` (4 cols), `column-2-7` (5 cols)

*Desde línea 3:*
- `column-3-4` (1 col), `column-3-5` (2 cols), `column-3-6` (3 cols), `column-3-7` (4 cols)

*Desde línea 4:*
- `column-4-5` (1 col), `column-4-6` (2 cols), `column-4-7` (3 cols)

*Desde línea 5:*
- `column-5-6` (1 col), `column-5-7` (2 cols)

*Desde línea 6:*
- `column-6-7` (1 col)

**Todas disponibles con prefijos responsive:** `sm-column-X-Y` y `md-column-X-Y`

**Gap utilities (0-12):**
```html
<!-- Gap general -->
<div class="grid gap-4">...</div>

<!-- Gap por eje -->
<div class="grid gap-x-4 gap-y-2">...</div>

<!-- Gap responsive -->
<div class="grid sm-gap-2 md-gap-4 gap-6">...</div>
```

**Grid Alignment:**

Alinea elementos dentro del grid usando justify y align:

```html
<!-- Alineación horizontal de items (justify-self) -->
<div class="grid gap-4">
  <div class="column-3 justify-self-start">Izquierda</div>
  <div class="column-3 justify-self-center">Centro</div>
  <div class="column-3 justify-self-end">Derecha</div>
</div>

<!-- Alineación vertical de items (align-self) -->
<div class="grid gap-4">
  <div class="column-2 align-self-start">Arriba</div>
  <div class="column-2 align-self-center">Centro</div>
  <div class="column-2 align-self-end">Abajo</div>
</div>

<!-- Alineación de todos los items del contenedor -->
<div class="grid gap-4 justify-items-center">
  <div class="column-3">Centrado</div>
  <div class="column-3">Centrado</div>
</div>

<!-- Place-self: shorthand para align-self + justify-self -->
<div class="grid gap-4">
  <div class="column-3 place-self-center">Centrado vertical y horizontal</div>
</div>

<!-- Responsive alignment -->
<div class="grid gap-4 sm-justify-items-center md-justify-items-start justify-items-end">
  <div class="column-3">Item responsivo</div>
</div>
```

**Clases de alineación disponibles:**
- `justify-items-*`: Alinea horizontalmente todos los items (`start`, `end`, `center`, `stretch`)
- `justify-self-*`: Alinea horizontalmente un item individual (`start`, `end`, `center`, `stretch`, `auto`)
- `align-items-*`: Alinea verticalmente todos los items (`start`, `end`, `center`, `stretch`)
- `align-self-*`: Alinea verticalmente un item individual (`start`, `end`, `center`, `stretch`, `auto`)
- `place-items-*`: Shorthand para align-items + justify-items (`start`, `end`, `center`, `stretch`)
- `place-self-*`: Shorthand para align-self + justify-self (`start`, `end`, `center`, `stretch`, `auto`)

**Grid Auto-Fit:**

```html
<!-- Columnas automáticas responsivas -->
<div class="grid-auto gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Display Utilities

Controla cómo se muestra un elemento:

```html
<!-- Display básico -->
<div class="block">Block</div>
<div class="inline-block">Inline Block</div>
<div class="inline">Inline</div>
<div class="hidden">Oculto</div>

<!-- Flexbox -->
<div class="flex">Flex container</div>
<div class="inline-flex">Inline flex</div>

<!-- Grid -->
<div class="grid">Grid container</div>
<div class="inline-grid">Inline grid</div>

<!-- Display responsive -->
<div class="sm-hidden md-block flex">
  Oculto en móvil, block en tablet, flex en desktop
</div>

<div class="block md-flex">
  Block en móvil, flex en tablet y desktop
</div>
```

**Clases disponibles:**
- Base: `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `inline-grid`, `hidden`
- Tablet (md): `md-block`, `md-inline-block`, `md-inline`, `md-flex`, `md-inline-flex`, `md-grid`, `md-inline-grid`, `md-hidden`
- Móvil (sm): `sm-block`, `sm-inline-block`, `sm-inline`, `sm-flex`, `sm-inline-flex`, `sm-grid`, `sm-inline-grid`, `sm-hidden`

### Botones

```html
<button class="button button-primary">Primary</button>
<button class="button button-secondary">Secondary</button>
<button class="button button-ghost">Ghost</button>

<!-- Tamaños -->
<button class="button button-primary button-sm">Small</button>
<button class="button button-primary button-lg">Large</button>
```

### Formularios

Sistema completo de formularios con estilos dark-first:

```html
<!-- Input básico -->
<div class="form-group">
  <label class="form-label">Nombre</label>
  <input type="text" class="form-input" placeholder="Tu nombre">
  <p class="form-help">Texto de ayuda</p>
</div>

<!-- Label requerido -->
<div class="form-group">
  <label class="form-label form-label-required">Email</label>
  <input type="email" class="form-input" placeholder="tu@email.com">
</div>

<!-- Textarea -->
<div class="form-group">
  <label class="form-label">Mensaje</label>
  <textarea class="form-textarea" placeholder="Tu mensaje"></textarea>
</div>

<!-- Select -->
<div class="form-group">
  <label class="form-label">País</label>
  <select class="form-select">
    <option>Selecciona una opción</option>
    <option>Opción 1</option>
  </select>
</div>

<!-- Checkbox -->
<div class="form-check">
  <input type="checkbox" class="form-checkbox" id="check1">
  <label class="form-check-label" for="check1">Acepto términos</label>
</div>

<!-- Radio -->
<div class="form-check">
  <input type="radio" class="form-radio" name="option" id="radio1">
  <label class="form-check-label" for="radio1">Opción 1</label>
</div>

<!-- Switch (Toggle) -->
<div class="form-group-inline">
  <div class="form-switch">
    <input type="checkbox" class="form-switch-input" id="switch1">
    <span class="form-switch-slider"></span>
  </div>
  <label class="form-check-label" for="switch1">Activar notificaciones</label>
</div>

<!-- Range Slider -->
<div class="form-group">
  <label class="form-label">Volumen</label>
  <input type="range" class="form-range" min="0" max="100" value="50">
</div>

<!-- Estados de validación -->
<input type="text" class="form-input form-input-success" value="Válido">
<p class="form-help form-help-success">Campo válido</p>

<input type="text" class="form-input form-input-error" value="Inválido">
<p class="form-help form-help-error">Este campo tiene un error</p>

<input type="text" class="form-input form-input-warning" value="Advertencia">
<p class="form-help form-help-warning">Advertencia importante</p>

<!-- Tamaños de inputs -->
<input type="text" class="form-input form-input-sm" placeholder="Small">
<input type="text" class="form-input" placeholder="Default">
<input type="text" class="form-input form-input-lg" placeholder="Large">

<!-- Input groups -->
<div class="input-group">
  <span class="input-group-addon">@</span>
  <input type="text" class="form-input" placeholder="username">
</div>
```

**Clases de formularios:**
- **Contenedores**: `form-group`, `form-group-inline`
- **Labels**: `form-label`, `form-label-required`, `form-label-sm`, `form-label-lg`
- **Inputs**: `form-input`, `form-textarea`, `form-select`, `form-input-sm`, `form-input-lg`
- **Checkboxes/Radios**: `form-checkbox`, `form-radio`, `form-check`, `form-check-label`
- **Switch**: `form-switch`, `form-switch-input`, `form-switch-slider`
- **Range**: `form-range`
- **Validación**: `form-input-success`, `form-input-error`, `form-input-warning`
- **Helper text**: `form-help`, `form-help-success`, `form-help-error`, `form-help-warning`
- **Input groups**: `input-group`, `input-group-addon`

### Listas

Sistema completo de listas con múltiples estilos y variantes:

```html
<!-- Listas básicas -->
<ul class="list-unordered">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol class="list-ordered">
  <li>Primer paso</li>
  <li>Segundo paso</li>
</ol>

<!-- Lista con íconos -->
<ul class="list-icon">
  <li>Característica 1</li>
  <li>Característica 2</li>
</ul>

<!-- Lista con checkmarks -->
<ul class="list-check">
  <li>Tarea completada</li>
  <li>Objetivo alcanzado</li>
</ul>

<!-- Lista numerada estilizada -->
<ol class="list-numbered">
  <li>Paso uno del proceso</li>
  <li>Paso dos del proceso</li>
</ol>

<!-- Lista dividida -->
<ul class="list-divided">
  <li>Item con separador</li>
  <li>Otro item</li>
</ul>

<!-- Lista en columnas -->
<ul class="list-unordered list-columns-2">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
</ul>

<!-- Lista de descripción -->
<dl class="description-list">
  <dt>Término</dt>
  <dd>Definición del término</dd>
  <dt>Otro término</dt>
  <dd>Otra definición</dd>
</dl>

<!-- Lista de descripción inline -->
<dl class="description-list-inline">
  <dt>Nombre</dt>
  <dd>John Doe</dd>
  <dt>Email</dt>
  <dd>john@example.com</dd>
</dl>
```

**Clases de listas:**
- **Básicas**: `list-ordered`, `list-unordered`, `list-circle`, `list-square`, `list-none`
- **Estilizadas**: `list-icon`, `list-check`, `list-numbered`, `list-divided`
- **Variantes**: `list-compact`, `list-spacious`
- **Columnas**: `list-columns-2`, `list-columns-3` (responsive)
- **Descripción**: `description-list`, `description-list-inline`

### Rich Text

Contenedor para texto enriquecido que aplica estilos automáticamente a todos los elementos HTML dentro:

```html
<div class="richtext">
  <h1>Título principal</h1>
  <p>Párrafo con <strong>texto en negrita</strong>, <em>cursiva</em>, y <a href="#">enlaces</a>.</p>

  <h2>Subtítulo</h2>
  <p>Texto con <code>código inline</code> y <mark>texto resaltado</mark>.</p>

  <pre><code>// Bloque de código
function ejemplo() {
  return true;
}</code></pre>

  <blockquote>
    <p>Cita importante que destaca en el texto.</p>
    <cite>Autor de la cita</cite>
  </blockquote>

  <ul>
    <li>Lista dentro de richtext</li>
    <li>Se estiliza automáticamente</li>
  </ul>

  <table>
    <thead>
      <tr>
        <th>Columna 1</th>
        <th>Columna 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dato 1</td>
        <td>Dato 2</td>
      </tr>
    </tbody>
  </table>

  <p>Presiona <kbd>Ctrl</kbd> + <kbd>C</kbd> para copiar.</p>

  <hr>

  <details>
    <summary>Sección colapsable</summary>
    <p>Contenido oculto que se puede expandir.</p>
  </details>
</div>
```

**Elementos soportados:**
- **Encabezados**: `h1` a `h6` con espaciado vertical automático
- **Texto**: `p`, `strong`, `em`, `u`, `s`, `del`, `mark`, `small`
- **Código**: `code` (inline), `pre` (bloques)
- **Citas**: `blockquote`, `cite`
- **Listas**: `ul`, `ol`, `li` con anidación
- **Tablas**: `table`, `th`, `td` con hover states
- **Multimedia**: `img`, `figure`, `figcaption`
- **Interactivo**: `details`, `summary`
- **Otros**: `kbd`, `abbr`, `address`, `hr`, `sub`, `sup`

### Componentes Avanzados

Componentes interactivos basados en elementos HTML nativos `<details>` y `<summary>`, estilizados completamente con CSS. **Sin JavaScript requerido.**

#### Accordion

Contenido expandible perfecto para FAQs y secciones colapsables:

```html
<div class="accordion">
  <details>
    <summary>¿Pregunta 1?</summary>
    <div>
      <p>Respuesta detallada aquí...</p>
    </div>
  </details>
  <details>
    <summary>¿Pregunta 2?</summary>
    <div>
      <p>Otra respuesta...</p>
    </div>
  </details>
</div>
```

**Variantes del Accordion:**
- `accordion` - Estilo base
- `accordion-primary` - Con borde de color primary al expandir
- `accordion-rounded` - Bordes más redondeados
- `accordion-flush` - Sin bordes, ideal para listas
- `accordion-compact` - Padding reducido para espacios pequeños

#### Dropdown

Menús desplegables para navegación o selección:

```html
<div class="dropdown">
  <details>
    <summary>Menú</summary>
    <div>
      <a href="#" class="dropdown-item">Perfil</a>
      <a href="#" class="dropdown-item">Configuración</a>
      <div class="dropdown-divider"></div>
      <a href="#" class="dropdown-item">Cerrar Sesión</a>
    </div>
  </details>
</div>
```

**Variantes del Dropdown:**
- `dropdown` - Estilo base
- `dropdown-primary` - Botón con estilo primary
- `dropdown-ghost` - Botón con estilo ghost
- `dropdown-full` - Ancho completo

**Posicionamiento:**
- `dropdown-right` - Menú alineado a la derecha
- `dropdown-up` - Menú se abre hacia arriba

**Clases de elementos:**
- `dropdown-item` - Item individual del menú
- `dropdown-divider` - Separador entre items
- `dropdown-header` - Encabezado de sección

#### Modal / Popup

Ventanas modales con backdrop blur para diálogos importantes:

```html
<div class="modal">
  <details>
    <summary class="button button-primary">Abrir Modal</summary>
    <div>
      <div data-mask></div>
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Título</h4>
          <button class="modal-close" data-close>✕</button>
        </div>
        <div class="modal-body">
          <p>Contenido del modal...</p>
        </div>
        <div class="modal-footer">
          <button class="button button-ghost" data-close>Cancelar</button>
          <button class="button button-primary">Guardar</button>
        </div>
      </div>
    </div>
  </details>
</div>
```

**Estructura del Modal:**
- `<div data-mask></div>` - Backdrop oscuro (cierra el modal al hacer click)
- `.modal-content` - Contenedor del contenido del modal
- Usa `data-close` en botones para cerrar el modal automáticamente

**Tamaños de Modal:**
- `modal-sm` - 400px de ancho
- `modal` (default) - 600px de ancho
- `modal-lg` - 800px de ancho
- `modal-xl` - 1000px de ancho
- `modal-full` - 100% de ancho

**Estructura del Modal:**
- `modal-header` - Encabezado con título y botón cerrar
- `modal-title` - Título del modal
- `modal-close` - Botón para cerrar
- `modal-body` - Contenido principal
- `modal-footer` - Pie con botones de acción

#### Sidebar Fixed

Sidebar fijo con toggle para navegación lateral:

```html
<div class="sidebar">
  <details>
    <summary class="button button-primary">☰ Menú</summary>
    <div>
      <div data-mask></div>
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h4 class="sidebar-title">Navegación</h4>
        </div>
        <div class="sidebar-body">
          <nav class="sidebar-nav">
            <a href="#" class="sidebar-nav-item" data-close>Dashboard</a>
            <a href="#" class="sidebar-nav-item" data-close>Proyectos</a>
            <a href="#" class="sidebar-nav-item" data-close>Configuración</a>
          </nav>
        </div>
        <div class="sidebar-footer">
          <p class="text-xs text-tertiary">v1.0.0</p>
        </div>
      </div>
    </div>
  </details>
</div>
```

**Estructura del Sidebar:**
- `<div data-mask></div>` - Backdrop oscuro (cierra el sidebar al hacer click)
- `.sidebar-content` - Contenedor del contenido del sidebar
- Usa `data-close` en enlaces de navegación para cerrar al navegar

**Posiciones del Sidebar:**
- `sidebar` (default) - Posicionado a la izquierda
- `sidebar-right` - Posicionado a la derecha

**Tamaños del Sidebar:**
- `sidebar-sm` - 200px de ancho
- `sidebar` (default) - 280px de ancho
- `sidebar-lg` - 360px de ancho
- `sidebar-xl` - 480px de ancho

**Estructura del Sidebar:**
- `sidebar-header` - Encabezado del sidebar
- `sidebar-title` - Título del sidebar
- `sidebar-body` - Contenido principal
- `sidebar-footer` - Pie del sidebar
- `sidebar-nav` - Contenedor de navegación
- `sidebar-nav-item` - Item individual de navegación

### Interactividad de Componentes (JavaScript)

DarkUI incluye un script JavaScript ligero (`darkui.js`) que agrega funcionalidad interactiva a modales, sidebars y dropdowns. **Es completamente opcional** - los componentes funcionan sin JavaScript, pero con mejores características de usabilidad.

#### Características del Script

**1. Cierre con Click Fuera**
- Modales y sidebars se cierran al hacer click en el backdrop (área oscura)
- Dropdowns se cierran al hacer click fuera del componente

**2. Cierre con Tecla Escape**
- Presiona `Esc` para cerrar el componente abierto más reciente

**3. Atributo `data-close`**
- Agrega `data-close` a cualquier elemento para que cierre el componente al hacer click
- Útil para botones de cancelar, cerrar, o acciones que cierran el modal/sidebar

**4. Prevención de Scroll**
- Cuando un modal está abierto, el scroll del body se bloquea automáticamente

#### Uso del Atributo `data-close`

```html
<!-- Botón de cerrar en el header -->
<button class="modal-close" data-close>✕</button>

<!-- Botón de cancelar en el footer -->
<button class="button button-ghost" data-close>Cancelar</button>

<!-- Cualquier elemento puede tener data-close -->
<a href="#" data-close>Cerrar este modal</a>
```

#### Sin JavaScript

Si no incluyes el script, los componentes siguen funcionando pero:
- Necesitas hacer click en el botón `summary` para cerrar
- No hay cierre con click fuera o tecla Escape
- El `data-close` no funciona

#### API Global (Opcional)

El script expone una API global `window.DarkUI` para control programático:

```javascript
// Cerrar un details específico
const details = document.querySelector('.modal details');
DarkUI.closeDetails(details);

// Versión del script
console.log(DarkUI.version); // "1.0.0"
```

### Espaciado

```html
<!-- Padding -->
<div class="padding-4">Padding en todos los lados</div>
<div class="padding-x-6">Padding horizontal</div>
<div class="padding-y-8">Padding vertical</div>

<!-- Margin -->
<div class="margin-4">Margin en todos los lados</div>
<div class="margin-top-6">Margin superior</div>

<!-- Responsive -->
<div class="sm-padding-2 md-padding-4 padding-6">
  Padding responsive
</div>
```

### Colores

```html
<!-- Backgrounds -->
<div class="bg-primary">Background primario</div>
<div class="bg-secondary">Background secundario</div>
<div class="bg-color-primary">Color de acción primario</div>

<!-- Texto -->
<p class="text-primary">Texto primario</p>
<p class="text-secondary">Texto secundario</p>
<p class="text-color-primary">Texto color primario</p>

<!-- Bordes -->
<div class="border-1 border-color-primary">Con borde</div>
```

### Sombras

```html
<div class="shadow-sm">Sombra pequeña</div>
<div class="shadow-md">Sombra mediana</div>
<div class="shadow-lg">Sombra grande</div>
```

### Tipografía

```html
<h1 class="heading-1">Heading 1</h1>
<h2 class="heading-2">Heading 2</h2>
<p class="text-base">Texto base</p>
<p class="text-lg font-bold">Texto grande y bold</p>
```

## Personalización

Todas las variables CSS están en `src/base/variables.css`. Puedes sobrescribirlas en tu propio CSS:

```css
:root {
  /* Cambiar color primario */
  --darkui-color-primary: #your-color;

  /* Cambiar espaciado base */
  --darkui-spacing-4: 1.5rem;

  /* Cambiar breakpoint */
  --darkui-breakpoint-sm: 768px;
}
```

## Breakpoints

- **sm**: ≤ 680px (móviles)
- **md**: ≤ 1024px (tablets)
- **lg**: ≥ 1025px (desktop, sin prefijo)

## Nomenclatura de Clases

**IMPORTANTE:** Todas las clases siguen una nomenclatura descriptiva en kebab-case. NO se simplifican las palabras.

**Reglas de nomenclatura:**
- ✅ **Usar palabras completas descriptivas**: `column-`, `padding-`, `margin-`, `button-`
- ❌ **NO simplificar**: Evitar abreviaciones como `col-`, `pad-`, `mar-`, `btn-`
- ✅ **kebab-case siempre**: `flex-column`, `justify-center`, `text-primary`
- ✅ **Responsive prefixes**: `sm-`, `md-` para mobile y tablet

**Ejemplos correctos:**
- `padding-4`, `margin-6` (no `pad-4`, `mar-6`)
- `column-3`, `column-start-2` (no `col-3`, `col-start-2`)
- `flex-column`, `justify-center` (no `flex-col`, `justify-ctr`)
- `bg-primary`, `text-secondary`
- `sm-padding-2`, `md-flex-column`
- `button-primary`, `shadow-lg` (no `btn-primary`)

## Navegador Compatible

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)

## Licencia

MIT

## Autor

Lenin - 2025
