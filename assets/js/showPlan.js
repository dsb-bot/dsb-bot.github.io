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

// Event Listeners für Popup-Schließen
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById("iframe-popup");

  // Schließen mit ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup.style.display === 'flex') {
      popup.style.display = 'none';
    }
  });

  // Schließen beim Klick außerhalb
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
});

// Schließen-Button
document.getElementById("close-popup").addEventListener("click", () => {
  const popup = document.getElementById("iframe-popup");
  popup.style.display = "none";
});