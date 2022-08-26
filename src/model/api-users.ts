import type { User } from './app-types';

const API_ENDPOINT = 'https://rss-rs-lang.herokuapp.com';

export function registerUser (user: User) {
  return fetch(`${API_ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}

export function signInUser (user: User) {
  return fetch(`${API_ENDPOINT}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
}
