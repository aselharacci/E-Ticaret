import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function UserProfilePage() {
	const history = useHistory();

	// 🔐 Sayfa guard
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			history.push("/login");
		}
	}, [history]);

	// 🚪 Logout
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
			<div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center space-y-5">

				{/* Avatar */}
				<div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
					U
				</div>

				<h2 className="text-3xl font-bold text-gray-800">
					Welcome!
				</h2>

				<p className="text-gray-600 text-sm">
					You are logged in successfully.
				</p>

				<div className="pt-4 space-y-3">
					<button
						onClick={() => history.push("/")}
						className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
					>
						Go to Home
					</button>

					<button
						onClick={handleLogout}
						className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
					>
						Log out
					</button>
				</div>
			</div>
		</div>
	);
}
