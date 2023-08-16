import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  saved,
  moviesList,
  onClickMore,
  maxMovies,
  onMovieLike,
  currentUser,
  savedMovies,
  onMoviedDelete,
}) => {
  return (
    <section className='movies'>
      <ul className='movies__card-list'>
        {moviesList.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id ?? movie._id}
            onMovieLike={onMovieLike}
            onMoviedDelete={onMoviedDelete}
            saved={saved}
            currentUser={currentUser}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
      <div className='movies__wrapper'>
        {!maxMovies && !saved && (
          <button className='movies__button-more' onClick={onClickMore}>
            Ещё
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
