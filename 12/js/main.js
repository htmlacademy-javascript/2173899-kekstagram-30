
import {renderThumbnails} from './thumbnails.js';
import { onFileInputChange } from './upload-new-picture.js';
import { loadData } from './api.js';
import { showErrorMessage } from './utils.js';
import { initFilter } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await loadData();
    renderThumbnails(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();

onFileInputChange();

