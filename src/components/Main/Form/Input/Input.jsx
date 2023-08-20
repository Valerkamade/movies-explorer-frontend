import { INPUT_TYPE_NAME } from '../../../../utils/constants';
import './Input.css';

const Input = ({
  value,
  handleChange,
  input,
  form,
  validate,
  isChecked,
  disabled,
  onFocus,
}) => {
  const {
    label,
    name,
    type,
    placeholder,
    minLength,
    maxLength,
    required,
    autoFocus,
    autoComplete,
  } = input;
  const { email, checkbox, search } = INPUT_TYPE_NAME;
  const classInputForm = form ? `form__input_type_${form}` : '';
  const classLabelForm = form ? `form__label_type_${form}` : '';
  const classInput = `form__input form__input_type_${name} ${classInputForm}`;

  let inputType;
  switch (type) {
    case checkbox:
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          checked={isChecked}
          required={required}
          onChange={handleChange}
          autoFocus={autoFocus ?? false}
          onFocus={onFocus}
        />
      );
      break;
    case search:
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value ?? ''}
          onChange={handleChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus ?? false}
        />
      );
      break;
    case email:
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value ?? ''}
          onChange={handleChange}
          autoComplete={autoComplete}
          disabled={disabled}
          autoFocus={autoFocus ?? false}
          onFocus={onFocus}
        />
      );
      break;
    default:
      inputType = (
        <input
          className={classInput}
          type={type}
          name={name}
          placeholder={placeholder}
          minLength={minLength ?? ''}
          maxLength={maxLength ?? ''}
          required={required}
          value={value ?? ''}
          onChange={handleChange}
          autoComplete={autoComplete}
          disabled={disabled}
          autoFocus={autoFocus ?? false}
          onFocus={onFocus}
        />
      );
      break;
  }

  return (
    <label className={`form__label form__label_type_${name} ${classLabelForm}`}>
      {label && `${label}`}
      {inputType}
      {type === checkbox && <span>{label ? label : placeholder}</span>}
      {validate && <span className={`form__message form__message_${form} ${name}-error`} />}
    </label>
  );
};

export default Input;
