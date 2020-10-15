'use strict';

(function () {
  const picturesBlock = document.querySelector(`.pictures`);
  const templatePicturesBlock = document.querySelector(`#picture`).content.querySelector(`.picture`);

  function getHtmlPicturesFragment(pictures) {
    const fragment = document.createDocumentFragment();

    pictures.forEach((picture) => {
      const templatePicture = templatePicturesBlock.cloneNode(true);
      templatePicture.querySelector(`.picture__img`).src = picture.url;
      templatePicture.querySelector(`.picture__likes`).textContent = picture.likes;
      templatePicture.querySelector(`.picture__comments`).textContent = picture.comments.length;
      fragment.appendChild(templatePicture);
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
