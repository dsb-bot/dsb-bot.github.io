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
