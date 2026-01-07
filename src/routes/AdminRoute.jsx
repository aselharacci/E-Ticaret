import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { createElement } from "react";

export default function AdminRoute({ component: Component, ...rest }) {
	const user = useSelector((s) => s.client?.user || s.auth?.user || null);
	const role = user?.role || user?.roleName || user?.authority || "USER";
	const isAdmin = String(role).toUpperCase() === "ADMIN";

	return (
		<Route
			{...rest}
			render={(props) =>
				isAdmin ? createElement(Component, props) : <Redirect to="/shop" />
			}
		/>
	);
}
