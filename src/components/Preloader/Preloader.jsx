import './Preloader.css';

const Preloader = ({ className }) => {
  return (
    <div className={`preloader ${className}`}>
      <div className='preloader__container'>
        <span className='preloader__round'></span>
      </div>
    </div>
  );
};

export default Preloader;
