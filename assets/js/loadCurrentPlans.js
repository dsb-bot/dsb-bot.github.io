function loadList() {
  fetch('https://raw.githubusercontent.com/dsb-bot/dsb-database/refs/heads/main/assets/plan_list.html')
    .then(response => {
      if (!response.ok) throw new Error('Netzwerkfehler beim Laden von list.html');
      return response.text();
    })
    .then(html => {
      document.getElementById('currentPlans-container').innerHTML = html;
    })
    .catch(err => console.error(err));
}

window.addEventListener('DOMContentLoaded', loadList);