// Gestion du scroll de la page au début

document.addEventListener("DOMContentLoaded", function () {
  const slideRight = document.getElementById("slideRight");
  const slidesContainer = document.querySelector(".slides-container");

  slideRight.addEventListener("click", function (defilement) {
    defilement.preventDefault();
    slidesContainer.style.transform = "translateX(-100vw)";
    slidesContainer.style.overflowY = "auto";
    slideRight.style.height = "auto";
  });
});

// Gestion de la dropdown du header

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  dropdown.addEventListener("mouseover", function (event) {
    event.preventDefault();
    dropdownMenu.style.display = "block";
  });

  dropdown.addEventListener("mouseout", function (event) {
    if (!dropdown.contains(event.relatedTarget)) {
      dropdownMenu.style.display = "none";
    }
  });
});

// Gestion du responsive des cards sur la page d'accueil

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".pa-container-grp");
  const ctgs = document.querySelectorAll(".ctg");

  function handleAnimation() {
    if (window.innerWidth > 768) {
      function resetWidths() {
        ctgs.forEach((ctg) => {
          if (ctg.classList.contains("ctg-1")) {
            ctg.style.width = "60%";
          } else {
            ctg.style.width = "20%";
          }
        });
      }

      ctgs.forEach((ctg) => {
        ctg.addEventListener("mouseover", function () {
          ctgs.forEach((c) => (c.style.width = "20%"));
          ctg.style.width = "60%";
        });
      });

      container.addEventListener("mouseleave", resetWidths);
      resetWidths();
    } else {
      // Reset all styles for mobile
      ctgs.forEach((ctg) => {
        ctg.style.width = "100%";
      });
    }
  }

  // Initial call
  handleAnimation();

  // Update on resize
  window.addEventListener("resize", handleAnimation);
});

// Ajout d'un menu burger pour le responsive

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  burger.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const slidingMenu = document.querySelector(".sliding-menu");
  const closeMenu = document.querySelector(".close-menu");
  const menuLinks = slidingMenu.querySelectorAll("a");
  let touchStartX = 0;
  let touchEndX = 0;

  // Toggle menu on burger click
  burgerMenu.addEventListener("click", () => {
    slidingMenu.classList.add("active");
  });

  // Close menu on X click
  closeMenu.addEventListener("click", () => {
    slidingMenu.classList.remove("active");
  });

  // Close menu when clicking a link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      slidingMenu.classList.remove("active");
    });
  });

  // Handle touch events for sliding
  slidingMenu.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slidingMenu.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50) {
      // Swipe right
      slidingMenu.classList.remove("active");
    }
  });

  // Handle mouse events for sliding
  let isMouseDown = false;
  let startX;

  slidingMenu.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.pageX;
  });

  slidingMenu.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    if (e.pageX - startX > 50) {
      slidingMenu.classList.remove("active");
      isMouseDown = false;
    }
  });

  slidingMenu.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!slidingMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
      slidingMenu.classList.remove("active");
    }
  });
});
