import { Link } from 'react-router-dom';
import './Footer.css';
import Navigation from '../Navigation/Navigation';
const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__description'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__wrapper'>
        <Navigation className={'footer__nav'}>
          <ul className='footer__list'>
            <li className='footer__item'>
              <Link className='footer__link' to='https://practicum.yandex.ru/'>
                Яндекс.Практикум
              </Link>
            </li>
            <li className='footer__item'>
              <Link
                className='footer__link'
                to='https://github.com/Valerkamade/movies-explorer-frontend'
              >
                Github
              </Link>
            </li>
          </ul>
        </Navigation>
        <p className='footer__copyright'>&copy; 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
