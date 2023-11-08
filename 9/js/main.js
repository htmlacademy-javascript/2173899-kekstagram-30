import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import { onFileInputChange } from './upload-new-picture.js';
const picrures = getPictures();
renderThumbnails(picrures);
onFileInputChange();

