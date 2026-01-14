import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FALLBACK_IMG = "https://picsum.photos/100/100";

export default function CartDropdown({ onClose }) {
	const dispatch = useDispatch();
	const items = useSelector((s) => s.cart?.items || []);

	const totalPrice = items.reduce(
		(sum, it) =>
			sum +
			Number(it?.price || 0) * Number(it?.count || 0),
		0
	);

	return (
		<div className="font-[Montserrat] absolute -right-10 top-12 mt-2 w-80 bg-white shadow-lg border border-[#E6E6E6] rounded p-3 z-50">
			<div className="font-bold mb-2">
				My Cart ({items.reduce((s, x) => s + (x.count || 0), 0)})
			</div>

			<div className="max-h-64 overflow-auto space-y-3">
				{items.length === 0 ? (
					<p className="text-sm text-gray-500">Your cart is empty</p>
				) : (
					items.map((it, index) => (
						<div
							key={`${it.id}-${index}`}
							className="flex gap-3 items-center"
						>
							<img
								src={it.image || FALLBACK_IMG}
								alt={it.name || "Product"}
								className="w-14 h-14 object-cover rounded"
								onError={(e) => {
									e.currentTarget.src = FALLBACK_IMG;
								}}
							/>

							<div className="flex-1">
								<div className="text-sm font-semibold line-clamp-1">
									{it.name || "Product"}
								</div>
								<div className="text-xs text-gray-500">
									Qty: {it.count || 0} • $
									{Number(it.price || 0).toFixed(2)}
								</div>
							</div>

							<div className="flex items-center gap-2 font-bold">
								<button
									className="px-2 py-1 border rounded"
									onClick={() =>
										dispatch({
											type: "DECREASE_FROM_CART",
											payload: it.id,
										})
									}
									aria-label="Decrease"
								>
									−
								</button>

								<button
									className="px-2 py-1 border rounded"
									onClick={() =>
										dispatch({
											type: "ADD_TO_CART",
											payload: {
												id: it.id,
												name: it.name,
												price: it.price,
												image: it.image,
											},
										})
									}
									aria-label="Increase"
								>
									+
								</button>
							</div>
						</div>
					))
				)}
			</div>

			<div className="mt-3 flex justify-between items-center">
				<span className="font-bold">
					${totalPrice.toFixed(2)}
				</span>
				<div className="flex gap-2 items-center">
					<Link
						to="/cart"
						className="text-[#23A6F0] font-bold"
						onClick={onClose}
					>
						Go to Cart
					</Link>
				</div>
			</div>
		</div>
	);
}
