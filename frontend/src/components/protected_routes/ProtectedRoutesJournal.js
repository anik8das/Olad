import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const useAuth = () => {
  const { user } = useContext(UserContext);
  return user && user.loggedIn && user.userRole === 1;
};

const ProtectedRoutesJournal = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutesJournal;