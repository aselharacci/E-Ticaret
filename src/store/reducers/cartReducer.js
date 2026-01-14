const loadCartFromStorage = () => {
	try {
		const data = localStorage.getItem("cart");
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};

const saveCartToStorage = (items) => {
	try {
		localStorage.setItem("cart", JSON.stringify(items));
	} catch (e) {
		console.error("Failed to save cart to storage", e);
	}
};

const initialState = {
	items: loadCartFromStorage(),
};

const cartReducer = (state = initialState, action) => {
	let newItems = state.items;

	switch (action.type) {
		case "ADD_TO_CART": {
			const existing = state.items.find(
				(i) => i.id === action.payload.id
			);

			if (existing) {
				newItems = state.items.map((i) =>
					i.id === action.payload.id
						? { ...i, count: i.count + 1 }
						: i
				);
			} else {
				newItems = [
					...state.items,
					{ ...action.payload, count: 1 },
				];
			}
			break;
		}

		case "DECREASE_FROM_CART": {
			const existing = state.items.find(
				(i) => i.id === action.payload
			);

			if (!existing) break;

			if (existing.count === 1) {
				newItems = state.items.filter(
					(i) => i.id !== action.payload
				);
			} else {
				newItems = state.items.map((i) =>
					i.id === action.payload
						? { ...i, count: i.count - 1 }
						: i
				);
			}
			break;
		}

		default:
			return state;
	}

	saveCartToStorage(newItems);
	return { ...state, items: newItems };
};

export default cartReducer;
