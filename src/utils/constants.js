export const BASE_URL = 'https://api.savemovies.valerkamade.ru';
export const REGX_NAME = /^[a-zA-Zа-яА-Я\s-]*$/;
export const BASE_URL_API_MOVIES = 'https://api.nomoreparties.co';

export const TIME_OUT_PRELOADER = 300;
export const DATA_SAVE = 'search';

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