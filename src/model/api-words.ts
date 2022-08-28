import type { Word } from './app-types';

export const API_ENDPOINT = 'https://rss-rs-lang.herokuapp.com';

export function getWords (group: string, page: string) {
  const url = new URL(`${API_ENDPOINT}/words`);
  const params = [
    ['group', group],
    ['page', page],
  ];
  const queryParams = new URLSearchParams(params);
  url.search = queryParams.toString(); // url + ? + params
  return fetch(url, {
    method: 'GET',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((words: Word[]) => words)
    .catch(err => {
      console.log(err);
    })
    .finally(() => {});
}
