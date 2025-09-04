import axiosInstance from "../../api/axiosInstance";
import {
	setProductList,
	setTotal,
	setFetchState,
	setProductDetail,
	setProductDetailFetchState,
} from "../actions/productActions";

export const fetchProducts =
	(options = {}) =>
		async (dispatch, getState) => {
			const { limit, offset, filter } = getState().product;

			const params = {
				limit,
				offset,
				...(filter ? { filter } : {}),
				...options,
			};

			try {
				dispatch(setFetchState("FETCHING"));

				// 🔎 Debug log
				console.log("fetchProducts çağrıldı -> params:", params);

				const res = await axiosInstance.get("/products", { params });

				// 🔎 Debug log
				console.log("fetchProducts response:", res.data);

				const { total, products } = res.data || {};
				dispatch(setProductList(Array.isArray(products) ? products : []));
				dispatch(setTotal(Number(total) || 0));
				dispatch(setFetchState("FULFILLED"));
			} catch (err) {
				dispatch(setFetchState("FAILED"));
				console.error("fetchProducts error:", err);
			}
		};

export const fetchProductById = (productId) => async (dispatch) => {
	try {
		dispatch(setProductDetailFetchState("FETCHING"));

		// 🔎 Debug log
		console.log("fetchProductById çağrıldı -> id:", productId);

		const res = await axiosInstance.get(`/products/${productId}`);

		// 🔎 Debug log
		console.log("fetchProductById response:", res.data);

		dispatch(setProductDetail(res.data || null));
		dispatch(setProductDetailFetchState("FULFILLED"));
	} catch (err) {
		console.error("fetchProductById error:", err);
		dispatch(setProductDetail(null));
		dispatch(setProductDetailFetchState("FAILED"));
	}
};
