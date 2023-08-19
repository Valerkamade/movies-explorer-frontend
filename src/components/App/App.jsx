import { useEffect, useRef, useState } from 'react';
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
import { apiMovies } from '../../utils/MoviesApi';
import { useNavigate } from 'react-router-dom';
import {
  DEVICE_SETTING,
  ROUTS,
  TIME_OUT_PRELOADER,
} from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const App = () => {
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});
  const [isLoadingContent, setLoadingContent] = useState(true);
  const [isErrorPage, setErrorPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem('isLoggedIn'),
  });
  const [device, setDevice] = useState(DEVICE_SETTING.desktop.device);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const [requestError, setRequestError] = useState({});
  const navigate = useNavigate();
  const resizeCooldown = useRef(null);
  const {
    mainPath,
    loginPath,
    registerPath,
    moviesPath,
    savedMoviesPath,
    profilePath,
    anyOtherPath
  } = ROUTS;

  const getSavedMovies = () => {
    api
      .getMovies()
      .then((movies) => setSavedMovies(movies))
      .catch((err) => console.log(err));
  };

  const getMovies = () => {
    apiMovies
      .getMovies()
      .then((movies) => setAllMovies(movies))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoadingContent(true);
    if (currentUser.isLoggedIn) {
      api
        .checkToken()
        .then((user) => {
          setCurrentUser({
            name: user.name,
            email: user.email,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          setCurrentUser({ isLoggedIn: false });
          console.log(err);
        })
        .finally(
          setTimeout(() => {
            setLoadingContent(false);
          }, TIME_OUT_PRELOADER)
        );
      getSavedMovies();
    }
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    getMovies();
    setTimeout(() => {
      setLoadingContent(false);
    }, TIME_OUT_PRELOADER);
  }, []);

  useEffect(() => {
    const handleChangeDevice = () => {
      clearTimeout(resizeCooldown.current);
      resizeCooldown.current = setTimeout(() => {
        if (window.innerWidth < DEVICE_SETTING.mobile.maxSize) {
          setDevice(DEVICE_SETTING.mobile.device);
        } else if (window.innerWidth < DEVICE_SETTING.tablet.maxSize) {
          setDevice(DEVICE_SETTING.tablet.device);
        } else {
          setDevice(DEVICE_SETTING.desktop.device);
        }
      }, TIME_OUT_PRELOADER);
    };

    handleChangeDevice();
    window.addEventListener('resize', handleChangeDevice);

    return () => {
      clearTimeout(resizeCooldown.current);
      window.removeEventListener('resize', handleChangeDevice);
    };
  }, [device]);

  const handleLogin = (value) => {
    setLoadingContent(true);
    api
      .authorize(value)
      .then(() => {
        navigate(moviesPath, { replace: true });
        setValueLogin({});
        setCurrentUser({ ...currentUser, isLoggedIn: true });
        localStorage.setItem('isLoggedIn', true);
      })
      .catch((err) => {
        setRequestError(err);
        console.log(err);
      })
      .finally(
        setTimeout(() => {
          setLoadingContent(false);
        }, TIME_OUT_PRELOADER)
      );
  };

  const handleRegister = (value) => {
    setLoadingContent(true);
    api
      .addNewUser(value)
      .then(() => {
        handleLogin(value);
        setCurrentUser({ ...currentUser, isLoggedIn: true });
      })
      .catch((err) => {
        setRequestError(err);
        console.log(err);
      })
      .finally(
        setTimeout(() => {
          setLoadingContent(false);
        }, TIME_OUT_PRELOADER)
      );
  };

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
        .then(() => {
          setSavedMovies(savedMovies.filter((item) => item._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleMovieDelete = (movie) => {
    api
      .deleteMovies(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((item) => item._id !== movie._id)
        );
        console.log(savedMovies.filter((item) => item._id !== movie._id));
      })
      .catch((err) => console.log(err));
  };

  const handleChengeProfile = (value) => {
    setLoadingContent(true);
    api
      .setUserInfoApi(value)
      .then(({ name, email }) => {
        setCurrentUser({ ...currentUser, name, email });
      })
      .catch((err) => console.log(err))
      .finally(
        setTimeout(() => {
          setLoadingContent(false);
        }, TIME_OUT_PRELOADER)
      );
  };

  const handleSignout = () => {
    api
      .logout()
      .then(() => {
        navigate(mainPath, { replace: true });
        localStorage.clear();
        setCurrentUser({ name: '', email: '', isLoggedIn: false });
        setSavedMovies([]);
        setRequestError({});
      })
      .catch((err) => console.log(err))
      .finally(
        setTimeout(() => {
          setLoadingContent(false);
        }, TIME_OUT_PRELOADER)
      );
  };

  return isLoadingContent ? (
    <Preloader />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      {!isErrorPage && <Header />}
      <Routes>
        <Route
          path={mainPath}
          element={<Landing isLoadingContent={isLoadingContent} />}
        />
        <Route
          path={moviesPath}
          element={
            <ProtectedRouteElement
              element={Movies}
              isLoggedIn={currentUser.isLoggedIn}
              movies={allMovies}
              onMovieLike={handleMovieLike}
              savedMovies={savedMovies}
              device={device}
            />
          }
        />
        <Route
          path={savedMoviesPath}
          element={
            <ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={currentUser.isLoggedIn}
              onMoviedDelete={handleMovieDelete}
              savedMovies={savedMovies}
              device={device}
            />
          }
        />
        <Route
          path={profilePath}
          element={
            <ProtectedRouteElement
              element={Profile}
              onSubmit={handleChengeProfile}
              isLoggedIn={currentUser.isLoggedIn}
              onSignout={handleSignout}
              isLoadingContent={isLoadingContent}
              setRequestError={setRequestError}
              requestError={requestError}
            />
          }
        />
        <Route
          path={registerPath}
          element={
            currentUser.isLoggedIn ? (
              <Navigate to={mainPath} replace />
            ) : (
              <Auth
                value={valueRegister}
                setValue={setValueRegister}
                onRegister={handleRegister}
                requestError={requestError}
                setRequestError={setRequestError}
                isLoadingContent={isLoadingContent}
              />
            )
          }
        />
        <Route
          path={loginPath}
          element={
            currentUser.isLoggedIn ? (
              <Navigate to={moviesPath} replace />
            ) : (
              <Auth
                value={valueLogin}
                setValue={setValueLogin}
                onLogin={handleLogin}
                requestError={requestError}
                setRequestError={setRequestError}
                isLoadingContent={isLoadingContent}
              />
            )
          }
        />
        <Route
          path={anyOtherPath}
          element={<Error setIsErrorPage={setErrorPage} />}
        />
      </Routes>

      {!isErrorPage && pathname !== loginPath && registerPath && (
        <Footer />
      )}
    </CurrentUserContext.Provider>
  );
};

export default App;
