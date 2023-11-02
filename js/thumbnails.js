import { openModalPicture } from './modal-picture.js';

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createTumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.alt;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.addEventListener('click', () => {
    openModalPicture(photo);
  });
  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = createTumbnail(photo);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
