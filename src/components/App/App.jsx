import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header';
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
  const [loggedIn, setLoggedIn] = useState(true);
  // const [emailUser, setEmailUser] = useState('');
  // const [valueProfile, setValueProfile] = useState({});
  // const [valueCard, setValueCard] = useState({});
  // const [valueAvatar, setValueAvatar] = useState({});
  const [valueRegister, setValueRegister] = useState({});
  const [valueLogin, setValueLogin] = useState({});
  const [loadingContent, setLoadingContent] = useState(true);

  const ghk = () => {
    setLoggedIn(!loggedIn);
    setIsLoading(true);
    // setEmailUser('ya@ya.ru');
    setLoadingContent(false);
  };

  return (
    <>
      {/* <button onClick={ghk}>click</button> */}
      <Routes>
        <Route path='/' element={<Main />} loggedIn={loggedIn} />
        <Route
          path='/movies'
          element={<Movies />}
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
        <Route
          path='/saved-movies'
          element={<Movies />}
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
        <Route
          path='/profile'
          element={<Movies />}
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
        <Route
          path='/signup'
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
          path='/signin'
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
};

export default App;
