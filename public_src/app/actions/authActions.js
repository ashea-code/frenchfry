import * as types from 'constants/actionTypes';

export const checkIfAuthed = cb => (
  fetch(`/api/auth/check?t=${Math.floor(Date.now() / 1000)}`, {
    credentials: 'include',
  })
    .then(resp => resp.json())
    .then((jsonData) => {
      cb(jsonData.authenticated);
    })
);

export const getUserInfo = cb => (
  fetch(`/api/auth/me?t=${Math.floor(Date.now() / 1000)}`, {
    credentials: 'include',
  })
    .then(resp => resp.json())
    .then((jsonData) => {
      cb(jsonData);
    })
);

export const userLoggedIn = user => ({ type: types.USER_LOGGED_IN, user });
export const userLoggedOut = () => ({ type: types.USER_LOGGED_OUT });
