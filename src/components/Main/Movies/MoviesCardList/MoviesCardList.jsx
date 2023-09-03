import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  isSavedMoviesPage,
  moviesList,
  onMovieLike,
  currentUser,
  savedMovies,
  onMoviedDelete,
  onSubmitMoreButton,
  showMoreButton,
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
            isSavedMoviesPage={isSavedMoviesPage}
            currentUser={currentUser}
            savedMovies={savedMovies}
          />
        ))}
      </ul>

      {showMoreButton && (
        <div className='movies__wrapper'>
          <button className='movies__button-more' onClick={onSubmitMoreButton}>
            Ещё
          </button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;
