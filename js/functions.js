const checkingString = (string, maxLength) =>
  string.length <= maxLength;

const checkingPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let replenishedString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    replenishedString += newString[i];
  }
  return replenishedString === newString;
};

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
