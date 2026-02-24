
fetch('assets/json/news.json')
  .then(response => response.json())
  .then(data => {

    const cookieName = "popupSeen_" + data.lastUpdated;

    // Wenn Cookie existiert abbrechen
    if (getCookie(cookieName)) {
      return;
    }

    // Nur anzeigen, wenn aktiv
    if (data.active) {
      document.getElementById("popup-title").innerText = data.title;
      document.getElementById("popup-message").innerText = data.message;
      document.getElementById("popup-date").innerText = "Stand: " + data.lastUpdated;
      document.getElementById("popup").style.display = "flex";
    }

    // "Nicht mehr anzeigen"
    window.forgetPopup = function() {
      setCookie(cookieName, "true", 30);
      closePopup();
    };

  });

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split('=');
    if (parts[0] === name) {
      return parts[1];
    }
  }
  return null;
}