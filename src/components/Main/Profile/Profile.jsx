import { useContext, useState } from 'react';
import { formProfile } from '../../../utils/data-list';
import './Profile.css';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const Profile = ({ isLoading, onSubmit, setLoggedIn, onSignout }) => {
  const currentUser = useContext(CurrentUserContext);
  const { validate, name, buttonTextDefault, inputs } = formProfile;
  const [value, setValue] = useState({});

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit();
  }

  const handleClickExit = () => {
    onSignout();
  };

  return (
    <main className='main'>
      <section className='profile'>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <Form
          validate={validate}
          name={name}
          buttonText={buttonTextDefault}
          onSubmit={handleSubmit}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name + name}
              >
                <Input
                  value={value[`${input.name}`] ?? currentUser[`${input.name}`]}
                  input={input}
                  handleChange={handleChange}
                  form={name}
                  validate={validate}
                />
              </li>
            ))}
          </ul>
        </Form>
        <button className='profile__button-exit' onClick={handleClickExit}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;
