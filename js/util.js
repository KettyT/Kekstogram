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
    return -1;
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
