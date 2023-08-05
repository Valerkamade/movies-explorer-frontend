import './Navigation.css';

const Navigation = ({ className, children }) => {
  return <nav className={`navigation ${className ?? ''}`}>{children}</nav>;
};

export default Navigation;
