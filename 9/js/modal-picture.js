import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const modalPicture = document.querySelector('.big-picture');
const bigPicture = modalPicture.querySelector('.big-picture__img img');
const likesCount = modalPicture.querySelector('.likes-count');
const socialCommentShownCount = modalPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = modalPicture.querySelector('.social__comment-total-count');
const socialComments = modalPicture.querySelector('.social__comments');
const socialCaption = modalPicture.querySelector('.social__caption');
const socialCommentCount = modalPicture.querySelector('.social__comment-count');
const commentsLoader = modalPicture.querySelector('.comments-loader');
const closeButton = modalPicture.querySelector('.big-picture__cancel');

const COMMENT_AVATAR_SIZE = 35;
const COMMENTS_AMOUNT = 5;

// Создание комментариев
const createComments = (comments) => {
  socialComments.innerHTML = '';

  if(comments) {
    comments.forEach((comment) => {
      const newLi = document.createElement('li');
      const newImg = document.createElement('img');
      const newPar = document.createElement('p');

      newLi.className = 'social__comment';
      newImg.className = 'social__picture';
      newImg.src = comment.avatar;
      newImg.alt = comment.name;
      newImg.width = COMMENT_AVATAR_SIZE;
      newImg.height = COMMENT_AVATAR_SIZE;
      newPar.className = 'social__text';
      newPar.textContent = comment.message;

      newLi.append(newImg);
      newLi.append(newPar);
      socialComments.append(newLi);
    });
  }

  if (comments.length >= COMMENTS_AMOUNT) {
    const commentsList = socialComments.querySelectorAll('.social__comment');
    socialCommentCount.classList.remove('hidden');
    socialCommentCount.textContent = `${COMMENTS_AMOUNT} из ${commentsList.length} комментариев`;

    for (let i = 0; i < comments.length; i++) {
      if (i >= COMMENTS_AMOUNT) {
        commentsList[i].classList.add('hidden');
        commentsLoader.classList.remove('hidden');
      }
    }
  }
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalPictureClick();
  }
};

const openModalPicture = (photo) => {
  modalPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPicture.src = photo.url;
  bigPicture.alt = photo.alt;
  likesCount.textContent = photo.likes;
  socialCommentShownCount.textContent = photo.comments;
  socialCommentTotalCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onModalEscKeydown);
  commentsLoader.addEventListener('click', onСommentsLoaderClick);

  createComments(photo.comments);
};

function onModalPictureClick () {
  modalPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  commentsLoader.removeEventListener('click', onСommentsLoaderClick);
}

function onСommentsLoaderClick () {
  const hiddenComments = socialComments.querySelectorAll('.social__comment.hidden');
  const commentsList = socialComments.querySelectorAll('.social__comment');

  socialCommentCount.textContent = `${commentsList.length - hiddenComments.length + COMMENTS_AMOUNT} из ${commentsList.length} комментариев`;

  if (hiddenComments.length <= COMMENTS_AMOUNT) {
    commentsLoader.classList.add('hidden');
    socialCommentCount.textContent = `${commentsList.length} из ${commentsList.length} комментариев`;
  }

  for (let i = 0; i < COMMENTS_AMOUNT; i++) {
    if (hiddenComments[i]) {
      hiddenComments[i].classList.remove('hidden');
    }
  }
}

closeButton.addEventListener('click', onModalPictureClick);


export { openModalPicture, onModalPictureClick, onModalEscKeydown };

