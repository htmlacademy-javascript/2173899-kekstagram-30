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

export {getRandomInteger, getRandomArrayElement, createIdGenerator};
