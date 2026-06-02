const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");
const quote = document.getElementById("quote");
const door = document.getElementById("door");

/* -------------------------
   Canvas
------------------------- */

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* -------------------------
   Dust Particles
------------------------- */

const particles = [];

class Particle {

    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;

        this.size = Math.random() * 1.8 + 0.5;

        this.speedY = Math.random() * 0.35 + 0.08;
        this.speedX = (Math.random() - 0.5) * 0.15;

        this.opacity = Math.random() * 0.6 + 0.1;
    }

    update() {

        this.y -= this.speedY;
        this.x += this.speedX;

        if (
            this.y < -20 ||
            this.x < -20 ||
            this.x > canvas.width + 20
        ) {
            this.reset();
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(214,178,94,${this.opacity})`;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#d6b25e";

        ctx.fill();
    }
}

for (let i = 0; i < 220; i++) {
    particles.push(new Particle());
}

/* -------------------------
   Animation Loop
------------------------- */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

/* -------------------------
   Title
------------------------- */

const titleText = "Dramione Library";

setTimeout(() => {

    title.textContent = titleText;

    title.style.transition =
        "opacity 2s ease";

    title.style.opacity = "1";

}, 1200);

/* -------------------------
   Quote
------------------------- */

const quoteText =
"Between the lion and the dragon, destiny wrote its own story.";

setTimeout(() => {

    quote.style.opacity = "1";

    let i = 0;

    const typing = setInterval(() => {

        quote.textContent += quoteText[i];

        i++;

        if (i >= quoteText.length) {
            clearInterval(typing);
        }

    }, 45);

}, 3200);

/* -------------------------
   Button
------------------------- */

setTimeout(() => {

    door.style.opacity = "1";

}, 7600);

/* -------------------------
   Portal Enter
------------------------- */

door.addEventListener("click", () => {

    document.body.style.transition =
        "opacity 1.5s ease";

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href =
            "library.html";

    }, 1500);

});
