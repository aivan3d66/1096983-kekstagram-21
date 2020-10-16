'use strict';

(function () {
  window.backend.load(window.galleryInit, window.errors.loadError);
  window.picture.init();
  window.slider.setValue();
})();
