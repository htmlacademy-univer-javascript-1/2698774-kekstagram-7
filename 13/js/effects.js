const EFFECTS = {
  none: { filter: 'none', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const modalElement = document.querySelector('.img-upload__overlay');
const imagePreview = modalElement.querySelector('.img-upload__preview img');
const sliderContainer = modalElement.querySelector('.img-upload__effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectLevelValue = modalElement.querySelector('.effect-level__value');
const effectsList = modalElement.querySelector('.effects__list');

let currentEffect = EFFECTS.none;

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const updateSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.max,
    step: effect.step,
  });
};

export const resetEffects = () => {
  currentEffect = EFFECTS.none;
  imagePreview.style.filter = 'none';
  imagePreview.className = '';
  hideSlider();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName] || EFFECTS.none;

  imagePreview.className = `effects__preview--${effectName}`;

  if (effectName === 'none') {
    resetEffects();
  } else {
    showSlider();
    updateSliderOptions(currentEffect);
  }
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectLevelValue.value = value;

  if (currentEffect === EFFECTS.none) {
    imagePreview.style.filter = 'none';
  } else {
    imagePreview.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  }
});

export const initEffects = () => {
  effectsList.addEventListener('change', onEffectsChange);
  resetEffects();
};
