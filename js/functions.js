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

const validateMeetingTime = (startDay, finishDay, startMeet, durationMeet) => {
  const numStartDay = startDay.split(':').map((item) => {
    return parseInt(item);
  });
  const numFinishDay = finishDay.split(':').map((item) => {
    return parseInt(item);
  });
  const numStartMeet = startMeet.split(':').map((item) => {
    return parseInt(item);
  });

  if (numStartMeet[0] < numStartDay[0]) {
    return false;
  }

  if (numStartMeet[0] === numStartDay[0] && numStartMeet[1] < numStartDay[1]) {
    return false;
  }

  const numFinishMeet = numStartMeet[0] * 60 + numStartMeet[1] + durationMeet;
  if (numFinishMeet <= numFinishDay[0] * 60 + numFinishDay[1]) {
    return true;
  } else {
    return false;
  }
}

validateMeetingTime('8:00', '17:30', '08:00', 900);
