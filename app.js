let games = JSON.parse(localStorage.getItem("krylox_games")) || [
  { id: "2048", name: "2048", url: "https://play2048.co/" },
  { id: "snake", name: "Snake", url: "https://playsnake.org/" }
];

function getStats(id) {
  return JSON.parse(localStorage.getItem("krylox_" + id)) || {
    plays: 0,
    last: 0,
    fav: false
  };
}

function saveStats(id, data) {
  localStorage.setItem("krylox_" + id, JSON.stringify(data));
}

/* ---------------- RENDER ---------------- */

const grid = document.getElementById("gameGrid");

function render(list = games) {
  grid.innerHTML = "";

  list.forEach(g => {
    const s = getStats(g.id);

    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
      <span>${g.name}</span>
      <small>${s.plays} plays</small>
    `;

    div.onclick = () => openGame(g);

    grid.appendChild(div);
  });

  renderContinue();
}

/* ---------------- CONTINUE ---------------- */

function renderContinue() {
  const el = document.getElementById("continue");

  let sorted = [...games]
    .map(g => ({ ...g, s: getStats(g.id) }))
    .sort((a, b) => b.s.last - a.s.last)
    .slice(0, 5);

  el.innerHTML = sorted.map(g =>
    `<button onclick='openGame(${JSON.stringify(g).replace(/"/g,"&quot;")})'>${g.name}</button>`
  ).join("");
}

/* ---------------- GAME ---------------- */

function openGame(g) {
  const s = getStats(g.id);

  s.plays++;
  s.last = Date.now();
  saveStats(g.id, s);

  document.getElementById("frame").src = g.url;
  document.getElementById("player").classList.remove("hidden");

  render();
}

function closeGame() {
  document.getElementById("player").classList.add("hidden");
  document.getElementById("frame").src = "";
}

/* ---------------- SEARCH ---------------- */

document.getElementById("search").addEventListener("input", e => {
  const v = e.target.value.toLowerCase();
  render(games.filter(g => g.name.toLowerCase().includes(v)));
});

/* INIT */
render();
