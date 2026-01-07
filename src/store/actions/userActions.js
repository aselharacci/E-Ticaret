import axiosInstance, { setAuthToken } from "../../api/axiosInstance";
import { loginStart, loginSuccess, loginFail, logout } from "../reducers/userReducer";

export const loginUser =
	({ email, password, rememberMe }) =>
		async (dispatch) => {
			try {
				dispatch(loginStart());

				// ✅ Yeni backend endpoint
				const res = await axiosInstance.post("/auth/login", { email, password });

				// ✅ Backend { id, email } dönüyor
				const user = res.data;
				const token = null; // şimdilik token yok

				// Token olmadığı için header set etmiyoruz
				setAuthToken(null);

				// ✅ Remember me: token yerine user sakla
				if (rememberMe) {
					localStorage.setItem("user", JSON.stringify(user));
				} else {
					localStorage.removeItem("user");
				}

				dispatch(loginSuccess({ user, token }));
				return { user, token };
			} catch (err) {
				const msg =
					err?.response?.data ||
					err?.response?.data?.message ||
					err?.message ||
					"Login failed";

				dispatch(loginFail(msg));
				throw msg;
			}
		};

// ✅ Header'ın istediği export: logoutUser
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	setAuthToken(null);
	dispatch(logout());
};
