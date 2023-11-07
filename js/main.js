import {getPictures} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import { uploadNewPicture } from './upload-new-picture.js';
const picrures = getPictures();
renderThumbnails(picrures);
uploadNewPicture();

