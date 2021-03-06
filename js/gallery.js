'use strict';

const picturesBlock = document.querySelector(`.pictures`);
const templatePicturesBlock = document.querySelector(`#picture`).content.querySelector(`.picture`);
const imgFilters = document.querySelector(`.img-filters`);

const getHtmlPicturesFragment = function (pictures) {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const templatePicture = templatePicturesBlock.cloneNode(true);
    templatePicture.querySelector(`.picture__img`).src = picture.url;
    templatePicture.querySelector(`.picture__likes`).textContent = picture.likes;
    templatePicture.querySelector(`.picture__comments`).textContent = picture.comments.length;
    fragment.appendChild(templatePicture);
  });

  return fragment;
};

const getIndexOfPicture = function (picture) {
  const picturesNodeList = picturesBlock.querySelectorAll(`.picture`);
  return Array.from(picturesNodeList).indexOf(picture);
};

picturesBlock.addEventListener(`click`, (evt) => {
  const chosenPictureNode = evt.target.closest(`.picture`);
  if (chosenPictureNode) {
    const chosenPictureIndex = getIndexOfPicture(chosenPictureNode);
    window.picture.render(window.pictures[chosenPictureIndex]);
    window.picture.open();
  }
});

const removePicturesNodes = () => {
  const picturesNodes = document.querySelectorAll(`.picture`);

  for (const picture of picturesNodes) {
    picturesBlock.removeChild(picture);
  }
};

const renderPictures = (pictures) => {
  window.pictures = pictures;
  const picturesHtmlFragment = getHtmlPicturesFragment(pictures);
  removePicturesNodes();
  picturesBlock.appendChild(picturesHtmlFragment);
};

window.gallery = {
  init: (pictures) => {
    renderPictures(pictures);
    window.galleryFiltration = window.pictures.slice();
    imgFilters.classList.remove(`img-filters--inactive`);
  },
  render: renderPictures
};
