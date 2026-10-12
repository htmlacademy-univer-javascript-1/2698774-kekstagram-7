import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';

initScale();
initEffects();

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const formNode = document.querySelector('.img-upload__form');
const overlayNode = document.querySelector('.img-upload__overlay');
const uploadInputNode = document.querySelector('.img-upload__input');
const cancelBtnNode = document.querySelector('.img-upload__cancel');
const hashtagsInputNode = document.querySelector('.text__hashtags');
const commentInputNode = document.querySelector('.text__description');

const pristine = new Pristine(formNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const parseHashtags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);

const validateHashtagsFormat = (value) => {
  if (!value.trim()) {
    return true;
  }
  const tags = parseHashtags(value);
  return tags.every((tag) => VALID_HASHTAG_REGEX.test(tag));
};

const validateHashtagsCount = (value) => {
  const tags = parseHashtags(value);
  return tags.length <= MAX_HASHTAGS;
};

const validateHashtagsUniqueness = (value) => {
  const tags = parseHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsInputNode,
  validateHashtagsFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры (от 2 до 20 символов)'
);

pristine.addValidator(
  hashtagsInputNode,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`
);

pristine.addValidator(
  hashtagsInputNode,
  validateHashtagsUniqueness,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInputNode,
  validateCommentLength,
  `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`
);

const closeForm = () => {
  overlayNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formNode.reset();
  pristine.reset();

  resetScale();
  resetEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

const openForm = () => {
  overlayNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const stopKeydownPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

uploadInputNode.addEventListener('change', openForm);
cancelBtnNode.addEventListener('click', closeForm);

hashtagsInputNode.addEventListener('keydown', stopKeydownPropagation);
commentInputNode.addEventListener('keydown', stopKeydownPropagation);

formNode.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
