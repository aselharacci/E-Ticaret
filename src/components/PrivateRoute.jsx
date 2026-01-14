import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const isAuthenticated = useSelector(
		(state) => state.user.isAuthenticated
	);

	return isAuthenticated ? children : <Redirect to="/login" />;
};

export default PrivateRoute;
