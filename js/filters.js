'use strict';

(function () {
  const RANDOM_PICTURES_COUNT = 10;
  const filtersFormNode = document.querySelector(`.img-filters__form`);
  const filtersFunctions = {
    default() {
      return this.getDefaultArr();
    },

    random() {
      return window.utils.getShuffleElements(this.getDefaultArr()).slice(0, RANDOM_PICTURES_COUNT);
    },

    discussed() {
      return this.getDefaultArr().sort((a, b) => b.comments.length === a.comments.length ? b.likes - a.likes : b.comments.length - a.comments.length);
    },

    getDefaultArr: () => {
      return window.pictures;
    }
  };

  const changeActiveButton = window.utils.debounceDecorator((buttonNode, filterName) => {
    const currentButton = document.querySelector(`.img-filters__button--active`);

    currentButton.classList.remove(`img-filters__button--active`);
    window.pictures = filtersFunctions[filterName]();
    window.gallery.render(window.pictures);
    buttonNode.classList.add(`img-filters__button--active`);
  });

  filtersFormNode.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`img-filters__button`)) {
      const filterName = evt.target.id.replace(`filter-`, ``);
      changeActiveButton(evt.target, filterName);
    }
  });
})();

