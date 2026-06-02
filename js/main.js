const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const titleText = "Dramione Library";
const quoteText = "Between lion and dragon, destiny becomes dust and light.";

const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const door = document.getElementById("door");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* =========================
   PARTICLES
========================= */

class Particle {
    constructor(x, y) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.tx = x;
        this.ty = y;

        this.vx = 0;
        this.vy = 0;

        this.friction = 0.88;
        this.size = 1.6;

        this.mode = "move";
    }

    setTarget(x, y) {
        this.tx = x;
        this.ty = y;
    }

    update() {

        let dx = this.tx - this.x;
        let dy = this.ty - this.y;

        this.vx += dx * 0.02;
        this.vy += dy * 0.02;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(214,178,94,0.85)";
        ctx.fill();
    }
}

let particles = [];

/* =========================
   TEXT SHAPE GENERATOR
========================= */

function getTextPoints(text, fontSize = 90) {

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");

    off.width = canvas.width;
    off.height = canvas.height;

    offCtx.fillStyle = "white";
    offCtx.font = `bold ${fontSize}px Cinzel`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    offCtx.fillText(text, canvas.width / 2, canvas.height / 2);

    const data = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    const points = [];

    for (let y = 0; y < canvas.height; y += 6) {
        for (let x = 0; x < canvas.width; x += 6) {

            const i = (y * canvas.width + x) * 4;

            if (data[i + 3] > 128) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

/* =========================
   INIT TEXT PARTICLES
========================= */

function buildText(text) {

    const points = getTextPoints(text);

    particles = [];

    for (let i = 0; i < points.length; i++) {
        particles.push(new Particle(points[i].x, points[i].y));
    }
}

/* =========================
   DISSOLVE TEXT
========================= */

function dissolveTo(centerX, centerY) {

    particles.forEach(p => {
        p.setTarget(
            centerX + (Math.random() - 0.5) * 200,
            centerY + (Math.random() - 0.5) * 200
        );
    });
}

/* =========================
   BUTTON FORMATION
========================= */

function buildButton() {

    const rect = door.getBoundingClientRect();

    particles.forEach(p => {
        p.setTarget(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * 30,
            rect.top + rect.height / 2 + (Math.random() - 0.5) * 15
        );
    });

    door.style.opacity = 1;
}

/* =========================
   ANIMATION LOOP
========================= */

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

/* =========================
   SEQUENCE (LEVEL 3 FLOW)
========================= */

/* STEP 1 — build title */
setTimeout(() => {
    buildText(titleText);
}, 800);

/* STEP 2 — quote appears */
setTimeout(() => {
    quoteEl.style.opacity = 1;
    quoteEl.textContent = quoteText;
}, 3500);

/* STEP 3 — dissolve into portal */
setTimeout(() => {
    dissolveTo(canvas.width / 2, canvas.height / 2 + 80);
}, 6000);

/* STEP 4 — reform into button */
setTimeout(() => {
    buildButton();
}, 8000);

/* STEP 5 — enter */
door.addEventListener("click", () => {
    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 1200);
});
