import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Auth from '../Auth/Auth';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});
  // const [loadingContent, setLoadingContent] = useState(true);

  const { pathname } = useLocation();

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />} loggedIn={loggedIn} />
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
              />
            )
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>

      {pathname !== '/signin' && '/signup' && <Footer />}
    </>
  );
};

export default App;
