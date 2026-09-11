/**
 * Hequalizer v2.2.0
*/

class Hequalizer {
  static instances = new Map();

  static getInstance(handle) {
    return Hequalizer.instances.get(handle);
  }

  constructor(handle, options = {}) {
    // Verificar que se haya proporcionado un handle
    if (!handle) {
      throw new Error("Hequalizer: El parámetro handle es obligatorio");
    }

    // Comprobar si es un handle válido
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(handle)) {
      throw new Error(`Hequalizer: El handle "${handle}" no es válido. Utilice un identificador diferente.`);
    }

    // Comprobar si el handle ya está en uso
    if (Hequalizer.instances.has(handle)) {
      throw new Error(`Hequalizer: El handle "${handle}" ya está en uso. Utilice un identificador diferente.`);
    }

    // Usar el handle proporcionado
    this.handle = handle;
    this.actualOptions = null;
    this.allOptions = {};

    this.classes = {
      zero: 'height-zero',
      calculating: 'height-calculating',
      complete: 'height-calculated',
    };

    this.baseOptions = {
      cssVariable: '--height',
      customSelector: "",
      columns: "all",
      observeResize: true,
      debounce: 0,
      indexesToOmit: [],
      responsive: {}
    };

    this.customSelector = options.customSelector !== undefined && options.customSelector !== "" ? options.customSelector : `[data-hequalizer="${handle}"]`
    this.$elements = document.querySelectorAll(this.customSelector)
    this.values = 0;
    this.responsive = options.responsive || {}
    this.breakpoints = Object.keys(this.responsive)
      .sort((a, b) => a - b)
      .map((number) => Number(number));

    this.allOptions.default = { ...this.baseOptions, ...options };
    delete this.allOptions.default.responsive;
    this.breakpoints.forEach((breakpoint) => {
      this.allOptions[breakpoint] = { ...this.baseOptions, ...options, ...this.responsive[breakpoint] };
      delete this.allOptions[breakpoint].responsive;
    });

    this.cssVariables = [...new Set(Object.values(this.allOptions).map((option) => option.cssVariable))];

    // Registrar esta instancia con su handle
    Hequalizer.instances.set(this.handle, this);

    document.fonts.ready
      .then(() => {
        this.init();
      })
      .catch((error) => {
        window.console.log(error);
      });
  }

  __cssVariable(DOMElements, cssVariable, cssVariableValue = null) {
    if (!DOMElements || DOMElements.length === 0) {
      return;
    }

    DOMElements.forEach((element) => {
      if (cssVariableValue === null) {
        element.style.removeProperty(cssVariable);
        return;
      }

      element.style.setProperty(cssVariable, cssVariableValue);
    });
  }

  __classElements(DOMElements, status, classes) {
    if (!DOMElements || DOMElements.length === 0) {
      return;
    }

    DOMElements.forEach((element) => {
      if (status === 'add') {
        element.classList.add(...classes);
      }
      if (status === 'remove') {
        element.classList.remove(...classes);
      }
    });
  }

  _setActualOptions() {
    const breakpointActual = this.breakpoints.find((breakpoint) => window.innerWidth <= breakpoint);

    if (breakpointActual === undefined) {
      this.actualOptions = this.allOptions.default
      this.actualBreakpoint = "default"
    } else {
      this.actualOptions = this.allOptions[breakpointActual];
      this.actualBreakpoint = breakpointActual
    }
  }

  _setMaxHeightElements(calledFrom) {
    let maxValue = 0;
    const $elements = [...this.$elements];
    this._cleanHeightElements();

    if ((calledFrom === 'resize' && !this.actualOptions.observeResize) || this.actualOptions.columns <= 1) {
      this.values = maxValue;
      return;
    }

    if (this.actualOptions.columns === "all") {
      maxValue = 0;
      this.__classElements($elements, 'add', [this.classes.calculating]);

      $elements.forEach(($element) => {
        if ($element.offsetHeight > maxValue) {
          maxValue = $element.offsetHeight;
        }
      });

      this.__classElements($elements, 'remove', [this.classes.calculating]);
      this.__cssVariable($elements, this.actualOptions.cssVariable, maxValue > 0 ? `${maxValue}px` : '');
      this.__classElements($elements, 'add', [maxValue > 0 ? this.classes.complete : this.classes.zero]);

      this.values = maxValue;
    } else {
      function groupElements(elements, columns, omits = []) {
        const groups = [];

        let elementIndex = 0;
        let gridIndex = 0;

        while (elementIndex < elements.length) {
          const group = [];

          for (let column = 0; column < columns; column++, gridIndex++) {
            if (!omits.includes(gridIndex) && elementIndex < elements.length) {
              group.push(elements[elementIndex++]);
            }
          }

          if (group.length) groups.push(group);
        }

        return groups;
      }

      const groupsElements = groupElements($elements, this.actualOptions.columns, this.actualOptions.indexesToOmit);
      const arrayMaxValues = [];

      groupsElements.forEach(($group) => {
        maxValue = 0;
        this.__classElements($group, 'add', [this.classes.calculating]);

        $group.forEach((element) => {
          if (element.offsetHeight > maxValue) {
            maxValue = element.offsetHeight;
          }
        });

        this.__classElements($group, 'remove', [this.classes.calculating]);
        this.__cssVariable($group, this.actualOptions.cssVariable, maxValue > 0 ? `${maxValue}px` : '');
        this.__classElements($group, 'add', [maxValue > 0 ? this.classes.complete : this.classes.zero]);

        arrayMaxValues.push(maxValue);
      });

      this.values = arrayMaxValues;
    }
  };

  _cleanHeightElements() {
    this.cssVariables.forEach((cssVariable) => this.__cssVariable(this.$elements, cssVariable));
    this.__classElements(this.$elements, 'remove', [this.classes.zero, this.classes.calculating, this.classes.complete]);
  };

  // Resize Listener
  _updateAfterResize = () => {
    this._setActualOptions();
    window.clearTimeout(this._resizeTimeout);

    if (!this.actualOptions.observeResize) return

    if (this.actualOptions.debounce === 0) {
      this._setMaxHeightElements('resize');
      this._emitCustomEvent('resize');
      return;
    }

    this._resizeTimeout = window.setTimeout(() => {
      this._setMaxHeightElements('resize');
      this._emitCustomEvent('resize');
    }, this.actualOptions.debounce);
  };

  _setResizeListener(enable = true) {
    window.removeEventListener('resize', this._updateAfterResize);

    if (enable) {
      window.addEventListener('resize', this._updateAfterResize);
    };
  };

  // Changes Listener
  _updateAfterChanges = () => {
    window.clearTimeout(this._changesTimeout);
    this._changesTimeout = window.setTimeout(() => {
      this._setMaxHeightElements('change');
      this._emitCustomEvent('change');
    }, 20);
  };

  _setChangesListener(enable = true) {
    if (enable) {
      this.$elements.forEach((element) => {
        if (!element.observer) {
          element.observer = new MutationObserver(this._updateAfterChanges);
        }

        element.observer.observe(element, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      });

      return;
    }

    this.$elements.forEach((element) => {
      element.observer?.disconnect();
      delete element.observer;
    });
  }

  // Custom Event
  _emitCustomEvent(name) {
    const nameEvent = `hequalizer:${this.handle}:${name}`;
    window.dispatchEvent(new window.CustomEvent(nameEvent, {
      detail: {
        instance: this,
      }
    }));
  }

  // ------------------------ Public Methods ------------------------
  init() {
    this._setActualOptions();
    this._setMaxHeightElements("init");
    this._setResizeListener();
    this._setChangesListener();
    this._emitCustomEvent('init');
  };

  update() {
    this._setMaxHeightElements("update");
    this._emitCustomEvent('update');
  };

  refreshElements() {
    this._setChangesListener(false);
    this._setActualOptions()
    this.$elements = document.querySelectorAll(this.customSelector)
    this._setMaxHeightElements('refresh');
    this._setChangesListener();
    this._emitCustomEvent('refresh');
  }

  destroy() {
    this.values = 0;
    this._cleanHeightElements();
    this._setResizeListener(false);
    this._setChangesListener(false);
    window.clearTimeout(this._resizeTimeout);
    window.clearTimeout(this._changesTimeout);
    this._emitCustomEvent('destroy');
    Hequalizer.instances.delete(this.handle);
  };
}

window.Hequalizer = Hequalizer;
