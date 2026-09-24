(() => {

  const root = document.documentElement;

  /* =====================================================
     THEME
  ===================================================== */

  const savedTheme =
    localStorage.getItem("aj-helpdesk-theme");

  const systemDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

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


    /* =====================================================
       THEME ICON
    ===================================================== */

    function updateThemeIcon(){

      if(!themeToggle) return;

      if(root.dataset.theme === "dark"){

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
          "aria-label",
          "Switch to light mode"
        );

      }else{

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
          "aria-label",
          "Switch to dark mode"
        );

      }

    }

    updateThemeIcon();


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    if(themeToggle){

      themeToggle.addEventListener(
        "click",
        () => {

          const newTheme =
            root.dataset.theme === "dark"
              ? "light"
              : "dark";

          root.dataset.theme =
            newTheme;

          localStorage.setItem(
            "aj-helpdesk-theme",
            newTheme
          );

          updateThemeIcon();

        }
      );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if(menuButton && nav){

      menuButton.addEventListener(
        "click",
        () => {

          nav.classList.toggle("open");

        }
      );


      nav.querySelectorAll("a")
        .forEach(link => {

          link.addEventListener(
            "click",
            () => {

              nav.classList.remove(
                "open"
              );

            }
          );

        });

    }


    /* =====================================================
       ACTIVE PAGE
    ===================================================== */

    const currentPage =
      window.location.pathname
        .split("/")
        .pop() ||
      "index.html";


    if(nav){

      nav.querySelectorAll("a")
        .forEach(link => {

          const linkPage =
            link.getAttribute("href");

          if(linkPage === currentPage){

            link.classList.add(
              "active"
            );

          }

        });

    }


    /* =====================================================
       SUBTLE MOUSE 3D EFFECT
       Desktop only
    ===================================================== */

    if(
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches
    ){

      const cards =
        document.querySelectorAll(
          ".card"
        );


      cards.forEach(card => {

        card.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const centerX =
              rect.width / 2;

            const centerY =
              rect.height / 2;

            /*
              Very small rotation.
              Keeps the effect professional.
            */

            const rotateY =
              ((x - centerX) /
                centerX) * 2;

            const rotateX =
              ((centerY - y) /
                centerY) * 2;


            card.style.transform =
              `
              perspective(1000px)
              translateY(-7px)
              translateZ(8px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              `;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

          }
        );

      });

    }

  });

})();
