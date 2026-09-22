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
