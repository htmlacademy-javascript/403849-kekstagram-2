function checkingString (string, maxLength) {
  return string.length <= maxLength;
}

function checkingPalindrome (string) {
  let newString = string.replaceAll(' ', '').toLowerCase();
  let replenishedString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    replenishedString += newString[i];
  }
  return replenishedString === newString;
}

function toNumber (string) {
  let newString = String(string).replaceAll(' ', '');
  let replenishedString = '';
  for (let i = 0; i <= newString.length - 1; i++) {
    let currentSymbol = parseInt(newString[i]);
    if (!Number.isNaN(currentSymbol)) {
      replenishedString += newString[i];
    }
  }
 return parseInt(replenishedString);
}
