import {isEscapeKey, onDocumentKeydown, REGEX_VALID_HASHTAG} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form'); // Форма загрузки нового изображения на сайт
const inputUpload = form.querySelector('.img-upload__input'); // Поле загрузки нового изображения (выбора файла)
const formOverlay = form.querySelector('.img-upload__overlay'); // Форма редактирования изображения
const buttonCancel = form.querySelector('.img-upload__cancel'); // Кнопка для закрытия формы редактирования изображения
const inputHashtags = form.querySelector('.text__hashtags'); // Поле ввода хэштегов
const inputDescription = form.querySelector('.text__description'); // Поле ввода описания фотографии

let textHashtagError = '';

// Функция открытия формы редактирования изображения
const inputUploadChangeHandler = () => {
  document.addEventListener('keydown', closeModalOnEsc);
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

// Функция закрытия формы редактирования изображения
const buttonCancelClickHandler = () => {
  document.removeEventListener('keydown', closeModalOnEsc);
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  inputUpload.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
};

// Отслеживание загрузки изображения в поле
inputUpload.addEventListener('change', inputUploadChangeHandler);

// Отслеживание клика по кнопке закрытия формы
buttonCancel.addEventListener('click', buttonCancelClickHandler);

// Закрытие модального окна по нажатию esc
function closeModalOnEsc(evt) {
  onDocumentKeydown(evt, buttonCancelClickHandler);
}


// Настройка библиотеки на форму
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});

// Функция проверки поля комментариев
const validateInputDescription = (value) => {
  if (!value.length) {
    return true;
  }
  if (value.length > 140) {
    return false;
  }
  return true;
};

// Добавление валидатора для поля описания фотографии (комментария))
pristine.addValidator(
  inputDescription,
  validateInputDescription,
  'Длина комментария не может составлять больше 140 символов'
);

// Коллбек, останавливающий всплытие события нажатия кнопки Esc
const inputKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

// Добавление слушателя события нажатия клавиш внутри полей описания фотографии и добавления хештегов
inputDescription.addEventListener('keydown', inputKeydownHandler);
inputHashtags.addEventListener('keydown', inputKeydownHandler);


// Функция валидации поля хештегов
const validateInputHashtags = (value) => {
  const hashtags = value.split(' ');

  if (!value.length) {
    return true;
  }

  if (hashtags.length > 5) {
    textHashtagError = 'Нельзя использовать более 5 хештегов';
    return false;
  }

  const hashtagsSet = new Set(hashtags);

  if (hashtagsSet.size < hashtags.length) {
    textHashtagError = 'Один и тот же хэштег не может быть использован дважды';
    return false;
  }

  let i = 0;

  hashtags.forEach((item) => {
    if (!REGEX_VALID_HASHTAG.test(item)) {
      i += 1;
    }
  });

  if (i) {
    textHashtagError = 'Невалидный хештег';
    return false;
  }

  return true;
};

// Функция передачи сообщения об ошибке
const getHashtagErrorMessage = () => textHashtagError;

// Добавление валидатора для поля ввода хештегов
pristine.addValidator(
  inputHashtags,
  validateInputHashtags,
  getHashtagErrorMessage
);

// Функция валидации и отправки формы
const formSubmitHandler = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    evt.target.submit();
  }
};

// Добавление слушателя события отправки формы
form.addEventListener('submit', formSubmitHandler);
