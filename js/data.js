'use strict';

(function () {
  const PICTURES_COUNT = 25;
  const COMMENTS_START = 1;
  const COMMENTS_END = 6;
  const LIKES_START = 15;
  const LIKES_END = 200;

  const mockDataObj = {
    description: [`Не судите строго, я не фотограф`, `Смотрите, что сфотографировал!`, `🌏🌻😻`, `Фотографировал на тапок`, `Зацените фото`],
    message: [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`],
    name: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`]
  };

  const createPictures = function (number) {
    const pictures = [];

    for (let i = 0; i < number; i++) {
      pictures.push({
        url: `photos/${i + 1}.jpg`,
        description: window.utils.getRandomElement(mockDataObj.description),
        likes: window.utils.getRandomNumber(LIKES_START, LIKES_END),
        comments: createComments()
      });
    }
    return pictures;
  };

  const createComments = function () {
    const comments = [];
    const commentsCount = window.utils.getRandomNumber(COMMENTS_START, COMMENTS_END);
    for (let i = 0; i < commentsCount; i++) {
      comments.push({
        avatar: `img/avatar-${window.utils.getRandomNumber(COMMENTS_START, COMMENTS_END)}.svg`,
        message: window.utils.getRandomElement(mockDataObj.message),
        name: window.utils.getRandomElement(mockDataObj.name)
      });
    }
    return comments;
  };

  window.dataGeneration = (number = PICTURES_COUNT) => createPictures(number);
})();
