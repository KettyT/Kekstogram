import {getRandomInt, getRandomElementArr, getUniqueRandomInt} from './util.js';

const PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 1,
  MAX: 5,
};

let photos = [];

const names = [
  'Alex',
  'Anna',
  'Михаил',
  'Лера',
  'Даша',
  'Дима',
  'Олег',
  'Лев',
  'Max',
  'Love',
];

const descriptionPhoto = [
  'Без фильтров',
  'Новая камера',
  'Зацените фотку!',
  'Хороший ракурс',
  'Просто так',
  'Из архива',
];

const messages = [
  'Всё отлично!',
  ' В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  ' Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const addComments = () => {
  const comments = [];

  for (let i = 0; i < getRandomInt(Comments.MIN, Comments.MAX); i++) {
    comments.push({
      id: getRandomInt(0, 999),
      avatar: 'img/avatar-' + getRandomInt(1, 6) +  '.svg',
      message: getRandomElementArr(messages),
      name: getRandomElementArr(names),
    });

  }

  return comments;
};
// заполнение массива photos

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push ({
      id: i,
      url: 'photos/' + (i + 1) + '.jpg',
      description: descriptionPhoto[getRandomInt(0, descriptionPhoto.length - 1)],
      likes: getUniqueRandomInt(Likes.MIN, Likes.MAX),
      comments: addComments(),
    })
  }

};
addPhotos();

export { photos };
