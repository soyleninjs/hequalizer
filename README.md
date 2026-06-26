# Hequalizer

Hequalizer es una libreria JavaScript ligera para igualar alturas de elementos DOM mediante variables CSS. Trabaja por `handle`: marcas los elementos con `data-hequalizer`, creas una instancia con ese mismo identificador y Hequalizer calcula la altura maxima para aplicarla como una variable CSS.

## Caracteristicas

- Igualacion de alturas con variables CSS personalizables.
- API por `handle`, ideal para manejar grupos independientes de elementos.
- Soporte responsive con opciones distintas por breakpoint.
- Modos de calculo para todos los elementos o por grupos de columnas.
- Recalculo automatico en `resize` y cuando cambia el contenido observado.
- Eventos globales con `CustomEvent` para cada etapa importante.
- Registro interno de instancias con `Hequalizer.getInstance(handle)`.
- JavaScript vanilla, sin dependencias.

## Menu

- [Hequalizer](#hequalizer)
  - [Caracteristicas](#caracteristicas)
  - [Menu](#menu)
  - [Instalacion](#instalacion)
    - [NPM](#npm)
    - [CDN](#cdn)
    - [Descarga directa](#descarga-directa)
  - [Uso basico](#uso-basico)
    - [HTML](#html)
    - [JavaScript](#javascript)
    - [CSS](#css)
  - [API](#api)
    - [Constructor](#constructor)
    - [Seleccion de elementos](#seleccion-de-elementos)
    - [Metodos de instancia](#metodos-de-instancia)
    - [Registro de instancias](#registro-de-instancias)
    - [Propiedades utiles](#propiedades-utiles)
  - [Opciones](#opciones)
  - [Sistema responsive](#sistema-responsive)
    - [Variables CSS responsive](#variables-css-responsive)
  - [Eventos](#eventos)
  - [Clases de estado](#clases-de-estado)
  - [Modos de columnas](#modos-de-columnas)
    - [`columns: "all"`](#columns-all)
    - [`columns: 2`, `3`, `4`, etc.](#columns-2-3-4-etc)
    - [`columns <= 1`](#columns--1)
  - [Actualizacion automatica](#actualizacion-automatica)
    - [Carga inicial y fuentes](#carga-inicial-y-fuentes)
    - [Resize](#resize)
    - [Cambios de contenido](#cambios-de-contenido)
    - [Elementos agregados o eliminados](#elementos-agregados-o-eliminados)
  - [Ejemplos](#ejemplos)
    - [Grid responsive](#grid-responsive)
    - [Multiples grupos](#multiples-grupos)
    - [Carousel o slider](#carousel-o-slider)
    - [Desactivar en mobile](#desactivar-en-mobile)
  - [Buenas practicas](#buenas-practicas)
  - [Solucion de problemas](#solucion-de-problemas)
  - [Compatibilidad](#compatibilidad)
    - [Ejemplo en React](#ejemplo-en-react)
  - [Contribuir](#contribuir)
  - [Licencia](#licencia)
  - [Autor](#autor)

## Instalacion

### NPM

```bash
npm install hequalizer
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/hequalizer/hequalizer.min.js"></script>
```

### Descarga directa

Descarga `hequalizer.js` o `hequalizer.min.js` desde el repositorio o desde GitHub Releases e incluyelo en tu HTML:

```html
<script src="./js/hequalizer.js"></script>
```

El script expone la clase en `window.Hequalizer`.

## Uso basico

### HTML

Usa el atributo `data-hequalizer` para indicar que elementos pertenecen al mismo grupo. El valor del atributo debe coincidir con el `handle` que usaras al crear la instancia.

```html
<div class="cards">
  <article class="card">
    <h3 data-hequalizer="card-title">Titulo corto</h3>
    <p>Contenido de la tarjeta.</p>
  </article>

  <article class="card">
    <h3 data-hequalizer="card-title">Titulo mucho mas largo que ocupa mas lineas</h3>
    <p>Contenido de la tarjeta.</p>
  </article>

  <article class="card">
    <h3 data-hequalizer="card-title">Otro titulo</h3>
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

Hequalizer solo calcula y asigna la variable CSS. Tu CSS decide como usarla.

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

| Parametro | Tipo | Requerido | Descripcion |
| --- | --- | --- | --- |
| `handle` | `String` | Si | Identificador del grupo. Debe coincidir con `data-hequalizer="handle"`. |
| `options` | `Object` | No | Configuracion de la instancia. |

El `handle` es obligatorio y debe usar solo letras minusculas, numeros y guiones en formato tipo slug:

```javascript
new Hequalizer('product-card-title'); // valido
new Hequalizer('Product Title');      // invalido
new Hequalizer('product_title');      // invalido
```

Si el `handle` ya esta registrado en otra instancia activa, el constructor lanza un error. Para volver a usar el mismo `handle`, primero destruye esa instancia con `destroy()`.

### Seleccion de elementos

La instancia selecciona automaticamente todos los elementos que tengan el atributo `data-hequalizer` con el `handle` indicado:

```javascript
this.$elements = document.querySelectorAll(`[data-hequalizer="${handle}"]`);
```

El constructor recibe el `handle` del grupo; los elementos se definen directamente en el HTML con `data-hequalizer`.

### Metodos de instancia

| Metodo | Descripcion |
| --- | --- |
| `init()` | Inicializa o reinicializa la instancia: define opciones actuales, calcula alturas, activa listeners y emite `init`. Se ejecuta automaticamente despues de `document.fonts.ready`. |
| `update()` | Recalcula manualmente las alturas de los elementos actuales con las opciones activas y emite `update`. |
| `refreshElements()` | Vuelve a consultar el DOM con el selector `[data-hequalizer="handle"]`, actualiza las opciones activas, recalcula alturas, reinicia los observers y emite `refresh`. Usalo cuando agregues o elimines elementos. |
| `destroy()` | Limpia variables y clases, remueve listeners, desconecta observers, cancela timeouts, emite `destroy` y elimina la instancia del registro interno. |

### Registro de instancias

Hequalizer guarda las instancias activas en un `Map` estatico usando el `handle` como llave.

```javascript
const titles = new Hequalizer('card-title');

const sameInstance = Hequalizer.getInstance('card-title');
console.log(sameInstance === titles); // true

titles.destroy();
console.log(Hequalizer.getInstance('card-title')); // undefined
```

### Propiedades utiles

| Propiedad | Tipo | Descripcion |
| --- | --- | --- |
| `handle` | `String` | Identificador de la instancia. |
| `$elements` | `NodeList` | Elementos encontrados con `data-hequalizer`. |
| `values` | `Number \| Array` | Ultima altura calculada. Es `Number` con `columns: "all"` y `Array` con columnas numericas. |
| `actualOptions` | `Object` | Opciones activas segun el breakpoint actual. |
| `actualBreakpoint` | `String \| Number` | `"default"` cuando no aplica ningun breakpoint, o el numero del breakpoint activo. |
| `responsive` | `Object` | Configuracion responsive recibida. |
| `breakpoints` | `Array` | Breakpoints ordenados de menor a mayor. |
| `cssVariables` | `Array` | Variables CSS usadas por la configuracion base y responsive. |

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

| Opcion | Tipo | Default | Descripcion |
| --- | --- | --- | --- |
| `cssVariable` | `String` | `'--height'` | Nombre de la variable CSS que se asigna a los elementos. |
| `columns` | `String \| Number` | `'all'` | Define como se agrupan los elementos para calcular alturas. Usa `"all"` o un numero mayor a `1`. |
| `observeResize` | `Boolean` | `true` | Permite recalcular en eventos `resize`. Si es `false`, el listener de resize no recalcula ni emite evento mientras esa opcion este activa. |
| `debounce` | `Number` | `0` | Tiempo en milisegundos para retrasar el recalculo por `resize`. Con `0`, recalcula inmediatamente. |
| `responsive` | `Object` | `{}` | Configuracion por breakpoint. Cada breakpoint puede sobrescribir las opciones principales. |

Los eventos se escuchan con `window.addEventListener` usando el formato documentado en la seccion [Eventos](#eventos).

## Sistema responsive

La opcion `responsive` permite cambiar la configuracion segun `window.innerWidth`.

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
3. Si ningun breakpoint coincide, se usa la configuracion `default`.
4. Las opciones del breakpoint se fusionan con las opciones base.
5. La propiedad `actualBreakpoint` queda como el numero activo o `"default"`.

Con esta configuracion:

| Viewport | Breakpoint activo | Opciones principales |
| --- | --- | --- |
| `<= 480px` | `480` | `columns: 1` |
| `481px - 768px` | `768` | `columns: 2`, variable tablet |
| `769px - 1024px` | `1024` | `columns: 3` |
| `> 1024px` | `default` | `columns: 4` |

### Variables CSS responsive

Si cambias `cssVariable` por breakpoint, Hequalizer recuerda todas las variables configuradas y las limpia antes de cada calculo. Esto evita que una variable de otro breakpoint se quede aplicada al elemento cuando cambia el viewport.

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
| `hequalizer:{handle}:init` | Termina la inicializacion. |
| `hequalizer:{handle}:resize` | Termina un recalculo provocado por `resize`. |
| `hequalizer:{handle}:change` | Termina un recalculo provocado por cambios en el contenido observado. |
| `hequalizer:{handle}:update` | Termina una llamada manual a `update()`. |
| `hequalizer:{handle}:refresh` | Termina una llamada a `refreshElements()`. |
| `hequalizer:{handle}:destroy` | Termina la destruccion de la instancia. |

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
  console.log('El contenido cambio:', event.detail.instance.values);
});

window.addEventListener('hequalizer:card-title:refresh', (event) => {
  console.log('Elementos refrescados:', event.detail.instance.$elements.length);
});
```

## Clases de estado

Hequalizer agrega y remueve clases durante el calculo.

| Clase | Descripcion |
| --- | --- |
| `.height-calculating` | Se agrega mientras se estan midiendo los elementos. |
| `.height-calculated` | Se agrega cuando el calculo encontro una altura mayor a `0`. |
| `.height-zero` | Se agrega cuando la altura maxima calculada es `0`. |

Antes de cada calculo se limpian las variables CSS registradas y se remueven las clases de estado.

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

Es el modo por defecto. Calcula la altura maxima entre todos los elementos del grupo y aplica el mismo valor a todos.

```javascript
const instance = new Hequalizer('card-title', {
  columns: 'all'
});

// Si el elemento mas alto mide 140px:
console.log(instance.values); // 140
```

### `columns: 2`, `3`, `4`, etc.

Cuando `columns` es un numero mayor a `1`, Hequalizer divide los elementos en grupos consecutivos de ese tamano. Cada grupo recibe su propia altura maxima.

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

Si `columns` es `1` o menor, Hequalizer limpia las variables/clases y no aplica ninguna altura. Esto es util para desactivar la igualacion en una vista de una sola columna:

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

## Actualizacion automatica

### Carga inicial y fuentes

Al crear una instancia, Hequalizer espera a `document.fonts.ready` antes de llamar a `init()`. Esto ayuda a medir alturas reales cuando usas fuentes web.

```javascript
document.fonts.ready.then(() => {
  this.init();
});
```

Por esta razon, crea la instancia cuando los elementos ya existan en el DOM, por ejemplo despues de `DOMContentLoaded` o al final del `body`.

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

// Si cambia texto o contenido interno, Hequalizer recalcula automaticamente.
```

### Elementos agregados o eliminados

El `MutationObserver` observa cambios dentro de los elementos actuales, pero no vuelve a buscar automaticamente nuevos elementos con el mismo `data-hequalizer`. Si agregas o eliminas elementos del grupo, llama `refreshElements()`.

```javascript
const instance = new Hequalizer('card-title');

// Despues de renderizar nuevas tarjetas:
instance.refreshElements();
```

## Ejemplos

### Grid responsive

```html
<div class="grid">
  <article class="card">
    <h3 data-hequalizer="grid-title">Titulo 1</h3>
  </article>
  <article class="card">
    <h3 data-hequalizer="grid-title">Titulo 2 mas largo</h3>
  </article>
  <article class="card">
    <h3 data-hequalizer="grid-title">Titulo 3</h3>
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

### Multiples grupos

Cada grupo necesita un `handle` distinto.

```html
<article class="product-card">
  <h3 data-hequalizer="product-title">Nombre del producto</h3>
  <p data-hequalizer="product-description">Descripcion del producto...</p>
</article>

<article class="product-card">
  <h3 data-hequalizer="product-title">Nombre mas largo del producto</h3>
  <p data-hequalizer="product-description">Descripcion mas larga del producto...</p>
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

// Despues de que el carousel agregue o quite slides dinamicamente:
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

## Buenas practicas

1. Usa handles descriptivos y en formato slug, por ejemplo `product-title`, `blog-card-description` o `feature-icon-label`.
2. Inicializa Hequalizer cuando los elementos ya existan en el DOM.
3. Usa una variable CSS distinta si tienes grupos con usos visuales diferentes.
4. Usa `refreshElements()` despues de renderizar elementos nuevos o eliminar elementos existentes.
5. Usa `destroy()` al desmontar vistas, componentes o sliders que ya no existan.
6. En layouts de una columna, usa `columns: 1` para limpiar la igualacion.
7. Si el resize dispara muchos recalculos, configura `debounce`.

## Solucion de problemas

| Problema | Causa probable | Solucion |
| --- | --- | --- |
| No se igualan las alturas | El `handle` no coincide con `data-hequalizer`. | Verifica que `new Hequalizer('card-title')` coincida con `data-hequalizer="card-title"`. |
| La variable CSS existe pero no se ve efecto | El CSS no usa la variable. | Aplica `height`, `min-height` u otra propiedad con `var(--height)` o tu variable personalizada. |
| El constructor lanza error por handle invalido | El handle tiene mayusculas, espacios, guiones bajos o caracteres especiales. | Usa un slug con minusculas, numeros y guiones. |
| El constructor dice que el handle ya esta en uso | Ya existe una instancia activa con ese handle. | Usa `Hequalizer.getInstance(handle)` o destruye esa instancia con `destroy()`. |
| En mobile no aplica altura | El breakpoint activo tiene `columns: 1` o menor. | Cambia `columns` a un numero mayor que `1` si quieres mantener la igualacion. |
| Los elementos nuevos no se incluyen | La instancia no ha vuelto a consultar el DOM. | Llama `instance.refreshElements()` despues de agregarlos. |
| No recalcula en resize | `observeResize` esta en `false` en la configuracion activa. | Revisa `actualOptions` o elimina esa opcion del breakpoint. |
| Recalcula demasiadas veces en resize | `debounce` esta en `0`. | Configura un valor como `100` o `150`. |
| Las alturas son `0` | Los elementos estan ocultos o sin contenido al calcular. | Asegurate de que los elementos sean visibles antes de inicializar o llama `update()` cuando aparezcan. |

## Compatibilidad

Hequalizer requiere navegadores modernos con soporte para:

- CSS Custom Properties.
- `MutationObserver`.
- `CustomEvent`.
- `document.fonts.ready`.
- Clases JavaScript, propiedades estaticas y campos de clase.

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

Para reportar bugs, abre un issue en [GitHub Issues](https://github.com/soyleninjs/hequalizer/issues) e incluye pasos para reproducir el problema y navegador utilizado.

## Licencia

Este proyecto esta bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para mas detalles.

## Autor

**@soyleninjs**

- NPM: [https://www.npmjs.com/~soyleninjs](https://www.npmjs.com/~soyleninjs)
- GitHub: [https://github.com/soyleninjs](https://github.com/soyleninjs)

---

Hecho con amor por @soyleninjs.
