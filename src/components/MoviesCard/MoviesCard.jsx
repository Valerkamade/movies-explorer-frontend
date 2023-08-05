import { useState } from 'react';
import plug from '../../images/plug.svg';
import './MoviesCard.css';

const MoviesCard = ({
  saved,
  movie,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const movieLikeButtonClassName = `movies__button-like ${
    isLiked && 'movies__button-like_active'
  }`;
  // const isOwn = card.owner === currentUser._id;
  function handleClick() {
    setIsLiked(!isLiked);
  }

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function onImageError(e) {
    e.target.src = plug;
  }

  return (
    <li className='movies__item'>
      <div className='movies__info'>
        <h2 className='movies__title'>{movie.nameRU}</h2>

        <button
          className={`movies__button ${
            saved ? 'movies__button-deleet' : movieLikeButtonClassName
          }`}
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
