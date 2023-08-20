import React, { useRef, useEffect, useState } from 'react';
import './Form.css';

function Form({
  children,
  name,
  onSubmit,
  validate,
  buttonText,
  isFormActivated,
  disabledDafault,
  searchStatus,
  requestError,
  isErrorShow,
}) {
  const [isValidForm, setIsValidForm] = useState(false);
  const formRef = useRef(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    validate &&
      Array.from(formRef.current)
        .filter((item) => {
          return item.localName !== 'button';
        })
        .forEach((item) => {
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

  useEffect(() => {
    if (!!requestError) {
      if (requestError.message === 'Validation failed') {
        return setErrorMessage(
          'Неверный формат данных: ' + requestError.validation.body.keys[0]
        );
      }
      setErrorMessage(requestError.message);
    }
    if (isErrorShow) {
      return setErrorMessage('Нет фильмов для отображения');
    } else {
      setErrorMessage('');
    }
  }, [isErrorShow, requestError]);

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
      {isFormActivated && (
        <>
          <p className={`form__message form__message_${name}`}>
            {name === 'search'
              ? searchStatus.statusMessage
              : errorMessage}
          </p>
          <button
            className={`form__button-save form__button-save_type_${name}`}
            type='submit'
            disabled={disabledDafault ? disabledDafault : !isValidForm}
          >
            {buttonText}
          </button>
        </>
      )}
    </form>
  );
}

export default Form;
