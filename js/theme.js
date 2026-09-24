(() => {

  const root = document.documentElement;

  // Saved theme
  const savedTheme = localStorage.getItem("aj-helpdesk-theme");

  // System theme
  const systemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Apply initial theme
  root.dataset.theme =
    savedTheme ||
    (systemDark ? "dark" : "light");


  document.addEventListener("DOMContentLoaded", () => {

    const themeToggle =
      document.querySelector("[data-theme-toggle]");

    const menuButton =
      document.querySelector("[data-menu]");

    const nav =
      document.querySelector("[data-nav]");


    /* =========================
       THEME ICON
    ========================= */

    function updateThemeIcon() {

      if (!themeToggle) return;

      if (root.dataset.theme === "dark") {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
          "aria-label",
          "Switch to light mode"
        );

      } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
          "aria-label",
          "Switch to dark mode"
        );

      }

    }


    updateThemeIcon();


    /* =========================
       THEME TOGGLE
    ========================= */

    if (themeToggle) {

      themeToggle.addEventListener("click", () => {

        const newTheme =
          root.dataset.theme === "dark"
            ? "light"
            : "dark";

        root.dataset.theme = newTheme;

        localStorage.setItem(
          "aj-helpdesk-theme",
          newTheme
        );

        updateThemeIcon();

      });

    }


    /* =========================
       MOBILE MENU
    ========================= */

    if (menuButton && nav) {

      menuButton.addEventListener("click", () => {

        nav.classList.toggle("open");

      });


      // Close menu after clicking a link

      nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

          nav.classList.remove("open");

        });

      });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage =
      window.location.pathname
        .split("/")
        .pop() || "index.html";


    if (nav) {

      nav.querySelectorAll("a").forEach(link => {

        const linkPage =
          link.getAttribute("href");

        if (linkPage === currentPage) {

          link.classList.add("active");

        }

      });

    }

  });

})();
