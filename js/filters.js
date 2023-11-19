import { renderThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const START_INDEX = 0;
const MAX_RANDOM_FILTER = 10;


const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const detRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));


const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);

    while (randomIndexList.length < max) {
      const index = detRandomIndex(START_INDEX, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
};

const repaint = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  clearPictures();
  renderThumbnails(filteredData);
};

const changesClassActiveEl = (evt) => {
  const currentActiveEl = filterForm.querySelector('.img-filters__button--active');
  currentActiveEl.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (evt) => {
    changesClassActiveEl(evt);
    debouncedRepaint(FilterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (evt) => {
    changesClassActiveEl(evt);
    debouncedRepaint(FilterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (evt) => {
    changesClassActiveEl(evt);
    debouncedRepaint(FilterEnum.DISCUSSED, data);
  });
};


export { initFilter };
