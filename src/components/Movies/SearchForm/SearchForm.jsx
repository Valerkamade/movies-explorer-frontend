import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { formSearch } from '../../../utils/data-list';
import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ isLoading, onSerch }) => {
  const { name, buttonTextLoading, buttonTextDefault, validate } = formSearch;
  const [valueSerch, setValueSerch] = useState({});

  function handleChange(evt) {
    setValueSerch({ ...valueSerch, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSerch();
  }

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
          handleChange={handleChange}
          validate={validate}
        />
      ))}
    </Form>
  );
};

export default SearchForm;
