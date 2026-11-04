import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export const renderThumbnails = (pictures) => {
  picturesContainerElement.querySelectorAll('.picture').forEach((element) => element.remove());

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const { url, description, likes, comments } = picture;
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    imageElement.src = url;
    imageElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    const onThumbnailsClick = (evt) => {
      evt.preventDefault();
      openBigPicture(picture);
    };

    pictureElement.addEventListener('click', onThumbnailsClick);

    fragment.append(pictureElement);
  });

  picturesContainerElement.append(fragment);
};
