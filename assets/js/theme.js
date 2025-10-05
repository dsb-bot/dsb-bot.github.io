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

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Beispiel: Theme-Wechsel-Buttons
document.querySelectorAll('.theme-button').forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.dataset.theme;
    setTheme(theme);
  });
});
