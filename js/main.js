const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const door = document.getElementById("door");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});

/* SIMPLE DUST (NO BREAKAGE) */
const dust = [];

for (let i = 0; i < 200; i++) {
    dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 2,
        v: Math.random() * 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, w, h);

    for (let p of dust) {
        p.y -= p.v;

        if (p.y < 0) p.y = h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(214,178,94,0.6)";
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();

/* TEXT (SAFE) */
titleEl.textContent = "Dramione Library";
quoteEl.textContent = "Between lion and dragon...";

/* BUTTON WORKS */
door.addEventListener("click", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 800);
});
