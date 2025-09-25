// theme.js

// Funktion, um Cookie zu setzen
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Funktion, um Cookie auszulesen
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Theme setzen und Cookie speichern
function setTheme(name) {
  const root = document.documentElement;

  // Alle Variablen für Theme
  if (name === 'space') {
    root.style.setProperty('--bg-color', '#0d1b2a');
    root.style.setProperty('--text-color', '#e0e6ed');
    root.style.setProperty('--base-bg', 'rgba(30,58,95,0.3)');
    root.style.setProperty('--base-hover-bg', 'rgba(43,76,114,0.5)');
    root.style.setProperty('--background-image', 'url("../images/space_background.jpg")');
  } else if (name === 'orange') {
    root.style.setProperty('--bg-color', '#1a1200');
    root.style.setProperty('--text-color', '#ffe0b2');
    root.style.setProperty('--base-bg', 'rgba(255,140,0,0.3)');
    root.style.setProperty('--base-hover-bg', 'rgba(255,165,0,0.5)');
    root.style.setProperty('--background-image', 'url("../images/orange_background.jpg")');
  } else if (name === 'pink') {
    root.style.setProperty('--bg-color', '#330022');
    root.style.setProperty('--text-color', '#ffc0dd');
    root.style.setProperty('--base-bg', 'rgba(255,105,180,0.3)');
    root.style.setProperty('--base-hover-bg', 'rgba(255,20,147,0.5)');
    root.style.setProperty('--background-image', 'url("../images/pink_background.jpg")');
  }

  // Cookie setzen für 365 Tage
  setCookie('theme', name, 365);
}

// Beim Laden prüfen, ob ein Theme-Cookie existiert
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getCookie('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }
});
