import { METHODS_FETCH, ROUTS } from './constants';
import { apiConfig } from './utils'

const { loginPath, logoutPath, registerPath, userPath, moviesPath } = ROUTS;
const { postFetch, patchFetch, deleteFetch } = METHODS_FETCH;

class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl.mainApi;
    this._headers = headers;
    this._credentials = credentials;
  }

  // Метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(res => { throw res });
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
      credentials: this._credentials,
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
      credentials: this._credentials,
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
      credentials: this._credentials,
    })
  }

  // Метод запроса данных пользователя с сервера
  logout() {
    return this._request(`${this._baseUrl}${logoutPath}`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // метод запроса сохраненных фильмов с сервера
  getMovies() {
    return this._request(`${this._baseUrl}${moviesPath}`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // Метод запроса данных пользователя с сервера
  getUserInfoApi() {
    return this._request(`${this._baseUrl}${userPath}`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, email }) {
    return this._request(`${this._baseUrl}${userPath}`, {
      method: patchFetch,
      headers: this._headers,
      credentials: this._credentials,
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
      credentials: this._credentials,
      body: JSON.stringify(movie)
    })
  }

  // Метод удаления карточки с сервера
  deleteMovies(movieId) {
    return this._request(`${this._baseUrl}${moviesPath}/${movieId}`, {
      method: deleteFetch,
      headers: this._headers,
      credentials: this._credentials,
    })
  }
}

export const api = new Api(apiConfig);