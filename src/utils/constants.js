export const BASE_URL = 'https://api.savemovies.valerkamade.ru';
export const REGX_NAME = /^[a-zA-Zа-яА-Я\s-]+$/;
export const REGX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const BASE_URL_API_MOVIES = 'https://api.nomoreparties.co';
export const KEYWORD_MOVIES = 'allMovies';
export const KEYWORD_SEARCHED_MOVIES = 'searchedMovies';
export const KEYWORD_VALUES = 'search';
export const KEYWORD_ISLOGGEDIN = 'isLoggedIn';
export const KEYWORD_RESIZE = 'resize';
export const TIME_OUT_PRELOADER = 500;
export const TIME_REGISTER = 2000;
export const TIME_DOWNLOAD = 1500;
export const TIME_SHORT_MOVIES =40;

export const ROUTS = {
  mainPath: '/',
  moviesPath: '/movies',
  savedMoviesPath: '/saved-movies',
  loginPath: '/signin',
  registerPath: '/signup',
  logoutPath: '/signout',
  profilePath: '/profile',
  userPath: '/users/me',
  anyOtherPath: '*',
  beatfilm: 'beatfilm-movies',
}

export const METHODS_FETCH = {
  postFetch: 'POST',
  patchFetch: 'PATCH',
  deleteFetch: 'DELETE',
}

export const DEVICE_SETTING = {
  mobile: {
    device: 'mobile',
    maxSize: 768,
    maxMovies: 5,
    moreMovies: 2,
  },
  tablet: {
    device: 'tablet',
    maxSize: 1024,
    maxMovies: 4,
    moreMovies: 3,
  },
  desktop: {
    device: 'desktop',
    maxMovies: 4,
    moreMovies: 4,
  }
}

export const INPUT_TYPE_NAME = {
  email: 'email',
  text: 'text',
  checkbox: 'checkbox',
  search: 'search',
}

export const INPUT_NAME = {
  nameInput: 'name',
  emailInput: 'email',
  passwordInput: 'password',
  searchInput: 'search',
  shortInput: 'short',
}

export const EXTERNAL_URLS = {
  myGitHub: 'https://github.com/Valerkamade',
  staticSite: 'https://how-to-learn.valerkamade.ru/',
  adaptiveSite: 'https://russian-travel.valerkamade.ru/',
  application: 'https://mesto-my.valerkamade.ru/',
}

export const ANCHOR_LINKS = {
  abouteProject: '#about',
  techs: '#techs',
  abouteMe: '#about-me',
}

export const CREDENTIALS = 'include';

export const MESSAGE = {
  successfulRegistration: 'Вы удачно зарегистрировалис. Перенаправление на страницу с фильмами.',
  beforeSearching: 'Для отображения фильмов начните поиск',
  noMovies: 'Нет фильмов для отображения',
  noEmail: 'Не верный формат электронной почты',
  noName: 'Имя содержит только латиницу, кириллицу, пробел или дефис.',
  profileUpdate: 'Данные успешно изменены',
  registred: 'Регистрация успешна. Перенаправление на страницу поиска фильмов',
  validation: 'Неверный формат данных: ',
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}