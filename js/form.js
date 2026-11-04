import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';
import { isEscapeKey } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const uploadInputElement = document.querySelector('.img-upload__input');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButton = formElement.querySelector('.img-upload__submit');

const photoPreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewsElements = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let messageElement = null;

initScale();
initEffects();

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
  hashtagsInputElement,
  validateHashtagsFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры (от 2 до 20 символов)'
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsUniqueness,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInputElement,
  validateCommentLength,
  `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`
);

const closeForm = (keydownHandler) => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  formElement.reset();
  pristine.reset();

  resetScale();
  resetEffects();

  document.removeEventListener('keydown', keydownHandler);
};

const removeMessage = (message) => {
  message.remove();
};

const createMessage = (templateId, buttonClass) => {
  const template = document.querySelector(`#${templateId}`);
  const message = template.content.cloneNode(true).firstElementChild;
  const closeButton = message.querySelector(buttonClass);
  return { message, closeButton };
};

const setMessageHandlers = (message, closeButton, onClose) => {
  let isClosed = false;
  let onMessageKeydown = () => {};
  let onMessageOutsideClick = () => {};

  const closeMessage = (keydownHandler, outsideClickHandler) => {
    if (isClosed) {
      return;
    }

    isClosed = true;
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('click', outsideClickHandler);
    removeMessage(message);
    messageElement = null;
    onClose();
  };

  onMessageKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage(onMessageKeydown, onMessageOutsideClick);
    }
  };

  onMessageOutsideClick = (evt) => {
    if (evt.target === message) {
      closeMessage(onMessageKeydown, onMessageOutsideClick);
    }
  };

  const onMessageCloseClick = () => {
    closeMessage(onMessageKeydown, onMessageOutsideClick);
  };

  closeButton.addEventListener('click', onMessageCloseClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onMessageOutsideClick);
};

const showMessage = (templateId, buttonClass, onClose) => {
  const message = createMessage(templateId, buttonClass);
  messageElement = message.message;
  setMessageHandlers(message.message, message.closeButton, onClose);
  document.body.append(message.message);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (messageElement) {
      return;
    }
    closeForm(onDocumentKeydown);
  }
};

const openForm = () => {
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetScale();
  resetEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

const stopKeydownPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onUploadInputChange = () => {
  const file = uploadInputElement.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    photoPreviewElement.src = fileUrl;
    effectsPreviewsElements.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
  }

  openForm();
};

uploadInputElement.addEventListener('change', onUploadInputChange);

const onCancelButtonClick = () => {
  closeForm(onDocumentKeydown);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

hashtagsInputElement.addEventListener('keydown', stopKeydownPropagation);
commentInputElement.addEventListener('keydown', stopKeydownPropagation);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeForm(onDocumentKeydown);
        showMessage('success', '.success__button', () => {});
      })
      .catch(() => {
        showMessage('error', '.error__button', () => {});
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
};

formElement.addEventListener('submit', onFormSubmit);
