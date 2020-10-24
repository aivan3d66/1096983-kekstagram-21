'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  const KeyboardKeys = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  const isEscButton = (key) => key === KeyboardKeys.ESC;
  const isEnterButton = (key) => key === KeyboardKeys.ENTER;

  const getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomElement = function (items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomValue = items[randomIndex];
    return randomValue;
  };

  const debounceDecorator = (func) => {
    let lastTimeout = null;

    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        func(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const getShuffleElements = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  window.utils = {
    getRandomNumber,
    getRandomElement,
    isEscButton,
    isEnterButton,
    getShuffleElements,
    debounceDecorator
  };
})();
