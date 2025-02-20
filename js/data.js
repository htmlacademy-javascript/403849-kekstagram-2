import {createIdGenerator, getRandomInteger, getRandomElement} from './utils.js';

const PHOTO_COUNT = 25;
const MIN_VALUE_AVATAR = 1;
const MAX_VALUE_AVATAR = 6;
const MIN_VALUE_COMMENTS = 0;
const MAX_VALUE_COMMENTS = 30;
const MIN_VALUE_LIKES = 15;
const MAX_VALUE_LIKES = 200;

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

const generatePhotoId = createIdGenerator();
const generatePhotoLinks = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_VALUE_AVATAR, MAX_VALUE_AVATAR)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES)
});

const createPhoto = () => {
  const commentsLength = getRandomInteger(MIN_VALUE_COMMENTS, MAX_VALUE_COMMENTS);
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoLinks()}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomInteger(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
    comments: Array.from({length: commentsLength}, createComment)
  };
};

const getPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);
getPhotos();

export {getPhotos};
