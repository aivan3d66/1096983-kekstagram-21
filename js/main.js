'use strict';

(function () {
  const pictures = window.dataGeneration();
  window.galleryInit(pictures);
  window.picture.init();
  window.slider.setValue();
})();
