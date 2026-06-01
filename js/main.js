const enterBtn = document.getElementById("enterBtn");
const portal = document.getElementById("portal");
const library = document.getElementById("library");

enterBtn.onclick = () => {

  // свиток "гаснет"
  portal.style.opacity = "0";

  setTimeout(() => {
    portal.style.display = "none";
    library.classList.add("active");
  }, 1500);

};
