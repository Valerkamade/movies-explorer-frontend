import './Header.css';
import logo from '../../images/logo.svg';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn }) => {
  const [menuActive, setMenuActive] = useState(false);
  const { pathname } = useLocation();
  const pathAuth = pathname === '/signup' || pathname === '/signin';

  const classNameHeader = () => {
    let className = 'header';
    if (menuActive) {
      className = `${className} header_active`;
    }
    if (loggedIn) {
      className = `${className} header_login`;
    }
    if (pathname === '/') {
      className = `${className} header_cover`;
    }
    if (pathAuth) {
      className = `${className} header_auth`;
    }
    console.log(className);
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
      <Link className='header__link' to='/'>
        <img className='header__logo' src={logo} alt='SaveMovie' />
      </Link>
      {!pathAuth &&
        (!loggedIn ? (
          <Navigation>
            <Link className='header__link' to='/signup'>
              Регистрация
            </Link>
            <Link className='header__button' to='/signin'>
              Войти
            </Link>
          </Navigation>
        ) : (
          <>
            <div className='header__wrapper'>
              <Navigation>
                <ul className='header__list'>
                  <li className='header__item'>
                    <NavLink className='header__link' to='/'>
                      Главная
                    </NavLink>
                  </li>
                  <li className='header__item'>
                    <NavLink className='header__link' to='/movies'>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className='header__item'>
                    <NavLink className='header__link' to='/saved-movies'>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </Navigation>
              <Navigation>
                <Link
                  className='header__link header__link_profile'
                  to='/profile'
                >
                  Аккаунт
                </Link>
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
