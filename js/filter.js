import {previewFn, clearSpace} from "./preview.js";
import {getUniqueRandomInt} from "./util.js";

function doSortPhotos(target, idFilter) {
  switch (idFilter) {
    case 'filter-default':
      clearSpace();
      previewFn(photos);
      break;
    case 'filter-random':
      const randPhotoList = [];
      const uniqueRandSet = new Set();

      for (let i = 0; i <10 ; i++) {
        const idx = getUniqueRandomInt(0, 24, uniqueRandSet);
        randPhotoList.push(photos[idx]);
      }
      clearSpace();
      previewFn(randPhotoList);
      break;
    case 'filter-discussed':
      const bigerCommentsPhoto = [...photos];
      bigerCommentsPhoto.sort((photo1, photo2) => {
        const photo2Comments = (photo2.comments) ? photo2.comments.length : 0;
        const photo1Comments = (photo1.comments) ? photo1.comments.length : 0;

        return photo2Comments - photo1Comments
      });
      clearSpace();
      previewFn(bigerCommentsPhoto);
      break;
  }
}

const makeFilter = (photos) => {
  // показываем фильтры
  const filterButton = document.querySelector('.img-filters');
  filterButton.classList.remove('img-filters--inactive');

  filterButton.addEventListener('click', (evt) => {
    let target = evt.target;

    if (!target.classList.contains("img-filters__button")) {
      return;
    }

    if (target.classList.contains("img-filters__button--active")
      && target.id !== 'filter-random') {
      return;
    }
    const currentButtonActive = target.parentNode.querySelector('.img-filters__button--active');

    const idFilter = target.id;
    currentButtonActive.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');

    const theDebounce = _.debounce((count) => {
      doSortPhotos(target, idFilter);
    }, 200, {});
    theDebounce();

  })
};

export {makeFilter};
