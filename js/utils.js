'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  const MAX_DIVIDEND = 100;
  const MIN_DIVIDEND = 10;
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

  const getDeclension = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % MAX_DIVIDEND > 4 && number % MAX_DIVIDEND < 20) ? 2 : cases[(number % MIN_DIVIDEND < 5) ? number % MIN_DIVIDEND : 5]];
  };

  window.utils = {
    getRandomNumber,
    getRandomElement,
    isEscButton,
    isEnterButton,
    getShuffleElements,
    debounceDecorator,
    getDeclension
  };
})();
