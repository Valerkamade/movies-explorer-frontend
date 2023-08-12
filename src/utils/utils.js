import { BASE_URL } from "./constants"

// Данные для запроса на сервер
const apiConfig = {
  baseUrl: BASE_URL,
  // baseUrl: 'http://localhost:3001',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

// Экспорт данных
export { apiConfig }
