import { useContext, useEffect } from 'react';
import { profileForm } from '../../../utils/data-list';
import './Profile.css';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useValidate } from '../../hooks/useValidate';

const Profile = ({
  onSubmit,
  onSignout,
  requestError,
  isFormActivated,
  setFormActivated,
  isSendRequest,
  setMessage,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { name, buttonTextDefault, inputs } = profileForm;
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    isFormValid,
    setValid,
  } = useValidate(inputs);

  const handleChangeProfile = (evt) => {
    handleChange(evt);
  };

  const handleActivated = () => {
    setFormActivated(true);
    setMessage({
      isMessageShow: false,
      isError: false,
      text: '',
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setFormActivated(false);
    onSubmit(values);
  };

  const handleClickExit = () => {
    onSignout();
  };

  useEffect(() => {
    setValues((values) => ({
      ...values,
      name: currentUser.name,
      email: currentUser.email,
    }));
    if (currentUser) {
      setValid((isValid) => ({ ...isValid, name: true, email: true }));
    }
  }, [currentUser]);

  useEffect(() => {
    setFormActivated(false);
    setMessage({
      isMessageShow: false,
      isError: false,
      text: '',
    });
  }, [setFormActivated, setMessage]);

  return (
    <main className='main'>
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <Form
          name={name}
          buttonText={buttonTextDefault}
          onSubmit={handleSubmit}
          isFormActivated={isFormActivated}
          disabledDafault={
            currentUser.name === values.name &&
            currentUser.email === values.email
          }
          requestError={requestError}
          isSendRequest={isSendRequest}
          isValid={isValid}
          isFormValid={isFormValid}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name + name}
              >
                <Input
                  value={values[`${input.name}`]}
                  input={input}
                  handleChange={handleChangeProfile}
                  form={name}
                  isValid={isValid}
                  disabled={!isFormActivated}
                  onFocus={(e) => e.currentTarget.select()}
                  errors={errors}
                />
              </li>
            ))}
          </ul>
        </Form>
        {!isFormActivated && !isSendRequest && (
          <ul className='profile__list'>
            <li className='profale__item'>
              <button
                className='profile__button profile__button_edit'
                onClick={handleActivated}
              >
                Редактировать
              </button>
            </li>
            <li className='profale__item'>
              <button
                className='profile__button profile__button_exit'
                onClick={handleClickExit}
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        )}
      </section>
    </main>
  );
};

export default Profile;
