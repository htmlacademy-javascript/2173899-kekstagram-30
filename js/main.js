const Amount = {
  PICTURE: 25,
  AVATAR: 6,
  LIKE_MIN: 15,
  LIKE_MAX: 200,
  COMMENT: 20
};

// const PICTURE_COUNT = 25;
// const AVATAR_COUNT = 6;
// const LIKE_MIN_COUNT = 15;
// const LIKE_MAX_COUNT = 200;
// const COMMENT_COUNT = 20;

const NAMES = [
  'Иван',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
];

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];

const DESCRIPTIONS = [
  'На фотографии мы видим красивое небо',
  'Фотография была сделана ночью',
  'На заднем плане находится сад с деревьями',
  'На переднем плане играющие котята',
  'В центре фотографии наш дом',
  'Фотография создаёт весёлое настроение',
  'Автор фотографии показывает, что всё не вечно',
  'У человека на фото счастливый вид',
  'На фотографии мой младший брат. Он без ума от животных.',
  'На детской площадке можно увидеть забавных детей. За ними простые футбольные ворота. Трава ярко-зеленая, и деревья на заднем плане тоже зеленые.',
  'На фотографии вы можете видеть мою сестру. Ее зовут Ирина, и она хорошая спортсменка. Всякий раз, когда у нее есть свободное время, она ходит на стадион заниматься спортом.'
];


function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => ++lastGeneratedId;
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_LINES),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, Amount.AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(Amount.LIKE_MIN, Amount.LIKE_MAX),
  comments: Array.from(
    { length: getRandomInteger(0, Amount.COMMENT) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: Amount.PICTURE },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

getPictures();

