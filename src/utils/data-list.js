const popupConfirmation = {
  name: 'confirmation',
  title: 'Вы уверены?',
  buttonTextDefault: 'Да',
  buttonTextLoading: 'Удаление...',
};

const popupInfo = {
  name: 'info',
  title: 'Вы успешно зарегистрировались!',
  // iconPositive: iconPositive,
  // iconNegative: iconNegative,
};

const formRegister = {
  validate: true,
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
      minLength: '5',
      maxLength: '40',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: '••••••••••••••',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
  ]
};

const formLogin = {
  validate: true,
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
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: '',
      minLength: '4',
      maxLength: '40',
      required: true,
    },
  ]
};

const formProfile = {
  validate: false,
  name: 'profile',
  title: 'Привет, Виталий!',
  buttonTextDefault: 'Редактировать',
  buttonTextLoading: 'Редактировать',
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      placeholder: 'Виталий',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      required: true,
    },
  ]
}

const formSearch = {
  validate: false,
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
    },
    {
      type: 'checkbox',
      name: 'short',
      placeholder: 'Короткометражки',
      required: false,
    },
  ]
};

export {
  popupConfirmation,
  popupInfo,
  formRegister,
  formLogin,
  formSearch,
  formProfile,
};