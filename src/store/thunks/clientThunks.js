import axiosInstance from "../../api/axiosInstance";
import { setRoles } from "../actions/clientActions";

export const fetchRolesIfNeeded = () => {
	return async (dispatch, getState) => {
		const currentRoles = getState().client.roles;

		console.log("currentRoles:", currentRoles);

		if (Array.isArray(currentRoles) && currentRoles.length > 0) {
			console.log("roles already in store, skip fetch");
			return;
		}

		try {
			console.log("GET /roles ->", axiosInstance.defaults.baseURL);
			const res = await axiosInstance.get("/roles");
			console.log("roles response:", res.status, res.data);

			const roles = Array.isArray(res.data)
				? res.data
				: Array.isArray(res.data?.roles)
					? res.data.roles
					: [];

			dispatch(setRoles(roles));
			console.log("dispatched setRoles, roles.length:", roles.length);
		} catch (err) {
			console.error(
				"fetchRolesIfNeeded failed:",
				err?.response?.status,
				err?.message,
				err?.response?.data
			);
		}
	};
};
