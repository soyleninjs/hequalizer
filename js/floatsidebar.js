class FloatSidebar extends HTMLElement {
  constructor() {
    super();
    this.$sidebarButtonOpen = this.querySelector("[data-sidebar-button-open]");
    this.$sidebarContent = this.querySelector("[data-sidebar]");
    this.$sidebarMask = this.querySelector("[data-sidebar-mask]");
    this.$sidebarButtonClose = this.querySelector("[data-sidebar-button-close]");
    this.animationTime = Number(this.dataset.animationDuration);

    this.$sidebarButtonOpen.addEventListener("click", this.openSidebar);
    this.$sidebarMask.addEventListener("click", this.closeSidebar);
    this.$sidebarButtonClose.addEventListener("click", this.closeSidebar);
    this.setConfigAnimation();
  }
  openSidebar = () => {
    this.$sidebarContent.classList.add("float-sidebar-visible");
    document.body.style.overflow = "hidden";
  }
  closeSidebar = () => {
    this.$sidebarContent.classList.add("float-sidebar-hidding");
    window.setTimeout(() => {
      this.$sidebarContent.classList.remove("float-sidebar-visible", "float-sidebar-hidding");
      document.body.style.overflow = "unset";
    }, this.animationTime * 1000)
  }
  setConfigAnimation = () => {
    this.style.setProperty(
      '--animation-config',
      `${this.animationTime}s forwards ease-in-out`,
    );
  }
}

window.customElements.define("float-sidebar", FloatSidebar);