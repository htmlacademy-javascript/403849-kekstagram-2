import {getData} from './api.js';
import {openBigPicture} from './big-picture.js';
import {debounce} from './utils.js';

const ERROR_SHOW_TIME = 5000;
const RANDOM_SORT_NUMBER = 0.5;
const RANDOM_COUNT_PHOTOS = 10;
const RERENDER_DELAY = 500;

const formFilter = document.querySelector('.img-filters__form');
const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const buttonsFilters = document.querySelectorAll('.img-filters__button');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorText = errorTemplate.cloneNode(true);
  body.append(errorText);
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, ERROR_SHOW_TIME);
};

const createPhotoList = (data) => {
  const photoListFragment = document.createDocumentFragment();

  data.forEach((item) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = item.url;
    pictureElement.querySelector('.picture__img').alt = item.description;
    pictureElement.querySelector('.picture__likes').textContent = item.likes;
    pictureElement.querySelector('.picture__comments').textContent = item.comments.length;

    pictureElement.addEventListener('click', () => {
      openBigPicture(item);
    });

    photoListFragment.append(pictureElement);
  });

  const allPictures = document.querySelectorAll('.pictures .picture');
  if (allPictures.length) {
    allPictures.forEach((item) => item.remove());
  }

  picturesContainer.append(photoListFragment);
};

const setActiveButton = (activeButton) => {
  buttonsFilters.forEach((item) => item.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
};

const sortingPhotoOnDiscussed = (a, b) => b.comments.length - a.comments.length;

const setFormFilterClick = (cb, data) => {
  formFilter.addEventListener('click', (evt) => {
    let images;
    setActiveButton(evt.target);
    if (evt.target.id === 'filter-default') {
      images = data;
    }

    if(evt.target.id === 'filter-random') {
      images = data.slice().sort(() => Math.random() - RANDOM_SORT_NUMBER).slice(0, RANDOM_COUNT_PHOTOS);
    }

    if(evt.target.id === 'filter-discussed') {
      images = data.slice().sort(sortingPhotoOnDiscussed);
    }
    cb(images);
  });
};

getData().then((data) => {
  createPhotoList(data);
  imgFilters.classList.remove('img-filters--inactive');

  setFormFilterClick(
    debounce(
      createPhotoList,
      RERENDER_DELAY
    ),
    data
  );
})
  .catch(showErrorMessage);
