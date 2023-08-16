import { apiConfig } from './utils'

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
    return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  }

  // Метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._isOk)
  }

  // Метод создания нового пользователя
  addNewUser({ name, password, email }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
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
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
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
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // Метод запроса данных пользователя с сервера
  logout() {
    return this._request(`${this._baseUrl}/signout`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // метод запроса сохраненных фильмов с сервера
  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // Метод запроса данных пользователя с сервера
  getUserInfoApi() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, email }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
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
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify( movie )
  })
}

// Метод удаления карточки с сервера
deleteMovies(movieId) {
  return this._request(`${this._baseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: this._headers,
    credentials: this._credentials,
  })
}
}

export const api = new Api(apiConfig);