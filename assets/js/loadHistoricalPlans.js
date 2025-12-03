async function loadHistoricalPlans() {
  const container = document.getElementById("list-container");

  container.innerHTML = `
    <div class="card">
      <h2>Pläne Laden...</h2>
      <p>Eigentlich sollte das nicht so lange dauern, dass du das hier lesen kannst!</p>
    </div>
  `;

  try {
    const selectedDB = getDatabase(); // Cookie lesen
    const response = await fetch(`https://api.github.com/repos/dsb-bot/${selectedDB}/contents/plans`);

    if (!response.ok) {
      let errorMessage = `${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) errorMessage += ` – ${errorData.message}`;
      } catch {}
      throw new Error(errorMessage);
    }

    const files = await response.json();

    // Gestern bestimmen
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0]; // YYYY-MM-DD

    // Filter: nur HTML-Dateien mit Datum bis gestern
    const planFiles = files
      .filter(f => f.name.match(/^\d{4}-\d{2}-\d{2}\.html$/))
      .filter(f => f.name.replace(".html", "") <= yesterdayStr);

    // Sortiere absteigend (neueste zuerst)
    planFiles.sort((a, b) => new Date(b.name.replace(".html", "")) - new Date(a.name.replace(".html", "")));

    // Gruppieren nach Kalenderwoche
    const groupedByWeek = {};
    for (const file of planFiles) {
      const dateStr = file.name.replace(".html", "");
      const date = new Date(dateStr);
      const week = getWeekNumber(date);
      if (!groupedByWeek[week]) groupedByWeek[week] = [];
      groupedByWeek[week].push({ file, date });
    }

    container.innerHTML = "";

    let cardIndex = 0; // Für gestaffelte Animation

    Object.keys(groupedByWeek)
      .sort((a, b) => b - a)
      .forEach(week => {
        const listWrapper = document.createElement("div");
        listWrapper.className = "week-section";

        const heading = document.createElement("h2");
        heading.textContent = `Kalenderwoche ${week}`;
        listWrapper.appendChild(heading);

        const list = document.createElement("div");
        list.className = "list";

        groupedByWeek[week].forEach(({ file, date }) => {
          const dateStr = file.name.replace(".html", "");
          const dateObj = new Date(dateStr + "T00:00:00");
          const weekdayNames = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
          const weekday = weekdayNames[dateObj.getDay()];
          const formattedDate = `${capitalizeFirstLetter(weekday)}, ${dateObj.getDate().toString().padStart(2,"0")}.${(dateObj.getMonth()+1).toString().padStart(2,"0")}.${dateObj.getFullYear()}`;

          const downloadUrl = file.download_url;

          const card = document.createElement("div");
          card.className = "card hidden";
          card.dataset.url = downloadUrl;
          card.onclick = () => loadPlan(card);
          card.style.cursor = "pointer";
          card.innerHTML = `
            <h2>${formattedDate}</h2>
            <p>Datei: ${file.name}</p>
          `;

          list.appendChild(card);

          // gestaffeltes Einblenden
          setTimeout(() => {
            card.classList.remove("hidden");
            card.classList.add("fade-in");
          }, cardIndex * 100);
          cardIndex++;
        });

        listWrapper.appendChild(list);
        container.appendChild(listWrapper);
      });

  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="card">
        <h2>Ein Fehler ist aufgetreten.</h2>
        <p>${error}</p>
        <br>
        <p>Wenn Du öfters als 60 mal in der letzten Stunde neue Pläne geladen hast, werden leider keine weitere Anfragen erlaubt. Bitte habe etwas Geduld!</p>
        <p>Ansonsten melde den Fehler bitte <a href="/kontakt.html">hier<a/>.</p>
      </div>
    `;
  }
}

// Hilfsfunktionen
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function loadPlan(element) {
  const url = element.dataset.url;
  console.log("Lade Plan:", url);
}

async function reloadPlans() {
  loadHistoricalPlans();
}

document.addEventListener("DOMContentLoaded", loadHistoricalPlans);