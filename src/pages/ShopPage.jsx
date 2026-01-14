import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../components/shop-page/Breadcrumb";
import ShopImageGallery from "../components/shop-page/ShopImageGallery";
import ProductCard from "../components/shop-page/ProductCard";
import Pagination from "../components/shop-page/Pagination";
import Brands from "../components/Brands";

import { getProducts } from "../api/productsApi";

export default function ShopPage() {
	const { categoryId } = useParams();

	const [page, setPage] = useState(1);
	const limit = 12;

	const [selectedCategory, setSelectedCategory] = useState(categoryId || "");

	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (categoryId) {
			setSelectedCategory(String(categoryId));
			setPage(1);
		}
	}, [categoryId]);

	/* ----------------------------------
	   API FETCH (PAGINATION)
	---------------------------------- */
	useEffect(() => {
		setLoading(true);

		getProducts({
			limit,
			skip: (page - 1) * limit,
		})
			.then((data) => {
				setProducts(data.products || []);
				setTotal(data.total || 0);
			})
			.finally(() => setLoading(false));
	}, [page]);

	const totalPages = Math.ceil(total / limit);

	/* ----------------------------------
	   ADAPTER
	   dummyjson → ProductCard uyumu
	---------------------------------- */
	const adaptedProducts = useMemo(() => {
		return products.map((p) => ({
			id: p.id,
			name: p.title,
			description: p.description,
			imageUrl: p.thumbnail,
			price: p.price,
			discountPrice:
				p.discountPercentage != null
					? p.price - (p.price * p.discountPercentage) / 100
					: null,
			category: p.category,
		}));
	}, [products]);

	return (
		<>
			<Breadcrumb current="Shop" />
			<ShopImageGallery />

			<main className="w-[90vw] max-w-[1200px] mx-auto py-10">
				{loading ? (
					<p className="text-center py-10">Loading products...</p>
				) : (
					<>
						<ProductCard
							products={adaptedProducts}
							selectedCategory={selectedCategory}
							onCategoryChange={(val) => {
								setSelectedCategory(val);
								setPage(1);
							}}
						/>

						<Pagination
							currentPage={page}
							totalPages={totalPages}
							onPageChange={setPage}
						/>
					</>
				)}
			</main>

			<Brands />
		</>
	);
}
