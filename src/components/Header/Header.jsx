import './Header.css';
import logo from '../../images/logo.svg';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { menuActive, setMenuActive } = useState(false);
  const path = location.pathname === '/signin' ? '/signup' : '/signin';

  function handleMenuClick() {
    setMenuActive(!menuActive);
  }

  return (
    <header
      className={`header page__container ${menuActive ? `header_active` : ''} ${
        !loggedIn ? `header_login` : ''
      }`}
    >
      <Link className='header__link' to='/'>
        <img className='header__logo' src={logo} alt='SaveMovie' />
      </Link>
      {loggedIn ? ( // ToDo: исправить условие
        <Navigation>
          <Link to={path} className='header__link'>
            Регистрация
          </Link>
          <Link to={path} className='header__button'>
            Войти
          </Link>
        </Navigation>
      ) : (
        <>
          <button
            className={`header__button-toggle button ${
              menuActive ? `header__button-toggle_active` : ''
            }`}
            type='button'
            aria-label='Окрыть меню'
            onClick={handleMenuClick}
          />
        </>
      )}
    </header>
  );
};

export default Header;
