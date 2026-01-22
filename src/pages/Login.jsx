import { useState } from "react";
import api from "../api/axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
	const history = useHistory();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await api.post("/auth/login", {
				username: form.email, // 🔥 CRITICAL
				password: form.password,
			});

			localStorage.setItem("token", res.data.token);
			toast.success("Login successful!");
			history.push("/profile");
		} catch {
			toast.error("Invalid email or password");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5"
			>
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Welcome Back
				</h2>

				<input
					name="email"
					type="text"
					placeholder="Username or Email"
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>


				<input
					name="password"
					type="password"
					placeholder="Password"
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-lg p-3"
				/>

				<button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg">
					Log In
				</button>
			</form>
		</div>
	);
}
