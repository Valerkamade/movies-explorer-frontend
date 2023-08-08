import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ saved, moviesList, onClickMore }) => {
  return (
    <section className='movies'>
      <ul className='movies__card-list'>
        {moviesList.map((movie) => (
          <MoviesCard
            movie={movie}
            onCardClick={() => {}}
            key={movie.movieId}
            onCardLike={() => {}}
            onCardDelete={() => {}}
            saved={saved}
          />
        ))}
      </ul>
      <div className='movies__wrapper'>
        {!saved && (
          <button className='movies__button-more' onClick={onClickMore}>
            Ещё
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
