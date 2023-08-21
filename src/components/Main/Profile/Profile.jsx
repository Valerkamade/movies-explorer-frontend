import { useContext, useEffect, useState } from 'react';
import { profileForm } from '../../../utils/data-list';
import './Profile.css';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

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
  const [value, setValue] = useState({});
  const [validate, setValidate] = useState(false);

  const handleChange = (evt) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
    setValidate(true);
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
    onSubmit(value);
  };

  const handleClickExit = () => {
    onSignout();
  };

  useEffect(() => {
    setValue((value) => {
      return { ...value, name: currentUser.name, email: currentUser.email };
    });
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
          validate={validate}
          name={name}
          buttonText={buttonTextDefault}
          onSubmit={handleSubmit}
          isFormActivated={isFormActivated}
          disabledDafault={
            currentUser.name === value.name && currentUser.email === value.email
          }
          requestError={requestError}
          isSendRequest={isSendRequest}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name + name}
              >
                <Input
                  value={value[`${input.name}`]}
                  input={input}
                  handleChange={handleChange}
                  form={name}
                  validate={validate}
                  disabled={!isFormActivated}
                  onFocus={(e) => e.currentTarget.select()}
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
