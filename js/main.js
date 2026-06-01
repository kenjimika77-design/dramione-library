document.addEventListener("DOMContentLoaded", () => {

  alert("JS LOADED");

  const btn = document.getElementById("enterBtn");
  const portal = document.getElementById("portal");
  const library = document.getElementById("library");
  const quote = document.getElementById("quote");

  if (!btn || !portal || !library || !quote) {
    console.log("Missing elements:", { btn, portal, library, quote });
    return;
  }

  const text = "Some stories were never meant to be forgotten.";
  let i = 0;

  function typeQuote() {
    if (i < text.length) {
      quote.textContent += text[i];
      i++;
      setTimeout(typeQuote, 40);
    }
  }

  typeQuote();

  btn.addEventListener("click", () => {
    portal.style.transition = "2s ease";
    portal.style.opacity = "0";

    setTimeout(() => {
      portal.style.display = "none";
      library.classList.add("active");
    }, 2000);
  });

});
