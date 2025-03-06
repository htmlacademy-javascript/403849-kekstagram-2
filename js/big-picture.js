import {isEscapeKey} from './utils.js';

const COMMENTS_PER_LOAD = 5;
let showedAmountComments = COMMENTS_PER_LOAD;
let commentsArray = [];

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); // окно полноэкранного просмотра изображения
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentCounter = document.querySelector('.social__comment-count'); // счетчик комментариев
const commentsLoader = document.querySelector('.comments-loader'); // кнопка загрузки комментариев
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment'); // шаблон комментария
const commentShowCounter = bigPicture.querySelector('.social__comment-shown-count'); // счетчик показанных комментариев

// создание большого изображения и его описания, лайков, количества комментариев
const createBigPicture = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

// наполнение списка комментариев
const fillingListComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = item.avatar;
    comment.querySelector('.social__picture').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    commentListFragment.append(comment);
  });

  commentsList.append(commentListFragment);
};

// Функция, обновляющая текстовое содержимое счётчика показанных комментариев
const updateCommentCounter = () => {
  commentShowCounter.textContent = showedAmountComments;
};

// Функция скрытия кнопки загрузки комментариев
const hideCommentsLoader = () => {
  commentShowCounter.textContent = commentsArray.length;
  commentsLoader.classList.add('hidden');
};

// Функция загрузки комментариев при клике на кнопку (функция-внутренность для события клик)
const loadMoreComments = (evt) => {
  evt.preventDefault();
  fillingListComments(commentsArray.slice(showedAmountComments, showedAmountComments + COMMENTS_PER_LOAD));

  showedAmountComments += COMMENTS_PER_LOAD;

  updateCommentCounter();

  if (showedAmountComments >= commentsArray.length) {
    hideCommentsLoader();
  }
};

// отслеживание кликов по кнопке загрузки комментариев
const createEventCommentsLoader = () => {
  commentsLoader.addEventListener('click', loadMoreComments);
};

// Функция очистки списка комментариев
const resetComments = () => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
};

// создание списка комментариев
const createCommentsList = (comments) => {
  showedAmountComments = COMMENTS_PER_LOAD;

  if (!comments?.length) {
    return;
  }

  resetComments();

  fillingListComments(comments.slice(0, COMMENTS_PER_LOAD));

  if (comments.length <= COMMENTS_PER_LOAD) {
    hideCommentsLoader();
    return;
  }

  createEventCommentsLoader();

  updateCommentCounter();
};

// открытие модалки
const openBigPicture = (picture) => {
  commentsArray = picture.comments;
  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  commentCounter.classList.toggle('hidden', !commentsArray.length);
  commentsList.classList.toggle('hidden', !commentsArray.length);
  commentsLoader.classList.toggle('hidden', !commentsArray.length);

  createBigPicture(picture);
  createCommentsList(commentsArray);
};

// закрытие модалки
const closeBigPicture = () => {
  commentsLoader.removeEventListener('click', loadMoreComments);
  document.removeEventListener('keydown', onDocumentKeydown);

  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

// отслеживание клика по кнопке скрытия модалки
bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

// отслеживание клика по escape
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
