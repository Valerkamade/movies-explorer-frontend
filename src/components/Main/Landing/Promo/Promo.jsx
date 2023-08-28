import NavTab from '../NavTab/NavTab';
import './Promo.css';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <NavTab />
    </section>
  );
};

export default Promo;
