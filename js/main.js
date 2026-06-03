const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const door = document.getElementById("door");

const left = document.getElementById("constellation-left");
const right = document.getElementById("constellation-right");
const portal = document.getElementById("portal");

const titleText = "Dramione Library";
const quoteText = "Between lion and dragon, destiny bends space and time.";

/* =========================
   CANVAS
========================= */

let w = (canvas.width = innerWidth);
let h = (canvas.height = innerHeight);

window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});

/* =========================
   DUST PARTICLES
========================= */

class Dust {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        this.baseX = this.x;
        this.baseY = this.y;

        this.size = Math.random() * 1.2 + 0.2;
        this.speed = Math.random() * 0.3 + 0.05;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 40 + 10;
    }

    update(time) {

        // orbital motion (cinematic dust field)
        this.angle += 0.002;

        this.x = this.baseX + Math.cos(this.angle + time * 0.0005) * this.radius;
        this.y = this.baseY + Math.sin(this.angle + time * 0.0005) * this.radius;

        // slow upward drift
        this.baseY -= this.speed;

        if (this.baseY < -50) {
            this.baseY = h + 50;
            this.baseX = Math.random() * w;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.7)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#d6b25e";

        ctx.fill();
    }
}

const dust = [];
for (let i = 0; i < 500; i++) {
    dust.push(new Dust());
}

/* =========================
   CONSTELLATIONS (LIVING)
========================= */

const lion = [];
const dragon = [];

function createSide(xOffset) {
    const arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push({
            x: xOffset + Math.random() * 200,
            y: 200 + Math.random() * 250,
            glow: Math.random()
        });
    }
    return arr;
}

lion.push(...createSide(120));
dragon.push(...createSide(w - 320));

/* =========================
   DRAW CONSTELLATION
========================= */

function drawConstellation(stars, time, intensity) {

    ctx.strokeStyle = `rgba(214,178,94,${0.15 * intensity})`;
    ctx.fillStyle = `rgba(214,178,94,${0.9 * intensity})`;

    for (let i = 0; i < stars.length; i++) {

        const s = stars[i];

        // pulse glow
        const pulse = Math.sin(time * 0.002 + i) * 1.5;

        ctx.beginPath();
        ctx.arc(s.x, s.y + pulse, 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (i > 0) {
            const p = stars[i - 1];

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(s.x, s.y);
            ctx.stroke();
        }
    }
}

/* =========================
   THREAD OF DESTINY
========================= */

function drawThread(time) {

    const x1 = 200;
    const x2 = w - 200;
    const y = h / 2;

    const wave = Math.sin(time * 0.003) * 20;

    ctx.beginPath();
    ctx.moveTo(x1, y);

    for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const x = x1 + (x2 - x1) * t;
        const yy = y + Math.sin(t * 10 + time * 0.002) * 30 + wave;

        ctx.lineTo(x, yy);
    }

    ctx.strokeStyle = "rgba(214,178,94,0.25)";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#d6b25e";
    ctx.stroke();
}

/* =========================
   PORTAL ZOOM
========================= */

let zoom = 0;

/* =========================
   MAIN LOOP
========================= */

function animate(time) {

    ctx.clearRect(0, 0, w, h);

    // dust
    for (let d of dust) {
        d.update(time);
        d.draw();
    }

    // constellations
    drawConstellation(lion, time, 1);
    drawConstellation(dragon, time, 1);

    // destiny thread
    drawThread(time);

    // portal breathing
    if (zoom > 0) {
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 120 + Math.sin(time * 0.002) * 10, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.08)";
        ctx.shadowBlur = 40;
        ctx.shadowColor = "#d6b25e";

        ctx.fill();
    }
   
function drawFateThread(time) {

    const x1 = 240;               // лев
    const y1 = 260;

    const x2 = canvas.width - 240; // дракон
    const y2 = 260;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    // создаём магическую дугу
    for (let i = 0; i <= 30; i++) {

        const t = i / 30;

        const x = x1 + (x2 - x1) * t;

        // дуга + "дыхание"
        const wave =
            Math.sin(t * Math.PI * 2 + time * 0.003) * 25;

        const y =
            y1 + (y2 - y1) * t
            + wave
            - Math.sin(time * 0.002) * 10;

        ctx.lineTo(x, y);
    }

    // ✨ стиль линии (магия)
    ctx.strokeStyle = "rgba(214,178,94,0.35)";
    ctx.lineWidth = 2;

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#d6b25e";

    ctx.stroke();

    // ✨ центральный пульс (сердце судьбы)
    ctx.beginPath();
    ctx.arc(midX, midY, 3 + Math.sin(time * 0.005) * 2, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(255,220,140,0.8)";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#ffe0a3";

    ctx.fill();
}
    requestAnimationFrame(animate);
}

animate(0);

/* =========================
   SEQUENCE
========================= */

/* CONSTELLATIONS AWAKEN */
setTimeout(() => {
    left.style.opacity = 1;
    right.style.opacity = 1;
}, 1200);

/* TITLE */
setTimeout(() => {
    titleEl.textContent = titleText;
    titleEl.style.opacity = 1;
}, 3000);

/* QUOTE */
setTimeout(() => {
    quoteEl.style.opacity = 1;

    let i = 0;
    const t = setInterval(() => {
        quoteEl.textContent += quoteText[i];
        i++;
        if (i >= quoteText.length) clearInterval(t);
    }, 30);
}, 4500);

/* PORTAL IGNITION */
setTimeout(() => {
    zoom = 1;

    portal.style.opacity = 1;
    portal.style.transform = "translate(-50%, -50%) scale(1.2)";
}, 7000);

/* ENTER */
door.addEventListener("click", () => {

    document.body.style.transition = "opacity 2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 2000);
});
