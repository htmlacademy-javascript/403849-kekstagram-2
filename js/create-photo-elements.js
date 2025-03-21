import {getData} from './api.js';
import {openBigPicture} from './big-picture.js';

const ERROR_SHOW_TIME = 5000;
const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');

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

  picturesContainer.append(photoListFragment);
};

getData().then((data) => createPhotoList(data))
  .catch(showErrorMessage);
