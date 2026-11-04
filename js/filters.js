const PICTURES_COUNT = 10;
const BUTTON_CLASS = 'img-filters__button';
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let activeButtonElement = filterElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  const onFilterClick = (evt) => {
    if (!evt.target.classList.contains(BUTTON_CLASS)) {
      return;
    }

    const clickedButtonElement = evt.target;
    if (clickedButtonElement.id === currentFilter) {
      return;
    }

    activeButtonElement.classList.remove(ACTIVE_BUTTON_CLASS);
    clickedButtonElement.classList.add(ACTIVE_BUTTON_CLASS);
    activeButtonElement = clickedButtonElement;
    currentFilter = clickedButtonElement.id;
    callback(getFilteredPictures());
  };

  filterElement.addEventListener('click', onFilterClick);
};

export const initFilters = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};
