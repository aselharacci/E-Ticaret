import { useState } from "react";
import api from "../api/axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.password !== form.passwordConfirm) {
			toast.error("Passwords do not match!");
			return;
		}

		setLoading(true);

		try {
			await api.post("/users", {
				email: form.email,
				username: form.email, // FakeStore username ister
				password: form.password,
				name: {
					firstname: form.name,
					lastname: "User",
				},
				address: {
					city: "Istanbul",
					street: "Test Street",
					number: 1,
					zipcode: "34000",
				},
				phone: "555-555-5555",
			});

			toast.success("Account created successfully. Please log in.");
			history.push("/login");
		} catch (err) {
			toast.error(
				err.response?.data ||
				"Registration failed. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5"
			>
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Create Account
				</h2>

				<p className="text-center text-gray-500 text-sm">
					Join us and start your journey
				</p>

				<input
					name="name"
					placeholder="Full Name"
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>

				<input
					name="email"
					type="email"
					placeholder="Email Address"
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>

				<input
					name="password"
					type="password"
					placeholder="Password"
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>

				<input
					name="passwordConfirm"
					type="password"
					placeholder="Confirm Password"
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
				>
					{loading ? "Creating account..." : "Sign Up"}
				</button>

				<p className="text-center text-sm text-gray-600">
					Already have an account?{" "}
					<span
						onClick={() => history.push("/login")}
						className="text-purple-600 font-semibold cursor-pointer hover:underline"
					>
						Log in
					</span>
				</p>
			</form>
		</div>
	);
}
