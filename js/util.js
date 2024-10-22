//случайное число

const myAwesomeSet = new Set();

const getUniqueRandomInt = function (min, max) {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min]
  };

  let genNext = true;
  let counter = 0;

  while (genNext) {
    const number = Math.floor(Math.random()* (max-min+1)) + min;

    if (!myAwesomeSet.has(number)) {
      myAwesomeSet.add(number);
      return number;
    }

    counter++;

    if (counter > 100) {
      console.log(myAwesomeSet);
      throw new Error("Числа закончились в промежутке " + min + ' ' + max + ' ');
    }
  }
}

const getRandomInt = function (min, max) {
  if (min < 0 || max < 0) {
    throw new Error("Не верные параметры для случайного числа")
  }

  if (max < min) {
    [min, max] = [max, min]
  };

  return Math.floor(Math.random()* (max-min+1)) + min;
}

//проверка строки
const stringCount = (text, sign) => {
  return text.length <= sign ? true: false;
}

//случайный элемент массива
const getRandomElementArr = (array) => {
  return array[getRandomInt(0, array.length-1)];
}

export { getRandomInt, stringCount, getRandomElementArr, getUniqueRandomInt};

// закрытие большой картинки

document.addEventListener('keydown', (evt)=> {
  if (evt.keyCode === 27) {
    // picture-cancel
    const bigPicture = document.querySelector('.big-picture');

    if (!bigPicture.classList.contains('hidden')) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove("modal-open");
      return;
    }
    const imgUploadOverlay = document.querySelector('.img-upload__overlay');
    if (!imgUploadOverlay.classList.contains('hidden')) {
      imgUploadOverlay.classList.add('hidden');
      document.body.classList.remove("modal-open");// разрешение прокрутки
    }

  }

})

const cross = document.querySelector('.big-picture__cancel');
cross.addEventListener('click', function() {
  const bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.add('hidden');
  document.body.classList.remove("modal-open");

})

const uploadCross = document.querySelector('.img-upload__cancel.cancel');
uploadCross.addEventListener('click', function() {
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove("modal-open");// разрешение прокрутки

})
