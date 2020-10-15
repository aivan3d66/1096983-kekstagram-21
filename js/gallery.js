'use strict';

(function () {
  const picturesBlock = document.querySelector(`.pictures`);
  const templatePicturesBlock = document.querySelector(`#picture`).content.querySelector(`.picture`);

  function getHtmlPicturesFragment(pictures) {
    const fragment = document.createDocumentFragment();

    pictures.forEach((picture) => {
      const elem = templatePicturesBlock.cloneNode(true);
      elem.querySelector(`.picture__img`).src = picture.url;
      elem.querySelector(`.picture__likes`).textContent = picture.likes;
      elem.querySelector(`.picture__comments`).textContent = picture.comments.length;
      fragment.appendChild(elem);
    });

    return fragment;
  }

  function getIndexOfPicture(picture) {
    const picturesNodeList = picturesBlock.querySelectorAll(`.picture`);
    return Array.from(picturesNodeList).indexOf(picture);
  }

  picturesBlock.addEventListener(`click`, (evt) => {
    const chosenPictureNode = evt.target.closest(`.picture`);
    if (chosenPictureNode) {
      const chosenPictureIndex = getIndexOfPicture(chosenPictureNode);
      window.picture.render(window.pictures[chosenPictureIndex]);
      window.picture.open();
    }
  });

  window.galleryIinit = () => {
    const picturesHtmlFragment = getHtmlPicturesFragment(window.pictures);
    picturesBlock.appendChild(picturesHtmlFragment);
  };
})();
