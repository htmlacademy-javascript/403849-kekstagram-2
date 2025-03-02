import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); // окно полноэкранного просмотра изображения
const bigPictureCloseElement = document.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentCounter = document.querySelector('.social__comment-count'); // счетчик комментариев
const commentsLoader = document.querySelector('.comments-loader'); // кнопка загрузки комментариев

const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  const firstComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').append(firstComment);

  picture.comments.forEach((item) => {
    const comment = bigPicture.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = item.avatar;
    comment.querySelector('.social__picture').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;

    bigPicture.querySelector('.social__comments').append(comment);
  });

  bigPicture.querySelector('.social__comment:nth-child(1)').remove();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentCounter.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
