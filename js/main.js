const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const door = document.getElementById("door");

const portal = document.getElementById("portal");
const leftConst = document.getElementById("constellation-left");
const rightConst = document.getElementById("constellation-right");

const titleText = "Dramione Library";
const quoteText = "Between lion and dragon, destiny becomes dust and light.";

let particles = [];
let mode = "dust";

/* =========================
   CANVAS SETUP
========================= */

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =========================
   PARTICLE CLASS
========================= */

class Particle {
    constructor(x, y) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.tx = x || this.x;
        this.ty = y || this.y;

        this.vx = 0;
        this.vy = 0;

        this.size = Math.random() * 2 + 0.6;
        this.friction = 0.88;
    }

    setTarget(x, y) {
        this.tx = x;
        this.ty = y;
    }

    update() {
        if (mode === "dust") {
            this.x += Math.sin(Date.now() * 0.001 + this.y) * 0.2;
            this.y += Math.cos(Date.now() * 0.001 + this.x) * 0.2;
            return;
        }

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
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#d6b25e";

        ctx.fill();
    }
}

/* =========================
   INIT DUST
========================= */

function initDust(count = 250) {
    particles = [];

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

initDust();

/* =========================
   TEXT SHAPE
========================= */

function getPoints(text, size = 90) {
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");

    off.width = canvas.width;
    off.height = canvas.height;

    octx.fillStyle = "white";
    octx.font = `bold ${size}px Cinzel`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";

    octx.fillText(text, canvas.width / 2, canvas.height / 2);

    const data = octx.getImageData(0, 0, off.width, off.height).data;

    const pts = [];

    for (let y = 0; y < off.height; y += 6) {
        for (let x = 0; x < off.width; x += 6) {
            let i = (y * off.width + x) * 4;

            if (data[i + 3] > 128) {
                pts.push({ x, y });
            }
        }
    }

    return pts;
}

/* =========================
   BUILD TEXT
========================= */

function buildText(text) {
    mode = "text";

    const pts = getPoints(text, 90);

    particles.forEach((p, i) => {
        const pt = pts[i % pts.length];
        p.setTarget(pt.x, pt.y);
    });
}

/* =========================
   PORTAL MODE
========================= */

function buildPortal() {
    mode = "portal";

    const rect = portal.getBoundingClientRect();

    particles.forEach(p => {
        p.setTarget(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
            rect.top + rect.height / 2 + (Math.random() - 0.5) * 80
        );
    });

    portal.style.opacity = "1";
    portal.style.transform = "translate(-50%, -50%) scale(1)";
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
   SEQUENCE
========================= */

/* 1. START DUST */
setTimeout(() => {
    buildText(titleText);
    titleEl.textContent = titleText;
    titleEl.style.opacity = "1";
}, 1200);

/* 2. CONSTELLATIONS */
setTimeout(() => {
    leftConst.style.opacity = "1";
    rightConst.style.opacity = "1";
}, 2500);

/* 3. QUOTE */
setTimeout(() => {
    quoteEl.style.opacity = "1";

    let i = 0;
    const t = setInterval(() => {
        quoteEl.textContent += quoteText[i];
        i++;
        if (i >= quoteText.length) clearInterval(t);
    }, 35);
}, 4000);

/* 4. DISINTEGRATE INTO PORTAL */
setTimeout(() => {
    buildPortal();
}, 7000);

/* 5. BUTTON APPEAR */
setTimeout(() => {
    door.style.opacity = "1";
}, 8500);

/* 6. ENTER */
door.addEventListener("click", () => {
    document.body.style.transition = "opacity 1.5s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 1500);
});
