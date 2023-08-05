import { moviesList } from '../../utils/movies-data';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  return (
    <main className='main-movies'>
      <SearchForm />
      <MoviesCardList saved={true} moviesList={moviesList.slice(0, 3)} />
    </main>
  );
};

export default SavedMovies;
// ToDo: липкий футер