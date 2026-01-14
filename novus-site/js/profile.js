const user = localStorage.getItem("novus_user") || "Player";
document.getElementById("username").innerText = user;

function goHome() {
  window.location.href = "home.html";
}
function OpenProfile() {
  window.location.href = "profile.html";
}