import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export default function CartPage() {
	const dispatch = useDispatch();
	const history = useHistory();

	const items = useSelector((s) => s.cart.items);

	const totalPrice = items.reduce(
		(sum, i) => sum + i.price * i.count,
		0
	);

	if (items.length === 0) {
		return (
			<main className="w-[90vw] max-w-[1200px] mx-auto py-20 text-center font-[Montserrat]">
				<h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
				<Link
					to="/shop"
					className="text-[#23A6F0] font-bold hover:underline"
				>
					Go to Shop
				</Link>
			</main>
		);
	}

	return (
		<main className="w-[90vw] max-w-[1200px] mx-auto py-10 font-[Montserrat]">
			<h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

			<div className="flex flex-col gap-6">
				{items.map((item, index) => (
					<div
						key={`${item.id}-${index}`}
						className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-4"
					>

						{/* product */}
						<div className="flex items-center gap-4">
							<img
								src={item.image}
								alt={item.name}
								className="w-24 h-24 object-cover rounded"
							/>
							<div>
								<h3 className="font-bold">{item.name}</h3>
								<p className="text-sm text-gray-500">
									${item.price.toFixed(2)}
								</p>
							</div>
						</div>

						{/* quantity */}
						<div className="flex items-center gap-3">
							<button
								onClick={() =>
									dispatch({
										type: "DECREASE_FROM_CART",
										payload: item.id,
									})
								}
								className="w-8 h-8 bg-gray-200 rounded font-bold"
							>
								−
							</button>

							<span className="font-bold">{item.count}</span>

							<button
								onClick={() =>
									dispatch({
										type: "ADD_TO_CART",
										payload: item,
									})
								}
								className="w-8 h-8 bg-[#23A6F0] text-white rounded font-bold"
							>
								+
							</button>
						</div>

						{/* subtotal */}
						<div className="font-bold">
							${(item.price * item.count).toFixed(2)}
						</div>
					</div>
				))}
			</div>

			{/* total */}
			<div className="flex justify-end mt-10">
				<div className="text-right">
					<p className="text-lg">
						Total:{" "}
						<span className="font-bold">
							${totalPrice.toFixed(2)}
						</span>
					</p>

					<button
						onClick={() => history.push("/checkout")}
						className="mt-4 px-6 py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1e8ed6]"
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</main>
	);
}
