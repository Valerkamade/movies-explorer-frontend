import { METHODS_FETCH, ROUTS, CREDENTIALS } from './constants';
import { apiConfig } from './utils'

const { loginPath, logoutPath, registerPath, userPath, moviesPath } = ROUTS;
const { postFetch, patchFetch, deleteFetch } = METHODS_FETCH;

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.mainApi;
    this._headers = headers;
  }

  // Метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    return res.json().then(res => { throw res });
    // return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  }

  // Метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._isOk)
  }

  // Метод создания нового пользователя
  addNewUser({ name, password, email }) {
    return this._request(`${this._baseUrl}${registerPath}`, {
      method: postFetch,
      headers: this._headers,
      credentials: CREDENTIALS,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
  }

  // Метод авторизации
  authorize({ password, email }) {
    return this._request(`${this._baseUrl}${loginPath}`, {
      method: postFetch,
      headers: this._headers,
      credentials: CREDENTIALS,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  // Метод запроса данных пользователя с сервера
  checkToken() {
    return this._request(`${this._baseUrl}${userPath}`, {
      headers: this._headers,
      credentials: CREDENTIALS,
    })
  }

  // Метод выхода пользователя
  logout() {
    return this._request(`${this._baseUrl}${logoutPath}`, {
      headers: this._headers,
      credentials: CREDENTIALS,
    })
  }

  // метод запроса сохраненных фильмов с сервера
  getMovies() {
    return this._request(`${this._baseUrl}${moviesPath}`, {
      headers: this._headers,
      credentials: CREDENTIALS,
    })
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, email }) {
    return this._request(`${this._baseUrl}${userPath}`, {
      method: patchFetch,
      headers: this._headers,
      credentials: CREDENTIALS,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
  }

  // Метод отправки данных об установке/снятии лайка на сервер
  addSavedMovies(movie) {
    return this._request(`${this._baseUrl}${moviesPath}`, {
      method: postFetch,
      headers: this._headers,
      credentials: CREDENTIALS,
      body: JSON.stringify(movie)
    })
  }

  // Метод удаления карточки с сервера
  deleteMovies(movieId) {
    return this._request(`${this._baseUrl}${moviesPath}/${movieId}`, {
      method: deleteFetch,
      headers: this._headers,
      credentials: CREDENTIALS,
    })
  }
}

export const api = new Api(apiConfig);