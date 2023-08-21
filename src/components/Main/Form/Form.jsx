import React, { useRef, useEffect, useState } from 'react';
import './Form.css';
import { useContext } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';
import Preloader from '../../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { INPUT_TYPE_NAME, REGX_EMAIL, ROUTS } from '../../../utils/constants';

function Form({
  children,
  name,
  onSubmit,
  validate,
  buttonText,
  isFormActivated,
  disabledDafault,
  searchStatus,
  isSendRequest,
}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const formRef = useRef(0);
  const message = useContext(MessageContext);
  const { pathname } = useLocation();

  useEffect(() => {
    validate &&
      Array.from(formRef.current)
        .filter((item) => {
          return item.localName !== 'button';
        })
        .forEach((item) => {
          if (
            item.type === INPUT_TYPE_NAME.email &&
            !REGX_EMAIL.test(item.value)
          ) {
            console.log(!item.validity.valid);
          }
          item.classList.toggle(
            'form__input_type_error',
            item.validationMessage
          );
          item.nextSibling.textContent = item.validationMessage;
        });

    const validation = () => {
      if (children === undefined) {
        return true;
      }
      return formRef.current.checkValidity();
    };
    setIsValidForm(validation());
  }, [children, validate]);

  return (
    <form
      className={`form form_type_${name} ${
        isFormActivated ? 'form_active' : ''
      }`}
      name={name}
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
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
            {name === 'search' ? searchStatus.statusMessage : message.text}
          </p>
          {(isFormActivated ||
            pathname === ROUTS.moviesPath ||
            pathname === ROUTS.savedMoviesPath) && (
            <button
              className={`form__button-save form__button-save_type_${name}`}
              type='submit'
              disabled={disabledDafault ? disabledDafault : !isValidForm}
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
