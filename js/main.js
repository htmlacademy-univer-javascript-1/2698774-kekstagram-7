import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });
