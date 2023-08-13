import { BASE_URL, BASE_URL_API_MOVIES, ROUT_MOVIES } from "./constants"

// Данные для запроса на сервер
const apiConfig = {
  baseUrl: {
    mainApi: BASE_URL,
    moviesApi: BASE_URL_API_MOVIES + '/' + ROUT_MOVIES,
  },
  // baseUrl: 'http://localhost:3001',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

// Экспорт данных
export { apiConfig }
