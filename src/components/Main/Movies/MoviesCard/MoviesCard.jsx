import { useState } from 'react';
import plug from '../../../../images/plug.svg';
import './MoviesCard.css';

const MoviesCard = ({
  saved,
  movie,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const movieLikeButtonClassName = `movies__button_like ${
    isLiked && 'movies__button_like-active'
  }`;

  function handleClick() {
    
  }

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function onImageError(e) {
    e.target.src = plug;
  }

  return (
    <li className='movies__item' tabIndex={0}>
      <div className='movies__info'>
        <h2 className='movies__title'>{movie.nameRU}</h2>

        <button
          className={`movies__button ${
            saved ? 'movies__button_deleet' : movieLikeButtonClassName
          }`}
          type='button'
          onClick={handleLikeClick}
        />

        <p className='movies__duration'>
          {(movie.duration / 60) | 0}ч {movie.duration % 60}м
        </p>
      </div>
      <img
        className='movies__photo'
        src={movie.image ? movie.image : plug}
        onError={onImageError}
        alt={movie.nameRU}
        onClick={handleClick}
      />
    </li>
  );
};

export default MoviesCard;
