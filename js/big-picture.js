import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

const createComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);
  return commentElement;
};

const renderComments = (comments) => {
  socialCommentsElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  socialCommentsElement.append(fragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureImgElement.src = data.url;
  likesCountElement.textContent = data.likes;
  commentsCountElement.textContent = data.comments.length;
  socialCaptionElement.textContent = data.description;

  renderComments(data.comments);
};
