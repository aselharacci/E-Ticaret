import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: "LOGIN_SUCCESS",
			payload: {
				name: "Test User",
				email: "test@test.com",
			},
		});

		history.push("/profile");
	};

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
