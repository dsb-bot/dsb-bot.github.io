async function loadCurrentPlans() {
  const container = document.getElementById("currentPlans-container");
  const currentTimestamp = `?timestamp=${Date.now()}`;
  const selectedDB = getDatabase();
  const apiUrl = `https://api.github.com/repos/dsb-bot/${selectedDB}/contents/plans` + currentTimestamp;
  const futurePlansEnabled = getFuturePlans() === "true";

  container.innerHTML = "";

  const listDiv = document.createElement("div");
  listDiv.className = "list";
  container.appendChild(listDiv);

  listDiv.innerHTML = `
    <div class="card">
      <h2>Pläne Laden...</h2>
      <p>Eigentlich sollte das nicht so lange dauern, dass du das hier lesen kannst!</p>
    </div>
  `;

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Nächsten Wochentag berechnen
  const nextWeekdayDate = new Date();
  nextWeekdayDate.setDate(nextWeekdayDate.getDate() + 1);

  if (nextWeekdayDate.getDay() === 6) {         // Samstag → Montag
    nextWeekdayDate.setDate(nextWeekdayDate.getDate() + 2);
  } else if (nextWeekdayDate.getDay() === 0) {  // Sonntag → Montag
    nextWeekdayDate.setDate(nextWeekdayDate.getDate() + 1);
  }

  const nextWeekdayStr = nextWeekdayDate.toISOString().split("T")[0];

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const files = await response.json();

    let planFiles = files.filter(file =>
      file.name.endsWith(".html") && /^\d{4}-\d{2}-\d{2}\.html$/.test(file.name)
    );

    planFiles.sort((a, b) => a.name.localeCompare(b.name));

    planFiles = planFiles.filter(file => {
      const dateStr = file.name.replace(".html", "");

      if (!futurePlansEnabled && dateStr > nextWeekdayStr) return false;
      if (dateStr < todayStr) return false;

      return true;
    });

    listDiv.innerHTML = "";
    if (planFiles.length === 0) {
      listDiv.innerHTML = `
        <div class="card">
          <h2>Keine Pläne da!</h2>
          <p>Es wurden keine Pläne gefunden. Wenn Du glaubst, dass das ein Fehler ist, melde das bitte <a href="/kontakt.html">hier<a/>.</p>
        </div>
      `;
      return;
    }

    const oldestPlanUrl = planFiles[0].download_url + currentTimestamp;
    const oldestHtmlResponse = await fetch(oldestPlanUrl);
    const oldestHtmlText = await oldestHtmlResponse.text();
    const match = oldestHtmlText.match(/Stand:\s*([\d.]+\s*\d{2}:\d{2})/);
    const standText = match ? match[1] : "Unbekannt";

    for (const file of planFiles) {
      const dateStr = file.name.replace(".html", "");
      const dateObj = new Date(dateStr + "T00:00:00");
      const weekdayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
      const weekday = weekdayNames[dateObj.getDay()];
      const formattedDate = `${weekday}, ${dateObj.getDate().toString().padStart(2, "0")}.${(dateObj.getMonth() + 1).toString().padStart(2, "0")}.${dateObj.getFullYear()}`;

      const downloadUrl = file.download_url + currentTimestamp;

      const card = document.createElement("div");
      card.className = "card";
      card.dataset.url = downloadUrl;
      card.style.cursor = "pointer";
      card.onclick = () => loadPlan(card);

      card.innerHTML = `
        <h2>${formattedDate}</h2>
        <p>Stand: ${standText}</p>
      `;

      listDiv.appendChild(card);
    }

  } catch (error) {
    console.error("Fehler:", error);
    listDiv.innerHTML = `
      <div class="card">
        <h2>Ein Fehler ist aufgetreten.</h2>
        <p>${error}</p>
        <br>
        <p>Wenn Du öfters in der letzten Stunde neue Pläne geladen hast, werden leider keine weitere Anfragen erlaubt. Bitte habe etwas Geduld!</p>
        <p>Ansonsten melde den Fehler bitte <a href="/kontakt.html">hier<a/>.</p>
      </div>
    `;
  }
}

async function reloadPlans() {
  loadCurrentPlans();
}

document.addEventListener("DOMContentLoaded", loadCurrentPlans);
