import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductById } from "../api/productsApi";

export default function ProductDetail() {
	const { productId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	const cartItem = useSelector((s) =>
		s.cart.items.find((i) => i.id === Number(productId))
	);

	const countInCart = cartItem?.count || 0;

	useEffect(() => {
		setLoading(true);
		getProductById(productId)
			.then(setProduct)
			.finally(() => setLoading(false));
	}, [productId]);

	if (loading) return <p className="py-20 text-center">Loading...</p>;
	if (!product) return <p className="py-20 text-center">Product not found</p>;

	const discountedPrice =
		product.discountPercentage != null
			? product.price - (product.price * product.discountPercentage) / 100
			: null;

	return (
		<main className="w-[90vw] max-w-[1200px] mx-auto py-10 font-[Montserrat]">
			<button
				onClick={() => history.goBack()}
				className="mb-6 text-[#23A6F0] font-bold hover:underline"
			>
				← Back
			</button>

			<div className="flex flex-col md:flex-row gap-10">
				{/* image */}
				<img
					src={product.thumbnail}
					alt={product.title}
					className="w-full max-w-[420px] rounded object-cover"
				/>

				{/* info */}
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold">{product.title}</h1>
					<p className="text-[#737373]">{product.description}</p>

					{/* price */}
					<div className="flex items-center gap-3">
						{discountedPrice ? (
							<>
								<span className="line-through text-gray-400">
									${product.price.toFixed(2)}
								</span>
								<span className="text-[#23856D] font-bold text-xl">
									${discountedPrice.toFixed(2)}
								</span>
							</>
						) : (
							<span className="text-[#23856D] font-bold text-xl">
								${product.price.toFixed(2)}
							</span>
						)}
					</div>

					{/* quantity control */}
					<div className="flex items-center gap-4 mt-4">
						<button
							onClick={() =>
								dispatch({
									type: "DECREASE_FROM_CART",
									payload: product.id,
								})
							}
							disabled={countInCart === 0}
							className="w-10 h-10 rounded bg-gray-200 text-xl font-bold disabled:opacity-40"
						>
							−
						</button>

						<span className="text-lg font-bold w-6 text-center">
							{countInCart}
						</span>

						<button
							onClick={() =>
								dispatch({
									type: "ADD_TO_CART",
									payload: {
										id: product.id,
										name: product.title,
										price: product.price,
										image: product.thumbnail,
									},
								})
							}
							className="w-10 h-10 rounded bg-[#23A6F0] text-white text-xl font-bold"
						>
							+
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
