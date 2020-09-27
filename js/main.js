'use strict';

const PICTURES_COUNT = 25;
const COMMENTS = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const LIKES_START = 15;
const LIKES_END = 200;
const COMMENTS_START = 1;
const COMMENTS_END = 6;
const picturesBlock = document.querySelector(`.pictures`);
const templatePicturesBlock = document.querySelector(`#picture`).content;
const bigPictureElement = document.querySelector(`.big-picture`);
const fullSizePicture = bigPictureElement.querySelector(`.big-picture__img img`);
const fullSizeLikesCounter = bigPictureElement.querySelector(`.likes-count`);
const displayCommentsCounter = bigPictureElement.querySelector(`.social__comment-count`);
const fullSizeCommentsCounter = bigPictureElement.querySelector(`.comments-count`);
const fullSizeCommentsList = bigPictureElement.querySelector(`.social__comments`);
const commentsLoader = bigPictureElement.querySelector(`.comments-loader`);
const fullSizePictureCaption = bigPictureElement.querySelector(`.social__caption`);
const mainBody = document.querySelector(`body`);

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
      description: `Здесь могло быть описание фотографии`,
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
      avatar: `img/avatar-` + getRandomNumber(COMMENTS_START, COMMENTS_END) + `.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES)
    });
  }
  return comments;
};

const createTemplatePicture = function (pictureData) {
  const templatePicture = templatePicturesBlock.cloneNode(true);
  templatePicture.querySelector(`img`).src = pictureData.url;
  templatePicture.querySelector(`.picture__likes`).textContent = pictureData.likes;
  templatePicture.querySelector(`.picture__comments`).textContent = pictureData.comments.length;
  return templatePicture;
};

const cleanCommentsList = function () {
  while (fullSizeCommentsList.firstChild) {
    fullSizeCommentsList.removeChild(fullSizeCommentsList.firstChild);
  }
};

const createSocialComment = function (comment) {
  const commentElement = document.createElement(`li`);
  const commentAvatar = document.createElement(`img`);
  const commentText = document.createElement(`p`);

  commentAvatar.classList.add(`social__picture`);
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = `35`;
  commentAvatar.height = `35`;
  commentText.classList.add(`social__text`);
  commentText.textContent = comment.message;
  commentElement.classList.add(`social__comment`);
  commentElement.appendChild(commentAvatar);
  commentElement.appendChild(commentText);

  return commentElement;
};

const renderCommentsList = function (commentsList) {
  cleanCommentsList();
  const fragment = document.createDocumentFragment();

  for (let comment of commentsList) {
    fragment.appendChild(createSocialComment(comment));
  }

  fullSizeCommentsList.appendChild(fragment);
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

const renderBigPictureElement = function (picture) {
  fullSizePicture.src = picture.url;
  fullSizeLikesCounter.textContent = picture.likes;
  fullSizeCommentsCounter.textContent = picture.comments.length;
  renderCommentsList(picture.comments);
  fullSizePictureCaption.textContent = picture.description;
};

const picturesList = createPictures(25);
renderPicture(picturesList);
renderBigPictureElement(picturesList[0]);

bigPictureElement.classList.remove(`hidden`);
mainBody.classList.add(`modal-open`);
displayCommentsCounter.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);
