const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");
const quote = document.getElementById("quote");
const door = document.getElementById("door");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

/* =========================
   PARTICLE CLASS (FIXED)
========================= */

class Particle {
    constructor(x, y, tx = null, ty = null) {
        this.x = x;
        this.y = y;

        this.tx = tx;
        this.ty = ty;

        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.size = Math.random() * 2 + 0.5;
        this.opacity = 1;

        this.mode = tx !== null ? "move" : "float";
    }

    update() {
        if (this.mode === "float") {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= 0.002;
        }

        if (this.mode === "move") {
            this.x += (this.tx - this.x) * 0.08;
            this.y += (this.ty - this.y) * 0.08;

            if (Math.abs(this.x - this.tx) < 1 && Math.abs(this.y - this.ty) < 1) {
                this.mode = "done";
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214,178,94,${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#d6b25e";
        ctx.fill();
    }
}

/* =========================
   LOOP
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
   STEP 1: TITLE BUILD
========================= */

setTimeout(() => {

    const rect = title.getBoundingClientRect();

    title.textContent = "Dramione Library";
    title.style.opacity = 1;

    for (let i = 0; i < 200; i++) {
        particles.push(
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            )
        );
    }

}, 1200);

/* =========================
   STEP 2: QUOTE WRITE
========================= */

const text =
"Between lion and dragon, destiny was written in gold.";

setTimeout(() => {

    quote.style.opacity = 1;

    let i = 0;

    const interval = setInterval(() => {

        quote.textContent += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(interval);

            setTimeout(destroyQuote, 600);
        }

    }, 35);

}, 3000);

/* =========================
   STEP 3: QUOTE → DUST
========================= */

function destroyQuote() {

    const rect = quote.getBoundingClientRect();

    for (let i = 0; i < 180; i++) {
        particles.push(
            new Particle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height,
                canvas.width / 2,
                canvas.height / 2 + 120
            )
        );
    }

    setTimeout(buildButton, 1200);
}

/* =========================
   STEP 4: BUTTON BUILD
========================= */

function buildButton() {

    const rect = door.getBoundingClientRect();

    door.style.opacity = 1;

    for (let i = 0; i < 200; i++) {
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
    }, 600);
}

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
