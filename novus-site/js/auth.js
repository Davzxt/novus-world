const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.onclick = () => {
  password.type = password.type === "password" ? "text" : "password";
};

let selectedGender = null;

function selectGender(gender, el) {
  selectedGender = gender;
  document.querySelectorAll(".gender").forEach(g => g.classList.remove("selected"));
  el.classList.add("selected");
}

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const birth = document.getElementById("birth").value.trim();

  if (!user) {
    alert("Erro: nome de usuário não preenchido");
    return;
  }

  if (!pass) {
    alert("Erro: senha não preenchida");
    return;
  }

  if (!birth || birth.length < 10) {
    alert("Erro: data de nascimento inválida");
    return;
  }

  if (!selectedGender) {
    alert("Erro: selecione um gênero");
    return;
  }

  localStorage.setItem("novus_user", user);
  localStorage.setItem("novus_gender", selectedGender);

  window.location.href = "home.html";

const birthInput = document.getElementById("birth");

birthInput.addEventListener("input", () => {
  let v = birthInput.value.replace(/\D/g, "");

  if (v.length >= 3 && v.length <= 4)
    v = v.replace(/(\d{2})(\d+)/, "$1/$2");
  else if (v.length > 4)
    v = v.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");

  birthInput.value = v;
});
}




