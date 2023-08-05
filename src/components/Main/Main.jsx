import AboutProject from './AboutProject/AboutProject';
import Promo from './Promo/Promo';
import './Main.css';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

const Main = () => {
  return (
    <main className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe/>
      <Portfolio />
    </main>
  );
};

export default Main;
