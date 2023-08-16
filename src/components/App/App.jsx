import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Landing from '../Main/Landing/Landing';
import Error from '../Main/Error/Error';
import Movies from '../Main/Movies/Movies';
import Profile from '../Main/Profile/Profile';
import SavedMovies from '../Main/Movies/SavedMovies/SavedMovies';
import Auth from '../Main/Auth/Auth';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import { apiMovies } from '../../utils/MoviesApi';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});
  // const [loadingContent, setLoadingContent] = useState(true);
  const [isErrorPage, setIsErrorPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [allMovies, setAllMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSignout = () => {
    api
      .logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  };

  const checkToken = () => {
    api
      .checkToken()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .catch()
      .finally(setIsLoadingApp(false));
  };

  const getSavedMovies = () => {
    api
      .getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch();
  };

  const getMovies = () => {
    apiMovies
      .getMovies()
      .then((movies) => setAllMovies(movies))
      .catch();
  };

  useEffect(() => {
    checkToken();
    getMovies();
    getSavedMovies();
  }, []);

  const handleMovieLike = (movie) => {
    const isLiked = savedMovies.some((item) => item.movieId === movie.movieId);

    if (!isLiked) {
      api
        .addSavedMovies(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
        })
        .catch((err) => console.log(err));
    } else {
      const id = savedMovies.find((item) => item.movieId === movie.movieId)._id;
      api
        .deleteMovies(id)
        .then((res) => {
          setSavedMovies(savedMovies.filter((item) => item._id !== id));
        })
        .catch();
    }
  };

  const handleMovieDelete = (movie) => {
    api
      .deleteMovies(movie._id)
      .then((res) => {
        setSavedMovies(savedMovies.filter((item) => item._id !== movie._id));
      })
      .catch();
  };

  const handleSubmitSearch = (value) => {
    let moviesFilter = allMovies;
    if (localStorage.getItem('short') === true) {
      moviesFilter = allMovies.filter((item) => item.duration <= 40);
    } else {
      setSearchMovies(
        moviesFilter.filter((item) =>
          item.nameRU.toLowerCase().includes(value.search.toLowerCase())
        )
      );
    }
    localStorage.setItem('search', value.search);
    localStorage.setItem('short', value.short);
    localStorage.setItem(
      'searchMovies',
      JSON.stringify(
        allMovies.filter((item) =>
          item.nameRU.toLowerCase().includes(value.search.toLowerCase())
        )
      )
    );
  };

  return isLoadingApp ? (
    <Preloader />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      {!isErrorPage && <Header loggedIn={loggedIn} />}
      {/* <Suspense fallback={<Preloader />}> */}
      <Routes>
        <Route path='/' element={<Landing />} loggedIn={loggedIn} />
        <Route
          path='/movies'
          element={
            <ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              // isLoadingContent={loadingContent}
              movies={searchMovies}
              onMovieLike={handleMovieLike}
              onMoviedDelete={handleMovieDelete}
              savedMovies={savedMovies}
              setMovies={setSearchMovies}
              onSubmitSearch={handleSubmitSearch}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              // isLoadingContent={loadingContent}
              onMoviedDelete={handleMovieDelete}
              savedMovies={savedMovies}
              setMovies={setSavedMovies}
              onSubmitSearch={() => {}}
            />
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouteElement
              element={Profile}
              onSubmit={() => console.log('click')}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              // isLoadingContent={loadingContent}
              loggedIn={loggedIn}
              onSignout={handleSignout}
            />
          }
        />
        <Route
          path='/signup'
          element={
            loggedIn ? (
              <Navigate to='/' replace />
            ) : (
              <Auth
                name='registration'
                value={valueRegister}
                setValue={setValueRegister}
                isLoading={isLoading}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
              />
            )
          }
        />
        <Route
          path='/signin'
          element={
            loggedIn ? (
              <Navigate to='/movies' replace />
            ) : (
              <Auth
                value={valueLogin}
                setValue={setValueLogin}
                isLoading={isLoading}
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                loggedIn={loggedIn}
              />
            )
          }
        />
        <Route path='*' element={<Error setIsErrorPage={setIsErrorPage} />} />
      </Routes>

      {!isErrorPage && pathname !== '/signin' && '/signup' && <Footer />}
      {/* </Suspense> */}
    </CurrentUserContext.Provider>
  );
};

export default App;
