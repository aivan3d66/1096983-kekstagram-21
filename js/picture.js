'use strict';

(function () {
  const bigPictureElement = document.querySelector(`.big-picture`);
  const pictureCloseButton = document.querySelector(`.big-picture__cancel`);
  const commentTemplateNode = bigPictureElement.querySelector(`.social__comment`).cloneNode(true);
  const fullSizeCommentsList = bigPictureElement.querySelector(`.social__comments`);

  function getHtmlCommentsFragment(comments) {
    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const commentElement = commentTemplateNode.cloneNode(true);

      commentElement.querySelector(`.social__picture`).src = comment.avatar;
      commentElement.querySelector(`.social__picture`).alt = comment.name;
      commentElement.querySelector(`.social__text`).textContent = comment.message;

      fragment.appendChild(commentElement);
    });

    return fragment;
  }

  function galleryEscKeydownHandler(evt) {
    if (window.utils.isEscButton(evt.key)) {
      closePicture();
    }
  }

  function renderPicture(picture) {
    const commentsHtmlFragment = getHtmlCommentsFragment(picture.comments);

    bigPictureElement.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
    bigPictureElement.querySelector(`.likes-count`).textContent = picture.likes;
    bigPictureElement.querySelector(`.comments-count`).textContent = picture.comments.length;
    bigPictureElement.querySelector(`.social__caption`).textContent = picture.description;

    fullSizeCommentsList.textContent = ``;
    fullSizeCommentsList.appendChild(commentsHtmlFragment);
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
