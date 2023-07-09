import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return children;
};
export const RequireLogin = ({ children }) => {
  if (window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequireAuth;
