const ControlScale = {
  STEP_CONTROL_SCALE: 25,
  MIN_VALUE_CONTROL_SCALE: '25%',
  MAX_VALUE_CONTROL_SCALE: '100%'
};

const effectsParams = [
  {
    name: 'chrome',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    },
    default: 1,
    filter: 'grayscale'
  },
  {
    name: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    },
    default: 1,
    filter: 'sepia'
  },
  {
    name: 'marvin',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    },
    default: 100,
    filter: 'invert',
    sizeType: '%'
  },
  {
    name: 'phobos',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    },
    default: 3,
    filter: 'blur',
    sizeType: 'px'
  },
  {
    name: 'heat',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
    },
    default: 3,
    filter: 'brightness'
  }
];

const form = document.querySelector('.img-upload__form'); // Форма загрузки нового изображения на сайт
const buttonScaleSmaller = form.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
const buttonScaleBigger = form.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба
const scaleControl = form.querySelector('.scale__control--value'); // Поле вывода значения масштаба
const imgPreview = form.querySelector('.img-upload__preview img'); // Превью изображения
const wrapperEffectLevel = form.querySelector('.img-upload__effect-level');
const sliderContainer = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');
const radioButtons = form.querySelectorAll('.effects__radio');


// Функция-коллбэк для слушателя клика по кнопке уменьшения масштаба
const buttonSmallerClickHandler = (evt) => {
  evt.preventDefault();
  if (scaleControl.value !== ControlScale.MIN_VALUE_CONTROL_SCALE) {
    scaleControl.value = `${parseInt(scaleControl.value, 10) - ControlScale.STEP_CONTROL_SCALE}%`;
    updateImageScale();
  }
};

// Функция-коллбэк для слушателя клика по кнопке увеличения масштаба
const buttonBiggerClickHandler = (evt) => {
  evt.preventDefault();
  if (scaleControl.value !== ControlScale.MAX_VALUE_CONTROL_SCALE) {
    scaleControl.value = `${parseInt(scaleControl.value, 10) + ControlScale.STEP_CONTROL_SCALE}%`;
    updateImageScale();
  }
};

// Функция-коллбэк, изменяющая стили масштабирования изображения-превью
function updateImageScale () {
  imgPreview.style.transform = `scale(${parseInt(scaleControl.value, 10) / 100})`;
}

// Функция добавления слушателей клика по кнопкам уменьшения и увеличения масштаба
const addListeners = () => {
  buttonScaleSmaller.addEventListener('click', buttonSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', buttonBiggerClickHandler);
  addSlider();
};

function addSlider () {
  if (sliderContainer.noUiSlider) {
    sliderContainer.noUiSlider.destroy();
  }
  // Создание слайдера в контейнере
  noUiSlider.create(sliderContainer, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  });

  wrapperEffectLevel.classList.add('hidden');

  // Навешивание слушателя события передвижения ползунка слайдера
  sliderContainer.noUiSlider.on('update', () => {
    const sliderValue = Number(sliderContainer.noUiSlider.get()).toFixed(1);
    effectLevel.value = sliderValue % 1 ? sliderValue : sliderValue | 0;

    const checkRadio = form.querySelector('.effects__radio:checked').value;
    const effect = effectsParams.find((el) => checkRadio === el.name);

    if (!effect) {
      return;
    }

    const sizeEffect = effect.sizeType ? `${effectLevel.value}${effect.sizeType}` : effectLevel.value;
    imgPreview.style.filter = `${effect.filter}(${sizeEffect})`;
  });
}

// Функция удаления слушателей клика по кнопкам уменьшения и увеличения масштаба
const removeListeners = () => {
  buttonScaleSmaller.removeEventListener('click', buttonSmallerClickHandler);
  buttonScaleBigger.removeEventListener('click', buttonBiggerClickHandler);
  sliderContainer.noUiSlider.destroy();
  imgPreview.style.filter = '';
  scaleControl.value = '100%';
  effectLevel.value = '';
};

radioButtons.forEach((item) => {
  item.addEventListener('change', (evt) => {
    if (evt.target.checked && evt.target.value === 'none') {
      imgPreview.style.filter = '';
      wrapperEffectLevel.classList.add('hidden');
      return;
    }
    if (evt.target.checked) {
      const effect = effectsParams.find((el) => evt.target.value === el.name);
      sliderContainer.noUiSlider.updateOptions(effect.options);
      sliderContainer.noUiSlider.set(effect.default);

      const sizeEffect = effect.sizeType ? `${effect.default}${effect.sizeType}` : effect.default;
      imgPreview.style.filter = `${effect.filter}(${sizeEffect})`;

      wrapperEffectLevel.classList.remove('hidden');
    }
  });
});

export {addListeners, removeListeners};
