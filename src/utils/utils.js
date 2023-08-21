import { BASE_URL, BASE_URL_API_MOVIES, ROUTS } from "./constants"

// Данные для запроса на сервер
const apiConfig = {
  baseUrl: {
    mainApi: BASE_URL,
    moviesApi: BASE_URL_API_MOVIES + '/' + ROUTS.beatfilm,
  },
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

const selectErrorMessag = (err) => {
  if (err.message === 'Validation failed') {
    return 'Неверный формат данных: ' + err.validation.body.keys[0];
  }
  return err.message;
}

export { apiConfig, selectErrorMessag }
