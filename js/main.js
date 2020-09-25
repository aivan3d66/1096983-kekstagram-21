'use strict';

const OBJECT_COUNT = 25;
const COMMENTS = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`];
const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomData = function (items) {
  let randomIndex = Math.floor(Math.random() * items.length);
  let randomValue = items[randomIndex];
  return randomValue;
};

const createDescription = function () {
  let descriptionData = [];
  for (let i = 0; i < OBJECT_COUNT; i++) {
    descriptionData.push({
      url: `photos/` + getRandomNumber(1, 25) + `.jpg`,
      description: `Описание фотографии`,
      likes: getRandomNumber(15, 200),
      comments: createComments()
    });
  }
  return descriptionData;
};

const createComments = function () {
  let commentsMassive = [];
  for (let i = 0; i < 1; i++) {
    commentsMassive.push({
      avatar: `img/avatar-` + getRandomNumber(1, 6) + `.svg`,
      message: getRandomData(COMMENTS),
      name: getRandomData(NAMES)
    });
  }
  return createComments;
};

const picturesBlock = document.querySelector(`.pictures`);
const templatePicturesBlock = document.querySelector(`#picture`).content;

const createTemplatePicture = function (descriptionData) {
  let templatePicture = templatePicturesBlock.cloneNode(true);
  templatePicture.querySelector(`img`).src = descriptionData.url;
  templatePicture.querySelector(`.picture__likes`).textContent = descriptionData.likes;
  templatePicture.querySelector(`.picture__comments`).textContent = descriptionData.comments;
  return templatePicture;
};

const renderPicture = function () {
  let pictureItem = createDescription();
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < pictureItem.length; i++) {
    fragment.appendChild(createTemplatePicture(pictureItem[i]));
    picturesBlock.appendChild(fragment);
  }
};

renderPicture();
