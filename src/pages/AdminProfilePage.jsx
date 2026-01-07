import { useSelector } from "react-redux";

export default function AdminProfilePage() {
	const user = useSelector((state) => state.auth.user);

	return (
		<div className="p-10">
			<h1 className="text-2xl font-bold mb-4">Admin Profile</h1>

			<p><strong>Email:</strong> {user.email}</p>
			<p><strong>Role:</strong> {user.role}</p>

			<div className="mt-6 flex gap-4">
				<button className="btn">Products</button>
				<button className="btn">Categories</button>
				<button className="btn">Users</button>
			</div>
		</div>
	);
}
