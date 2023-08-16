import Main from '../../Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';

const SavedMovies = ({ onCardLike, savedMovies, onMoviedDelete }) => {
  const [valueSerch, setValueSerch] = useState({});
  const handleClickDelet = () => {
    onCardLike();
  };

  return (
    <Main className='main_movies'>
      <SearchForm
        saved={true}
        valueSerch={valueSerch}
        setValueSerch={setValueSerch}
      />
      <MoviesCardList
        saved={true}
        moviesList={
          valueSerch.short === true
            ? savedMovies.filter((item) => item.duration <= 40)
            : savedMovies
        }
        onCardLike={handleClickDelet}
        onMoviedDelete={onMoviedDelete}
      />
    </Main>
  );
};

export default SavedMovies;
// ToDo: липкий футер
