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
  KEYWORD_ISLOGGEDIN,
  KEYWORD_MOVIES,
  KEYWORD_RESIZE,
  MESSAGE,
  ROUTS,
  TIME_OUT_PRELOADER,
  TIME_REGISTER,
} from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import { MessageContext } from '../../contexts/MessageContext';
import { selectErrorMessag } from '../../utils/utils';

const App = () => {
  const [isLoadingContent, setLoadingContent] = useState(true);
  const [isSendRequest, setSendRequest] = useState(false);
  const [isErrorPage, setErrorPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(KEYWORD_ISLOGGEDIN),
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
    anyOtherPath,
  } = ROUTS;
  const [message, setMessage] = useState({
    isMessageShow: false,
    isError: false,
    text: '',
  });
  const [isFormActivated, setFormActivated] = useState(true);

  const getSavedMovies = () => {
    api
      .getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        setRequestError(err);
        console.log(err);
      });
  };

  const getMovies = async () => {
    try {
      const movies = await apiMovies.getMovies();
      setAllMovies(movies);
      return movies;
    } catch (err) {
      setMessage({
        isMessageShow: true,
        isError: true,
        text: MESSAGE.serverError,
      });
    }
  };
  console.log(allMovies);
  const checkToken = () => {
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
      });
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checkToken();
      getSavedMovies();
      if (KEYWORD_MOVIES in localStorage) {
        setAllMovies(JSON.parse(localStorage.getItem(KEYWORD_MOVIES)));
      }
    }
    setTimeout(() => {
      setLoadingContent(false);
    }, TIME_OUT_PRELOADER);
  }, [currentUser.isLoggedIn]);

  // useEffect(() => {
  //   if (currentUser.isLoggedIn) {
  //     getMovies();
  //     setTimeout(() => {
  //       setLoadingContent(false);
  //     }, TIME_OUT_PRELOADER);
  //   }
  // }, [currentUser.isLoggedIn]);

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
    window.addEventListener(KEYWORD_RESIZE, handleChangeDevice);

    return () => {
      clearTimeout(resizeCooldown.current);
      window.removeEventListener(KEYWORD_RESIZE, handleChangeDevice);
    };
  }, [device]);

  const handleLogin = (value) => {
    setMessage({ isMessageShow: false, isError: false, text: '' });
    setSendRequest(true);
    api
      .authorize(value)
      .then(() => {
        navigate(moviesPath, { replace: true });
        setCurrentUser({ ...currentUser, isLoggedIn: true });
        localStorage.setItem(KEYWORD_ISLOGGEDIN, true);
      })
      .catch((err) => {
        setFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrorMessag(err),
          });
        }, TIME_OUT_PRELOADER);
      })
      .finally(
        setTimeout(() => {
          setSendRequest(false);
        }, TIME_OUT_PRELOADER)
      );
  };

  const handleRegister = (value) => {
    setMessage({ isMessageShow: false, isError: false, text: '' });
    setSendRequest(true);
    api
      .addNewUser(value)
      .then(() => {
        setMessage({
          isMessageShow: true,
          isError: false,
          text: MESSAGE.registred,
        });
        setTimeout(() => {
          handleLogin(value);
          setMessage({
            isMessageShow: false,
            isError: false,
            text: '',
          });
        }, TIME_REGISTER);
      })
      .catch((err) => {
        setFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrorMessag(err),
          });
        }, TIME_OUT_PRELOADER);
      })
      .finally(
        setTimeout(() => {
          setSendRequest(false);
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
          setSavedMovies((movies) => movies.filter((item) => item._id !== id));
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
      })
      .catch((err) => console.log(err));
  };

  const handleChengeProfile = (value) => {
    setMessage({ isMessageShow: false, isError: false, text: '' });
    setSendRequest(true);
    api
      .setUserInfoApi(value)
      .then(({ name, email }) => {
        setCurrentUser({ ...currentUser, name, email });
        setFormActivated(false);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: false,
            text: MESSAGE.profileUpdate,
          });
        }, TIME_OUT_PRELOADER);
      })
      .catch((err) => {
        setFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrorMessag(err),
          });
        }, TIME_OUT_PRELOADER);
      })
      .finally(
        setTimeout(() => {
          setSendRequest(false);
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
        setMessage({
          isMessageShow: false,
          isError: false,
          text: '',
        });
        setFormActivated(true);
        setAllMovies([]);
      })
      .catch((err) => console.log(err))
      .finally(
        setTimeout(() => {
          setLoadingContent(false);
        }, TIME_OUT_PRELOADER)
      );
  };

  useEffect(() => {
    setMessage((message) => ({ ...message, text: '' }));
  }, [pathname]);

  return isLoadingContent ? (
    <Preloader />
  ) : (
    <MessageContext.Provider value={message}>
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
                isFormActivated={isFormActivated}
                getMovies={getMovies}
              />
            }
          />
          <Route
            path={savedMoviesPath}
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                onMoviedDelete={handleMovieDelete}
                savedMovies={savedMovies}
                isLoggedIn={currentUser.isLoggedIn}
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
                isFormActivated={isFormActivated}
                setFormActivated={setFormActivated}
                isSendRequest={isSendRequest}
                setMessage={setMessage}
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
                  onRegister={handleRegister}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoadingContent={isLoadingContent}
                  message={message}
                  setMessage={setMessage}
                  setFormActivated={setFormActivated}
                  isFormActivated={isFormActivated}
                  isSendRequest={isSendRequest}
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
                  onLogin={handleLogin}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoadingContent={isLoadingContent}
                  message={message}
                  setMessage={setMessage}
                  setFormActivated={setFormActivated}
                  isFormActivated={isFormActivated}
                  isSendRequest={isSendRequest}
                />
              )
            }
          />
          <Route
            path={anyOtherPath}
            element={<Error setIsErrorPage={setErrorPage} />}
          />
        </Routes>

        {!isErrorPage && pathname !== loginPath && registerPath && <Footer />}
      </CurrentUserContext.Provider>
    </MessageContext.Provider>
  );
};

export default App;
