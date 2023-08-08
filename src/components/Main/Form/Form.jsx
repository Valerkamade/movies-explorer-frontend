import React, { useRef, useEffect, useState } from 'react';
import './Form.css';

export default function Form({ children, name, onSubmit, validate, buttonText }) {
  const [isValidForm, setIsValidForm] = useState(false);
  const formRef = useRef(0);

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

    function validation() {
      if (children === undefined) {
        return true;
      }
      return formRef.current.checkValidity();
    }
    setIsValidForm(validation());
  }, [children, validate]);

  return (
    <form
      className={`form form_type_${name}`}
      name={name}
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
    >
      {children}
      <button
        className={`form__button-save form__button-save_type_${name}`}
        type='submit'
        disabled={!isValidForm}
      >
        {buttonText}
      </button>
    </form>
  );
}
