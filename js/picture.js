'use strict';

(function () {
  const bigPictureElement = document.querySelector(`.big-picture`);
  const pictureCloseButton = document.querySelector(`.big-picture__cancel`);

  function galleryEscKeydownHandler(evt) {
    if (window.utils.isEscButton(evt.key)) {
      closePicture();
    }
  }

  function renderPicture(picture) {
    bigPictureElement.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
    bigPictureElement.querySelector(`.likes-count`).textContent = picture.likes;
    bigPictureElement.querySelector(`.comments-count`).textContent = picture.comments.length;
    bigPictureElement.querySelector(`.social__caption`).textContent = picture.description;

    window.comments.set(picture.comments);
  }

  function openPicture() {
    document.body.classList.add(`modal-open`);
    bigPictureElement.classList.remove(`hidden`);
    document.addEventListener(`keydown`, galleryEscKeydownHandler);
  }

  function closePicture() {
    document.body.classList.remove(`modal-open`);
    bigPictureElement.classList.add(`hidden`);
    document.removeEventListener(`keydown`, galleryEscKeydownHandler);
  }

  function initPicture() {
    bigPictureElement.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPictureElement.querySelector(`.comments-loader`).classList.add(`hidden`);
  }

  pictureCloseButton.addEventListener(`click`, closePicture);

  window.picture = {
    render: renderPicture,
    open: openPicture,
    close: closePicture,
    init: initPicture
  };
})();
