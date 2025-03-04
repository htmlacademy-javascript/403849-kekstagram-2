import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); // окно полноэкранного просмотра изображения
const bigPictureCloseElement = document.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentCounter = document.querySelector('.social__comment-count'); // счетчик комментариев
const commentsLoader = document.querySelector('.comments-loader'); // кнопка загрузки комментариев
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment'); // шаблон комментария
const commentShowCounter = bigPicture.querySelector('.social__comment-shown-count'); // счетчик показанных комментариев
const COMMENTS_PER_LOAD = 5;
let showedAmountComments = COMMENTS_PER_LOAD;

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

  bigPicture.querySelector('.social__comments').append(commentListFragment);
};

// отслеживание кликов по кнопке загрузки комментариев
const createEventCommentsLoader = (comments) => {
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();

    fillingListComments(comments.slice(showedAmountComments, showedAmountComments + COMMENTS_PER_LOAD));

    showedAmountComments += COMMENTS_PER_LOAD;

    commentShowCounter.textContent = showedAmountComments;

    if (showedAmountComments >= comments.length) {
      commentShowCounter.textContent = comments.length;
      commentsLoader.classList.add('hidden');
    }
  });
};

// создание списка комментариев
const createCommentsList = (comments) => {
  showedAmountComments = COMMENTS_PER_LOAD;

  if (!comments?.length) {
    return;
  }

  bigPicture.querySelector('.social__comments').innerHTML = '';

  fillingListComments(comments.slice(0, COMMENTS_PER_LOAD));

  if (comments.length <= COMMENTS_PER_LOAD) {
    commentShowCounter.textContent = comments.length;
    commentsLoader.classList.add('hidden');
    return;
  }

  createEventCommentsLoader(comments);

  commentShowCounter.textContent = showedAmountComments;
};

// открытие модалки
const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  commentCounter.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  createBigPicture(picture);

  createCommentsList(picture.comments);
};

// закрытие модалки
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentCounter.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
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
