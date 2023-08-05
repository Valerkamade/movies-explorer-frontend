import './Error.css';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='error'>
      <h1 className='error__title'>404</h1>
      <p className='error__subtitle'>Страница не найдена</p>
      <Link className='error__link' to='/'>
        Назад
      </Link>
    </div>
  );
}
