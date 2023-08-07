import SectionTite from '../SectionTitle/SectionTitle';
import './Techs.css';

const Techs = () => {
  return (
    <section className='techs main__container' id='techs'>
      <SectionTite>Технологии</SectionTite>
      <h3 className='techs__title'>7 технологий</h3>
      <p className='techs__subtitle'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__item'>HTML</li>
        <li className='techs__item'>CSS</li>
        <li className='techs__item'>JS</li>
        <li className='techs__item'>React</li>
        <li className='techs__item'>Git</li>
        <li className='techs__item'>Express.js</li>
        <li className='techs__item'>mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
