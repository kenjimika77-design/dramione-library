const titleText = "Dramione Library";
const title = document.getElementById("title");
const quote = document.getElementById("quote");
const door = document.getElementById("door");

/* 🌌 particles */
for (let i = 0; i < 90; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.top = Math.random() * 100 + "%";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDelay = Math.random() * 6 + "s";
  document.body.appendChild(p);
}

/* 💥 TITLE EXPLOSION */
titleText.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.className = "fade-letter";
  span.style.animationDelay = (i * 0.08) + "s";
  title.appendChild(span);
});

/* 📜 TYPEWRITER QUOTE */
const text = "Every library keeps secrets. Some are darker than others.";

setTimeout(() => {
  quote.style.opacity = 1;

  let i = 0;
  const typing = setInterval(() => {
    quote.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typing);

      setTimeout(() => {
        quote.style.opacity = "0";

        setTimeout(() => {
          quote.style.display = "none";
          door.classList.add("show");
        }, 800);

      }, 1000);
    }
  }, 30);

}, 1800);

/* 🔑 BUTTON */
door.onclick = () => {
  document.body.style.transition = "opacity 1.2s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "library.html";
  }, 1200);
};
