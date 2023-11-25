import { isEscapeKey } from './utils.js';
import { isUniqueArray } from './utils.js';
import { initEffect, reset } from './effect-picture.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';
import { showPhoto } from './upload-picture.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_AMOUNT = 5;
const HASHTAG__MAX_LENGTH = 20;

const submitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const messagesError = {
  HASH_START_ERROR: 'Хэш-тег должен начинается с символа #',
  OTHER_SYMBOL_ERROR: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д.',
  AMOUNT_HASHTAGS_ERROR: 'Допускается только 5 уникальных хеш-тегов',
  REPEAT_HASHTAGS_ERROR: 'Один и тот же хэш-тег не может быть использован дважды',
  ONLY_HASH_ERROR: 'Хеш-тег не может состоять только из одной решётки',
  AMOUNT_SYMBOLS_HASHTAG_ERROR: 'В одном хеш-теге допускается только 20 символов, включая решетку',
  AMOUNT_SYMBOLS_COMMENT_ERROR: 'В одном комментарии допускается только 140 символов',
};

const formUploadImg = document.querySelector('.img-upload__form');
const uploadNewPicture = formUploadImg.querySelector('.img-upload__input');
const overlayImgUpload = formUploadImg.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonClose = formUploadImg.querySelector('.img-upload__cancel');
const textHashtags = formUploadImg.querySelector('.text__hashtags');
const textDescription = formUploadImg.querySelector('.text__description');
const submitButton = formUploadImg.querySelector('.img-upload__submit');

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? submitButtonCaption.SUBMITTING
    : submitButtonCaption.IDLE;
};

const pristine = new Pristine(formUploadImg, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'p',
});

const isTextFieldFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textDescription;

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    onButtonCloseClick();
  }
};


uploadNewPicture.addEventListener('change', (value) => {
  showPhoto(value.target.files[0]);
  if (value) {
    overlayImgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
  }

  document.addEventListener('keydown', onFormEscKeydown);
});


function onButtonCloseClick () {
  pristine.reset();
  formUploadImg.reset();
  overlayImgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  reset();
  resetScale();
  document.removeEventListener('keydown', onFormEscKeydown);
}

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendData(new FormData(formElement));
    onButtonCloseClick();
    showSuccessMessage();

  } catch {
    showErrorMessage();

  } finally {
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

buttonClose.addEventListener('click', onButtonCloseClick);

formUploadImg.addEventListener('submit', onFormSubmit);

let hashtagsError = '';

const validatesHashtags = (value) => {
  if (!value.length) {
    return true;
  }

  const tags = value.trim().toLowerCase().split(/\s*(?=#)/);

  if (tags.length > HASHTAG_AMOUNT) {
    hashtagsError = messagesError.AMOUNT_HASHTAGS_ERROR;
    return false;
  }

  if (!isUniqueArray(tags)) {
    hashtagsError = messagesError.REPEAT_HASHTAGS_ERROR;
    return false;
  }

  return tags.every((tag) => {
    if (tag[0] !== '#') {
      hashtagsError = messagesError.HASH_START_ERROR;
      return false;
    }

    if (tag.length > HASHTAG__MAX_LENGTH) {
      hashtagsError = messagesError.AMOUNT_SYMBOLS_HASHTAG_ERROR;
      return false;
    }

    if (tag === '#') {
      hashtagsError = messagesError.ONLY_HASH_ERROR;
    }

    if (!regexp.test(tag)) {
      hashtagsError = messagesError.OTHER_SYMBOL_ERROR;
      return false;
    }
    return true;
  });
};

pristine.addValidator(textHashtags, validatesHashtags, () => hashtagsError);
pristine.addValidator(
  textDescription,
  (value) => value.length < COMMENT_MAX_LENGTH,
  `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов`
);

initEffect();

