const initialState = {
	productList: [],
	total: 0,
	fetchState: "IDLE",

	productDetail: null,
	productDetailFetchState: "IDLE",
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case "PRODUCTS_FETCHING":
			return { ...state, fetchState: "FETCHING" };

		case "PRODUCTS_SUCCESS":
			return {
				...state,
				fetchState: "SUCCEEDED",
				productList: action.payload.products,
				total: action.payload.total,
			};

		case "PRODUCTS_FAILED":
			return { ...state, fetchState: "FAILED" };

		/* DETAIL */
		case "PRODUCT_DETAIL_FETCHING":
			return {
				...state,
				productDetailFetchState: "FETCHING",
			};

		case "PRODUCT_DETAIL_SUCCESS":
			return {
				...state,
				productDetailFetchState: "SUCCEEDED",
				productDetail: action.payload,
			};

		case "PRODUCT_DETAIL_FAILED":
			return {
				...state,
				productDetailFetchState: "FAILED",
				productDetail: null,
			};

		default:
			return state;
	}
};

export default productReducer;
