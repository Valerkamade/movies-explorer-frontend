import { Link } from 'react-router-dom';
import SectionTite from '../SectionTitle/SectionTitle';
import './AboutMe.css';
import me from '../../../../images/me.jpg';

const AboutMe = () => {
  return (
    <section className='about-me main__container' id='about-me'>
      <SectionTite>Студент</SectionTite>
      <div className='about-me__wrapper'>
        <div className='about-me__info'>
          <h3 className='about-me__title'>Валерия</h3>
          <p className='about-me__subtitle'>Фронтенд-разработчик, 37 лет</p>
          <p className='about-me__description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className='about-me__link'
            to='https://github.com/Valerkamade'
            target='_blank'
          >
            Github
          </Link>
        </div>

        <img className='about-me__img' src={me} alt='Фото студента' />
      </div>
    </section>
  );
};

export default AboutMe;
// ToDo: может вынести в компонент секцию вместе с заголовком
// ToDo: может сделать единый компонент заголовок от h1 до h6
