const NAMES = [
  'Алексей',
  'Андрей',
  'Настя',
  'Дмитрий',
  'Елена',
  'Стефан',
  'София',
  'Екатерина',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Отличный день для прогулки!',
  'Запечатлел этот момент на память.',
  'Как вам такой вид?',
  'Наконец-то выбрался в отпуск.',
  'Мой любимый ракурс.',
];

const PHOTOS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

let commentId = 1;

const createComment = () => {
  const sentencesCount = getRandomInteger(1, 2);
  let message = getRandomArrayElement(MESSAGES);

  if (sentencesCount === 2) {
    message += ` ${getRandomArrayElement(MESSAGES)}`;
  }

  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = (index) => {
  const id = index + 1;
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: comments,
  };
};

const generatePhotos = () => Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index));

export { generatePhotos };
