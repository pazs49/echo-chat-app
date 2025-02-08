import Login from "../pages/Login";

import useAuthentication from "../hooks/useAuthentication";

const ProtectedRoute = ({ children }) => {
  useAuthentication();
  if (false) {
    return <>{children}</>;
  } else {
    return <Login />;
  }
};
export default ProtectedRoute;
