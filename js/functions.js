// Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
console.log(checkStringLength('проверяемая строка', 10));

// Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
}
console.log(isPalindrome('Лёша на полке клопа нашёл '));

// Дополнительное задание: Функция извлечения цифр из строки
function extractNumber(input) {
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
}
console.log(extractNumber('1 кефир, 0.5 батона')); // 105
