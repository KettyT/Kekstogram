const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_HASHTAGS = 20;

const submitButton = document.querySelector('#upload-submit');
const uploadPhotoForm = document.querySelector('#upload-select-image'); // загрузка фото
const inputHashtag = document.querySelector('.text__hashtags');
const inputCommentsUploadForm = document.querySelector('.text__description');
const uploadFormErrorMessage = document.querySelector('.upload_form_error_message');

// const allowHashTagSet = new Set(["a", "b", "c"]);

let validateionResult = false;

const validateForm = function () {
  return validateionResult;
};

// поля хэш-тегов заполнены правильно
function setHashtagOk() {
  inputHashtag.setCustomValidity('');
  inputHashtag.classList.remove('input_error_border');
  uploadFormErrorMessage.classList.add('invisible');
}

// поля хэш-тегов заполнены с ошибками
function setHashtagError(errorMessage) {
  // inputHashtag.setCustomValidity(errorMessage.message);
  inputHashtag.classList.add('input_error_border');
  uploadFormErrorMessage.textContent = errorMessage.message;
  uploadFormErrorMessage.classList.remove('invisible')
}

let validateHashtags = function (inputText) {
  const inputArray = inputText.split(' ');// разделение строки на массив строк с заданным разделителем
  if(inputArray.length > MAX_HASHTAGS) {
    return {
      message: 'Максимум 5 хэш-тегов'
    }
  }

  for (let i = 0; i < inputArray.length; i++) {
    // for (let j = 0; j < inputArray[i].length; j++) {
    //   const character = inputArray[i][j];
    //
    //
    //   if (character >= 65 && character <= 90 || character >= 48 && character <= 57) {
    //
    //   } else {
    //     return {
    //       message: 'Не используйте постороние символы'
    //     }
    //   }
    // }

    const isRegHashtag = inputArray[i].match(/^#[a-zа-яё0-9]*[^S#@$,\[\-—\](\p{Emoji})]/iu);
    if (!isRegHashtag || isRegHashtag[0].length !== inputArray[i].length) {
      return {
        message: 'Не используйте постороние символы'
      }
    }
  }

  const isStartNotHashtag = inputArray.some((item) => {
    return item[0] !== '#';
  })
  if (isStartNotHashtag) {
    return {
      message: 'Хэш-тег начинается с символа #'
    }
  }

  const isLongHashtag = inputArray.some((item) => {
    return item.length > MAX_SYMBOLS_HASHTAGS
  });
  if (isLongHashtag) {
    return {
      message: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
    }
  }

  const isSplitSpaceHashtag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashtag) {
    inputHashtag.setCustomValidity('Хэш-теги разделяются пробелами');
  }

  const isRepeatingHashtag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatingHashtag) {
    inputHashtag.setCustomValidity('Хэш-теги не должны повторяться');
  }
};

inputHashtag.addEventListener('input', () => {
  const inputText = inputHashtag.value.toLowerCase().trim();
  if (!inputText) {
    return
  }

  let errorMessage = validateHashtags(inputText);
  if (!errorMessage) {
    setHashtagOk();
    validateionResult = true;
  } else {
    setHashtagError(errorMessage);
    validateionResult = false;
  }
});

export { validateForm }
