import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { deviceSettings, searchForm } from '../../../../utils/data-list';
import { INPUT_TYPE_NAME } from '../../../../utils/constants';
import './SearchForm.css';

const SearchForm = ({
  isLoading,
  onSubmitSearch,
  isSavedMoviesPage,
  valueSerch,
  setValueSerch,
  searchStatus,
  setMaxShowMovies,
  device,
  isErrorShow,
  message,
  isFormActivated,
}) => {
  const { name, buttonTextLoading, buttonTextDefault, validate } = searchForm;

  const handleChange = (evt) => {
    setValueSerch((valueSerch) => {
      return { ...valueSerch, [evt.target.name]: evt.target.value };
    });
  };

  const handleChangeCheckbox = (evt) => {
    setValueSerch((valueSerch) => {
      return { ...valueSerch, [evt.target.name]: evt.target.checked };
    });

    if (!isSavedMoviesPage && searchStatus.isFirstSearch) {
      return;
    }
    onSubmitSearch({ ...valueSerch, [evt.target.name]: evt.target.checked });
    !isSavedMoviesPage && setMaxShowMovies(deviceSettings[device].maxMovies);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitSearch(valueSerch);
    !isSavedMoviesPage && setMaxShowMovies(deviceSettings[device].maxMovies);
  };

  return (
    <Form
      validate={validate}
      name={name}
      buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
      onSubmit={handleSubmit}
      isFormActivated={isFormActivated}
      searchStatus={searchStatus}
      isErrorShow={isErrorShow}
      message={message}
    >
      {searchForm.inputs.map((input) => (
        <Input
          key={input.name}
          value={valueSerch[`${input.name}`]}
          input={input}
          isChecked={valueSerch.short}
          handleChange={
            input.type === INPUT_TYPE_NAME.checkbox
              ? handleChangeCheckbox
              : handleChange
          }
          validate={validate}
          isSavedMoviesPage={isSavedMoviesPage}
          disabled={!isFormActivated}
        />
      ))}
    </Form>
  );
};

export default SearchForm;
