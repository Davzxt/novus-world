function toggleSenha() {
  const s = document.getElementById("senha");
  s.type = s.type === "password" ? "text" : "password";
}

function entrar() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("loading-screen").classList.remove("hidden");

  let dots = 1;
  const interval = setInterval(() => {
    document.getElementById("loading-text").innerText =
      "Carregando" + ".".repeat(dots);
    dots = dots % 3 + 1;
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    document.getElementById("loading-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
    saudacao();
  }, 3500);
}


function saudacao() {
  const h = new Date().getHours();
  let msg = "Boa noite";
  if (h < 12) msg = "Bom dia";
  else if (h < 18) msg = "Boa tarde";
  document.getElementById("saudacao").innerText = msg;
}

function abrirJogo() {
  alert("Página do jogo (em construção)");
}
