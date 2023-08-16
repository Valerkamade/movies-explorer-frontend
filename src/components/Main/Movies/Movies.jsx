import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import Main from '../Main';

const Movies = ({
  movies,
  onMovieLike,
  savedMovies,
  onSubmitSearch,
  setMovies,
}) => {
  const [maxMovies, setMaxMovies] = useState(3);
  const [valueSerch, setValueSerch] = useState({});

  function handleClickMore() {
    if (maxMovies < movies.length) {
      setMaxMovies(() => maxMovies + 1);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('searchMovies')) {
      valueSerch.short === true
        ? setMovies(
            JSON.parse(localStorage.getItem('searchMovies')).filter(
              (item) => item.duration <= 40
            )
          )
        : setMovies(JSON.parse(localStorage.getItem('searchMovies')));
    };
  }, [valueSerch.short]);
  

  // useEffect(() => {
  //   switch ((isErrorPage, loggedIn)) {
  //     case isErrorPage && loggedIn:
  //       console.log('зашибись');
  //       break;
  //     case isErrorPage && !loggedIn:
  //       console.log('незашибись');
  //       break;
  //     case !isErrorPage && loggedIn:
  //       console.log('123');
  //       break;
  //     default:
  //       console.log('однако');
  //       break;
  //   }
  // }, [isErrorPage, loggedIn]);

  return (
    <Main className='main_movies'>
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        saved={false}
        valueSerch={valueSerch}
        setValueSerch={setValueSerch}
      />

      <MoviesCardList
        saved={false}
        moviesList={movies.slice(0, maxMovies)}
        onClickMore={handleClickMore}
        maxMovies={maxMovies === movies.length || movies.length === 0 || maxMovies>movies.length}
        onMovieLike={onMovieLike}
        savedMovies={savedMovies}
      />
    </Main>
  );
};

export default Movies;
// ToDo: h1, липкий футер
