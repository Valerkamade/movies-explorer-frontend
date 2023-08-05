import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
   const { pathname } = useLocation();
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to='/signup' state={{ backUrl: pathname }} replace />
  );
};

export default ProtectedRouteElement;