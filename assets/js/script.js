// --- Bilder vorladen ---
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages([
  "../assets/images/space_background.jpg",
  "../assets/images/brown_background.jpg",
  "../assets/images/pink_background.jpg",
  "../assets/images/green_background.jpg",
  "../assets/images/purple_background.jpg",
  "../assets/images/red_background.jpg",
  "../assets/images/cyan_background.jpg",
  "../assets/images/gold_background.jpg",
  "../assets/images/silver_background.jpg"
]);

// --- Navbar- und Button-Logik ---
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const dropdowns = document.querySelectorAll(".dropdown");
  const reloadButton = document.querySelector(".reload-button");

  // Dropdown öffnen/schließen
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown-button");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdown.classList.toggle("active");
    });
  });

  // Wenn man scrollt → schließen
  window.addEventListener("scroll", () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
  });

  // Wenn man irgendwo anders hinklickt → schließen
  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
  });

  // Navbar-Scroll-Effekt
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  console.log("Navbar und Dropdowns initialisiert ✅");
});