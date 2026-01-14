import axios from "axios";

const API_URL = "https://dummyjson.com";

export const getProducts = async ({ limit = 12, skip = 0 }) => {
	const res = await axios.get(
		`${API_URL}/products?limit=${limit}&skip=${skip}`
	);
	return res.data; // { products, total }
};

export const getProductById = async (id) => {
	const res = await axios.get(`${API_URL}/products/${id}`);
	return res.data;
};

export const getFeaturedProducts = async (limit = 8) => {
	const res = await axios.get(`${API_URL}/products?limit=${limit}`);
	return res.data.products;
};
