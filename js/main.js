import { photos } from "./data.js";
import {previewFn} from "./preview.js";
import "./FullPhoto.js";

console.log(photos);
window.photos = photos;

previewFn(photos);


/*document.addEventListener("DOMContentLoaded", function () {

})*/


