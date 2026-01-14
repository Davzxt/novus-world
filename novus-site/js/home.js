/* USER */
const user = localStorage.getItem("novus_user") || "David";
document.getElementById("username").innerText = user;

/* GREETING */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}
document.getElementById("greeting").innerText = `${greeting()},`;

/* SIDEBAR + LOGO */
const logo = document.getElementById("logo");
const sidebar = document.getElementById("sidebar");

logo.addEventListener("click", () => {
  logo.classList.add("rotate");
  sidebar.classList.toggle("open");

  setTimeout(() => {
    logo.classList.remove("rotate");
  }, 600);
});

function closeSidebar() {
  sidebar.classList.remove("open");
}

/* FRIENDS (MOCK) */
const friends = [];
const friendsRow = document.getElementById("friendsRow");
const noFriends = document.getElementById("noFriends");
const friendsTitle = document.getElementById("friendsTitle");

friendsTitle.innerText = `Amigos (${friends.length})`;

if (friends.length === 0) {
  noFriends.style.display = "block";
}

/* GAME */
function openGame() {
  window.location.href = "game.html";
}
function OpenProfile() {
  window.location.href = "profile.html";
}
function openAvatar() {
  window.location.href = "avatar.html";
}