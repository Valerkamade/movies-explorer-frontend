import AboutProject from './AboutProject/AboutProject';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import './Main.css';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

const Main = (loggedIn) => {
  return (
    <main className='main'>
      <Header loggedIn={loggedIn} />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe/>
      <Portfolio />
    </main>
  );
};

export default Main;
