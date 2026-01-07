import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const BASE_SHIPPING = 29.99;
const FREE_SHIPPING_LIMIT = 150;

export default function CartPage() {
	// const dispatch = useDispatch();
	const history = useHistory();

	const items = useSelector((s) => s.cart?.items || []);

	const totalItems = items.reduce((s, x) => s + x.count, 0);
	const selected = items.filter((x) => x.checked);




	return (
		<main className="w-[90vw] max-w-[1200px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
			<h1 className="text-3xl font-bold mb-6">
				My Cart{" "}
				<span className="ml-2 text-base font-normal text-[#737373]">
					({totalItems} {totalItems === 1 ? "item" : "items"})
				</span>
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

				{/* sol taraf... */}

				{/* sağ taraf */}
				<aside className="md:col-span-1">
					<div className="bg-white border border-[#E6E6E6] rounded-xl p-4 shadow-sm md:sticky md:top-24">
						<h2 className="text-lg font-bold mb-3">Order Summary</h2>

						{/* fiyat alanları */}

						<button
							className="mt-4 w-full bg-[#23A6F0] text-white font-bold py-2 rounded hover:bg-[#2497da] disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
							disabled={selected.length === 0}
							onClick={() => history.push("/checkout")} // ⭐ KULLANILIYOR = warning yok
						>
							Create Order
						</button>

						<p className="mt-2 text-xs text-center text-[#737373]">
							Free shipping for orders over ${FREE_SHIPPING_LIMIT}.
						</p>
					</div>
				</aside>
			</div>
		</main>
	);
}
