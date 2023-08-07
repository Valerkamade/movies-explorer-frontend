import { useState } from 'react';
import { formProfile } from '../../../utils/data-list';
import './Profile.css';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isLoading, onSubmit, setLoggedIn }) => {
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
    setLoggedIn(false);
    navigate('/', { replace: true });
  };

  console.log(setLoggedIn);

  return (
    <main className='main'>
      <section className='profile'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
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
                  value={value[`${input.name}`] ?? input.placeholder}
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
