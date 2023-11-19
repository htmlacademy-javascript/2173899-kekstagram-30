const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const effectsPreview = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const fileField = document.querySelector('#upload-file');
const photoPreview = document.querySelector('.img-upload__preview img');

const uploadPhoto = () => {
  fileField.addEventListener('change', () => {
    const file = fileField.files[0];

    if (file && isValidType(file)) {
      photoPreview.src = URL.createObjectURL(file);
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${photoPreview.src}')`;
      });
    }
  });
};

export { uploadPhoto };
