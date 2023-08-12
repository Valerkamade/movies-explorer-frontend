import { Suspense, useEffect, useState } from 'react';
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
import Preloader from '../Main/Preloader/Preloader';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});
  // const [loadingContent, setLoadingContent] = useState(true);
  const [isErrorPage, setIsErrorPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { pathname } = useLocation();

  const checkToken = () => {
    api
      .checkToken()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .catch();
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Suspense fallback={<Preloader/>}>
        {!isErrorPage && <Header loggedIn={loggedIn} />}
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
                currentUser={currentUser}
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
                />
              )
            }
          />
          <Route path='*' element={<Error setIsErrorPage={setIsErrorPage} />} />
        </Routes>

        {!isErrorPage && pathname !== '/signin' && '/signup' && <Footer />}
      </Suspense>
    </CurrentUserContext.Provider>
  );
};

export default App;
