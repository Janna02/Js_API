"use strict";

// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.

async function getRandomImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=mc-hrEa49QlW5L-YKjWYETR0CMYY6PYPyz5_TjORHg4`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const imageElement = document.getElementById("unsplash-image");
    const photographerNameElement = document.getElementById("author-name");

    imageElement.src = data.urls.regular;
    photographerNameElement.textContent = `Author => ${data.user.name}`;
  } catch (error) {
    document.getElementById("error").textContent = `${error}`;
    console.error(error);
  }
}

function likePhoto() {
  const likesCountElement = document.getElementById("likes-count");
  let likesCount = parseInt(localStorage.getItem("likesCount")) || 0;

  likesCount++;
  localStorage.setItem("likesCount", likesCount);
  likesCountElement.textContent = `How many likes => ${likesCount}`;
}

window.onload = () => {
  getRandomImage();

  const likesCountElement = document.getElementById("likes-count");
  const likesCount = parseInt(localStorage.getItem("likesCount")) || 0;
  likesCountElement.textContent = `How many likes => ${likesCount}`;
};
