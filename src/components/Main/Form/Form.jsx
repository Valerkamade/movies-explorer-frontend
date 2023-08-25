import './Form.css';
import { useContext } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';
import Preloader from '../../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { ROUTS } from '../../../utils/constants';

function Form({
  children,
  name,
  onSubmit,
  buttonText,
  isFormActivated,
  disabledDafault,
  searchStatus,
  isSendRequest,
  isFormValid,
}) {
  const message = useContext(MessageContext);
  const { pathname } = useLocation();

  return (
    <form
      className={`form form_type_${name} ${
        isFormActivated ? 'form_active' : ''
      }`}
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      {children}

      {isSendRequest ? (
        <Preloader className={`preloader_${name}`} />
      ) : (
        <>
          <p
            className={`form__message form__message_${name} ${
              message.isError ? 'form__message_error' : 'form__message_ok'
            }`}
          >
            {name === 'search'
              ? searchStatus.statusMessage
                ? searchStatus.statusMessage
                : message.text
              : message.text}
          </p>
          {(isFormActivated ||
            pathname === ROUTS.moviesPath ||
            pathname === ROUTS.savedMoviesPath) && (
            <button
              className={`form__button-save form__button-save_type_${name}`}
              type='submit'
              disabled={disabledDafault ? disabledDafault : !isFormValid}
            >
              {buttonText}
            </button>
          )}
        </>
      )}
    </form>
  );
}

export default Form;
