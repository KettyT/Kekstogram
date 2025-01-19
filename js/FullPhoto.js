
import {validateForm} from "./validation.js"
import {sendPhotoToServer} from './fetchPhoto.js'
import {closeImageUploadForm} from "./util.js"

const VISIBLE_COUNT_COMMENT = 5;
const acceptedTypes = ["image/jpeg", "image/png"];

function chooseStyleByFilterEffect(effectName, manifestation) {
  switch (effectName) {
    case "effect-chrome":
      return "grayscale(" + manifestation + ")";
    case "effect-sepia":
      return "sepia(" + manifestation + ")";
    case "effect-marvin":
      return "invert(" + manifestation + ")";
    case "effect-phobos":
      return "blur(" + (manifestation * 10) + "px)";
      // return "filter: blur(0..3px)";
    case "effect-heat":
      return "brightness(" + (manifestation) + ")";
      // return "brightness(1..3)";
    case "effect-none":
    default:
      return "";
  }
}

const addComments = (from, to, photo, commentTemplate, socialCommentsDomElm, socialCommentCountDomElm) => {
  for (let i = from; i < to; i++) {
    const comment = photo.comments[i];
    commentTemplate.querySelector(".social__text").textContent = comment.message;
    const imgComment = commentTemplate.querySelector("img");
    imgComment.src = comment.avatar;
    imgComment.alt = comment.name;

    let commentElm = commentTemplate.cloneNode(true);

    socialCommentsDomElm.appendChild(commentElm);
  }
  socialCommentCountDomElm.innerHTML = to + " из <span class=\"comments-count\">" + photo.comments.length + "</span> комментариев"; // можно заменить на appendChild
};

document.addEventListener("DOMContentLoaded", function () {
  const START_RANGE = 0.5;
  let currentEffectForUpload = "none";
  let currentEffect = "none";
  let currentScale = 100;

  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const section = document.querySelector('.pictures.container');
  const formImgUpload = document.querySelector('.img-upload__wrapper');
  const submitButton = document.querySelector('#upload-submit');
  const loadStatus = document.querySelector(".onload-status");
  let currentVisibleCommentsCount;
  let currentPhoto;
  const commentTemplate = document.querySelector("#full_img").content;
  const socialComments = document.querySelector('.social__comments');
  const bigPicture = document.querySelector('.big-picture');

// клик по случайной мини-фото
  section.addEventListener('click', function(evt) {
    const target = evt.target; // элемент на катором произошло событие
    const linkParent = target.closest("a"); // получение ближайшего родителя
    if (!linkParent) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    const id = +linkParent.getAttribute("data-id");
    let photo; // фото на которое кликнули

    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id === id) {
        photo = photos[i];
        currentPhoto = photo;
        break;
      }
    }

//показ большой фотографии

    bigPicture.classList.remove('hidden');
    const img = bigPicture.querySelector(".big-picture__img img");
    const description = bigPicture.querySelector('.social__caption');
    const likes = bigPicture.querySelector('.likes-count');
    const socialCommentCount = bigPicture.querySelector('.social__comment-count');
    const socialAvatar = bigPicture.querySelector('.social__picture');

    img.src = photo.url;
    img.alt = photo.description;
    socialAvatar.src = photo.avatar;
    description.textContent = photo.description;
    likes.textContent = photo.likes;

    socialComments.textContent = "";

    currentVisibleCommentsCount = Math.min(VISIBLE_COUNT_COMMENT, photo.comments.length);

    addComments(0, currentVisibleCommentsCount, photo, commentTemplate, socialComments, socialCommentCount);
    if (currentVisibleCommentsCount < currentPhoto.comments.length) {
      buttonUploadMore.classList.remove('hidden');
    }

    document.body.classList.add("modal-open");
  });

  const  buttonUploadMore = document.querySelector('.comments-loader');

  buttonUploadMore.addEventListener('click', evt => {

    let from = currentVisibleCommentsCount;
    currentVisibleCommentsCount = Math.min(currentVisibleCommentsCount + VISIBLE_COUNT_COMMENT, currentPhoto.comments.length);
    let to = currentVisibleCommentsCount;

    const socialCommentCount = bigPicture.querySelector('.social__comment-count');

    addComments(from, to, currentPhoto, commentTemplate, socialComments, socialCommentCount);

    if (!(currentVisibleCommentsCount < currentPhoto.comments.length)) {
      buttonUploadMore.classList.add('hidden');
    }
  })

  //загрузка фото

  const uploadFile = document.querySelector('#upload-file');
  let selectedFile = null;

  uploadFile.addEventListener("change", (evt) => {

    const file = evt.target.files[0]; // берем первый файл

    if (acceptedTypes.indexOf(file.type) === -1) {
      // todo показать форму с ошибкой
      console.log("Не верный тип файла");
      return;
    }

    const imgUploadOverlay = document.querySelector('.img-upload__overlay');
    imgUploadOverlay.classList.remove("hidden");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(event) {
      imgUploadPreview.src = reader.result;
      uploadFile.value = null;
    };

    selectedFile = file;

    // Навешиваем slider
    const effectLevelSlider = formImgUpload.querySelector('.effect-level__slider');
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 1.0,
      },
      start: START_RANGE,
      step: 0.05,
      connect: 'lower',
    });

    effectLevelSlider.noUiSlider.on("update", function () {
      if (!currentEffect) {
        return;
      }

      const li = currentEffect;
      const input = li.querySelector('input');
      const effect = input.id;
      const filterEffect = chooseStyleByFilterEffect(effect, effectLevelSlider.noUiSlider.get());

      imgUploadPreview.style.filter = filterEffect;
    });
  }, false);

  //выбор эффекта
  const effectsList = document.querySelector(".effects__list");

  effectsList.addEventListener('click', (evt) => {
    currentEffect = evt.target.closest('li');
    const li = currentEffect;
    const input = li.querySelector('input');
    const effect = input.id;
    currentEffectForUpload = input.value;

    const filterEffect = chooseStyleByFilterEffect(effect, START_RANGE);
    // imgUploadPreview.setAttribute("style", style);
    imgUploadPreview.style.filter = filterEffect;
    const rang = formImgUpload.querySelector('.img-upload__effect-level');
    if ("effect-none" === effect) {

      rang.classList.add('hidden');

    }  else {
      rang.classList.remove('hidden');
    }
  });

  const buttonScaleSmaller= document.querySelector('.scale__control--smaller');
  const buttonScaleBigger= document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');

  buttonScaleSmaller.addEventListener('click', (evt) => {

    if (currentScale - 25 < 25) {
      return;
    }
    currentScale = currentScale - 25;
    scaleControlValue.value = currentScale + '%';

    imgUploadPreview.style.transform = 'scale(' + currentScale + '%)';
  });

  buttonScaleBigger.addEventListener('click', (evt) => {

    if (currentScale + 25 > 100) {
      return;
    }
    currentScale = currentScale + 25;
    scaleControlValue.value = currentScale + '%';

    imgUploadPreview.style.transform = 'scale(' + currentScale + '%)';
  });

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const validationResult = validateForm();

    if (!validationResult) {
      return;
    }
    closeImageUploadForm();

    const template = document.querySelector('#messages').content;
    const messageForm = template.cloneNode(true);
    const messageContent = loadStatus.querySelector(".message-content");
    messageContent.innerHTML = "";
    messageContent.appendChild(messageForm);
    loadStatus.classList.remove("hidden");
    document.body.classList.add("modal-open");

    sendPhotoToServer({
      selectedFile: selectedFile,
      currentScale: currentScale,
      currentEffectForUpload: currentEffectForUpload
    }).then((result) => {
      // Успех
      const template = document.querySelector('#success').content;
      const messageForm = template.cloneNode(true);

      const messageContent = loadStatus.querySelector(".message-content");
      messageContent.innerHTML = "";

      messageContent.appendChild(messageForm);

      loadStatus.classList.remove("hidden");
      document.body.classList.add("modal-open");

    }, (data) => {
      loadStatus.classList.remove("hidden");
    });
  })
});






