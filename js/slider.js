'use strict';

(function () {
  const TOTAL_WIDTH = 100;
  const sliderNode = document.querySelector(`.img-upload__effect-level`);
  const effectLevelLine = sliderNode.querySelector(`.effect-level__line`);
  const effectLevelValue = sliderNode.querySelector(`.effect-level__value`);
  const effectLevelPin = sliderNode.querySelector(`.effect-level__pin`);
  const effectLevelDepth = sliderNode.querySelector(`.effect-level__depth`);

  const sliderMouseDownHandler = () => {
    const sliderMouseMoveHandler = (evt) => {
      const movementX = effectLevelPin.offsetLeft + evt.movementX;
      let result = movementX / effectLevelLine.offsetWidth * TOTAL_WIDTH;

      if (result > TOTAL_WIDTH) {
        result = TOTAL_WIDTH;
      } else if (result < 0) {
        result = 0;
      }

      effectLevelPin.style.left = `${result}%`;
      effectLevelDepth.style.width = `${result}%`;
      effectLevelValue.value = Math.floor(result);

      window.filters.changeEffect(Math.floor(result));
    };

    const sliderMouseUpHandler = () => {
      document.removeEventListener(`mousemove`, sliderMouseMoveHandler);
      document.removeEventListener(`mouseup`, sliderMouseUpHandler);
    };

    document.addEventListener(`mousemove`, sliderMouseMoveHandler);
    document.addEventListener(`mouseup`, sliderMouseUpHandler);
  };

  function resetSliderValue(value = 0) {
    effectLevelPin.style.left = `${value}%`;
    effectLevelDepth.style.width = `${value}%`;
    effectLevelValue.value = value;
  }

  effectLevelPin.addEventListener(`mousedown`, sliderMouseDownHandler);

  window.slider = {
    node: sliderNode,
    value: effectLevelValue,
    pin: effectLevelPin,
    handler: sliderMouseDownHandler,
    setValue: resetSliderValue
  };
})();
