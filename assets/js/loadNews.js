// --- News Popup aus JSON laden ---
fetch('assets/json/news.json')
  .then(response => response.json())
  .then(data => {
    const cookieName = "popupSeen_" + data.lastUpdated;

    // Wenn Cookie existiert, abbrechen
    if (getCookie(cookieName)) return;

    // Nur anzeigen, wenn aktiv
    if (data.active) {
      showMessagePopup(data.title, data.message, "Stand: " + data.lastUpdated);

      // "Nicht mehr anzeigen" Funktion
      window.forgetMessagePopup = function () {
        setCookie(cookieName, "true", 30);
        closeMessagePopup();
      };
    }
  })
  .catch(err => console.error("News konnte nicht geladen werden:", err));

// --- Funktionen zum Öffnen/Schließen ---
function showMessagePopup(title, message, date = "") {
  const popup = document.getElementById("message-popup");
  if (!popup) return;

  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").innerHTML = message; // HTML erlaubt
  document.getElementById("popup-date").textContent = date;

  popup.style.display = "flex"; // Overlay wird sichtbar
}

function closeMessagePopup() {
  const popup = document.getElementById("message-popup");
  if (popup) popup.style.display = "none";
}

// --- Cookie-Funktionen ---
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, c) => {
    const t = c.split('=');
    return t[0] === name ? t[1] : r;
  }, null);
}