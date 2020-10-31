'use strict';

const DEFAULT_EFFECT_VALUE = 100;
const effectsListNode = document.querySelector(`.effects__list`);
const EffectsParameters = {
  chrome: {
    filter: `grayscale`,
    min: 0,
    max: 1,
    measure: ``
  },

  sepia: {
    filter: `sepia`,
    min: 0,
    max: 1,
    measure: ``
  },

  marvin: {
    filter: `invert`,
    min: 0,
    max: 100,
    measure: `%`
  },

  phobos: {
    filter: `blur`,
    min: 0,
    max: 3,
    measure: `px`
  },

  heat: {
    filter: `brightness`,
    min: 1,
    max: 3,
    measure: ``
  },
};
let currentEffectName = `none`;

const changeEffectValue = function (value) {
  if (currentEffectName !== `none`) {
    const currentEffectParameters = EffectsParameters[currentEffectName];
    const currentEffectValue = (currentEffectParameters.max - currentEffectParameters.min) / 100 * value + currentEffectParameters.min;
    const resultEffectFilter = `${currentEffectParameters.filter}(${currentEffectValue}${currentEffectParameters.measure})`;

    window.preview.img.style.filter = resultEffectFilter;
  }
};

const changeEffectName = function (effectName = `none`) {
  currentEffectName = effectName;

  window.preview.img.style.removeProperty(`filter`);
  window.slider.setValue(DEFAULT_EFFECT_VALUE);
  changeEffectValue(DEFAULT_EFFECT_VALUE);

  const method = effectName !== `none` ? `remove` : `add`;
  window.slider.node.classList[method](`hidden`);
};

effectsListNode.addEventListener(`click`, (evt) => {
  const effectName = evt.target.classList.contains(`effects__radio`) ? evt.target.value : null;
  if (effectName) {
    changeEffectName(effectName);
  }
});

window.effects = {
  change: changeEffectValue
};
