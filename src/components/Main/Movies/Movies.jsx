import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { moviesList } from '../../../utils/movies-data';
import { useState } from 'react';
import Main from '../Main';

const Movies = () => {
  const [maxMovies, setMaxMovies] = useState(7);
  function handleClickMore() {
    setMaxMovies(() => maxMovies + 3);
  }

  return (
    <Main className='main_movies'>
      <SearchForm />

      <MoviesCardList
        saved={false}
        moviesList={moviesList.slice(0, maxMovies)}
        onClickMore={handleClickMore}
      />
    </Main>
  );
};

export default Movies;
// ToDo: h1, липкий футер
