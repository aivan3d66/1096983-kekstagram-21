'use strict';

(function () {
  const KeyboardKeys = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  window.isEscButton = (key) => key === KeyboardKeys.ESC;

  window.isEnterButton = (key) => key === KeyboardKeys.ENTER;

  const getRandomArrayNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArrayElement = function (items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomValue = items[randomIndex];
    return randomValue;
  };

  window.utils = {
    randomArrayNumber: getRandomArrayNumber,
    randomArrayElement: getRandomArrayElement,
  };
})();
