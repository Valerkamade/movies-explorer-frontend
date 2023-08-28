import { apiConfig } from './utils'

class ApiMovies {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.moviesApi;
    this._headers = headers;
  }

  // Метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  }

  // Метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._isOk)
  }

  // Метод запроса данных пользователя с сервера
  getMovies() {
    return this._request(this._baseUrl, {
      headers: this._headers,
    })
  }
}

export const apiMovies = new ApiMovies(apiConfig);

