const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const door = document.getElementById("door");

let w = (canvas.width = innerWidth);
let h = (canvas.height = innerHeight);

window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});

/* =========================
   🌟 DUST PARTICLES (clean cinematic)
========================= */

const dust = [];

for (let i = 0; i < 350; i++) {
    dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 1.6 + 0.2,
        v: Math.random() * 0.35 + 0.05
    });
}

/* =========================
   🦁 / 🐉 CONSTELLATIONS
========================= */

function drawConstellations(time) {

    const leftX = 220;
    const rightX = w - 220;
    const baseY = h * 0.35;

    // 🦁 LION
    for (let i = 0; i < 18; i++) {

        const x = leftX + Math.cos(i * 0.7) * 35 + Math.sin(time * 0.002 + i) * 1.2;
        const y = baseY + i * 12;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.85)";
        ctx.fill();
    }

    // 🐉 DRAGON
    for (let i = 0; i < 18; i++) {

        const x = rightX + Math.sin(i * 0.7) * 35 + Math.sin(time * 0.002 + i) * 1.2;
        const y = baseY + i * 12;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.85)";
        ctx.fill();
    }
}

/* =========================
   ✨ FATE THREAD (clean cinematic)
========================= */

function drawFateThread(time) {

    const leftX = 220;
    const rightX = w - 220;
    const baseY = h * 0.35;

    const x1 = leftX + 40;
    const x2 = rightX - 40;
    const y = baseY + 90;

    ctx.beginPath();
    ctx.moveTo(x1, y);

    for (let i = 0; i <= 60; i++) {

        const t = i / 60;
        const x = x1 + (x2 - x1) * t;

        // ✨ мягкая кино-волна (без зигзагов)
        const wave = Math.sin(t * Math.PI) * 6;
        const breathe = Math.sin(time * 0.002) * 4;

        const yy = y + wave + breathe;

        ctx.lineTo(x, yy);
    }

    ctx.strokeStyle = "rgba(214,178,94,0.22)";
    ctx.lineWidth = 0.9;

    ctx.stroke();

    // 💫 center pulse
    ctx.beginPath();
    ctx.arc(w / 2, y, 3, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(255,220,150,0.85)";
    ctx.fill();
}

/* =========================
   🌌 MAIN ANIMATION
========================= */

function animate(time) {

    ctx.clearRect(0, 0, w, h);

    /* 🌟 dust */
    for (let p of dust) {

        p.y -= p.v;
        if (p.y < 0) p.y = h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.45)";

        // ✨ редкие звёздные вспышки
        if (Math.random() > 0.985) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#d6b25e";
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fill();
    }

    /* 🦁🐉 constellations */
    drawConstellations(time);

    /* ✨ fate thread */
    drawFateThread(time);

    requestAnimationFrame(animate);
}

animate();

/* =========================
   TEXT
========================= */

titleEl.textContent = "Dramione Library";
quoteEl.textContent = "Between lion and dragon, destiny unfolds.";

/* =========================
   ENTER
========================= */

door.addEventListener("click", () => {

    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 1200);
});
