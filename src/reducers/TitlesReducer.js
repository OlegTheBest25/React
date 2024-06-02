export const initialState = {
	titlesCopy: [],
	titles: [],
	isLoading: false,
};

export const TitlesReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_Titles": {
			return {
				...state,
				titles: [...payload],
			};
		}
		case "SET_IsLoading": {
			return {
				...state,
				isLoading: payload,
			};
		}
		case "SET_IsLoad_Data": {
			return {
				...state,
				titles: [...payload],
				titlesCopy: [...payload],
				isLoading: false,
			};
		}

		default:
			return state;
	}
};
