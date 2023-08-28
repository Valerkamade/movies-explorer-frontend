import Main from '../Main';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Portfolio from './Portfolio/Portfolio';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';

const Landing = () => {
  return (
    <Main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </Main>
  );
};

export default Landing;
