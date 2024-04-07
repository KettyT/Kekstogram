

const previewFn =function (photos) {


  const photoTemplate = document.getElementById("picture").content.querySelector("a");
  const container = document.querySelector(".pictures");

  for (let i = 0; i < photos.length; i++) {

    let templateClone = photoTemplate.cloneNode(true);


    templateClone.setAttribute("href", photos[i].url);
    templateClone.setAttribute("data-id", photos[i].id);
    const minipicture = templateClone.querySelector('img');
    minipicture.src = photos[i].url;
    minipicture.alt = photos[i].description;

    const keksComments = templateClone.querySelector('.picture__comments');
    keksComments.innerHTML = photos[i].comments.length;

    const keksLikes = templateClone.querySelector('.picture__likes');
    keksLikes.innerHTML = photos[i].likes;

    container.appendChild(templateClone);
  }
};

export {previewFn }


