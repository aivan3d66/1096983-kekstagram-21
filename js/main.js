'use strict';

const PICTURES_COUNT = 25;
const COMMENTS = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`];
const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const LIKES_START = 15;
const LIKES_END = 200;
const COMMENTS_START = 1;
const COMMENTS_END = 6;

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = function (items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomValue = items[randomIndex];
  return randomValue;
};

const createPictures = function (count) {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push({
      url: `photos/` + (i + 1) + `.jpg`,
      description: `Описание фотографии`,
      likes: getRandomNumber(LIKES_START, LIKES_END),
      comments: createComments()
    });
  }
  return pictures;
};

const createComments = function () {
  const comments = [];
  const commentsCount = getRandomNumber(COMMENTS_START, COMMENTS_END);
  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: `img/avatar-` + commentsCount + `.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES)
    });
  }
  return comments;
};

const picturesBlock = document.querySelector(`.pictures`);
const templatePicturesBlock = document.querySelector(`#picture`).content;

const createTemplatePicture = function (pictureData) {
  const templatePicture = templatePicturesBlock.cloneNode(true);
  templatePicture.querySelector(`img`).src = pictureData.url;
  templatePicture.querySelector(`.picture__likes`).textContent = pictureData.likes;
  templatePicture.querySelector(`.picture__comments`).textContent = pictureData.comments.length;
  return templatePicture;
};

const renderPicture = function () {
  const pictures = createPictures(PICTURES_COUNT);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    fragment.appendChild(createTemplatePicture(pictures[i]));
    picturesBlock.appendChild(fragment);
  }
};

renderPicture();
