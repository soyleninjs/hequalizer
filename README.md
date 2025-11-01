# Hequalizer

Hequalizer es una librería JavaScript ligera que iguala automáticamente las alturas de elementos DOM mediante variables CSS. Con un enfoque simple y declarativo, facilita la creación de layouts perfectamente alineados sin la complejidad de soluciones CSS complejas o frameworks pesados.

**Características principales:**
- **Igualación automática**: Calcula y aplica la altura máxima mediante variables CSS personalizables
- **Responsive por diseño**: Sistema de breakpoints con configuración específica por viewport
- **Actualización automática**: MutationObserver y eventos de resize mantienen las alturas sincronizadas
- **Modos de columnas flexibles**: Iguala todos los elementos o agrúpalos por columnas
- **Lifecycle hooks completo**: Eventos en cada etapa del ciclo de vida
- **Clases de estado**: Clases CSS automáticas para animaciones y estilos condicionales
- **Zero dependencies**: JavaScript vanilla puro, sin dependencias externas
- **Framework agnostic**: Compatible con React, Vue, Angular, Svelte y cualquier framework
- **API global**: Gestiona múltiples instancias desde un único punto de acceso
- **Omisión selectiva**: Excluye elementos específicos del cálculo mediante clases

## Menú
- [Hequalizer](#hequalizer)
  - [Menú](#menú)
  - [Instalación](#instalación)
    - [NPM](#npm)
    - [CDN](#cdn)
    - [Descarga directa](#descarga-directa)
  - [Uso básico](#uso-básico)
    - [HTML](#html)
    - [JavaScript](#javascript)
    - [CSS](#css)
  - [Ejemplos](#ejemplos)
    - [Ejemplo 1: Grid responsive](#ejemplo-1-grid-responsive)
    - [Ejemplo 2: Carousel con Swiper.js](#ejemplo-2-carousel-con-swiperjs)
    - [Ejemplo 3: Lifecycle hooks](#ejemplo-3-lifecycle-hooks)
    - [Ejemplo 4: Omitir elementos específicos](#ejemplo-4-omitir-elementos-específicos)
    - [Ejemplo 5: Múltiples instancias](#ejemplo-5-múltiples-instancias)
    - [Ejemplo 6: Variables CSS personalizadas](#ejemplo-6-variables-css-personalizadas)
  - [Opciones de configuración](#opciones-de-configuración)
    - [Opciones disponibles](#opciones-disponibles)
    - [Configuración responsive](#configuración-responsive)
  - [API](#api)
    - [Constructor](#constructor)
    - [Métodos de instancia](#métodos-de-instancia)
    - [Propiedades de instancia](#propiedades-de-instancia)
    - [API Global](#api-global)
  - [Clases de estado](#clases-de-estado)
  - [Eventos (Lifecycle Hooks)](#eventos-lifecycle-hooks)
  - [Modos de columnas](#modos-de-columnas)
    - [Modo "all" (por defecto)](#modo-all-por-defecto)
    - [Modo columnas numéricas](#modo-columnas-numéricas)
  - [Sistema responsive](#sistema-responsive)
    - [Funcionamiento](#funcionamiento)
    - [Ejemplo avanzado](#ejemplo-avanzado)
  - [Gestión de instancias](#gestión-de-instancias)
  - [Compatibilidad](#compatibilidad)
    - [Navegadores](#navegadores)
    - [Características requeridas](#características-requeridas)
    - [Frameworks](#frameworks)
  - [Buenas prácticas](#buenas-prácticas)
  - [Funcionamiento Interno](#funcionamiento-interno)
    - [Proceso de Inicialización](#proceso-de-inicialización)
    - [Manejo de Fuentes Web](#manejo-de-fuentes-web)
  - [Solución de problemas](#solución-de-problemas)
  - [Contribuir](#contribuir)
  - [Licencia](#licencia)
  - [Autor](#autor)

## Instalación

Puedes integrar Hequalizer en tu proyecto de las siguientes formas:

### NPM

```bash
npm install hequalizer
```

Importa en tu proyecto:

```javascript
// ES modules
import Hequalizer from 'hequalizer';

// CommonJS
const Hequalizer = require('hequalizer');
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/hequalizer@1.0.0/hequalizer.min.js"></script>
```

### Descarga directa

1. Descarga `hequalizer.min.js` desde [GitHub Releases](https://github.com/soyleninjs/hequalizer/releases)
2. Inclúyelo en tu HTML:

```html
<script src="ruta/a/tu/proyecto/hequalizer.min.js"></script>
```

## Uso básico

### HTML

```html
<div class="card-container">
  <div class="card">
    <h3>Título 1</h3>
    <p>Contenido variable...</p>
  </div>
  <div class="card">
    <h3>Título 2</h3>
    <p>Contenido con diferente altura...</p>
  </div>
  <div class="card">
    <h3>Título 3</h3>
    <p>Más contenido...</p>
  </div>
</div>
```

### JavaScript

```javascript
// Seleccionar los títulos de las tarjetas
const cardTitles = document.querySelectorAll('.card h3');

// Inicializar Hequalizer
new Hequalizer(cardTitles);
```

### CSS

```css
/* La variable CSS --height se aplica automáticamente */
.card h3 {
  height: var(--height);
}
```

¡Eso es todo! Ahora todos los títulos tendrán la misma altura, igualándose automáticamente al elemento más alto.

**Hequalizer se encargará de recalcular las alturas cuando:**
- El DOM esté completamente cargado (DOMContentLoaded)
- Las fuentes web terminen de cargar (document.fonts.ready)
- El contenido cambie (mediante MutationObserver)
- La ventana cambie de tamaño (resize event)

## Ejemplos

### Ejemplo 1: Grid responsive

```javascript
const gridItems = document.querySelectorAll('.grid-item');

new Hequalizer(gridItems, {
  columns: 3,
  responsive: {
    1024: { columns: 2 },
    768: { columns: 1 }
  }
});
```

En este ejemplo:
- Desktop (>1024px): Agrupa cada 3 elementos
- Tablet (≤1024px): Agrupa cada 2 elementos
- Mobile (≤768px): Sin agrupación, todos tienen la misma altura

### Ejemplo 2: Carousel con Swiper.js

```javascript
const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 20
});

const slideTitles = document.querySelectorAll('.swiper-slide h3');
const slideDescriptions = document.querySelectorAll('.swiper-slide p');

// Igualar títulos y descripciones independientemente
new Hequalizer(slideTitles);
new Hequalizer(slideDescriptions);
```

### Ejemplo 3: Lifecycle hooks

```javascript
const cards = document.querySelectorAll('.card');

new Hequalizer(cards, {
  on: {
    init: ({rows, instance}) => {
      console.log(`Altura inicial: ${rows}px`);
      console.log('ID de instancia:', instance.id);
    },
    afterResize: ({rows, instance}) => {
      console.log(`Nueva altura después de resize: ${rows}px`);
      // Añadir animación al cambiar tamaño
      cards.forEach(card => {
        card.style.transition = 'height 0.3s ease';
      });
    },
    afterChanges: ({rows, instance}) => {
      console.log('Contenido cambió, nueva altura:', rows);
    },
    afterUpdate: ({rows, instance}) => {
      console.log('Actualización manual completada:', rows);
    },
    afterDestroy: ({rows, instance}) => {
      console.log('Instancia destruida:', instance.id);
    }
  }
});
```

### Ejemplo 4: Omitir elementos específicos

```html
<div class="container">
  <div class="item">Elemento normal</div>
  <div class="item skip-height">Este elemento se omite del cálculo</div>
  <div class="item">Elemento normal</div>
  <div class="item skip-height">Este también se omite</div>
</div>
```

```javascript
const items = document.querySelectorAll('.item');

new Hequalizer(items, {
  classElementToOmit: 'skip-height'
});
```

Los elementos con la clase `skip-height` no se considerarán para calcular la altura máxima, pero sí recibirán la variable CSS con el valor calculado.

### Ejemplo 5: Múltiples instancias

```javascript
// Crear instancias independientes
const instance1 = new Hequalizer(document.querySelectorAll('.group-1'));
const instance2 = new Hequalizer(document.querySelectorAll('.group-2'));

// Ver todas las instancias activas
console.log(window.HequalizerAPI.Instances);

// Actualizar instancia específica manualmente
instance1.update();

// Destruir instancia específica
instance2.destroy(true); // true = remover del registro global

// Remover por ID desde el API global
window.HequalizerAPI.removeInstance(instance1.id);
```

### Ejemplo 6: Variables CSS personalizadas

```javascript
const elements = document.querySelectorAll('.element');

new Hequalizer(elements, {
  cssVariable: '--card-height'
});
```

```css
.element {
  min-height: var(--card-height);
  transition: min-height 0.3s ease;
}
```

## Opciones de configuración

```javascript
new Hequalizer(elements, options)
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `elements` | NodeList \| Array | Elementos DOM a igualar (obligatorio) |
| `options` | Object | Configuración opcional (ver tabla abajo) |

### Opciones disponibles

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `cssVariable` | String | `'--height'` | Nombre de la variable CSS que se aplicará a los elementos |
| `columns` | String \| Number | `'all'` | Modo de columnas: `"all"` iguala todos los elementos, o un número para agrupar por columnas |
| `initialIndex` | Number | `0` | Índice desde donde iniciar. Omite elementos anteriores a este índice |
| `resizeObserver` | Boolean | `true` | Activa/desactiva el MutationObserver y recálculo automático |
| `classElementToOmit` | String | `''` | Clase CSS para omitir elementos del cálculo de altura máxima |
| `on` | Object | `{}` | Objeto con lifecycle hooks (ver sección de Eventos) |
| `responsive` | Object | `{}` | Configuración responsive con breakpoints (ver siguiente sección) |

### Configuración responsive

La opción `responsive` te permite definir configuraciones específicas para diferentes anchos de viewport:

```javascript
new Hequalizer(elements, {
  // Configuración base (desktop)
  columns: 3,
  cssVariable: '--desktop-height',

  // Configuraciones responsive
  responsive: {
    1024: {
      columns: 2,
      cssVariable: '--tablet-height'
    },
    768: {
      columns: 1,
      cssVariable: '--mobile-height',
      resizeObserver: false // Desactivar observador en móvil
    }
  }
});
```

**Importante:**
- Los breakpoints se evalúan con `<=` (menor o igual)
- Los breakpoints se ordenan automáticamente de menor a mayor
- Las opciones del breakpoint activo se fusionan con las opciones base
- Si no coincide ningún breakpoint, se usa la configuración base

## API

### Constructor

```javascript
new Hequalizer(elements, options)
```

**Retorna:** Instancia de Hequalizer con ID único

### Métodos de instancia

| Método | Descripción |
|--------|-------------|
| `update()` | Recalcula y actualiza las alturas manualmente |
| `init()` | Reinicializa la instancia (se llama automáticamente al crear la instancia) |
| `destroy(removeFromAPI = false)` | Destruye la instancia: limpia variables CSS, detiene observers y eventos. Si `removeFromAPI` es `true`, también elimina la instancia del registro global |

**Ejemplo de uso:**

```javascript
const instance = new Hequalizer(elements);

// Actualizar manualmente después de cambios dinámicos
instance.update();

// Destruir sin remover del registro
instance.destroy();

// Destruir y remover del registro global
instance.destroy(true);
```

### Propiedades de instancia

```javascript
const instance = new Hequalizer(elements, options);

// Propiedades disponibles
instance.id               // String: ID único generado automáticamente
instance.elementsArray    // Array: Elementos originales pasados al constructor
instance.values           // Number | Array: Altura(s) calculada(s)
instance.actualOptions    // Object: Opciones actualmente aplicadas
instance.actualBreakpoint // String | Number: Breakpoint actual activo ("default" o el número del breakpoint)
instance.responsive       // Object: Configuración responsive original
```

### API Global

Hequalizer mantiene un registro global de todas las instancias creadas:

```javascript
// Acceder al API global
window.HequalizerAPI

// Propiedades y métodos disponibles
window.HequalizerAPI.Init              // Constructor de Hequalizer
window.HequalizerAPI.Instances         // Array con todas las instancias activas
window.HequalizerAPI.removeInstance(id) // Remover instancia por ID
```

**Ejemplo de uso:**

```javascript
// Crear instancias
const inst1 = new Hequalizer(elements1);
const inst2 = new Hequalizer(elements2);

// Ver todas las instancias
console.log(window.HequalizerAPI.Instances); // [inst1, inst2]

// Crear usando el API global
const inst3 = window.HequalizerAPI.Init(elements3, options);

// Remover instancia específica
window.HequalizerAPI.removeInstance(inst1.id);

// Ver instancias restantes
console.log(window.HequalizerAPI.Instances); // [inst2, inst3]
```

## Clases de estado

Hequalizer aplica automáticamente clases CSS durante el ciclo de vida de cálculo de alturas:

| Clase | Descripción |
|-------|-------------|
| `.height-calculating` | Se aplica durante el cálculo de alturas |
| `.height-calculated` | Se aplica cuando el cálculo ha finalizado exitosamente |
| `.height-zero` | Se aplica cuando la altura calculada es 0 |

**Ejemplo de uso con CSS:**

```css
/* Animación durante el cálculo */
.element.height-calculating {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.element.height-calculated {
  opacity: 1;
}

/* Ocultar elementos con altura cero */
.element.height-zero {
  display: none;
}

/* Animación de entrada */
.element.height-calculated {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Eventos (Lifecycle Hooks)

Hequalizer proporciona hooks en diferentes etapas del ciclo de vida:

| Hook | Cuándo se ejecuta | Parámetros |
|------|-------------------|------------|
| `init` | Después de la inicialización | `{rows, instance}` |
| `afterResize` | Después de un evento resize | `{rows, instance}` |
| `afterChanges` | Después de cambios en el DOM detectados por MutationObserver | `{rows, instance}` |
| `afterUpdate` | Después de llamar manualmente a `update()` | `{rows, instance}` |
| `afterDestroy` | Después de destruir la instancia | `{rows, instance}` |

**Parámetros:**
- `rows`: Altura calculada (Number si `columns: "all"`, Array si `columns` es un número)
- `instance`: Referencia a la instancia de Hequalizer

**Ejemplo completo:**

```javascript
const instance = new Hequalizer(elements, {
  on: {
    init: ({rows, instance}) => {
      console.log('✓ Inicializado');
      console.log('Altura:', rows);
      console.log('ID:', instance.id);
      console.log('Breakpoint actual:', instance.actualBreakpoint);
    },

    afterResize: ({rows, instance}) => {
      console.log('↔ Resize detectado');
      console.log('Nueva altura:', rows);

      // Ejemplo: Ejecutar código específico según breakpoint
      if (instance.actualBreakpoint === 768) {
        console.log('Ahora estamos en móvil');
      }
    },

    afterChanges: ({rows, instance}) => {
      console.log('⚡ Contenido cambió');
      console.log('Altura actualizada:', rows);
    },

    afterUpdate: ({rows, instance}) => {
      console.log('🔄 Actualización manual');
      console.log('Altura:', rows);
    },

    afterDestroy: ({rows, instance}) => {
      console.log('✕ Instancia destruida');
      console.log('ID destruido:', instance.id);
    }
  }
});
```

## Modos de columnas

Hequalizer ofrece dos modos de cálculo de altura:

### Modo "all" (por defecto)

Todos los elementos se igualan a la altura del elemento más alto:

```javascript
new Hequalizer(elements, {
  columns: "all"
});
```

**Resultado:** Todos los elementos tendrán la misma altura (la del más alto)

**Valor retornado en hooks:** `Number`

```javascript
// Ejemplo: Si el elemento más alto mide 150px
instance.values // 150
```

### Modo columnas numéricas

Agrupa elementos por columnas y cada grupo tiene su propia altura máxima:

```javascript
new Hequalizer(elements, {
  columns: 3 // Agrupa cada 3 elementos
});
```

**Resultado:** Los elementos se dividen en grupos de 3, cada grupo tiene su propia altura máxima

**Valor retornado en hooks:** `Array` con las alturas de cada grupo

```javascript
// Ejemplo: 9 elementos agrupados de 3 en 3
instance.values // [150, 180, 140]
// Grupo 1: 150px, Grupo 2: 180px, Grupo 3: 140px
```

**Ejemplo visual:**

```html
<!-- 6 elementos con columns: 2 -->
<div>Elemento 1</div>  ┐
<div>Elemento 2</div>  ┘ Grupo 1: Altura máxima = 120px

<div>Elemento 3</div>  ┐
<div>Elemento 4</div>  ┘ Grupo 2: Altura máxima = 150px

<div>Elemento 5</div>  ┐
<div>Elemento 6</div>  ┘ Grupo 3: Altura máxima = 100px
```

## Sistema responsive

Hequalizer incluye un sistema responsive completo basado en breakpoints.

### Funcionamiento

1. Define breakpoints con `window.innerWidth <= breakpoint`
2. Los breakpoints se evalúan de menor a mayor
3. Las opciones del breakpoint activo se fusionan con las opciones base
4. Al cambiar el breakpoint, se recalculan las alturas automáticamente

### Ejemplo avanzado

```javascript
const elements = document.querySelectorAll('.card');

new Hequalizer(elements, {
  // Configuración base (desktop > 1024px)
  cssVariable: '--desktop-height',
  columns: 4,
  resizeObserver: true,

  responsive: {
    // Tablets (≤ 1024px)
    1024: {
      cssVariable: '--tablet-height',
      columns: 2
    },

    // Móviles horizontal (≤ 768px)
    768: {
      cssVariable: '--mobile-landscape-height',
      columns: 2
    },

    // Móviles vertical (≤ 480px)
    480: {
      cssVariable: '--mobile-height',
      columns: 1,
      resizeObserver: false // Desactivar observador para mejor performance
    }
  },

  on: {
    afterResize: ({rows, instance}) => {
      console.log('Breakpoint actual:', instance.actualBreakpoint);
      console.log('Opciones aplicadas:', instance.actualOptions);
      console.log('Alturas calculadas:', rows);
    }
  }
});
```

**CSS correspondiente:**

```css
.card {
  /* Desktop */
  height: var(--desktop-height);
}

@media (max-width: 1024px) {
  .card {
    /* Tablet */
    height: var(--tablet-height);
  }
}

@media (max-width: 768px) {
  .card {
    /* Mobile landscape */
    height: var(--mobile-landscape-height);
  }
}

@media (max-width: 480px) {
  .card {
    /* Mobile portrait */
    height: var(--mobile-height);
  }
}
```

## Gestión de instancias

Hequalizer proporciona múltiples formas de gestionar instancias:

```javascript
// 1. Crear instancia y guardar referencia
const myInstance = new Hequalizer(elements, options);

// 2. Acceder a instancia por ID
const instanceId = myInstance.id;
const foundInstance = window.HequalizerAPI.Instances.find(
  inst => inst.id === instanceId
);

// 3. Ver todas las instancias activas
console.log(window.HequalizerAPI.Instances);

// 4. Actualizar instancia específica
myInstance.update();

// 5. Destruir instancia (mantiene en registro)
myInstance.destroy();

// 6. Destruir y remover del registro
myInstance.destroy(true);

// 7. Remover instancia por ID
window.HequalizerAPI.removeInstance(instanceId);

// 8. Acceder a propiedades de la instancia
console.log('Altura actual:', myInstance.values);
console.log('Breakpoint:', myInstance.actualBreakpoint);
console.log('Opciones:', myInstance.actualOptions);
```

## Compatibilidad

### Navegadores

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari 12+
- ✅ Opera (últimas 2 versiones)

### Características requeridas

- CSS Custom Properties (Variables CSS)
- MutationObserver API
- ES6+ (arrow functions, template literals, destructuring)
- Document.fonts.ready API

### Frameworks

Compatible con:
- ✅ Vanilla JavaScript
- ✅ React
- ✅ Vue.js
- ✅ Angular
- ✅ Svelte
- ✅ Next.js
- ✅ Nuxt.js
- ✅ Cualquier framework moderno

**Ejemplo con React:**

```jsx
import { useEffect, useRef } from 'react';
import Hequalizer from 'hequalizer';

function CardGrid() {
  const instanceRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    instanceRef.current = new Hequalizer(cards, {
      columns: 3,
      responsive: {
        768: { columns: 1 }
      }
    });

    return () => {
      // Limpiar al desmontar
      if (instanceRef.current) {
        instanceRef.current.destroy(true);
      }
    };
  }, []);

  return (
    <div className="grid">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

## Buenas prácticas

1. **Destruye instancias cuando ya no las necesites:**
   ```javascript
   instance.destroy(true); // Limpia memoria
   ```

2. **Usa nombres descriptivos para variables CSS:**
   ```javascript
   new Hequalizer(elements, {
     cssVariable: '--card-title-height' // En lugar de solo '--height'
   });
   ```

3. **Desactiva el observador en móvil para mejor performance:**
   ```javascript
   responsive: {
     480: {
       resizeObserver: false
     }
   }
   ```

4. **Usa `initialIndex` para omitir elementos iniciales:**
   ```javascript
   new Hequalizer(elements, {
     initialIndex: 1 // Omite el primer elemento
   });
   ```

5. **Aprovecha los lifecycle hooks para debugging:**
   ```javascript
   on: {
     init: (data) => console.log('Inicializado:', data),
     afterResize: (data) => console.log('Resize:', data)
   }
   ```

## Funcionamiento Interno

### Proceso de Inicialización

Hequalizer sigue un proceso optimizado para asegurar cálculos precisos:

1. **Verificación del DOM**: Detecta si el DOM ya está cargado o espera al evento `DOMContentLoaded`
2. **Espera de fuentes**: Utiliza `document.fonts.ready` para asegurar que todas las fuentes web estén cargadas antes de medir
3. **Configuración**: Fusiona las opciones base con las opciones responsive según el viewport actual
4. **Cálculo inicial**: Mide las alturas naturales de todos los elementos
5. **Aplicación**: Establece la variable CSS con la altura máxima calculada
6. **Observación activa**: Inicia los observers para detectar cambios automáticamente

Este proceso asegura que las mediciones sean precisas desde el primer momento, evitando recalculos innecesarios.

### Manejo de Fuentes Web

Uno de los problemas comunes al calcular alturas es que las fuentes web pueden cambiar las dimensiones del texto después de cargarse. Hequalizer resuelve esto esperando a que todas las fuentes estén listas:

```javascript
// Esto ocurre automáticamente al crear una instancia
document.fonts.ready.then(() => {
  // Ahora las mediciones serán precisas
  this.init();
});
```

Si las fuentes no pueden cargarse por algún motivo, Hequalizer inicializará de todas formas para evitar bloquear la funcionalidad.

## Solución de problemas

| Problema | Posible causa | Solución |
|----------|---------------|----------|
| Las alturas no se actualizan | MutationObserver desactivado | Verifica que `resizeObserver: true` (es el valor por defecto) |
| Las fuentes cambian la altura después | El cálculo se hace antes de cargar las fuentes | Hequalizer espera automáticamente a `document.fonts.ready`. Verifica que las fuentes se estén cargando correctamente |
| Los elementos no tienen la misma altura | Variable CSS no aplicada en CSS | Verifica que tu CSS use `height: var(--height)` o la variable personalizada |
| Performance lenta con muchos elementos | Demasiadas observaciones | Usa `resizeObserver: false` en breakpoints móviles |
| Algunos elementos deben omitirse | No se está usando `classElementToOmit` | Añade la opción `classElementToOmit: 'tu-clase'` |
| Las alturas no cambian en responsive | Breakpoints mal configurados | Verifica que los breakpoints usen `<=` en tus media queries CSS |
| Error "Cannot read property of null" | Elementos no existen en el DOM | Asegúrate de inicializar Hequalizer después de que el DOM esté listo |
| Múltiples instancias causan conflictos | Usando la misma variable CSS | Usa diferentes `cssVariable` para cada instancia |
| Las alturas son 0 | Elementos ocultos o sin contenido | Verifica que los elementos sean visibles y tengan contenido |
| No se disparan los lifecycle hooks | Sintaxis incorrecta en opciones | Verifica que uses `on: { init: () => {}, ... }` |

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto desde [GitHub](https://github.com/soyleninjs/hequalizer)
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica increíble'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

**Reportar bugs:**
- Abre un issue en [GitHub Issues](https://github.com/soyleninjs/hequalizer/issues)
- Incluye pasos para reproducir el problema
- Especifica navegador y versión

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Lenin Mazariegos (@soyleninjs)**

- 🌐 Website: [https://hequalizer.soylenin.com](https://hequalizer.soylenin.com)
- 📦 NPM: [https://www.npmjs.com/~soyleninjs](https://www.npmjs.com/~soyleninjs)
- 🐙 GitHub: [https://github.com/soyleninjs](https://github.com/soyleninjs)
- 📧 Email: soyleninjs@gmail.com

---

**Si este proyecto te es útil, considera:**
- ⭐ Dar una estrella en [GitHub](https://github.com/soyleninjs/hequalizer)
- 📦 Compartirlo con otros desarrolladores
- 🐛 Reportar bugs o sugerir mejoras
- 💡 Contribuir con código o documentación

---

Hecho con ❤️ por @soyleninjs
