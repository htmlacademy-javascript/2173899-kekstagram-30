import { isEscapeKey } from './utils.js';

const bodyElement = document.querySelector('body');
const modalPicture = document.querySelector('.big-picture');
const closeButton = modalPicture.querySelector('.big-picture__cancel');
const socialComments = modalPicture.querySelector('.social__comments');
const socialCommentShownCount = modalPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = modalPicture.querySelector('.social__comment-total-count');
const commentsLoader = modalPicture.querySelector('.comments-loader');

const commentElement = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const COMMENTS_AMOUNT = 5;

let commentsCountShown = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  commentsCountShown += COMMENTS_AMOUNT;

  if (commentsCountShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  socialComments.innerHTML = '';
  socialComments.append(fragment);

  socialCommentShownCount.textContent = commentsCountShown;
  socialCommentTotalCount.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

const hidePicture = () => {
  commentsCountShown = 0;
  modalPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({ url, description, likes }) => {
  modalPicture.querySelector('.big-picture__img img').src = url;
  modalPicture.querySelector('.big-picture__img img').alt = description;
  modalPicture.querySelector('.likes-count').textContent = likes;
  modalPicture.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  modalPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);
};

closeButton.addEventListener('click', onClosePictureButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);


export { showPicture };

