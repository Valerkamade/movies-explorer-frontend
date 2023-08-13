import './Auth.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import { formRegister, formLogin } from '../../../utils/data-list';
import Input from '../Form/Input/Input';
import Main from '../Main';
import { api } from '../../../utils/MainApi';

const Auth = ({
  isLoading,
  value,
  setValue,
  setLoggedIn,
  setCurrentUser,
  loggedIn,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogin = () => {
    if (!value.email || !value.password) {
      return;
    }
    api
      .authorize(value)
      .then(() => {
        setLoggedIn(true);
        navigate('/movies', { replace: true });
        setValue({});
      })
      .catch((err) => console.log(err));    
    
  };

  const onRegister = () => {
    if (!value.name || !value.email || !value.password) {
      return;
    }
    api
      .addNewUser(value)
      .then(() => {
        onLogin();
      })
      .catch((err) => console.log(err));
  };

  let data;
  switch (pathname) {
    case '/signup':
      data = {
        form: formRegister,
        link: '/signin',
        linkText: 'Войти',
        text: 'Уже зарегистрированы?',
        onSubmit: () => onRegister(),
      };
      break;
    case '/signin':
      data = {
        form: formLogin,
        link: '/signup',
        linkText: 'Регистрация',
        text: 'Ещё не зарегистрированы?',
        onSubmit: () => onLogin(),
      };
      break;
    default:
      data = {
        form: '',
        link: '',
        linkText: '',
        text: '',
        onSubmit: '',
      };
      break;
  }

  const {
    validate,
    name,
    title,
    buttonTextLoading,
    buttonTextDefault,
    inputs,
  } = data.form;

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    data.onSubmit();
  }

  return (
    <Main>
      <section className='auth'>
        <h1 className='auth__title'>{title}</h1>
        <Form
          validate={validate}
          name={name}
          buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
          onSubmit={handleSubmit}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name}
              >
                <Input
                  value={value[`${input.name}`]}
                  input={input}
                  handleChange={handleChange}
                  validate={validate}
                  form={name}
                />
              </li>
            ))}
          </ul>
        </Form>
        <div className='auth__wrapper'>
          <p className='auth__text'>{data.text}&nbsp;</p>
          <Link className='auth__link' to={data.link}>
            {data.linkText}
          </Link>
        </div>
      </section>
    </Main>
  );
};

export default Auth;
