import { Link } from 'react-router-dom';
import Navigation from '../../../Navigation/Navigation';
import './Portfolio.css';
import { EXTERNAL_URLS } from '../../../../utils/constants';

const Portfolio = () => {
  const { staticSite, adaptiveSite, application } = EXTERNAL_URLS;
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <Navigation className='portfolio__nav'>
          <ul className='portfolio__list'>
            <li className='portfolio__item'>
              <Link className='portfolio__link' to={staticSite} target='_blank'>
                Статичный сайт
              </Link>
            </li>
            <li className='portfolio__item'>
              <Link
                className='portfolio__link'
                to={adaptiveSite}
                target='_blank'
              >
                Адаптивный сайт
              </Link>
            </li>
            <li className='portfolio__item'>
              <Link
                className='portfolio__link'
                to={application}
                target='_blank'
              >
                Одностраничное приложение
              </Link>
            </li>
          </ul>
        </Navigation>
      </div>
    </section>
  );
};

export default Portfolio;
