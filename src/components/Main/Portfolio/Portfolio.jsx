import { Link } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <Navigation className='portfolio__nav'>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <Link className='portfolio__link'>Статичный сайт</Link>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link'>Адаптивный сайт</Link>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link'>Одностраничное приложение</Link>
          </li>
        </ul>
      </Navigation>
    </section>
  );
};

export default Portfolio;
