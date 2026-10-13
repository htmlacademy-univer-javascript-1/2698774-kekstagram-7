import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';

initScale();
initEffects();

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formNode = document.querySelector('.img-upload__form');
const overlayNode = document.querySelector('.img-upload__overlay');
const uploadInputNode = document.querySelector('.img-upload__input');
const cancelBtnNode = document.querySelector('.img-upload__cancel');
const hashtagsInputNode = document.querySelector('.text__hashtags');
const commentInputNode = document.querySelector('.text__description');
const submitButton = formNode.querySelector('.img-upload__submit');

const photoPreviewNode = document.querySelector('.img-upload__preview img');
const effectsPreviewsNodes = document.querySelectorAll('.effects__preview');

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

const removeMessage = (message) => {
  message.remove();
};

const showMessage = (templateId, buttonClass, onClose) => {
  const template = document.querySelector(`#${templateId}`);
  const message = template.content.cloneNode(true).firstElementChild;
  const closeButton = message.querySelector(buttonClass);
  let isClosed = false;

  const closeMessage = () => {
    if (isClosed) {
      return;
    }

    isClosed = true;
    document.removeEventListener('keydown', onMessageKeydown);
    document.removeEventListener('click', onMessageOutsideClick);
    removeMessage(message);
    onClose();
  };

  function onMessageKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onMessageOutsideClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onMessageOutsideClick);

  document.body.append(message);
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

uploadInputNode.addEventListener('change', () => {
  const file = uploadInputNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    photoPreviewNode.src = fileUrl;
    effectsPreviewsNodes.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
  }

  openForm();
});

cancelBtnNode.addEventListener('click', closeForm);

hashtagsInputNode.addEventListener('keydown', stopKeydownPropagation);
commentInputNode.addEventListener('keydown', stopKeydownPropagation);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeForm();
        showMessage('success', '.success__button', () => {});
      })
      .catch(() => {
        showMessage('error', '.error__button', () => {});
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
});
