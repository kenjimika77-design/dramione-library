javascript
document.addEventListener("DOMContentLoaded", () => {
    // 1. СТАРТ ВОЛШЕБНОЙ ЗОЛОТОЙ ПЫЛИ
    const container = document.getElementById("particles-container");
    const particleCount = 35; 

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }

    // 2. ИНТЕРАКТИВНЫЕ ЛАЙКИ
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("liked");
        });
    });

    // 3. ПОЛНОЦЕННЫЙ РАБОЧИЙ МУЗЫКАЛЬНЫЙ ПЛЕЕР
    const audio = document.getElementById("main-audio");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressFill = document.getElementById("progress-fill");
    const currentTimeEl = document.getElementById("current-time");
    const durationTimeEl = document.getElementById("duration-time");
    const loopBtn = document.getElementById("loop-btn");

    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(err => console.log("Поместите файл rewrite_the_stars.mp3 в корень сайта"));
            playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        }
    });

    audio.addEventListener("timeupdate", () => {
        const { duration, currentTime } = audio;
        if (!duration) return;
        
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
        durationTimeEl.textContent = formatTime(audio.duration);
    });

    progressContainer.addEventListener("click", (e) => {
        const width = progressContainer.querySelector('.line').clientWidth;
        const clickX = e.offsetX - currentTimeEl.clientWidth - 6; 
        const duration = audio.duration;
        
        if(clickX > 0 && clickX < width && duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    });

    loopBtn.addEventListener("click", () => {
        audio.loop = !audio.loop;
        loopBtn.classList.toggle("active", audio.loop);
    });

    audio.addEventListener("ended", () => {
        if(!audio.loop) {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
            progressFill.style.width = '0%';
            currentTimeEl.textContent = "0:00";
        }
    });
});

function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function createParticle(container) {
    const particle = document.createElement("div");
    particle.classList.add("gold-particle");

    const size = Math.random() * 3 + 2; 
    const startX = Math.random() * 100; 
    const duration = Math.random() * 6 + 6; 
    const delay = Math.random() * -12; 

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}vw`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
}
