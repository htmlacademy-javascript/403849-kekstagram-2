import {getPhotos} from './data.js';
import {openBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureElements = getPhotos();

const photoListFragment = document.createDocumentFragment();

pictureElements.forEach((item) => {
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
