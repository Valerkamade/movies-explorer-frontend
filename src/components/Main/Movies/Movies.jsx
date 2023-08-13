import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { moviesList } from '../../../utils/movies-data';
import { useState } from 'react';
import Main from '../Main';

const Movies = ({ allMovies }) => {
  const [maxMovies, setMaxMovies] = useState(0);
  function handleClickMore() {
    if (maxMovies < allMovies.length) {
      setMaxMovies(() => maxMovies + 1);
    }
  }

  return (
    <Main className='main_movies'>
      <SearchForm />

      <MoviesCardList
        saved={false}
        moviesList={moviesList.slice(0, maxMovies)}
        onClickMore={handleClickMore}
        maxMovies={maxMovies}
      />
    </Main>
  );
};

export default Movies;
// ToDo: h1, липкий футер
