// import {photos} from "./data";

const acceptedTypes = ["image/jpeg", "image/png"];

function chooseStyleByFilterEffect(effectName) {
  switch (effectName) {
    case "effect-chrome":
      return "filter: grayscale(0.5)";
    case "effect-sepia":
      return "filter: sepia(0.5)";
    case "effect-marvin":
      return "filter: invert(10%)";
    case "effect-phobos":
      return "filter: blur(2px)";
      // return "filter: blur(0..3px)";
    case "effect-heat":
      return "brightness(2)";
      // return "brightness(1..3)";
    case "effect-none":
    default:
      return "";

  }
}

document.addEventListener("DOMContentLoaded", function () {
  const imgUploadPreview = document.querySelector('.img-upload__preview img');

  const section = document.querySelector('.pictures.container');

  const formImgUpload = document.querySelector('.img-upload__wrapper');

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

    // const pictureTemplate = document.querySelector('#full_img').content;
    const img = bigPicture.querySelector(".big-picture__img img");
    const description = bigPicture.querySelector('.social__caption');
    const likes = bigPicture.querySelector('.likes-count');
    const socialCommentCount = bigPicture.querySelector('.social__comment-count');

    img.src = photo.url;
    img.alt = photo.description;
    description.textContent = photo.description;
    likes.textContent = photo.likes;

    const socialComments = document.querySelector('.social__comments');
    socialComments.textContent = "";

    const commentTemplate = document.querySelector("#full_img").content;

    socialCommentCount.innerHTML = photo.comments.length + " из <span class=\"comments-count\">" + photo.comments.length + "</span> комментариев"; // можно заменить на appendChild
    for (let i = 0; i < photo.comments.length; i++) {
      const comment = photo.comments[i];

      commentTemplate.querySelector(".social__text").innerHTML = comment.message;
      const imgComment = commentTemplate.querySelector("img");
      imgComment.src = comment.avatar;
      imgComment.alt = comment.name;

      let commentElm = commentTemplate.cloneNode(true);

      socialComments.appendChild(commentElm);
    }

    document.body.classList.add("modal-open");

    // const pictureTemplate = document.querySelector('#full_img').content;

    // full_img
  });

  //----------------------------------------------------------//

  const uploadFile = document.querySelector('#upload-file');

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
    reader.readAsDataURL(evt.target.files[0]);

    reader.onload = function(event) {
      imgUploadPreview.src = reader.result;

      uploadFile.value = null;
    };

    // Навешиваем slider.
    const effectLevelSlider = formImgUpload.querySelector('.effect-level__slider');
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 1.0,
      },
      start: 1.0,
      step: 0.1,
      connect: 'lower',
    });

    /*noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    });*/

  }, false);

  //-------------------------------///

  const effectsList = document.querySelector(".effects__list");
  effectsList.addEventListener('click', (evt) => {
    const li = evt.target.closest('li');
    const input = li.querySelector('input');
    const effect = input.id;

    const style = chooseStyleByFilterEffect(effect);
    imgUploadPreview.setAttribute("style", style);
    const rang = formImgUpload.querySelector('.img-upload__effect-level');
    if ("effect-none" === effect) {

      rang.classList.add('hidden');

    }  else {
      rang.classList.remove('hidden');
    }

  })

});






