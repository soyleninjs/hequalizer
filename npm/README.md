# Hequalizer

Hequalizer es una librería JavaScript ligera para igualar las alturas de elementos DOM mediante variables CSS. Trabaja por `handle`: marcas los elementos con `data-hequalizer`, creas una instancia con ese mismo identificador y Hequalizer calcula la altura máxima para aplicarla como una variable CSS.

## Características

- Igualación de alturas con variables CSS personalizables.
- API por `handle`, ideal para manejar grupos independientes de elementos.
- Selector personalizado para elegir los elementos con cualquier selector CSS.
- Soporte responsive con opciones distintas por breakpoint.
- Modos de cálculo para todos los elementos o por grupos de columnas.
- Omisión de posiciones de la grilla al agrupar por columnas mediante `indexesToOmit`.
- Recálculo automático en `resize` y cuando cambia el contenido observado.
- Eventos globales con `CustomEvent` para cada etapa importante.
- Registro interno de instancias con `Hequalizer.getInstance(handle)`.
- JavaScript vanilla, sin dependencias.

## Menú

- [Hequalizer](#hequalizer)
  - [Características](#características)
  - [Menú](#menú)
  - [Instalación](#instalación)
    - [NPM](#npm)
    - [CDN](#cdn)
    - [Descarga directa](#descarga-directa)
  - [Uso básico](#uso-básico)
    - [HTML](#html)
    - [JavaScript](#javascript)
    - [CSS](#css)
  - [API](#api)
    - [Constructor](#constructor)
    - [Selección de elementos](#selección-de-elementos)
    - [Selector personalizado](#selector-personalizado)
    - [Métodos de instancia](#métodos-de-instancia)
    - [Registro de instancias](#registro-de-instancias)
    - [Propiedades útiles](#propiedades-útiles)
  - [Opciones](#opciones)
  - [Sistema responsive](#sistema-responsive)
    - [Variables CSS responsive](#variables-css-responsive)
  - [Eventos](#eventos)
  - [Clases de estado](#clases-de-estado)
  - [Modos de columnas](#modos-de-columnas)
    - [`columns: "all"`](#columns-all)
    - [`columns: 2`, `3`, `4`, etc.](#columns-2-3-4-etc)
    - [`columns <= 1`](#columns--1)
    - [Omisión de posiciones](#omisión-de-posiciones)
  - [Actualización automática](#actualización-automática)
    - [Carga inicial y fuentes](#carga-inicial-y-fuentes)
    - [Resize](#resize)
    - [Cambios de contenido](#cambios-de-contenido)
    - [Elementos agregados o eliminados](#elementos-agregados-o-eliminados)
  - [Ejemplos](#ejemplos)
    - [Grid responsive](#grid-responsive)
    - [Múltiples grupos](#múltiples-grupos)
    - [Carousel o slider](#carousel-o-slider)
    - [Desactivar en mobile](#desactivar-en-mobile)
  - [Buenas prácticas](#buenas-prácticas)
  - [Solución de problemas](#solución-de-problemas)
  - [Compatibilidad](#compatibilidad)
    - [Ejemplo en React](#ejemplo-en-react)
  - [Contribuir](#contribuir)
  - [Licencia](#licencia)
  - [Autor](#autor)

## Instalación

### NPM

```bash
npm install hequalizer
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/hequalizer/hequalizer.min.js"></script>
```

### Descarga directa

Descarga `hequalizer.js` o `hequalizer.min.js` desde el repositorio o desde GitHub Releases e inclúyelo en tu HTML:

```html
<script src="./js/hequalizer.js"></script>
```

El script expone la clase en `window.Hequalizer`.

## Uso básico

### HTML

Usa el atributo `data-hequalizer` para indicar qué elementos pertenecen al mismo grupo. El valor del atributo debe coincidir con el `handle` que usarás al crear la instancia.

```html
<div class="cards">
  <article class="card">
    <h3 data-hequalizer="card-title">Título corto</h3>
    <p>Contenido de la tarjeta.</p>
  </article>

  <article class="card">
    <h3 data-hequalizer="card-title">Título mucho más largo que ocupa más líneas</h3>
    <p>Contenido de la tarjeta.</p>
  </article>

  <article class="card">
    <h3 data-hequalizer="card-title">Otro título</h3>
    <p>Contenido de la tarjeta.</p>
  </article>
</div>
```

### JavaScript

```javascript
window.addEventListener('DOMContentLoaded', () => {
  new window.Hequalizer('card-title');
});
```

### CSS

Hequalizer solo calcula y asigna la variable CSS. Tu CSS decide cómo usarla.

```css
[data-hequalizer="card-title"] {
  min-height: var(--height);
}
```

Por defecto la variable aplicada es `--height`.

## API

### Constructor

```javascript
const instance = new Hequalizer(handle, options);
```

| Parámetro | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `handle` | `String` | Sí | Identificador del grupo. Debe coincidir con `data-hequalizer="handle"`. |
| `options` | `Object` | No | Configuración de la instancia. |

El `handle` es obligatorio y debe usar solo letras minúsculas, números y guiones en formato tipo slug:

```javascript
new Hequalizer('product-card-title'); // válido
new Hequalizer('Product Title');      // inválido
new Hequalizer('product_title');      // inválido
```

Si el `handle` ya está registrado en otra instancia activa, el constructor lanza un error. Para volver a usar el mismo `handle`, primero destruye esa instancia con `destroy()`.

### Selección de elementos

La instancia selecciona automáticamente todos los elementos que tengan el atributo `data-hequalizer` con el `handle` indicado:

```javascript
this.$elements = document.querySelectorAll(`[data-hequalizer="${handle}"]`);
```

El constructor recibe el `handle` del grupo; los elementos se definen directamente en el HTML con `data-hequalizer`.

### Selector personalizado

Si no quieres usar `data-hequalizer`, puedes indicar cualquier selector CSS con la opción `customSelector`. Hequalizer usará ese selector para encontrar los elementos del grupo.

```html
<div class="cards">
  <article class="card">
    <h3 class="card-title">Título corto</h3>
  </article>

  <article class="card">
    <h3 class="card-title">Título mucho más largo que ocupa más líneas</h3>
  </article>
</div>
```

```javascript
new Hequalizer('card-title', {
  customSelector: '.cards .card-title'
});
```

Cuando `customSelector` es una cadena vacía, que es el valor por defecto, la instancia usa `[data-hequalizer="{handle}"]`.

`customSelector` se lee una sola vez al crear la instancia. Defínelo en las opciones base y no dentro de `responsive`, ya que los cambios por breakpoint no vuelven a seleccionar elementos.

### Métodos de instancia

| Método | Descripción |
| --- | --- |
| `init()` | Inicializa o reinicializa la instancia: define opciones actuales, calcula alturas, activa listeners y emite `init`. Se ejecuta automáticamente después de `document.fonts.ready`. |
| `update()` | Recalcula manualmente las alturas de los elementos actuales con las opciones activas y emite `update`. |
| `refreshElements()` | Vuelve a consultar el DOM con el selector configurado, actualiza las opciones activas, recalcula alturas, reinicia los observers y emite `refresh`. Úsalo cuando agregues o elimines elementos. |
| `destroy()` | Limpia variables y clases, remueve listeners, desconecta observers, cancela timeouts, emite `destroy` y elimina la instancia del registro interno. |

### Registro de instancias

Hequalizer guarda las instancias activas en un `Map` estático usando el `handle` como llave.

```javascript
const titles = new Hequalizer('card-title');

const sameInstance = Hequalizer.getInstance('card-title');
console.log(sameInstance === titles); // true

titles.destroy();
console.log(Hequalizer.getInstance('card-title')); // undefined
```

### Propiedades útiles

| Propiedad | Tipo | Descripción |
| --- | --- | --- |
| `handle` | `String` | Identificador de la instancia. |
| `$elements` | `NodeList` | Elementos encontrados con el selector activo. |
| `customSelector` | `String` | Selector CSS usado para encontrar los elementos. Por defecto `[data-hequalizer="handle"]`. |
| `values` | `Number \| Array` | Última altura calculada. Es `Number` con `columns: "all"` y `Array` con columnas numéricas. |
| `actualOptions` | `Object` | Opciones activas según el breakpoint actual. |
| `actualBreakpoint` | `String \| Number` | `"default"` cuando no aplica ningún breakpoint, o el número del breakpoint activo. |
| `responsive` | `Object` | Configuración responsive recibida. |
| `breakpoints` | `Array` | Breakpoints ordenados de menor a mayor. |
| `cssVariables` | `Array` | Variables CSS usadas por la configuración base y responsive. |

## Opciones

```javascript
new Hequalizer('card-title', {
  cssVariable: '--card-title-height',
  columns: 'all',
  observeResize: true,
  debounce: 100,
  responsive: {}
});
```

| Opción | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `cssVariable` | `String` | `'--height'` | Nombre de la variable CSS que se asigna a los elementos. |
| `customSelector` | `String` | `""` | Selector CSS para elegir los elementos del grupo. Si está vacío, usa `[data-hequalizer="handle"]`. Se define solo en las opciones base. |
| `columns` | `String \| Number` | `'all'` | Define cómo se agrupan los elementos para calcular alturas. Usa `"all"` o un número mayor a `1`. |
| `indexesToOmit` | `Array` | `[]` | Índices de la grilla (base `0`) que se omiten al agrupar con `columns` numérico. Solo aplica cuando `columns` es mayor a `1`. |
| `observeResize` | `Boolean` | `true` | Permite recalcular en eventos `resize`. Si es `false`, el listener de resize no recalcula ni emite evento mientras esa opción esté activa. |
| `debounce` | `Number` | `0` | Tiempo en milisegundos para retrasar el recálculo por `resize`. Con `0`, recalcula inmediatamente. |
| `responsive` | `Object` | `{}` | Configuración por breakpoint. Cada breakpoint puede sobrescribir las opciones principales. |

Los eventos se escuchan con `window.addEventListener` usando el formato documentado en la sección [Eventos](#eventos).

## Sistema responsive

La opción `responsive` permite cambiar la configuración según `window.innerWidth`.

```javascript
new Hequalizer('product-title', {
  cssVariable: '--product-title-height',
  columns: 4,
  debounce: 100,
  responsive: {
    1024: {
      columns: 3
    },
    768: {
      columns: 2,
      cssVariable: '--product-title-height-tablet'
    },
    480: {
      columns: 1
    }
  }
});
```

Funcionamiento:

1. Los breakpoints se ordenan de menor a mayor.
2. Se usa el primer breakpoint que cumpla `window.innerWidth <= breakpoint`.
3. Si ningún breakpoint coincide, se usa la configuración `default`.
4. Las opciones del breakpoint se fusionan con las opciones base.
5. La propiedad `actualBreakpoint` queda como el número activo o `"default"`.

Con esta configuración:

| Viewport | Breakpoint activo | Opciones principales |
| --- | --- | --- |
| `<= 480px` | `480` | `columns: 1` |
| `481px - 768px` | `768` | `columns: 2`, variable tablet |
| `769px - 1024px` | `1024` | `columns: 3` |
| `> 1024px` | `default` | `columns: 4` |

### Variables CSS responsive

Si cambias `cssVariable` por breakpoint, Hequalizer recuerda todas las variables configuradas y las limpia antes de cada cálculo. Esto evita que una variable de otro breakpoint se quede aplicada al elemento cuando cambia el viewport.

```css
[data-hequalizer="product-title"] {
  min-height: var(--product-title-height);
}

@media (max-width: 768px) {
  [data-hequalizer="product-title"] {
    min-height: var(--product-title-height-tablet);
  }
}
```

## Eventos

Hequalizer emite eventos globales en `window` con este formato:

```text
hequalizer:{handle}:{name}
```

Todos los eventos incluyen la instancia en `event.detail.instance`.

| Evento | Se emite cuando |
| --- | --- |
| `hequalizer:{handle}:init` | Termina la inicialización. |
| `hequalizer:{handle}:resize` | Termina un recálculo provocado por `resize`. |
| `hequalizer:{handle}:change` | Termina un recálculo provocado por cambios en el contenido observado. |
| `hequalizer:{handle}:update` | Termina una llamada manual a `update()`. |
| `hequalizer:{handle}:refresh` | Termina una llamada a `refreshElements()`. |
| `hequalizer:{handle}:destroy` | Termina la destrucción de la instancia. |

Ejemplo:

```javascript
const instance = new Hequalizer('card-title');

window.addEventListener('hequalizer:card-title:init', (event) => {
  console.log('Instancia lista:', event.detail.instance);
  console.log('Alturas:', event.detail.instance.values);
});

window.addEventListener('hequalizer:card-title:resize', (event) => {
  console.log('Breakpoint actual:', event.detail.instance.actualBreakpoint);
});

window.addEventListener('hequalizer:card-title:change', (event) => {
  console.log('El contenido cambió:', event.detail.instance.values);
});

window.addEventListener('hequalizer:card-title:refresh', (event) => {
  console.log('Elementos refrescados:', event.detail.instance.$elements.length);
});
```

## Clases de estado

Hequalizer agrega y remueve clases durante el cálculo.

| Clase | Descripción |
| --- | --- |
| `.height-calculating` | Se agrega mientras se están midiendo los elementos. |
| `.height-calculated` | Se agrega cuando el cálculo encontró una altura mayor a `0`. |
| `.height-zero` | Se agrega cuando la altura máxima calculada es `0`. |

Antes de cada cálculo se limpian las variables CSS registradas y se remueven las clases de estado.

```css
[data-hequalizer].height-calculating {
  opacity: 0.6;
}

[data-hequalizer].height-calculated {
  opacity: 1;
}

[data-hequalizer].height-zero {
  display: none;
}
```

## Modos de columnas

### `columns: "all"`

Es el modo por defecto. Calcula la altura máxima entre todos los elementos del grupo y aplica el mismo valor a todos.

```javascript
const instance = new Hequalizer('card-title', {
  columns: 'all'
});

// Si el elemento más alto mide 140px:
console.log(instance.values); // 140
```

### `columns: 2`, `3`, `4`, etc.

Cuando `columns` es un número mayor a `1`, Hequalizer divide los elementos en grupos consecutivos de ese tamaño. Cada grupo recibe su propia altura máxima.

```javascript
const instance = new Hequalizer('card-title', {
  columns: 3
});

// 9 elementos, agrupados de 3 en 3:
console.log(instance.values); // [120, 160, 140]
```

Ejemplo con 6 elementos y `columns: 2`:

```text
Elemento 1 + Elemento 2 = grupo 1
Elemento 3 + Elemento 4 = grupo 2
Elemento 5 + Elemento 6 = grupo 3
```

### `columns <= 1`

Si `columns` es `1` o menor, Hequalizer limpia las variables/clases y no aplica ninguna altura. Esto es útil para desactivar la igualación en una vista de una sola columna:

```javascript
new Hequalizer('card-title', {
  columns: 4,
  responsive: {
    480: {
      columns: 1
    }
  }
});
```

### Omisión de posiciones

Con `columns` numérico puedes omitir posiciones de la grilla con `indexesToOmit`. Hequalizer recorre cada celda de la grilla y salta los índices indicados, de modo que los elementos del grupo se alinean con las celdas reales de tu layout.

Es útil cuando algunas celdas de la grilla las ocupa otro contenido que no forma parte del grupo, por ejemplo un banner o una tarjeta destacada.

```html
<div class="grid">
  <div class="featured">Contenido destacado</div>
  <h3 class="card-title" data-hequalizer="card-title">Título 1</h3>
  <h3 class="card-title" data-hequalizer="card-title">Título 2 más largo</h3>
  <h3 class="card-title" data-hequalizer="card-title">Título 3</h3>
</div>
```

```javascript
new Hequalizer('card-title', {
  columns: 3,
  indexesToOmit: [0]
});
```

Los índices son posiciones de la grilla, no posiciones dentro de los elementos del grupo. El conteo empieza en `0` y es global sobre toda la grilla. En el ejemplo, la celda `0` la ocupa el contenido destacado, por lo que los dos primeros elementos del grupo se igualan entre sí y el tercero queda en la siguiente fila.

`indexesToOmit` solo aplica cuando `columns` es un número mayor a `1`. Como es parte de las opciones, también puedes cambiarlo por breakpoint dentro de `responsive`.

## Actualización automática

### Carga inicial y fuentes

Al crear una instancia, Hequalizer espera a `document.fonts.ready` antes de llamar a `init()`. Esto ayuda a medir alturas reales cuando usas fuentes web.

```javascript
document.fonts.ready.then(() => {
  this.init();
});
```

Por esta razón, crea la instancia cuando los elementos ya existan en el DOM, por ejemplo después de `DOMContentLoaded` o al final del `body`.

### Resize

La instancia registra un listener de `resize` en `window`. En cada resize:

1. Actualiza `actualOptions` y `actualBreakpoint`.
2. Cancela el timeout pendiente de resize.
3. Si `observeResize` es `false`, no recalcula ni limpia valores previos durante ese resize.
4. Si `debounce` es `0`, recalcula inmediatamente.
5. Si `debounce` es mayor a `0`, espera esa cantidad de milisegundos antes de recalcular.

```javascript
new Hequalizer('card-title', {
  debounce: 150
});
```

### Cambios de contenido

Cada elemento observado recibe un `MutationObserver`. El observer escucha:

- `childList`
- `subtree`
- `characterData`

Cuando detecta cambios, espera `20ms`, recalcula y emite `hequalizer:{handle}:change`.

```javascript
const instance = new Hequalizer('card-description');

// Si cambia el texto o el contenido interno, Hequalizer recalcula automáticamente.
```

### Elementos agregados o eliminados

El `MutationObserver` observa cambios dentro de los elementos actuales, pero no vuelve a buscar automáticamente nuevos elementos con el mismo `data-hequalizer`. Si agregas o eliminas elementos del grupo, llama a `refreshElements()`.

```javascript
const instance = new Hequalizer('card-title');

// Después de renderizar nuevas tarjetas:
instance.refreshElements();
```

## Ejemplos

### Grid responsive

```html
<div class="grid">
  <article class="card">
    <h3 data-hequalizer="grid-title">Título 1</h3>
  </article>
  <article class="card">
    <h3 data-hequalizer="grid-title">Título 2 más largo</h3>
  </article>
  <article class="card">
    <h3 data-hequalizer="grid-title">Título 3</h3>
  </article>
</div>
```

```javascript
new Hequalizer('grid-title', {
  columns: 3,
  responsive: {
    1024: { columns: 2 },
    640: { columns: 1 }
  }
});
```

```css
[data-hequalizer="grid-title"] {
  min-height: var(--height);
}
```

### Múltiples grupos

Cada grupo necesita un `handle` distinto.

```html
<article class="product-card">
  <h3 data-hequalizer="product-title">Nombre del producto</h3>
  <p data-hequalizer="product-description">Descripción del producto...</p>
</article>

<article class="product-card">
  <h3 data-hequalizer="product-title">Nombre más largo del producto</h3>
  <p data-hequalizer="product-description">Descripción más larga del producto...</p>
</article>
```

```javascript
const titles = new Hequalizer('product-title', {
  cssVariable: '--product-title-height'
});

const descriptions = new Hequalizer('product-description', {
  cssVariable: '--product-description-height'
});
```

```css
[data-hequalizer="product-title"] {
  min-height: var(--product-title-height);
}

[data-hequalizer="product-description"] {
  min-height: var(--product-description-height);
}
```

### Carousel o slider

```javascript
const titleHequalizer = new Hequalizer('slide-title', {
  columns: 'all',
  debounce: 100
});

window.addEventListener('hequalizer:slide-title:init', (event) => {
  console.log('Slides igualados:', event.detail.instance.values);
});

// Después de que el carousel agregue o quite slides dinámicamente:
titleHequalizer.refreshElements();
```

### Desactivar en mobile

```javascript
new Hequalizer('card-title', {
  columns: 3,
  responsive: {
    767: {
      columns: 1
    }
  }
});
```

Con `columns: 1`, Hequalizer limpia la variable y no aplica altura, dejando que el layout mobile use la altura natural del contenido.

## Buenas prácticas

1. Usa handles descriptivos y en formato slug, por ejemplo `product-title`, `blog-card-description` o `feature-icon-label`.
2. Inicializa Hequalizer cuando los elementos ya existan en el DOM.
3. Usa una variable CSS distinta si tienes grupos con usos visuales diferentes.
4. Usa `refreshElements()` después de renderizar elementos nuevos o eliminar elementos existentes.
5. Usa `destroy()` al desmontar vistas, componentes o sliders que ya no existan.
6. En layouts de una columna, usa `columns: 1` para limpiar la igualación.
7. Si el resize dispara muchos recálculos, configura `debounce`.

## Solución de problemas

| Problema | Causa probable | Solución |
| --- | --- | --- |
| No se igualan las alturas | El `handle` no coincide con `data-hequalizer`. | Verifica que `new Hequalizer('card-title')` coincida con `data-hequalizer="card-title"`. |
| La variable CSS existe, pero no se ve el efecto | El CSS no usa la variable. | Aplica `height`, `min-height` u otra propiedad con `var(--height)` o tu variable personalizada. |
| El constructor lanza error por handle inválido | El handle tiene mayúsculas, espacios, guiones bajos o caracteres especiales. | Usa un slug con minúsculas, números y guiones. |
| El constructor dice que el handle ya está en uso | Ya existe una instancia activa con ese handle. | Usa `Hequalizer.getInstance(handle)` o destruye esa instancia con `destroy()`. |
| En mobile no aplica altura | El breakpoint activo tiene `columns: 1` o menor. | Cambia `columns` a un número mayor que `1` si quieres mantener la igualación. |
| Los elementos nuevos no se incluyen | La instancia no ha vuelto a consultar el DOM. | Llama a `instance.refreshElements()` después de agregarlos. |
| No recalcula en resize | `observeResize` está en `false` en la configuración activa. | Revisa `actualOptions` o elimina esa opción del breakpoint. |
| Recalcula demasiadas veces en resize | `debounce` está en `0`. | Configura un valor como `100` o `150`. |
| Las alturas son `0` | Los elementos están ocultos o sin contenido al calcular. | Asegúrate de que los elementos sean visibles antes de inicializar o llama a `update()` cuando aparezcan. |

## Compatibilidad

Hequalizer requiere navegadores modernos con soporte para:

- CSS Custom Properties.
- `MutationObserver`.
- `CustomEvent`.
- `document.fonts.ready`.
- Clases JavaScript, propiedades estáticas y campos de clase.

Es framework agnostic y puede usarse con Vanilla JavaScript, React, Vue, Angular, Svelte o cualquier framework que renderice elementos en el DOM.

### Ejemplo en React

```jsx
import { useEffect, useRef } from 'react';

function ProductGrid() {
  const hequalizerRef = useRef(null);

  useEffect(() => {
    hequalizerRef.current = new window.Hequalizer('product-title', {
      columns: 3,
      responsive: {
        768: { columns: 1 }
      }
    });

    return () => {
      hequalizerRef.current?.destroy();
    };
  }, []);

  return (
    <div className="grid">
      <h3 data-hequalizer="product-title">Producto 1</h3>
      <h3 data-hequalizer="product-title">Producto con nombre largo</h3>
      <h3 data-hequalizer="product-title">Producto 3</h3>
    </div>
  );
}
```

## Contribuir

Las contribuciones son bienvenidas:

1. Haz fork del proyecto desde [GitHub](https://github.com/soyleninjs/hequalizer).
2. Crea una rama para tu cambio.
3. Haz commit de tus cambios.
4. Abre un Pull Request.

Para reportar bugs, abre un issue en [GitHub Issues](https://github.com/soyleninjs/hequalizer/issues) e incluye pasos para reproducir el problema y el navegador utilizado.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**@soyleninjs**

- NPM: [https://www.npmjs.com/~soyleninjs](https://www.npmjs.com/~soyleninjs)
- GitHub: [https://github.com/soyleninjs](https://github.com/soyleninjs)

---

Hecho con amor por @soyleninjs.
