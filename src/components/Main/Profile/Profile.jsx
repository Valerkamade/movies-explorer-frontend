import { useState } from 'react';
import { formProfile } from '../../../utils/data-list';
import './Profile.css';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../utils/MainApi';

const Profile = ({ isLoading, onSubmit, setLoggedIn, currentUser }) => {
  // const {user, email} = currentUser;
  const { validate, name, buttonTextDefault, inputs } = formProfile;
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  function handleChange(evt) {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit();
  }

  const onSignOut = () => {
    api.
    setLoggedIn(false);
    navigate('/', { replace: true });
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
        <button className='profile__button-exit' onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;
