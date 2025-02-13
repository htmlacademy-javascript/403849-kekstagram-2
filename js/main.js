const PHOTO_COUNT = 25;

const DESCRIPTION = [
  'Когда ты пытаешься работать, но кот решил, что ноутбук — это его новое лежбище',
  'Этот взгляд, когда ты украл кусочек сыра, но никто не заметил',
  'Кот, который понял, что коробка — это не просто коробка, а целая вселенная',
  'Когда ты пытаешься сделать селфи, но кот решил, что это его момент славы',
  'Этот кот знает, что он — главный украшение интерьера',
  'Когда ты пытаешься убраться, но кот считает, что разбросанные носки — это искусство',
  'Кот, который только что узнал, что его миска пуста',
  'Этот кот явно что-то замышляет. Возможно, мировое господство',
  'Когда ты пытаешься сделать фото, но кот решил, что это лучший момент для йоги',
  'Кот, который только что понял, что его хвост — это не враг, а часть его тела'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Кошатник',
  'Собачник',
  'Зверолюб',
  'Хейтер',
  'Кексофан',
  'Барсик',
  'Лунатик',
  'Зуботяп',
  'Куселюб',
  'Мышебор',
  'Усеслав',
  'Пузеслав',
  'Хватебор',
  'Вкусилиса',
  'Кусихвост',
  'Медолап',
  'Сладкопуз',
  'Мечижор',
  'Яромур',
  'Ярожор',
  'Яроцап',
  'Яролиз',
  'Наглохват',
  'Лютодрав',
  'Мурополк',
  'Мурослав',
  'Вездессун',
  'Мышехват',
  'Кусимир',
  'Вкусеслав'
];

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

const createRandomInteger = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if(previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomElement = (elements) => {
  const getEl = createRandomInteger(0, elements.length - 1);
  return elements[getEl()];
};

const generatePhotoId = createIdGenerator();
const generatePhotoLinks = createIdGenerator();
const generateLikes = createRandomInteger(15, 200);
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES)
});

const createPhoto = () => {
  const commentsLength = createRandomInteger(0, 30);
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoLinks()}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: generateLikes(),
    comments: Array.from({length: commentsLength()}, createComment)
  };
};

const allPhotos = Array.from({length: PHOTO_COUNT}, createPhoto);

console.log(allPhotos);
