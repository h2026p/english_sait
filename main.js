document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.getElementById('profile-image');
    const imageUpload = document.getElementById('imageUpload');

    // Загрузка сохранённых данных при загрузке страницы
    loadSavedData();

    // Обработчик клика на изображение для смены картинки
    profileImage.addEventListener('click', function() {
        imageUpload.click();
    });

    // Обработчик выбора файла
    imageUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                // Сохраняем новую картинку
                saveImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
});

// Функция установки рейтинга
function setRating(rating) {
    // Обновляем отображение звёзд
    updateStarsDisplay(rating);

    // Показываем результат
    document.getElementById('rating-result').textContent =
        `Вы оценили на ${rating} из 5 звёзд`;

    // Сохраняем рейтинг
    saveRating(rating);
}

// Функция обновления отображения звёзд
function updateStarsDisplay(rating) {
    const stars = document.querySelectorAll('#stars span');

    for (let i = 0; i < stars.length; i++) {
        if (i < rating) {
            stars[i].style.color = '#ffd700'; // Золотой цвет для выбранных звёзд
        } else {
            stars[i].style.color = '#ddd'; // Серый цвет для невыбранных
        }
    }
}

// Сохранение изображения в localStorage
function saveImage(imageSrc) {
    localStorage.setItem('profileImage', imageSrc);
}

// Сохранение рейтинга в localStorage
function saveRating(rating) {
    localStorage.setItem('userRating', rating);
}

// Загрузка сохранённых данных
function loadSavedData() {
    // Загружаем сохранённую картинку
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('profile-image').src = savedImage;
    }

    // Загружаем сохранённую оценку
    const savedRating = localStorage.getItem('userRating');
    if (savedRating) {
        updateStarsDisplay(parseInt(savedRating));
        document.getElementById('rating-result').textContent =
            `Вы оценили на ${savedRating} из 5 звёзд`;
    }
}
