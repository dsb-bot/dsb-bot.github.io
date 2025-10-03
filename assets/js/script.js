function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages([
  "../assets/images/space_background.jpg",
  "../assets/images/orange_background.jpg",
  "../assets/images/pink_background.jpg"
]);


fetch("../assets/html/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // bg-container erzeugen
  const bg = document.createElement("div");
  bg.id = "bg-container";
  document.body.prepend(bg);

  // Hintergrund aus CSS-Variable setzen
  const bgImage = getComputedStyle(body).getPropertyValue("--background-image").trim();
  if (bgImage) {
    bg.style.backgroundImage = bgImage;
  }

  // Funktion für Scroll
  function updateBg() {
    const scrollY = window.scrollY || window.pageYOffset;
    bg.style.transform = `translateY(${scrollY}px)`;
  }

  window.addEventListener("scroll", updateBg);
  window.addEventListener("resize", updateBg);
  updateBg();
});
