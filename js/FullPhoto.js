// import {photos} from "./data";
import {validateForm} from "./validation.js"

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

document.addEventListener("DOMContentLoaded", function () {
  const START_RANGE = 0.5;
  let currentEffectForUpload = "none";
  let currentEffect = "none";
  let currentScale = 100;

  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const section = document.querySelector('.pictures.container');
  const formImgUpload = document.querySelector('.img-upload__wrapper');
  const submitButton = document.querySelector('#upload-submit');

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
        break;
      }
    }

//показ большой картинки
    const bigPicture = document.querySelector('.big-picture');
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

    const socialComments = document.querySelector('.social__comments');
    socialComments.textContent = "";

    const commentTemplate = document.querySelector("#full_img").content;
    socialCommentCount.innerHTML = photo.comments.length + " из <span class=\"comments-count\">" + photo.comments.length + "</span> комментариев"; // можно заменить на appendChild
    for (let i = 0; i < photo.comments.length; i++) {
      const comment = photo.comments[i];
      commentTemplate.querySelector(".social__text").textContent = comment.message;
      const imgComment = commentTemplate.querySelector("img");
      imgComment.src = comment.avatar;
      imgComment.alt = comment.name;

      let commentElm = commentTemplate.cloneNode(true);

      socialComments.appendChild(commentElm);
    }

    document.body.classList.add("modal-open");
  });

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

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(event) {
      imgUploadPreview.src = reader.result;
      uploadFile.value = null;
    };

    selectedFile = file;


    // Навешиваем slider.
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
      // imgUploadPreview.setAttribute("style", style);
      imgUploadPreview.style.filter = filterEffect;
    });
  }, false);
  /*noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    });*/

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


  })





});






