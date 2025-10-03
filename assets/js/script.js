function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

preloadImages([
  "../images/space_background.jpg",
  "../images/orange_background.jpg",
  "../images/pink_background.jpg"
]);

// Lädt externes HTML in den Container
function loadList() {
  fetch('https://raw.githubusercontent.com/dsb-bot/dsb-database/refs/heads/main/assets/plan_list.html')
    .then(response => {
      if (!response.ok) throw new Error('Netzwerkfehler beim Laden von list.html');
      return response.text();
    })
    .then(html => {
      document.getElementById('list-container').innerHTML = html;
    })
    .catch(err => console.error(err));
}

// Beim Laden der Seite aufrufen
window.addEventListener('DOMContentLoaded', loadList);

function loadPlan(card) {
  const url = card.dataset.url;
  fetch(url)
    .then(response => response.text())
    .then(html => {
      const popup = document.getElementById("iframe-popup");
      const iframe = document.getElementById("plan-frame");
      
      // HTML in das iframe setzen
      iframe.srcdoc = html;
      
      // Popup anzeigen
      popup.style.display = "flex";
    })
    .catch(err => console.error("Fehler beim Laden:", err));
}

// Schließen-Button
document.getElementById("close-popup").addEventListener("click", () => {
  const popup = document.getElementById("iframe-popup");
  popup.style.display = "none";
});