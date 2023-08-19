import { Link } from 'react-router-dom';
import Navigation from '../../../Navigation/Navigation';
import './NavTab.css';
import { ANCHOR_LINKS } from '../../../../utils/constants';

const NavTab = () => {
  const { abouteProject, abouteMe, techs } = ANCHOR_LINKS;

  return (
    <Navigation>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link to={abouteProject} reloadDocument className='navigation__link'>
            О проекте
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to={techs} reloadDocument className='navigation__link'>
            Технологии
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to={abouteMe} reloadDocument className='navigation__link'>
            Студент
          </Link>
        </li>
      </ul>
    </Navigation>
  );
};

export default NavTab;
