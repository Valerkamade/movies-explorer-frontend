import { Link, useLocation } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import './NavTab.css';
import { useEffect } from 'react';

const NavTab = () => {
  const location = useLocation();
  useEffect(()=> {

  }, [location.pathname])
  return (
    <Navigation>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link to='#about' className='navigation__link'>
            О проекте
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to='#techs' className='navigation__link'>
            Технологии
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to='#about-me' className='navigation__link'>
            Студент
          </Link>
        </li>
      </ul>
    </Navigation>
  );
};

export default NavTab;
