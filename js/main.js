document.addEventListener('DOMContentLoaded', () => {
    // 1. Оживление лайков (сердечек) на карточках
    const hearts = document.querySelectorAll('.moment-heart');
    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            // Переключаем класс регулярного и закрашенного сердечка
            heart.classList.toggle('fa-regular');
            heart.classList.toggle('fa-solid');
            
            // Меняем цвет при активном лайке
            if (heart.classList.contains('fa-solid')) {
                heart.style.color = '#a83b54';
            } else {
                heart.style.color = '#514057';
            }
        });
    });

    // 2. Базовая логика для кнопки Play в плеере
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            playBtn.classList.toggle('fa-circle-play');
            playBtn.classList.toggle('fa-circle-pause');
            
            if (playBtn.classList.contains('fa-circle-pause')) {
                console.log('Воспроизведение трека: Rewrite The Stars');
            } else {
                console.log('Пауза');
            }
        });
    }
});
