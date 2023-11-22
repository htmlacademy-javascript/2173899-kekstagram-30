import { showPicture } from './modal-picture.js';

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.addEventListener('click', () => {
    showPicture(photo);
  });
  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
