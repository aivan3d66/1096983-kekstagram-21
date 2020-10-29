'use strict';

const SCALE_STEP = 25;
const CURRENT_VALUE_RADIX = 10;
const MIN_SCALE_VALUE = SCALE_STEP;
const MAX_SCALE_VALUE = 100;
const TOTAL_VALUE = MAX_SCALE_VALUE;

const scaleNode = document.querySelector(`.img-upload__scale`);
const scaleSmaller = scaleNode.querySelector(`.scale__control--smaller`);
const scaleBigger = scaleNode.querySelector(`.scale__control--bigger`);
const scaleValue = scaleNode.querySelector(`.scale__control--value`);

function setScaleValue(value = TOTAL_VALUE) {
  if (value - SCALE_STEP < MIN_SCALE_VALUE) {
    scaleValue.value = `${MIN_SCALE_VALUE}%`;
    window.preview.img.style.transform = `scale(${MIN_SCALE_VALUE / TOTAL_VALUE})`;
  } else if (value + SCALE_STEP > MAX_SCALE_VALUE) {
    scaleValue.value = `${MAX_SCALE_VALUE}%`;
    window.preview.img.style.transform = `scale(${MAX_SCALE_VALUE / TOTAL_VALUE})`;
  } else {
    scaleValue.value = `${value}%`;
    window.preview.img.style.transform = `scale(${value / TOTAL_VALUE})`;
  }
}

scaleSmaller.addEventListener(`click`, function () {
  const currentValue = scaleValue.value;
  setScaleValue(parseInt(currentValue, CURRENT_VALUE_RADIX) - SCALE_STEP);
});

scaleBigger.addEventListener(`click`, function () {
  const currentValue = scaleValue.value;
  setScaleValue(parseInt(currentValue, CURRENT_VALUE_RADIX) + SCALE_STEP);
});

window.setScaleValue = setScaleValue;
