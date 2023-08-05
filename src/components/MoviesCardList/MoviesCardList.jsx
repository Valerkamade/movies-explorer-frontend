import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ saved, moviesList }) => {
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
      {!saved && <button className='movies__button-more'>Ещё</button>}{' '}
    </section>
  );
};

export default MoviesCardList;
