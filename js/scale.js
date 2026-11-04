const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_PERCENT = '%';
const MODAL_SELECTOR = '.img-upload__overlay';
const SMALLER_BUTTON_SELECTOR = '.scale__control--smaller';
const BIGGER_BUTTON_SELECTOR = '.scale__control--bigger';
const SCALE_INPUT_SELECTOR = '.scale__control--value';
const IMAGE_PREVIEW_SELECTOR = '.img-upload__preview img';

const modalElement = document.querySelector(MODAL_SELECTOR);
const smallerButtonElement = modalElement.querySelector(SMALLER_BUTTON_SELECTOR);
const biggerButtonElement = modalElement.querySelector(BIGGER_BUTTON_SELECTOR);
const scaleInputElement = modalElement.querySelector(SCALE_INPUT_SELECTOR);
const imagePreviewElement = modalElement.querySelector(IMAGE_PREVIEW_SELECTOR);

let currentScale = DEFAULT_SCALE;

const scaleImage = (value) => {
  imagePreviewElement.style.transform = `scale(${value / DEFAULT_SCALE})`;
  scaleInputElement.value = `${value}${SCALE_PERCENT}`;
};

const onSmallerButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleImage(currentScale);
  }
};

const onBiggerButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleImage(currentScale);
  }
};

export const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  scaleImage(DEFAULT_SCALE);
};

export const initScale = () => {
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};
