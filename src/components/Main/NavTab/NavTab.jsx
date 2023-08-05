import { Link } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import './NavTab.css';

const NavTab = () => {
  return (
    <Navigation>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link to="#about" reloadDocument className='navigation__link'>
            О проекте
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to="#techs" reloadDocument className='navigation__link'>
            Технологии
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to="#about-me" reloadDocument className='navigation__link'>
            Студент
          </Link>
        </li>
      </ul>
    </Navigation>
  );
};

export default NavTab;
