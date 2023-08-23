import './Auth.css';
import { Link, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import { registerForm, loginForm } from '../../../utils/data-list';
import Input from '../Form/Input/Input';
import Main from '../Main';
import { ROUTS } from '../../../utils/constants';
import { useValidate } from '../../hooks/useValidate';

const Auth = ({
  isLoading,
  onLogin,
  onRegister,
  requestError,
  message,
  setFormActivated,
  isFormActivated,
  isSendRequest,
}) => {
  const { registerPath, loginPath } = ROUTS;
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

  const { values, handleChange, errors, isValid, isFormValid } =
    useValidate(inputs);

  const handleChangeAuth = (evt) => {
    handleChange(evt);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormActivated(false);
    data.onSubmit(values);
  };

  return (
    <Main>
      <section className='auth'>
        <h1 className='auth__title'>{title}</h1>
        <Form
          name={name}
          buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
          onSubmit={handleSubmit}
          isFormActivated={isFormActivated}
          requestError={requestError}
          message={message}
          isSendRequest={isSendRequest}
          isFormValid={isFormValid}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name}
              >
                <Input
                  value={values[`${input.name}`]}
                  input={input}
                  handleChange={handleChangeAuth}
                  isValid={isValid}
                  form={name}
                  disabled={!isFormActivated}
                  errors={errors}
                />
              </li>
            ))}
          </ul>
        </Form>
        {!isSendRequest && (
          <div className='auth__wrapper'>
            <p className='auth__text'>{data.text}&nbsp;</p>
            <Link className='auth__link' to={data.link}>
              {data.linkText}
            </Link>
          </div>
        )}
      </section>
    </Main>
  );
};

export default Auth;
