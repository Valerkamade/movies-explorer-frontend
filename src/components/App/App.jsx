import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header'
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Movies from '../Movies/Movies';

const App = () => {
  // const [selectedCard, setSelectedCard] = useState({});
  // const [currentUser, setCurrentUser] = useState({});
  // const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  // const [valueProfile, setValueProfile] = useState({});
  // const [valueCard, setValueCard] = useState({});
  // const [valueAvatar, setValueAvatar] = useState({});
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});
  const [loadingContent, setLoadingContent] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    setEmailUser('ya@ya.ru')
    setLoadingContent(false);
  }, [] )

  return (
    <>
      <Header email={emailUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRouteElement
              element={Main}
              // onEditProfile={handleEditProfileClick}
              // onAddPlace={handleAddPlaceClick}
              // onEditAvatar={handleEditAvatarClick}
              // onCardClick={handleCardClick}
              // onCardLike={handleCardLike}
              // onCardDelete={handle}
              // cards={cards}
              loggedIn={loggedIn}
              isLoading={isLoading}
              isLoadingContent={loadingContent}
            />
          }
        />
        <Route
          path='/movies'
          element={
            <ProtectedRouteElement
              element={Movies}
              // onEditProfile={handleEditProfileClick}
              // onAddPlace={handleAddPlaceClick}
              // onEditAvatar={handleEditAvatarClick}
              // onCardClick={handleCardClick}
              // onCardLike={handleCardLike}
              // onCardDelete={handle}
              // cards={cards}
              loggedIn={loggedIn}
              isLoading={isLoading}
              isLoadingContent={loadingContent}
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            loggedIn ? (
              <Navigate to='/' replace />
            ) : (
              <Register
                name='registration'
                // onRegister={onRegister}
                value={valueRegister}
                setValue={setValueRegister}
                isLoading={isLoading}
              />
            )
          }
        />
        <Route
          path='/sign-in'
          element={
            loggedIn ? (
              <Navigate to='/' replace />
            ) : (
              <Login
                // onLogin={handleLogin}
                value={valueLogin}
                setValue={setValueLogin}
                isLoading={isLoading}
              />
            )
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>

      {loggedIn && <Footer />}
    </>
  );
}

export default App;