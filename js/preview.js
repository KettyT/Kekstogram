

const previewFn =function (photos) {


  const photoTemplate = document.getElementById("picture").content.querySelector("a");
  const container = document.querySelector(".pictures");

  for (let i = 0; i < photos.length; i++) {

    let templateClone = photoTemplate.cloneNode(true);


    // templateClone.setAttribute("href", photos[i].url);
    templateClone.setAttribute("data-id", photos[i].id); //для открытия полной версии
    const minipicture = templateClone.querySelector('img');
    minipicture.src = photos[i].url;
    minipicture.alt = photos[i].description;

    const keksComments = templateClone.querySelector('.picture__comments');
    keksComments.textContent = photos[i].comments.length;

    const keksLikes = templateClone.querySelector('.picture__likes');
    keksLikes.textContent = photos[i].likes;

    container.appendChild(templateClone);
  }
};

export {previewFn }


