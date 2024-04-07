// import {photos} from "./data";

const section = document.querySelector('.pictures.container');
// evt.target

section.addEventListener('click', function(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  // .big-picture

  const target = evt.target;
  const linkParent = target.closest("a");

  if (!linkParent) {
    return;
  }

  const id = +linkParent.getAttribute("data-id");

  let photo;

  for (let i = 0; i < photos.length; i++) {

    if (photos[i].id === id) {
      photo = photos[i];
      break;
    }
  }



  ///


  const bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.remove('hidden');

  // const pictureTemplate = document.querySelector('#full_img').content;
  const img = bigPicture.querySelector(".big-picture__img img");
  const description = bigPicture.querySelector('.social__caption');
  const likes = bigPicture.querySelector('.likes-count');

  img.src = photo.url;
  img.alt = photo.description;
  description.innerHTML = photo.description;
  likes.innerHTML = photo.likes;





  // full_img
});


