import { moviesList } from '../../../../utils/movies-data';
import Main from '../../Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  return (
    <Main className='main_movies'>
      <SearchForm />
      <MoviesCardList saved={true} moviesList={moviesList.slice(0, 3)} />
    </Main>
  );
};

export default SavedMovies;
// ToDo: липкий футер