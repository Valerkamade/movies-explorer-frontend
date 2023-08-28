import { Navigate, useLocation } from 'react-router-dom';
import { ROUTS } from '../../utils/constants';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const { pathname } = useLocation();
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={ROUTS.mainPath} state={{ backUrl: pathname }} replace />
  );
};

export default ProtectedRouteElement;
