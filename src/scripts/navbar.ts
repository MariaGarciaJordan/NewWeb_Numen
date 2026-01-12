// src/scripts/navbar.ts

function setMobileIconBurger(btn: HTMLButtonElement): void {
  const svg = btn.querySelector<SVGSVGElement>("svg");
  if (!svg) return;
  svg.innerHTML =
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
}

function setMobileIconClose(btn: HTMLButtonElement): void {
  const svg = btn.querySelector<SVGSVGElement>("svg");
  if (!svg) return;
  svg.innerHTML =
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
}

function initNavbar(): void {
  let lastClicked: HTMLElement | null = null;

  const toggleEls = document.querySelectorAll<HTMLElement>(
    ".service-toggle, .company-toggle"
  );

  const toggleDiv = document.querySelector<HTMLElement>(".toggle-div");
  const servicesContainer = document.querySelector<HTMLElement>(".services-container");
  const companyContainer = document.querySelector<HTMLElement>(".company-container");

  const mobileBtn = document.getElementById("mobile-menu-button") as HTMLButtonElement | null;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLElement | null;

  const closeBtn = document.querySelector<HTMLButtonElement>("[data-toggle-close]");

  // Si no está el navbar (o falta markup), no hacemos nada.
  // Esto evita errores en páginas sin navbar.
  if (!toggleDiv && !mobileBtn && toggleEls.length === 0) return;

  const closeAll = (): void => {
    if (toggleDiv) toggleDiv.style.display = "none";

    // Estado base del legacy: services visible, company hidden
    if (servicesContainer) servicesContainer.style.display = "flex";
    if (companyContainer) companyContainer.style.display = "none";

    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
      if (mobileBtn) setMobileIconBurger(mobileBtn);
    }

    lastClicked = null;
  };

  if (closeBtn) closeBtn.addEventListener("click", closeAll);

  // Mobile menu toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Cierra overlay si está abierto
      if (toggleDiv) toggleDiv.style.display = "none";
      lastClicked = null;

      mobileMenu.classList.toggle("hidden");
      if (mobileMenu.classList.contains("hidden")) setMobileIconBurger(mobileBtn);
      else setMobileIconClose(mobileBtn);
    });

    // Cerrar menú móvil click fuera
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!mobileBtn.contains(target) && !mobileMenu.contains(target)) {
        closeAll();
      }
    });
  }

  // Dropdown overlay toggles
  if (toggleDiv && servicesContainer && companyContainer && toggleEls.length > 0) {
    toggleEls.forEach((el) => {
      el.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const isService = el.classList.contains("service-toggle");

        if (lastClicked === el) {
          closeAll();
          return;
        }

        // Cierra mobile si está abierto
        if (mobileMenu) {
          mobileMenu.classList.add("hidden");
          if (mobileBtn) setMobileIconBurger(mobileBtn);
        }

        servicesContainer.style.display = isService ? "flex" : "none";
        companyContainer.style.display = isService ? "none" : "block";

        toggleDiv.style.display = "flex";
        lastClicked = el;
      });
    });

    // Cerrar overlay click fuera
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const clickedToggle = Array.from(toggleEls).some((x) => x.contains(target));
      if (!toggleDiv.contains(target) && !clickedToggle) {
        closeAll();
      }
    });

    // Cerrar overlay al scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) closeAll();
    });
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar, { once: true });
} else {
  initNavbar();
}
