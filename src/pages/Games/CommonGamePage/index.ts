import { getWords } from '@/model/api-words';
import { Word } from '@/model/app-types';
import { PAGES_PER_GROUP } from '@/model/constants';

export const getRandomIndex = (max: number, notEqual = <Array<number>>[]) => {
  let random = Math.floor(Math.random() * max);;
  while (notEqual.includes(random)){
    random = Math.floor(Math.random() * max);
  }
  return random;
};

export const loadWords = (g: number, p: number) => new Promise(resolve => {
  getWords(`${g}`, `${p}`)
    .then((data: Word[]) => {
      resolve(data);
    })
    .catch(err => { console.log(err); });
});

export const getRandomPage = (usedPages: number[]) => {
  let index = getRandomIndex(PAGES_PER_GROUP);
  while (usedPages.includes(index)) {
    index = getRandomIndex(PAGES_PER_GROUP);
  }
  return index;
};
