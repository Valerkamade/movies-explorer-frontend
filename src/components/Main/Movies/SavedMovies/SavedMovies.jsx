import Main from '../../Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import useSearch from '../../../../hooks/useSearch';
import Preloader from '../../../Preloader/Preloader';

const SavedMovies = ({ savedMovies, onMoviedDelete }) => {
  const [valueSearch, setValueSearch] = useState({ search: '', short: false });
  const [isMessageShow, setMessageShow] = useState(false);
  const { filteredMovies, searchStatus, handleSubmitSearch } = useSearch({
    movies: savedMovies,
    isSavedMoviesPage: true,
  });

  useEffect(() => {
    if (!!filteredMovies) {
      if (filteredMovies.length === 0) {
        setMessageShow(true);
      } else {
        setMessageShow(false);
      }
    }
  }, [filteredMovies]);

  return (
    <Main className='main_movies'>
      <SearchForm
        isSavedMoviesPage={true}
        valueSerch={valueSearch}
        setValueSerch={setValueSearch}
        onSubmitSearch={handleSubmitSearch}
        searchStatus={searchStatus}
        isMessageShow={isMessageShow}
        isFormActivated={!searchStatus.isLoading}
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={true}
          moviesList={filteredMovies}
          onMoviedDelete={onMoviedDelete}
        />
      )}
    </Main>
  );
};

export default SavedMovies;
