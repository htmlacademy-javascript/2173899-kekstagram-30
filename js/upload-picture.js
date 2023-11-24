const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const effectsPreview = document.querySelectorAll('.effects__preview');
const photoPreview = document.querySelector('.img-upload__preview img');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const showPictureInPreview = (preview) => {
  preview.style.backgroundImage = `url('${photoPreview.src}')`;
};

const showPhoto = (file) => {
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach(showPictureInPreview);
  }
};
export { showPhoto };
