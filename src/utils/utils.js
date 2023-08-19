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

export { apiConfig }
