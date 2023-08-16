import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { formSearch } from '../../../../utils/data-list';
import { useEffect } from 'react';
import './SearchForm.css';

const SearchForm = ({
  isLoading,
  onSubmitSearch,
  saved,
  valueSerch,
  setValueSerch,
}) => {
  const { name, buttonTextLoading, buttonTextDefault, validate } = formSearch;

  function handleChange(evt) {
    setValueSerch({ ...valueSerch, [evt.target.name]: evt.target.value });
  }

  function handleChangeCheckbox(evt) {
    setValueSerch({ ...valueSerch, [evt.target.name]: evt.target.checked });
    !saved && localStorage.setItem('short', evt.target.checked);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!saved) {
      onSubmitSearch(valueSerch);
    }
  }

  useEffect(() => {
    !saved &&
      setValueSerch({
        ...valueSerch,
        search: localStorage.getItem('search'),
        short: localStorage.getItem('short'),
      });
  }, []);

  return (
    <Form
      validate={validate}
      name={name}
      buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
      onSubmit={handleSubmit}
    >
      {formSearch.inputs.map((input) => (
        <Input
          key={input.name}
          value={valueSerch[`${input.name}`]}
          input={input}
          isChecked={valueSerch.short}
          handleChange={
            input.type === 'checkbox' ? handleChangeCheckbox : handleChange
          }
          validate={validate}
        />
      ))}
    </Form>
  );
};

export default SearchForm;
