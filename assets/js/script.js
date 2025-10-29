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

document.getElementById("navbar").innerHTML = data;

const dropdowns = document.querySelectorAll(".dropdown");
const reloadButton = document.querySelector(".reload-button");

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".dropdown-button");
  button.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });
});

if (reloadButton) {
  reloadButton.addEventListener("click", () => {
    // Button sofort den Fokus verlieren lassen
    reloadButton.blur();

    setTimeout(() => {
      reloadButton.classList.remove("active");
      reloadButton.closest('.dropdown').classList.remove("active");
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
      });
    }, 500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});