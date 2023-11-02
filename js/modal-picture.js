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
  document.addEventListener('keydown', onModalEscKeydown);

  bigPicture.src = photo.url;
  bigPicture.alt = photo.alt;
  likesCount.textContent = photo.likes;
  socialCommentShownCount.textContent = photo.comments;
  socialCommentTotalCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  createComments(photo.comments);
};

function onModalPictureClick () {
  modalPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
}

closeButton.addEventListener('click', onModalPictureClick);


export { openModalPicture, onModalPictureClick as closeModalPicture, onModalEscKeydown };

