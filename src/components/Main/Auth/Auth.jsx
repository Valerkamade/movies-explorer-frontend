import './Auth.css';
import { Link, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import { registerForm, loginForm } from '../../../utils/data-list';
import Input from '../Form/Input/Input';
import Main from '../Main';
import { useState } from 'react';
import { ROUTS } from '../../../utils/constants';

const Auth = ({
  isLoading,
  value,
  setValue,
  onLogin,
  onRegister,
  requestError,
  setRequestError,
}) => {
  const { registerPath, loginPath } = ROUTS;
  const [validate, setValidate] = useState(false);
  const { pathname } = useLocation();

  let data;
  switch (pathname) {
    case registerPath:
      data = {
        form: registerForm,
        link: loginPath,
        linkText: 'Войти',
        text: 'Уже зарегистрированы?',
        onSubmit: onRegister,
      };
      break;
    case loginPath:
      data = {
        form: loginForm,
        link: registerPath,
        linkText: 'Регистрация',
        text: 'Ещё не зарегистрированы?',
        onSubmit: onLogin,
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

  const { name, title, buttonTextLoading, buttonTextDefault, inputs } =
    data.form;

  const handleChange = (evt) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
    setValidate(true);
    setRequestError({});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    data.onSubmit(value);
  };

  return (
    <Main>
      <section className='auth'>
        <h1 className='auth__title'>{title}</h1>
        <Form
          validate={validate}
          name={name}
          buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
          onSubmit={handleSubmit}
          isFormActivated={true}
          requestError={requestError}
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
