const NONE_EFFECT = 'none';
const HIDDEN_CLASS = 'hidden';
const EFFECT_PREVIEW_CLASS = 'effects__preview--';
const EFFECT_RADIO_CLASS = 'effects__radio';
const NO_FILTER = 'none';
const FILTER_VALUE_SUFFIX = ')';

const EFFECTS = {
  none: { filter: NO_FILTER, min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const modalElement = document.querySelector('.img-upload__overlay');
const imagePreviewElement = modalElement.querySelector('.img-upload__preview img');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectLevelValueElement = modalElement.querySelector('.effect-level__value');
const effectsListElement = modalElement.querySelector('.effects__list');

let currentEffect = EFFECTS[NONE_EFFECT];
let currentEffectClass = '';

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

const hideSlider = () => {
  sliderContainerElement.classList.add(HIDDEN_CLASS);
};

const showSlider = () => {
  sliderContainerElement.classList.remove(HIDDEN_CLASS);
};

const updateSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.max,
    step: effect.step,
  });
};

export const resetEffects = () => {
  currentEffect = EFFECTS[NONE_EFFECT];
  imagePreviewElement.style.filter = NO_FILTER;
  if (currentEffectClass) {
    imagePreviewElement.classList.remove(currentEffectClass);
    currentEffectClass = '';
  }
  hideSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains(EFFECT_RADIO_CLASS)) {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName] || EFFECTS[NONE_EFFECT];

  if (currentEffectClass) {
    imagePreviewElement.classList.remove(currentEffectClass);
  }
  currentEffectClass = `${EFFECT_PREVIEW_CLASS}${effectName}`;
  imagePreviewElement.classList.add(currentEffectClass);

  if (effectName === NONE_EFFECT) {
    resetEffects();
  } else {
    showSlider();
    updateSliderOptions(currentEffect);
  }
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectLevelValueElement.value = Number(value).toString();

  imagePreviewElement.style.filter =
    currentEffect === EFFECTS[NONE_EFFECT]
      ? NO_FILTER
      : `${currentEffect.filter}(${value}${currentEffect.unit}${FILTER_VALUE_SUFFIX}`;
});

export const initEffects = () => {
  effectsListElement.addEventListener('change', onEffectsChange);
  resetEffects();
};
