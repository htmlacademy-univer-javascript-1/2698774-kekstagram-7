import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { initFilters } from './filters.js';
import './form.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilters(pictures, debounce(renderThumbnails));
  })
  .catch((err) => {
    showAlert(err.message);
  });
