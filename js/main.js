import { getRandomInt } from "./data.js";
import {previewFn} from "./preview.js";
import "./FullPhoto.js";
import {getPhotoFromServer} from "./fetchPhoto.js";
import {makeFilter} from './filter.js';



getPhotoFromServer()
  .then((photos) => {
    // Добавить аватары (генерируем)
    photos.forEach((photo) => {
      photo.avatar = 'img/avatar-' + getRandomInt(1, 6) +  '.svg';
    });

    console.log(photos);
    window.photos = photos;
    previewFn(photos);
    makeFilter(photos);
  });




