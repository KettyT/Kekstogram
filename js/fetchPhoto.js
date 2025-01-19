
const sendPhotoToServer = (request) => {
  return new Promise(function(resolve, reject) {
    const formData  = new FormData();

    formData.append("filename", request.selectedFile);
    formData.append("scale", request.currentScale);
    formData.append("effect", request.currentEffectForUpload);

    let status;

    const response = fetch("https://23.javascript.htmlacademy.pro/kekstagram", {
      method: 'POST',
      body: formData
    }).then(response => {
      // r Response заготовленный объект у фича, конвертация в объект js
      status = response.status;

      console.log(response);

      return response.json();
    }).then(data => {    // получаю результат конвертации
      if (status !== 200) {
        reject(data);
      } else {
        resolve(data);
      }
    });
  });

};

const getPhotoFromServer = () => {
  return new Promise(function(resolve, reject) {
    let status;

    const response = fetch("https://23.javascript.htmlacademy.pro/kekstagram/data", {
      method: 'GET',

    }).then(response => {
      // r Response заготовленный объект у фича, конвертация в объект js
      status = response.status;
      return response.json();
    }).then(data => {    // получаю результат конвертации
      if (status !== 200) {
        reject(data);
      } else {
        resolve(data);
      }
    });
  });
};

export {sendPhotoToServer, getPhotoFromServer}
