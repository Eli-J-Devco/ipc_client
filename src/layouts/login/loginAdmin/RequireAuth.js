import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const persist = JSON.parse(localStorage.getItem("persist"));

  return auth?.isAuthenticated && persist ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
