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
   SIZE
========================= */

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});

/* =========================
   DUST
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
        this.angle += 0.002;

        this.x = this.baseX + Math.cos(this.angle + time * 0.0005) * this.radius;
        this.y = this.baseY + Math.sin(this.angle + time * 0.0005) * this.radius;

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

const dust = Array.from({ length: 400 }, () => new Dust());

/* =========================
   CONSTELLATIONS
========================= */

function makeStars(offsetX) {
    return Array.from({ length: 18 }, () => ({
        x: offsetX + Math.random() * 180,
        y: 180 + Math.random() * 260
    }));
}

const lion = makeStars(120);
const dragon = makeStars(w - 300);

/* =========================
   DRAW CONSTELLATION
========================= */

function drawConstellation(stars, time) {

    for (let i = 0; i < stars.length; i++) {

        const s = stars[i];
        const pulse = Math.sin(time * 0.002 + i) * 1.2;

        ctx.beginPath();
        ctx.arc(s.x, s.y + pulse, 1.6, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(214,178,94,0.85)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#d6b25e";

        ctx.fill();

        if (i > 0) {
            const p = stars[i - 1];

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = "rgba(214,178,94,0.15)";
            ctx.stroke();
        }
    }
}

/* =========================
   FATE THREAD (MAIN MAGIC)
========================= */

function drawFateThread(time) {

    const x1 = 200;
    const y1 = h / 2 - 60;

    const x2 = w - 200;
    const y2 = h / 2 - 60;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    for (let i = 0; i <= 60; i++) {

        const t = i / 60;
        const x = x1 + (x2 - x1) * t;

        const wave = Math.sin(t * Math.PI * 3 + time * 0.003) * 28;

        const y = y1 + (y2 - y1) * t + wave;

        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "rgba(214,178,94,0.35)";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#d6b25e";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(midX, midY, 3 + Math.sin(time * 0.004) * 2, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(255,230,160,0.9)";
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#ffe8b0";
    ctx.fill();

    ctx.restore();
}

/* =========================
   LOOP
========================= */

function animate(time) {

    ctx.clearRect(0, 0, w, h);

    for (let d of dust) {
        d.update(time);
        d.draw();
    }

    drawConstellation(lion, time);
    drawConstellation(dragon, time);

    drawFateThread(time);

    requestAnimationFrame(animate);
}

animate(0);

/* =========================
   SEQUENCE
========================= */

setTimeout(() => {
    left.style.opacity = 1;
    right.style.opacity = 1;
}, 1200);

setTimeout(() => {
    titleEl.textContent = titleText;
    titleEl.style.opacity = 1;
}, 2800);

setTimeout(() => {
    quoteEl.style.opacity = 1;

    let i = 0;
    const t = setInterval(() => {
        quoteEl.textContent += quoteText[i];
        i++;
        if (i >= quoteText.length) clearInterval(t);
    }, 30);
}, 4200);

setTimeout(() => {
    portal.style.opacity = 1;
    portal.style.transform = "translate(-50%, -50%) scale(1.2)";
}, 6500);

door.addEventListener("click", () => {
    document.body.style.transition = "opacity 1.5s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 1500);
});
