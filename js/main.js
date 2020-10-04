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
  fullSizeCommentsList.innerHTML = ``;
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

const picturesList = createPictures(PICTURES_COUNT);
renderPicture(picturesList);
renderBigPictureElement(picturesList[0]);

displayCommentsCounter.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);

const FILTER_PREFIX = `effects__preview--`;
const FILTER_NAMES = [`chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_GAP = 25;
const MAX_TAG_COUNT = 5;
const uploadForm = document.querySelector(`#upload-select-image`);
const uploadFileInput = uploadForm.querySelector(`#upload-file`);
const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
const editForm = uploadForm.querySelector(`.img-upload__overlay`);
const scaleSmaller = uploadForm.querySelector(`.scale__control--smaller`);
const scaleBigger = uploadForm.querySelector(`.scale__control--bigger`);
const scaleValue = uploadForm.querySelector(`.scale__control--value`);
const imgPreview = uploadForm.querySelector(`.img-upload__preview img`);
const effectFieldset = uploadForm.querySelector(`.effects`);
const effectLevel = uploadForm.querySelector(`.img-upload__effect-level`);
const effectLevelPin = uploadForm.querySelector(`.effect-level__pin`);
const effectLevelValue = uploadForm.querySelector(`.effect-level__value`);
const effectLevelDepth = uploadForm.querySelector(`.effect-level__depth`);
const effectNoneFilterInput = uploadForm.querySelector(`#effect-none`);
const textHashtags = uploadForm.querySelector(`.text__hashtags`);
const comment = uploadForm.querySelector(`.text__description`);

const openEditForm = () => {
  document.body.classList.add(`modal-open`);
  editForm.classList.remove(`hidden`);
  effectLevel.style.display = `none`;
  effectNoneFilterInput.checked = true;
  imgPreview.className = ``;
  scaleValue.value = `100%`;
  imgPreview.style.transform = `scale(1)`;

  uploadFileInput.removeEventListener(`change`, onUploadFileInputChange);

  window.addEventListener(`keydown`, onWindowEscKeydown);
  uploadCancel.addEventListener(`click`, onUploadCancelClick);
  scaleSmaller.addEventListener(`click`, onScaleSmallerClick);
  scaleBigger.addEventListener(`click`, onScaleBiggerClick);
  effectFieldset.addEventListener(`change`, onEffectFieldsetChange);
  effectLevelPin.addEventListener(`mouseup`, onEffectLevelPinMouseUp);
  textHashtags.addEventListener(`input`, onTextHashtagsInput);
  uploadForm.addEventListener(`submit`, onUploadFormSubmit);
};

const closeEditForm = () => {
  document.body.classList.remove(`modal-open`);
  editForm.classList.add(`hidden`);
  uploadFileInput.value = ``;
  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);
  window.removeEventListener(`keydown`, onWindowEscKeydown);
  uploadCancel.removeEventListener(`click`, onUploadCancelClick);
  scaleSmaller.removeEventListener(`click`, onScaleSmallerClick);
  scaleBigger.removeEventListener(`click`, onScaleBiggerClick);
  effectFieldset.removeEventListener(`change`, onEffectFieldsetChange);
  effectLevelPin.removeEventListener(`mouseup`, onEffectLevelPinMouseUp);
  textHashtags.removeEventListener(`input`, onTextHashtagsInput);
  uploadForm.removeEventListener(`submit`, onUploadFormSubmit);
};

const onUploadFileInputChange = () => {
  openEditForm();
};

uploadFileInput.addEventListener(`change`, onUploadFileInputChange);

const onWindowEscKeydown = (evt) => {
  if (evt.key === `Escape` && !(document.activeElement === textHashtags || document.activeElement === comment)) {
    evt.preventDefault();
    closeEditForm();
  }
};

const onUploadCancelClick = () => {
  closeEditForm();
};

const checkScales = (initialScale, currentScale) => {
  if (initialScale !== currentScale) {
    scaleValue.value = `${currentScale}%`;
    imgPreview.style.transform = `scale(${currentScale / 100})`;
  }
};

const onScaleSmallerClick = () => {
  const initialScale = parseInt(scaleValue.value, 10);
  let currentScale = initialScale - SCALE_GAP;
  currentScale = currentScale < MIN_SCALE_VALUE ? MIN_SCALE_VALUE : currentScale;
  checkScales(initialScale, currentScale);
};

const onScaleBiggerClick = () => {
  const initialScale = parseInt(scaleValue.value, 10);
  let currentScale = initialScale + SCALE_GAP;
  currentScale = currentScale > MAX_SCALE_VALUE ? MAX_SCALE_VALUE : currentScale;
  checkScales(initialScale, currentScale);
};

const onEffectFieldsetChange = (evt) => {
  imgPreview.className = ``;
  imgPreview.style.filter = ``;
  const selectedValue = evt.target.value;
  if (selectedValue !== `none`) {
    imgPreview.classList.add(`${FILTER_PREFIX}${selectedValue}`);
    effectLevel.style.display = `block`;
    effectLevelValue.value = `100`;
    effectLevelPin.style.left = `100%`;
    effectLevelDepth.style.width = `100%`;
  } else {
    effectLevel.style.display = `none`;
  }
};

const onEffectLevelPinMouseUp = () => {
  const currentLevelValue = effectLevelValue.value;
  const currentFilter = imgPreview.className.split(`\-\-`)[1];
  let appliedFilter = ``;
  switch (currentFilter) {
    case FILTER_NAMES[0]:
      appliedFilter = `grayscale(${currentLevelValue / 100})`;
      break;
    case FILTER_NAMES[1]:
      appliedFilter = `sepia(${currentLevelValue / 100})`;
      break;
    case FILTER_NAMES[2]:
      appliedFilter = `invert(${currentLevelValue}%)`;
      break;
    case FILTER_NAMES[3]:
      appliedFilter = `blur(${Math.round(currentLevelValue / 33)}px)`;
      break;
    case FILTER_NAMES[4]:
      appliedFilter = `brightness(${1 + Math.round(currentLevelValue / 50)})`;
      break;
  }
  imgPreview.style.filter = appliedFilter;
};

const startWithHash = (hashes) => {
  return hashes.every((hash) => hash.startsWith(`#`));
};

const checkRegEx = (hashes) => {
  const regEx = RegExp(`^(#[а-яА-ЯёЁa-zA-Z0-9]+,? *)*#[а-яА-ЯёЁa-zA-Z0-9]{4,19}$`);
  return hashes.every((hash) => regEx.test(hash));
};

const checkDuplicatesAbsence = (hashes) => {
  return hashes.length === new Set(hashes.map((el) => el.toUpperCase())).size;
};

const checkTagMaxCount = (hashes) => {
  return hashes.length <= MAX_TAG_COUNT;
};

const checkAbsenceTags = (hashInputValue) => {
  return hashInputValue.length === 0;
};

const checkHashTags = () => {
  const hashInputValue = textHashtags.value.trim();
  const hashes = hashInputValue.split(` `).filter((el) => el.length > 0);
  return checkAbsenceTags(hashInputValue)
    || (startWithHash(hashes) && checkRegEx(hashes) && checkDuplicatesAbsence(hashes) && checkTagMaxCount(hashes));
};

const onTextHashtagsInput = () => {
  if (!checkHashTags()) {
    textHashtags.setCustomValidity(`Хэш-тег не прошёл валидацию`);
  } else {
    textHashtags.setCustomValidity(``);
  }
};

const onUploadFormSubmit = (evt) => {
  if (!textHashtags.validity.valid) {
    evt.preventDefault();
  }
};
