import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import Main from '../Main';
import useSearch from '../../../hooks/useSearch';
import Preloader from '../../Preloader/Preloader';
import { deviceSettings } from '../../../utils/data-list';
import { DATA_SAVE } from '../../../utils/constants';

const Movies = ({ movies, onMovieLike, savedMovies, device, setMessage }) => {
  const { filteredMovies, savedSearch, searchStatus, handleSubmitSearch } =
    useSearch({
      movies: movies,
      isSavedMoviesPage: false,
    });

  const [valueSerch, setValueSerch] = useState({
    search: savedSearch.search ?? '',
    short: savedMovies.short ?? false,
  });
  const [moreMovies, setMoreMovies] = useState(0);
  const [isShowMoreButton, setShowMoreButton] = useState(false);
  const [maxShowMovies, setMaxShowMovies] = useState(0);

  const handleClickMore = () => {
    setMaxShowMovies((maxMovies) => maxMovies + moreMovies);
  };

  useEffect(() => {
    if (DATA_SAVE in localStorage) {
      const { search, short } = JSON.parse(localStorage.getItem(DATA_SAVE));
      setValueSerch({
        search: search,
        short: short,
      });
    }
  }, []);

  useEffect(() => {
    setMaxShowMovies(deviceSettings[device].maxMovies);
    setMoreMovies(deviceSettings[device].moreMovies);
  }, [device, movies]);

  useEffect(() => {
    if (!!filteredMovies) {
      if (!(filteredMovies.length <= maxShowMovies)) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [filteredMovies, maxShowMovies]);

  return (
    <Main className='main_movies'>
      <SearchForm
        onSubmitSearch={handleSubmitSearch}
        isSavedMoviesPage={false}
        valueSerch={valueSerch}
        setValueSerch={setValueSerch}
        searchStatus={searchStatus}
        savedSearch={savedSearch}
        setMaxShowMovies={setMaxShowMovies}
        device={device}
        setMessage={setMessage}
        isFormActivated={!searchStatus.isLoading}
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={false}
          moviesList={filteredMovies.slice(0, maxShowMovies)}
          searchStatus={searchStatus}
          onMovieLike={onMovieLike}
          savedMovies={savedMovies}
          isShowMoreButton={isShowMoreButton}
          onSubmitMoreButton={handleClickMore}
          showMoreButton={isShowMoreButton}
        />
      )}
    </Main>
  );
};

export default Movies;
// ToDo: h1, липкий футер
