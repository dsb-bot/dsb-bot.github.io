const COOKIE_DATABASE = "dsb_database";

// Cookie setzen
function setDatabase(dbName) {
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);

  document.cookie = `${COOKIE_DATABASE}=${dbName}; expires=${date.toUTCString()}; path=/`;

  updateCurrentDatabaseDisplay();
}

// Cookie auslesen
function getDatabase() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  const match = cookies.find(c => c.startsWith(COOKIE_DATABASE + "="));
  return match ? match.split("=")[1] : "dsb-database"; // Default DB
}

// UI aktualisieren
function updateCurrentDatabaseDisplay() {
  const db = getDatabase();
  const element = document.getElementById("current-db");
  if (!element) return;

  // Default anzeigen mit Zusatz
  const displayName = db === "dsb-database" ? `${db} (Default)` : db;

  element.textContent = displayName;
}

const COOKIE_FUTURE_PLANS = "futurePlans";

function toggleFuturePlans(value) {
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_FUTURE_PLANS}=${value}; expires=${date.toUTCString()}; path=/`;
  updateFuturePlansDisplay();
}

function getFuturePlans() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  const match = cookies.find(c => c.startsWith(COOKIE_FUTURE_PLANS + "="));
  return match ? match.split("=")[1] : "false"; // Standard: Aus
}

function updateFuturePlansDisplay() {
  const element = document.getElementById("current-futurePlans");
  if (!element) return;

  const value = getFuturePlans();
  if (value === "true") element.textContent = "Ein (Zukünftige Pläne sichtbar)";
  else element.textContent = "Aus (Nur Pläne bis morgen)";
}

// Starten beim Laden
document.addEventListener("DOMContentLoaded", () => {
  updateCurrentDatabaseDisplay();
  updateFuturePlansDisplay();
});