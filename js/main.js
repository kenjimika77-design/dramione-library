const titleText = "Dramione Library";
const title = document.getElementById("title");
const quote = document.getElementById("quote");
const door = document.getElementById("door");

/* 1. TITLE: dust explosion */
titleText.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.className = "fade-letter";
  span.style.animationDelay = (i * 0.08) + "s";
  title.appendChild(span);
});

/* 2. AFTER TITLE → write quote like feather */
setTimeout(() => {
  const text = "Every library keeps secrets. Some are darker than others.";
  let i = 0;

  const typing = setInterval(() => {
    quote.style.opacity = 1;
    quote.textContent += text[i];
    quote.style.width = "100%";
    i++;

    if (i >= text.length) {
      clearInterval(typing);

      /* after typing → break quote into button */
      setTimeout(() => transformQuoteToButton(), 800);
    }
  }, 40);

}, 2000);

/* 3. quote → button transformation */
function transformQuoteToButton() {
  quote.style.transition = "all 1s ease";
  quote.style.opacity = "0";
  quote.style.transform = "scale(1.5) rotate(3deg)";

  setTimeout(() => {
    quote.style.display = "none";
    door.classList.add("show");
  }, 800);
}

/* 4. click portal */
door.onclick = () => {
  document.body.style.transition = "opacity 1.2s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "library.html";
  }, 1200);
};
