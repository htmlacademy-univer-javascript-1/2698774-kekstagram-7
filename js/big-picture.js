import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;
const AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentShownCountElement = socialCommentCountElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = socialCommentCountElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_SIZE;
  avatarElement.height = AVATAR_SIZE;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);
  return commentElement;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  socialCommentsElement.textContent = '';
  socialCommentsElement.append(fragment);

  socialCommentShownCountElement.textContent = commentsShown;
  socialCommentTotalCountElement.textContent = comments.length;
};

function onCommentsLoaderClick() {
  renderComments();
}

function closeBigPicture(onKeydown) {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydown);
  bigPictureCloseElement.removeEventListener('click', onBigPictureCloseClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture(onDocumentKeydown);
  }
}

function onBigPictureCloseClick() {
  closeBigPicture(onDocumentKeydown);
}

export const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.addEventListener('click', onBigPictureCloseClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  bigPictureImageElement.src = data.url;
  likesCountElement.textContent = data.likes;
  socialCaptionElement.textContent = data.description;
  comments = data.comments;
  commentsShown = 0;

  renderComments();
};
