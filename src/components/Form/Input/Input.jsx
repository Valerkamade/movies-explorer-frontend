import './Input.css';

const Input = ({ value, handleChange, input, form, validate }) => {
  const { label, name, type, placeholder, minLength, maxLength, required } =
    input;

  const classInputForm = form ? `form__input_type_${form}` : '';
  const classLabelForm = form ? `form__label_type_${form}` : '';

  return (
    <label className={`form__label form__label_type_${name} ${classLabelForm}`}>
      {label && `${label}`}
      <input
        className={`form__input form__input_type_${name} ${classInputForm}`}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength={minLength ?? ''}
        maxLength={maxLength ?? ''}
        required={required}
        value={value ?? ''}
        onChange={handleChange}
        autoComplete='on'
      />
      {type === 'checkbox' && <span>{label ? label : placeholder}</span>}
      {validate && <span className={`form__error ${name}-error`} />}
    </label>
  );
};

export default Input;
