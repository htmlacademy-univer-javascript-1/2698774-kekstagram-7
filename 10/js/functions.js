// Перевод времени 'HH:MM' в минуты
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

// умещается ли встреча в рабочий день
const checkMeetingTime = (workStart, workEnd, meetingStart, duration) => {
  const startWork = timeToMinutes(workStart);
  const endWork = timeToMinutes(workEnd);
  const startMeeting = timeToMinutes(meetingStart);
  const endMeeting = startMeeting + duration;

  return startMeeting >= startWork && endMeeting <= endWork;
};

// Проверки
checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:00', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false

// Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
//console.log(checkStringLength('проверяемая строка', 10));
checkStringLength('проверяемая строка', 10);

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
}
//console.log(isPalindrome('Лёша на полке клопа нашёл '));
isPalindrome('Лёша на полке клопа нашёл ');

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
extractNumber('1 кефир, 0.5 батона');
//console.log(extractNumber('1 кефир, 0.5 батона')); // 105

