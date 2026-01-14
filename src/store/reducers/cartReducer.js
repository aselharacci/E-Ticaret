const initialState = {
	items: [],
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const existing = state.items.find(
				(i) => i.id === action.payload.id
			);

			if (existing) {
				return {
					...state,
					items: state.items.map((i) =>
						i.id === action.payload.id
							? { ...i, count: i.count + 1 }
							: i
					),
				};
			}

			return {
				...state,
				items: [...state.items, { ...action.payload, count: 1 }],
			};
		}

		case "DECREASE_FROM_CART": {
			const existing = state.items.find(
				(i) => i.id === action.payload
			);

			if (!existing) return state;

			if (existing.count === 1) {
				return {
					...state,
					items: state.items.filter((i) => i.id !== action.payload),
				};
			}

			return {
				...state,
				items: state.items.map((i) =>
					i.id === action.payload
						? { ...i, count: i.count - 1 }
						: i
				),
			};
		}

		default:
			return state;
	}
};

export default cartReducer;
