import plug from '../../../../images/plug.svg';
import './MoviesCard.css';
import { BASE_URL_API_MOVIES } from '../../../../utils/constants';
import { Link } from 'react-router-dom';

const MoviesCard = ({
  isSavedMoviesPage,
  movie,
  onMovieLike,
  onMoviedDelete,
  savedMovies,
}) => {
  const isLiked =
    !isSavedMoviesPage && savedMovies.some((item) => item.movieId === movie.id);
  const movieLikeButtonClassName = `movies__button_like ${
    isLiked && 'movies__button_like-active'
  }`;

  function handleLikeClick() {
    onMovieLike({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: BASE_URL_API_MOVIES + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: BASE_URL_API_MOVIES + movie.image.formats.thumbnail.url,
      movieId: movie.id,
    });
  }

  function handleDeletClick() {
    onMoviedDelete(movie);
  }

  function onImageError(e) {
    e.target.src = plug;
  }

  return (
    <li className='movies__item'>
      <Link
        className='movies__link'
        to={`${movie.trailerLink}`}
        target='_blank'
      >
        <div className='movies__info'>
          <h2 className='movies__title'>{movie.nameRU || movie.nameEN}</h2>
          <p className='movies__duration'>
            {(movie.duration / 60) | 0}ч {movie.duration % 60}м
          </p>
        </div>

        <img
          className='movies__photo'
          src={
            isSavedMoviesPage
              ? movie.image
              : BASE_URL_API_MOVIES + movie.image.url ?? plug
          }
          onError={onImageError}
          alt={movie.nameRU}
        />
      </Link>
      <button
        className={`movies__button ${
          isSavedMoviesPage ? 'movies__button_deleet' : movieLikeButtonClassName
        }`}
        type='button'
        onClick={!isSavedMoviesPage ? handleLikeClick : handleDeletClick}
      />
    </li>
  );
};

export default MoviesCard;
