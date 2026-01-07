import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";

const FALLBACK_IMG = "https://picsum.photos/600/800?fallback";

export default function ProductCard({
	products = [],
	selectedCategory,
	onCategoryChange,
}) {
	// Kategori dropdown’unu bozmamak için categories state’ini koruyorum
	const categories = useSelector((s) => s.category.items || []);

	const [viewType, setViewType] = useState("grid");
	const [sortOrder, setSortOrder] = useState("");
	const [filterOpen, setFilterOpen] = useState(false);
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	const [internalCategory, setInternalCategory] = useState("");
	const categoryValue = selectedCategory ?? internalCategory;
	const setCategory = onCategoryChange ?? setInternalCategory;

	// ✅ Backend ürünlerinde category: "TSHIRT" gibi string geliyor.
	// Eğer senin category dropdown’un id döndürüyorsa, backend filtreyi ileride bağlayacağız.
	// Şimdilik: categoryValue numeric id ise görmezden gel, string ise product.category ile eşleştir.
	const filteredProducts = useMemo(() => {
		const list = Array.isArray(products) ? products : [];

		const min = minPrice ? parseFloat(minPrice) : null;
		const max = maxPrice ? parseFloat(maxPrice) : null;

		const categoryAsNumber = categoryValue !== "" && !Number.isNaN(Number(categoryValue))
			? Number(categoryValue)
			: null;

		return list
			.filter((p) => {
				const rawPrice = Number(p.discountPrice ?? p.price ?? 0);

				const priceOk =
					(min === null || rawPrice >= min) &&
					(max === null || rawPrice <= max);

				// ✅ Eğer categoryValue sayıysa (id), backend ürününde id yok → filtre uygulamayalım
				// (yoksa her şey boş çıkar).
				if (categoryAsNumber !== null) return priceOk;

				// ✅ Eğer categoryValue string ise (örn "TSHIRT"), backend product.category ile eşleştir
				const categoryOk =
					!categoryValue || String(p.category ?? "").toLowerCase() === String(categoryValue).toLowerCase();

				return priceOk && categoryOk;
			})
			.sort((a, b) => {
				const ap = Number(a.discountPrice ?? a.price ?? 0);
				const bp = Number(b.discountPrice ?? b.price ?? 0);
				if (sortOrder === "asc") return ap - bp;
				if (sortOrder === "desc") return bp - ap;
				return 0;
			});
	}, [products, minPrice, maxPrice, categoryValue, sortOrder]);

	// ✅ Detay linki: en sağlam yol
	// ProductDetail sayfanda useParams ile { productId } alıyorsun,
	// bu yüzden route: /products/:productId olmalı.
	const buildProductUrl = (p) => `/products/${p.id}`;

	return (
		<>
			{/* üst bar */}
			<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-gray-700">Views:</span>
					<button
						onClick={() => setViewType("grid")}
						className={`border px-3 py-1 rounded ${viewType === "grid"
								? "bg-gray-100 text-black font-bold"
								: "text-gray-500"
							}`}
						type="button"
					>
						<LayoutGrid size={16} />
					</button>
					<button
						onClick={() => setViewType("list")}
						className={`border px-3 py-1 rounded ${viewType === "list"
								? "bg-gray-100 text-black font-bold"
								: "text-gray-500"
							}`}
						type="button"
					>
						<List size={16} />
					</button>
				</div>

				<div className="flex items-center gap-2">
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
						className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700"
					>
						<option value="">Sort By</option>
						<option value="asc">Price: Low to High</option>
						<option value="desc">Price: High to Low</option>
					</select>
					<button
						onClick={() => setFilterOpen((prev) => !prev)}
						className="bg-[#23A6F0] text-white text-sm px-4 py-2 rounded hover:bg-[#2497da] transition"
						type="button"
					>
						Filter
					</button>
				</div>
			</div>

			{/* filter panel */}
			{filterOpen && (
				<div className="w-full mb-6 rounded-xl border border-[#E6E6E6] bg-white shadow-sm p-4 md:p-5 font-[Montserrat]">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-xs uppercase tracking-wide text-[#737373]">
								Min Price
							</label>
							<input
								type="number"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
								className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm text-[#252B42]
                focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40 focus:border-[#23A6F0] transition"
								placeholder="0"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-xs uppercase tracking-wide text-[#737373]">
								Max Price
							</label>
							<input
								type="number"
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
								className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm text-[#252B42]
                focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40 focus:border-[#23A6F0] transition"
								placeholder="9999"
							/>
						</div>

						{/* Bu dropdown senin eski category state’inden geliyor.
                Şimdilik UI kalsın; ama backend’te kategori id olmadığı için filtreyi zorlamıyoruz. */}
						<div className="flex flex-col gap-1">
							<label className="text-xs uppercase tracking-wide text-[#737373]">
								Category
							</label>
							<select
								value={categoryValue}
								onChange={(e) => setCategory(e.target.value)}
								className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm text-[#252B42] bg-white
                focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40 focus:border-[#23A6F0] transition"
							>
								<option value="">All</option>
								{categories.map((c) => (
									<option key={c.id} value={String(c.id)}>
										{c.title}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			)}

			{/* products */}
			<div
				className={`${viewType === "list"
						? "flex flex-col gap-5"
						: "flex flex-wrap justify-center gap-x-5 gap-y-6"
					}`}
			>
				{filteredProducts.map((product) => {
					const price = Number(product.price ?? 0);
					const discount = product.discountPrice != null ? Number(product.discountPrice) : null;
					const showPrice = discount ?? price;

					return (
						<div
							key={product.id}
							className={`${viewType === "list"
									? "w-full flex gap-4 p-4 border border-[#cecdcd] rounded items-center hover:shadow-md hover:-translate-y-0.5 transition"
									: "w-full sm:w-[47%] md:w-[30%] lg:w-[22%] flex justify-center hover:shadow-md hover:-translate-y-0.5 transition"
								}`}
						>
							{viewType === "list" ? (
								<Link to={buildProductUrl(product)} className="flex gap-4 items-center w-full">
									<img
										src={product.imageUrl || FALLBACK_IMG}
										alt={product.name || "product"}
										className="w-32 h-32 object-cover rounded"
										onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
									/>
									<div className="flex flex-col justify-between gap-1">
										<h3 className="font-semibold text-lg">{product.name}</h3>
										<p className="text-sm text-gray-600 line-clamp-2">
											{product.description || ""}
										</p>

										<p className="text-sm font-bold">
											{discount != null ? (
												<>
													<span className="text-[#BDBDBD] line-through mr-2">
														${price.toFixed(2)}
													</span>
													<span className="text-[#23856D]">${discount.toFixed(2)}</span>
												</>
											) : (
												<span className="text-[#23856D]">${showPrice.toFixed(2)}</span>
											)}
										</p>
									</div>
								</Link>
							) : (
								<Link
									to={buildProductUrl(product)}
									className="flex flex-col items-center justify-start text-center gap-2 font-[Montserrat] w-full max-w-[240px] h-[520px] overflow-hidden"
								>
									<img
										src={product.imageUrl || FALLBACK_IMG}
										className="w-full h-[320px] object-cover object-center"
										alt={product.name || "product"}
										onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
									/>

									<h5 className="text-[#252B42] font-bold line-clamp-2 min-h-[40px]">
										{product.name}
									</h5>

									<p className="text-[#737373] font-bold text-sm line-clamp-2">
										{product.description || ""}
									</p>

									<p className="font-bold text-sm">
										{discount != null ? (
											<>
												<span className="text-[#BDBDBD] line-through mr-2">
													${price.toFixed(2)}
												</span>
												<span className="text-[#23856D]">${discount.toFixed(2)}</span>
											</>
										) : (
											<span className="text-[#23856D]">${showPrice.toFixed(2)}</span>
										)}
									</p>
								</Link>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
