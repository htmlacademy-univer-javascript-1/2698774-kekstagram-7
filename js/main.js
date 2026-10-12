import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
const photos = generatePhotos();
renderThumbnails(photos);
