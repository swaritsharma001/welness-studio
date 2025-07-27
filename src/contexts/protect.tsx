import { Navigate } from "react-router-dom";
import cookie from "js-cookie"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = cookie.get("token"); // ya tum context ya redux use kar rahe ho to waha se bhi le sakte ho

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;