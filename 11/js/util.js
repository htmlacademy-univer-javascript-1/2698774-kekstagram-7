const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для генерации случайного целого числа в заданном диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Вспомогательные функции
const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
};

const extractNumber = (input) => {
  const string = input.toString();
  let resultString = '';
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    const digit = parseInt(char, 10);
    if (!Number.isNaN(digit)) {
      resultString += char;
    }
  }
  if (resultString === '') {
    return NaN;
  }
  return parseInt(resultString, 10);
};

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  checkStringLength,
  isPalindrome,
  extractNumber,
  isEscapeKey,
  showAlert
};
