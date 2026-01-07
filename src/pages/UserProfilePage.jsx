import { useSelector } from "react-redux";
import {
	Heart,
	ShoppingCart,
	Package,
	LogOut,
	User,
} from "lucide-react";

const UserProfilePage = () => {
	const user = useSelector((state) => state.user?.user);

	if (!user) {
		return <div className="p-6">Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="max-w-4xl mx-auto space-y-6">

				{/* PROFILE HEADER */}
				<div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm">
					<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
						<User className="text-green-600" size={32} />
					</div>

					<div>
						<h1 className="text-xl font-semibold">
							{user.name || "User"}
						</h1>
						<p className="text-gray-500 text-sm">{user.email}</p>
					</div>
				</div>

				{/* QUICK ACTIONS */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<ProfileCard
						icon={<Package />}
						title="My Orders"
						subtitle="View your order history"
					/>
					<ProfileCard
						icon={<Heart />}
						title="Wishlist"
						subtitle="Products you love"
					/>
					<ProfileCard
						icon={<ShoppingCart />}
						title="My Cart"
						subtitle="Review items in your cart"
					/>
				</div>

				{/* ACCOUNT INFO */}
				<div className="bg-white rounded-2xl p-6 shadow-sm">
					<h2 className="font-semibold mb-4">Account Information</h2>

					<div className="space-y-2 text-sm text-gray-600">
						<p>
							<span className="font-medium">Email:</span> {user.email}
						</p>
						{user.phone && (
							<p>
								<span className="font-medium">Phone:</span> {user.phone}
							</p>
						)}
					</div>
				</div>

				{/* LOGOUT */}
				<button
					className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition"
				>
					<LogOut size={18} />
					Sign Out
				</button>

			</div>
		</div>
	);
};

const ProfileCard = ({ icon, title, subtitle }) => {
	return (
		<div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="text-green-600 mb-3">{icon}</div>
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-gray-500">{subtitle}</p>
		</div>
	);
};

export default UserProfilePage;
