const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const door = document.getElementById("door");

const portal = document.getElementById("portal");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});

/* =========================
   GOLD DUST
========================= */

class Dust {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.2 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }

    update(intensity) {

        const cx = w / 2;
        const cy = h / 2;

        // pull to portal
        this.x += (cx - this.x) * 0.0015 * intensity;
        this.y += (cy - this.y) * 0.0015 * intensity;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.8)";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#d6b25e";
        ctx.fill();
    }
}

const dust = Array.from({ length: 700 }, () => new Dust());

/* =========================
   CONSTELLATIONS (LIVE)
========================= */

const lion = [];
const dragon = [];

for (let i = 0; i < 25; i++) {
    lion.push({ x: 200 + i * 10, y: 200 + Math.sin(i) * 40 });
    dragon.push({ x: w - 200 - i * 10, y: 220 + Math.cos(i) * 40 });
}

/* =========================
   FATE THREAD
========================= */

function drawThread(t) {

    const x1 = 200;
    const x2 = w - 200;
    const y = h / 2;

    ctx.beginPath();
    ctx.moveTo(x1, y);

    for (let i = 0; i <= 40; i++) {
        const p = i / 40;
        const x = x1 + (x2 - x1) * p;
        const wave = Math.sin(p * 10 + t * 0.004) * 30;

        ctx.lineTo(x, y + wave);
    }

    ctx.strokeStyle = "rgba(214,178,94,0.25)";
    ctx.shadowBlur = 40;
    ctx.shadowColor = "#d6b25e";
    ctx.stroke();
}

/* =========================
   PORTAL STATE
========================= */

let energy = 0;

/* =========================
   LOOP
========================= */

function animate(t) {

    ctx.clearRect(0, 0, w, h);

    energy = Math.min(1, energy + 0.0015);

    for (let d of dust) {
        d.update(energy);
        d.draw();
    }

    drawThread(t);

    // portal pulse
    if (energy > 0.2) {
        portal.style.opacity = 1;
        portal.style.transform = `
            translate(-50%, -50%)
            scale(${1 + Math.sin(t * 0.003) * 0.05})
        `;
    }

    requestAnimationFrame(animate);
}

animate(0);

/* =========================
   SEQUENCE
========================= */

setTimeout(() => {
    titleEl.textContent = "Dramione Library";
    titleEl.style.opacity = 1;
}, 2000);

setTimeout(() => {
    quoteEl.textContent =
        "Between lion and dragon, destiny tears reality apart...";
    quoteEl.style.opacity = 1;
}, 3800);

door.addEventListener("click", () => {

    document.body.style.transition = "opacity 1.6s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 1600);
});
