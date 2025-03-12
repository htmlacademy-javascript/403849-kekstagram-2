const KeyNames = {
  ESC: 'Escape'
};

const REGEX_VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === KeyNames.ESC;

// отслеживание клика по escape
const onDocumentKeydown = (evt, callback) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

export {REGEX_VALID_HASHTAG, createIdGenerator, getRandomInteger, getRandomElement, isEscapeKey, onDocumentKeydown};
