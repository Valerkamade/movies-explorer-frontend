import './Header.css';
import logo from '../../images/logo.svg';
import { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ROUTS } from '../../utils/constants';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const {
    registerPath,
    loginPath,
    mainPath,
    moviesPath,
    savedMoviesPath,
    profilePath,
  } = ROUTS;
  const { pathname } = useLocation();
  const pathAuth = pathname === registerPath || pathname === loginPath;
  const { isLoggedIn } = useContext(CurrentUserContext);

  const classNameHeader = () => {
    let className = 'header';
    if (menuActive) {
      className = `${className} header_active`;
    }
    if (isLoggedIn) {
      className = `${className} header_login`;
    }
    if (pathname === mainPath) {
      className = `${className} header_cover`;
    }
    if (pathAuth) {
      className = `${className} header_auth`;
    }
    return className;
  };

  function handleMenuClick() {
    setMenuActive(true);
  }

  function handleCloseClick() {
    setMenuActive(false);
  }

  return (
    <header className={classNameHeader()}>
      <Link className='header__link header__link_logo' to={mainPath}>
        <img className='header__logo' src={logo} alt='SaveMovie' />
      </Link>
      {!pathAuth &&
        (!isLoggedIn ? (
          <Navigation>
            <Link className='header__link' to={registerPath}>
              Регистрация
            </Link>
            <Link className='header__button' to={loginPath}>
              Войти
            </Link>
          </Navigation>
        ) : (
          <>
            <div className='header__wrapper'>
              <Navigation>
                <ul className='header__list'>
                  <li className='header__item'>
                    <NavLink className='header__link' to={mainPath}>
                      Главная
                    </NavLink>
                  </li>
                  <li className='header__item'>
                    <NavLink className='header__link' to={moviesPath}>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className='header__item'>
                    <NavLink className='header__link' to={savedMoviesPath}>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </Navigation>
              <Navigation>
                <NavLink
                  className='header__link header__link_profile'
                  to={profilePath}
                >
                  Аккаунт
                </NavLink>
              </Navigation>
              <button
                className='header__button-close'
                type='button'
                aria-label='Закрыть меню'
                onClick={handleCloseClick}
              />
            </div>
            <button
              className='header__button-menu'
              type='button'
              aria-label='Окрыть меню'
              onClick={handleMenuClick}
            />
          </>
        ))}
    </header>
  );
};

export default Header;
