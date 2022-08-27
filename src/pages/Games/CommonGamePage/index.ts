import { getWords } from '@/model/api-words';
import { Word } from '@/model/app-types';
import { PAGES_PER_GROUP } from '@/model/constants';

export const getRandomIndex = (max: number, notEqual: number) => {
  let random = notEqual;
  while (random === notEqual){
    random = Math.floor(Math.random() * max);
  }
  return random;
};

export const loadWords = (g: number, p: number) => new Promise(resolve => {
  getWords(`${g}`, `${p}`)
    .then(res => res.json())
    .then((data: Word[]) => {
      resolve(data);
    })
    .catch(err => { console.log(err); });
});

export const getRandomPage = (usedPages: number[]) => {
  let index = getRandomIndex(PAGES_PER_GROUP, -1);
  while (usedPages.includes(index)) {
    index = getRandomIndex(PAGES_PER_GROUP, -1);
  }
  return index;
};
