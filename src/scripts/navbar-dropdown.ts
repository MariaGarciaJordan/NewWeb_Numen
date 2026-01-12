// src/scripts/navbar-dropdown.ts
// Dropdown desktop para Navbar (Services / Company).
// No depende de framework. Se inicializa en DOMContentLoaded y en astro:page-load.

type Mode = "services" | "company";
type Nullable<T> = T | null;

function qs<T extends Element>(root: ParentNode, selector: string): Nullable<T> {
  return root.querySelector(selector) as Nullable<T>;
}

function qsa<T extends Element>(root: ParentNode, selector: string): T[] {
  return Array.from(root.querySelectorAll(selector)) as T[];
}

function isDesktop(): boolean {
  // lg = 1024px (Tailwind default)
  return window.matchMedia("(min-width: 1024px)").matches;
}

function initNavbarDropdown(root: HTMLElement): void {
  if (!isDesktop()) return;

  const dropdown = qs<HTMLElement>(root, "[data-navbar-dropdown]");
  const services = qs<HTMLElement>(root, "[data-navbar-services]");
  const company = qs<HTMLElement>(root, "[data-navbar-company]");
  const closeBtn = qs<HTMLButtonElement>(root, "[data-navbar-close]");

  const toggles = qsa<HTMLButtonElement>(root, "[data-navbar-toggle]");

  if (!dropdown || !services || !company || toggles.length === 0) return;

  let openMode: Mode | null = null;

  const setAriaExpanded = (mode: Mode | null) => {
    toggles.forEach((btn) => {
      const btnMode = btn.getAttribute("data-navbar-toggle") as Mode | null;
      const expanded = mode !== null && btnMode === mode;
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  };

  const close = (): void => {
    openMode = null;
    dropdown.classList.add("hidden");
    dropdown.style.display = "none";
    dropdown.setAttribute("aria-hidden", "true");

    services.style.display = "none";
    company.style.display = "none";

    setAriaExpanded(null);
  };

  const open = (mode: Mode): void => {
    openMode = mode;

    dropdown.classList.remove("hidden");
    dropdown.style.display = "flex";
    dropdown.setAttribute("aria-hidden", "false");

    if (mode === "services") {
      services.style.display = "flex";
      company.style.display = "none";
    } else {
      services.style.display = "none";
      company.style.display = "block";
    }

    setAriaExpanded(mode);
  };

  const toggle = (mode: Mode): void => {
    if (openMode === mode) close();
    else open(mode);
  };

  // Estado inicial
  close();

  // Click toggles
  toggles.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const mode = btn.getAttribute("data-navbar-toggle") as Mode | null;
      if (!mode) return;
      toggle(mode);
    });
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      close();
    });
  }

  // Click fuera
  document.addEventListener("click", (ev) => {
    if (!openMode) return;
    const target = ev.target;
    if (!(target instanceof Node)) return;

    const clickedToggle = toggles.some((b) => b.contains(target));
    if (clickedToggle) return;
    if (dropdown.contains(target)) return;

    close();
  });

  // Escape
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && openMode) close();
  });

  // Scroll (legacy)
  window.addEventListener("scroll", () => {
    if (openMode && window.scrollY > 50) close();
  });

  // Si pasas a mobile, cerramos
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener?.("change", (e) => {
    if (!e.matches) close();
  });
}

function boot(): void {
  // Permite múltiples navbars si existieran (no debería, pero es robusto).
  const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-root]"));
  roots.forEach(initNavbarDropdown);
}

// Astro puede disparar "astro:page-load" si hay view transitions.
// DOMContentLoaded cubre navegación normal.
document.addEventListener("DOMContentLoaded", boot, { once: true });
document.addEventListener("astro:page-load", boot);
