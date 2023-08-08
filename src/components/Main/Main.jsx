import './Main.css';

const Main = ({ children, className }) => {
  return <main className={`main ${className}`}>{children}</main>;
};

export default Main;
