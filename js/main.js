console.log("JS WORKS");
const titleText = "Dramione Library";
const title = document.getElementById("title");
const quote = document.getElementById("quote");
const door = document.getElementById("door");

/* TITLE FROM DUST */
titleText.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.className = "fade-letter";
  span.style.animationDelay = (i * 0.06) + "s";
  span.style.textShadow = "0 0 12px rgba(214,178,94,0.6)";
  title.appendChild(span);
});

/* quote appears AFTER title */
setTimeout(() => {
  quote.style.opacity = 1;
  quote.style.transform = "translateY(0)";
}, 2200);

/* button appears */
setTimeout(() => {
  door.classList.add("show");
}, 3800);

/* particles */
for (let i = 0; i < 70; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.top = Math.random() * 100 + "%";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(p);
}

/* portal click */
door.onclick = () => {
  document.body.style.transition = "opacity 1.2s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    alert("The door opens… next step: we build the library interior worlds.");
  }, 1200);
};
