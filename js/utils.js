
const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorMessageTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (Array) => Array[getRandomInteger(0, Array.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => ++lastGeneratedId;
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isUniqueArray = (array) => new Set(array).size === array.length;

const showErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
}

export { getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey, isUniqueArray, showErrorMessage, debounce };
