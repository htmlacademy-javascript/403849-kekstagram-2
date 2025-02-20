const MINUTES_IN_HOUR = 60;

const checkString = (string, maxLength) =>
  string.length <= maxLength;

checkString('проверяемая строка', 20);

const checkPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let replenishedString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    replenishedString += newString[i];
  }
  return replenishedString === newString;
};

checkPalindrome('топот');

const parseNumber = (string) => {
  const newString = String(string).replaceAll(' ', '');
  let replenishedString = '';
  for (let i = 0; i <= newString.length - 1; i++) {
    const currentSymbol = parseInt(newString[i], 10);
    if (!Number.isNaN(currentSymbol)) {
      replenishedString += newString[i];
    }
  }
  return parseInt(replenishedString, 10);
};

parseNumber('2025 год');

const convertHoursToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
}

const validateMeetingTime = (startDay, finishDay, startMeet, durationMeet) => {
  const numStartDay = convertHoursToMinutes(startDay);
  const numFinishDay = convertHoursToMinutes(finishDay);
  const numStartMeet = convertHoursToMinutes(startMeet);

  return numStartDay <= numStartMeet && numStartMeet + durationMeet <= numFinishDay;
}

validateMeetingTime('8:00', '17:30', '08:00', 900);
