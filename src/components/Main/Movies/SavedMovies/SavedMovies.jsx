import Main from '../../Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import useSearch from '../../../hooks/useSearch';
import Preloader from '../../../Preloader/Preloader';

const SavedMovies = ({ savedMovies, onMoviedDelete, setMessage, message }) => {
  const [valueSearch, setValueSearch] = useState({ search: '', short: false });
  const [isMessageShow, setMessageShow] = useState(false);

  const { filteredMovies, searchStatus, handleSubmitSearch } = useSearch({
    movies: savedMovies,
    isSavedMoviesPage: true,
  });

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setMessageShow(true);
    } else {
      setMessageShow(false);
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
        isMessageShow={isMessageShow}
        setMessage={setMessage}
        message={message}
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
