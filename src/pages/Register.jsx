import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { fetchRolesIfNeeded } from "../store/thunks/clientThunks";

export default function Register() {
	const history = useHistory();
	const dispatch = useDispatch();

	// Store'dan gelen roller (bazen boş kalabiliyor)
	const rolesFromStore = useSelector((s) => s.client.roles) || [];

	// ✅ Fallback: backend roles gelmezse USER/ADMIN göster
	const roles =
		Array.isArray(rolesFromStore) && rolesFromStore.length > 0
			? rolesFromStore
			: ["USER", "ADMIN"];

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: { role: "" },
	});

	const roleValue = watch("role");

	useEffect(() => {
		dispatch(fetchRolesIfNeeded());
	}, [dispatch]);

	// ✅ default USER seç
	useEffect(() => {
		if (!roleValue && roles.includes("USER")) {
			setValue("role", "USER");
		}
	}, [roleValue, roles, setValue]);

	const onSubmit = async (data) => {
		if (data.password !== data.passwordConfirm) {
			toast.error("Passwords do not match!");
			return;
		}

		const payload = {
			name: data.name,
			email: data.email,
			password: data.password,
			role: data.role,
		};

		try {
			await axiosInstance.post("/auth/signup", payload);
			reset();
			toast.success("Account created successfully. You can log in now.");
			history.goBack();
		} catch (err) {
			toast.error(
				err.response?.data?.message || err.response?.data || "Registration failed"
			);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-green-600 px-4">
			<main className="w-[95vw] md:w-[50vw] flex flex-col gap-6 font-[Montserrat] text-[#1e293b]">
				<div className="bg-green-600 text-white py-10 rounded-2xl shadow-lg">
					<h1 className="text-center text-4xl font-extrabold drop-shadow-md">
						Create Account
					</h1>
					<p className="text-center mt-2">
						Already a member?{" "}
						<Link to="/login" className="underline font-semibold hover:text-green-200">
							Log in
						</Link>
					</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-5 text-base bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
				>
					{/* Name */}
					<div className="flex flex-col gap-2">
						<label htmlFor="name" className="font-semibold text-gray-700">
							Full Name*
						</label>
						<input
							id="name"
							placeholder="Enter your full name"
							{...register("name", {
								required: "Name is required",
								minLength: { value: 3, message: "At least 3 characters" },
							})}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						/>
						{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					</div>

					{/* Email */}
					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="font-semibold text-gray-700">
							Email*
						</label>
						<input
							id="email"
							type="email"
							placeholder="Enter a valid email"
							{...register("email", {
								required: "Email is required",
								pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
							})}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						/>
						{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					</div>

					{/* Password */}
					<div className="flex flex-col gap-2">
						<label htmlFor="password" className="font-semibold text-gray-700">
							Password*
						</label>
						<input
							id="password"
							type="password"
							placeholder="At least 8 characters incl. upper, lower, number, special char"
							{...register("password", {
								required: "Password is required",
								minLength: { value: 8, message: "At least 8 characters" },
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
									message: "Must include upper, lower, number, and special char",
								},
							})}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					{/* Confirm */}
					<div className="flex flex-col gap-2">
						<label htmlFor="passwordConfirm" className="font-semibold text-gray-700">
							Confirm Password*
						</label>
						<input
							id="passwordConfirm"
							type="password"
							placeholder="Re-enter your password"
							{...register("passwordConfirm", { required: "Please confirm your password" })}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						/>
						{errors.passwordConfirm && (
							<p className="text-red-500 text-sm">{errors.passwordConfirm.message}</p>
						)}
					</div>

					{/* Role */}
					<div className="flex flex-col gap-2">
						<label htmlFor="role" className="font-semibold text-gray-700">
							Role*
						</label>
						<select
							id="role"
							{...register("role", { required: "Role is required" })}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						>
							<option value="">Select a role</option>
							{roles.map((r) => (
								<option key={r} value={r}>
									{r}
								</option>
							))}
						</select>
						{errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition w-full flex justify-center items-center"
					>
						{isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Register"}
					</button>
				</form>
			</main>
		</div>
	);
}
