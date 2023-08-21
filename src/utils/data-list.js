const registerForm = {
  name: 'register',
  title: 'Добро пожаловать!',
  buttonTextDefault: 'Зарегистрироваться',
  buttonTextLoading: 'Регистрация...',
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: 'Виталий',
      minLength: '2',
      maxLength: '40',
      required: true,
      autoFocus: true,
      autoComplete: 'off',
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoComplete: 'off',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: '••••••••••••••',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoComplete: 'off',
    },
  ]
};

const loginForm = {
  name: 'login',
  title: 'Рады видеть!',
  buttonTextDefault: 'Войти',
  buttonTextLoading: 'Вход...',
  inputs: [
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru|',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoFocus: true,
      autoComplete: 'on',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: '',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoComplete: 'on',
    },
  ]
};

const profileForm = {
  name: 'profile',
  title: 'Привет, Виталий!',
  buttonTextDefault: 'Сохранить',
  buttonTextLoading: 'Сохранение...',
  textError: 'При обновлении профиля произошла ошибка.',
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: '',
      minLength: '2',
      maxLength: '30',
      required: true,
      autoFocus: true,
      autoComplete: 'off',
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: '',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoComplete: 'off',
    },
  ]
}

const searchForm = {
  name: 'search',
  title: 'Найти',
  buttonTextDefault: 'Найти',
  buttonTextLoading: 'Поиск...',
  inputs: [
    {
      type: 'search',
      name: 'search',
      placeholder: 'Фильм',
      required: true,
      autoFocus: true,
      autoComplete:'on'
    },
    {
      type: 'checkbox',
      name: 'short',
      placeholder: 'Короткометражки',
      required: false,
      checked: false,
    },
  ]
};

const deviceSettings = {
  mobile: {
    maxSize: 768,
    maxMovies: 5,
    moreMovies: 2,
  },
  tablet: {
    maxSize: 1024,
    maxMovies: 4,
    moreMovies: 3,
  },
  desktop: {
    maxMovies: 4,
    moreMovies: 4,
  }
}

export {
  registerForm,
  loginForm,
  searchForm,
  profileForm,
  deviceSettings
};