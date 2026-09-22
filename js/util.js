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

export {
  getRandomInteger,
  getRandomArrayElement,
  checkStringLength,
  isPalindrome,
  extractNumber
};
