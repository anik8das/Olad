import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const useAuth = () => {
	const { user } = useContext(UserContext);
	return user && user.loggedIn && user.userRole === 0;
};

const ProtectedRoutesReviewer = () => {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutesReviewer;
