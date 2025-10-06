document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("currentPlans-container");
  const apiUrl = "https://api.github.com/repos/dsb-bot/dsb-database/contents/plans";
  const today = new Date().toISOString().split("T")[0];

  try {
    // Hole die Dateiliste aus GitHub
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Fehler beim Abrufen der API");
    const files = await response.json();

    // Filtere nur gültige HTML-Dateien mit Datum >= heute
    const futureFiles = files.filter(file => {
      if (!file.name.endsWith(".html")) return false;
      const datePart = file.name.replace(".html", "");
      return datePart >= today; // Vergleiche YYYY-MM-DD
    });

    // Sortiere nach Datum aufsteigend
    futureFiles.sort((a, b) => a.name.localeCompare(b.name));

    for (const file of futureFiles) {
      const dateStr = file.name.replace(".html", ""); // z.B. 2025-10-20
      const dateObj = new Date(dateStr + "T00:00:00");
      const downloadUrl = file.download_url;

      // HTML laden, um den Stand auszulesen
      const htmlResponse = await fetch(downloadUrl);
      const htmlText = await htmlResponse.text();

      // „Stand:“ mit Regex extrahieren
      const match = htmlText.match(/Stand:\s*([\d.]+\s*\d{2}:\d{2})/);
      const standText = match ? match[1] : "Unbekannt";

      // Wochentag + formatiertes Datum
      const weekdayNames = [
        "Sonntag", "Montag", "Dienstag", "Mittwoch",
        "Donnerstag", "Freitag", "Samstag"
      ];
      const weekday = weekdayNames[dateObj.getDay()];
      const formattedDate = `${weekday}, ${dateObj.getDate().toString().padStart(2, "0")}.${(dateObj.getMonth()+1).toString().padStart(2, "0")}.${dateObj.getFullYear()}`;

      // Karte erzeugen
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.url = downloadUrl;
      card.style.cursor = "pointer";
      card.onclick = () => loadPlan(card);

      card.innerHTML = `
        <h2>${formattedDate}</h2>
        <p>Stand: ${standText}</p>
      `;

      container.appendChild(card);
    }

    if (futureFiles.length === 0) {
      container.innerHTML = "<p>Keine aktuellen oder zukünftigen Pläne gefunden.</p>";
    }
  } catch (err) {
    console.error("Fehler:", err);
    container.innerHTML = "<p>Fehler beim Laden der Pläne.</p>";
  }
});