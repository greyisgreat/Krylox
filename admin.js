const PIN = "kryl0x001";

let games = JSON.parse(localStorage.getItem("krylox_games")) || [];

function login() {
  const val = document.getElementById("pin").value;

  if (val !== PIN) {
    alert("Wrong PIN");
    return;
  }

  document.getElementById("login").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  render();
}

function addGame() {
  const name = document.getElementById("name").value;
  const url = document.getElementById("url").value;

  const id = name.toLowerCase().replace(/\s/g, "_");

  games.push({ id, name, url });

  localStorage.setItem("krylox_games", JSON.stringify(games));

  render();
}

function deleteGame(id) {
  games = games.filter(g => g.id !== id);
  localStorage.setItem("krylox_games", JSON.stringify(games));
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  games.forEach(g => {
    const div = document.createElement("div");

    div.innerHTML = `
      ${g.name}
      <button onclick="deleteGame('${g.id}')">X</button>
    `;

    list.appendChild(div);
  });
}
