import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import { moviesList } from '../../utils/movies-data';

const Movies = () => {
  return (
    <main className='main-movies'>
      <SearchForm />
      <MoviesCardList saved={false} moviesList={moviesList.slice(0, 7)} />
    </main>
  );
};

export default Movies;
// ToDo: h1