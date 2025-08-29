import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import { loginUser } from "../store/actions/userActions";

export default function Login() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const status = useSelector((s) => s.user?.status) || "idle";

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: { email: "", password: "", remember: false },
	});

	const onSubmit = (values) => {
		const { email, password, remember } = values;

		return dispatch(loginUser({ email, password, rememberMe: remember }))
			.then(() => {
				const from = location.state?.from?.pathname || "/";
				if (from) {
					history.replace(from);
					return;
				}

				if (history.length > 1) history.goBack();
				else history.push("/");
			})
			.catch((msg) => {
				toast.error(msg || "Login failed");
			});
	};



	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-green-600 px-4">
			<main className="w-[95vw] md:w-[40vw] flex flex-col gap-6 font-[Montserrat] text-[#1e293b]">
				{/* Header */}
				<div className="bg-green-600 text-white py-10 rounded-2xl shadow-lg">
					<h1 className="text-center text-4xl font-extrabold drop-shadow-md">
						Welcome Back
					</h1>
					<p className="text-center mt-2">
						Don&apos;t have an account?{" "}
						<Link
							to="/register"
							className="underline font-semibold hover:text-green-200"
						>
							Register
						</Link>
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-base"
				>
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
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Invalid email address",
								},
							})}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>

					{/* Password */}
					<div className="flex flex-col gap-2">
						<label htmlFor="password" className="font-semibold text-gray-700">
							Password*
						</label>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							{...register("password", { required: "Password is required" })}
							className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					{/* Remember me */}
					<label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
						<input
							type="checkbox"
							{...register("remember")}
							className="w-4 h-4 text-green-600 rounded focus:ring-green-400 border-gray-300"
						/>
						<span>Remember me</span>
					</label>

					{/* Submit */}
					<button
						type="submit"
						disabled={isSubmitting || status === "loading"}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition w-full flex justify-center items-center"
					>
						{isSubmitting || status === "loading" ? (
							<CircularProgress size={22} color="inherit" />
						) : (
							"Login"
						)}
					</button>
				</form>
			</main>
		</div>
	);
}