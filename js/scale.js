const MAX_VALUE = 100;
const MIN_VALUE = 25;
const STEP = 25;
const DEFAULT_VALUE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerButton = modalElement.querySelector('.scale__control--smaller');
const biggerButton = modalElement.querySelector('.scale__control--bigger');
const controlScaleValue = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / MAX_VALUE})`;
  controlScaleValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(controlScaleValue.value, 10) - STEP, MIN_VALUE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(controlScaleValue.value, 10) + STEP, MAX_VALUE)
  );
};

const resetScale = () => scaleImage(DEFAULT_VALUE);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
