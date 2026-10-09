import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
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
  avatarElement.width = 35;
  avatarElement.height = 35;

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

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.append(fragment);

  socialCommentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderClick = () => {
  renderComments();
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

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureImgElement.src = data.url;
  likesCountElement.textContent = data.likes;
  socialCaptionElement.textContent = data.description;
  comments = data.comments;
  commentsShown = 0;

  renderComments();
};
