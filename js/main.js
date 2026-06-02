const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");
const quote = document.getElementById("quote");
const door = document.getElementById("door");

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
   PARTICLES SYSTEM
========================= */

class Particle {
    constructor(x, y, targetX = null, targetY = null) {
        this.x = x;
        this.y = y;

        this.targetX = targetX;
        this.targetY = targetY;

        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.05 + 0.02;

        this.opacity = Math.random() * 0.8 + 0.2;

        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.mode = targetX !== null ? "attract" : "float";
    }

    update() {
        if (this.mode === "float") {
            this.x += this.vx;
            this.y += this.vy;

            this.vy += 0.01; // лёгкая гравитация
            this.opacity -= 0.002;

        } else if (this.mode === "attract") {
            this.x += (this.targetX - this.x) * this.speed;
            this.y += (this.targetY - this.y) * this.speed;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(214,178,94,${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#d6b25e";

        ctx.fill();
    }
}

let particles = [];

/* =========================
   BACKGROUND DUST
========================= */

for (let i = 0; i < 180; i++) {
    particles.push(
        new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        )
    );
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

    particles = particles.filter(p => p.opacity > 0);

    requestAnimationFrame(animate);
}

animate();

/* =========================
   TITLE BUILD (FROM DUST)
========================= */

const titleText = "Dramione Library";
title.textContent = "";

function buildTitle() {
    const rect = title.getBoundingClientRect();

    title.textContent = titleText;
    title.style.opacity = 1;

    // взрыв пыли в центр заголовка
    for (let i = 0; i < 120; i++) {
        particles.push(
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            )
        );
    }
}

setTimeout(buildTitle, 1200);

/* =========================
   QUOTE (WRITE EFFECT)
========================= */

const quoteText =
"Between lion and dragon, destiny was written in gold.";

function writeQuote() {
    let i = 0;
    quote.style.opacity = 1;

    const interval = setInterval(() => {
        quote.textContent += quoteText[i];
        i++;

        if (i >= quoteText.length) {
            clearInterval(interval);
            destroyQuoteIntoDust();
        }
    }, 35);
}

setTimeout(writeQuote, 3200);

/* =========================
   QUOTE → DUST → BUTTON
========================= */

function destroyQuoteIntoDust() {
    const rect = quote.getBoundingClientRect();

    for (let i = 0; i < 140; i++) {
        particles.push(
            new Particle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height,
                window.innerWidth / 2,
                window.innerHeight / 2 + 120
            )
        );
    }

    setTimeout(buildButton, 1500);
}

/* =========================
   BUTTON BUILD
========================= */

function buildButton() {
    const rect = door.getBoundingClientRect();

    door.style.opacity = 1;

    for (let i = 0; i < 160; i++) {
        particles.push(
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            )
        );
    }

    setTimeout(() => {
        door.style.opacity = 1;
        door.style.transform = "scale(1)";
    }, 800);
}

/* =========================
   PORTAL ENTER
========================= */

door.addEventListener("click", () => {
    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "library.html";
    }, 1200);
});
