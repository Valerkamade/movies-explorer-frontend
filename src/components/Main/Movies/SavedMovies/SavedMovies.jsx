import Main from '../../Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import useSearch from '../../../hooks/useSearch';
import Preloader from '../../../Preloader/Preloader';

const SavedMovies = ({ savedMovies, onMoviedDelete }) => {
  const [valueSearch, setValueSearch] = useState({ search: '', short: false });
  const [isErrorShow, setErrorShow] = useState(false);

  const { filteredMovies, searchStatus, handleSubmitSearch } = useSearch({
    movies: savedMovies,
    isSavedMoviesPage: true,
  });

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setErrorShow(true);
    } else {
      setErrorShow(false);
    }
  }, [filteredMovies]);
  
  const handleClickDelete = (movie) => {
    onMoviedDelete(movie);
  };

  return (
    <Main className='main_movies'>
      <SearchForm
        isSavedMoviesPage={true}
        valueSerch={valueSearch}
        setValueSerch={setValueSearch}
        onSubmitSearch={handleSubmitSearch}
        searchStatus={searchStatus}
        isErrorShow={isErrorShow}
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={true}
          moviesList={filteredMovies}
          onMoviedDelete={handleClickDelete}
        />
      )}
    </Main>
  );
};

export default SavedMovies;
