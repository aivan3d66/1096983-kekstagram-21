'use strict';

(function () {
  const picturesBlock = document.querySelector(`.pictures`);
  const templatePicturesBlock = document.querySelector(`#picture`).content;

  function getHtmlPicturesFragment(pictures) {
    const fragment = document.createDocumentFragment();

    pictures.forEach((picture) => {
      const templatePicture = templatePicturesBlock.cloneNode(true);

      templatePicture.querySelector(`img`).src = picture.url;
      templatePicture.querySelector(`.picture__likes`).textContent = picture.likes;
      templatePicture.querySelector(`.picture__comments`).textContent = picture.comments.length;
      fragment.appendChild(templatePicture);
    });
    return fragment;
  }

  function indexOfPicture(picture) {
    const picturesNodeList = picturesBlock.querySelectorAll(`.picture`);
    return Array.from(picturesNodeList).indexOf(picture);
  }

  window.initPictures = () => {
    const picturesHtmlFragment = getHtmlPicturesFragment(window.picturesArr);
    picturesBlock.appendChild(picturesHtmlFragment);
  };

  picturesBlock.addEventListener(`click`, (evt) => {
    const chosenPictureNode = evt.target.closest(`.picture`);
    if (chosenPictureNode) {
      const chosenPictureIndex = indexOfPicture(chosenPictureNode);
      window.picture.render(window.picturesArr[chosenPictureIndex]);
      window.picture.open();
    }
  });
})();
