export const initialState = {
	WIN_PATTERNS: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	],

	field: ["", "", "", "", "", "", "", "", ""],
	isDraw: false,
	isGameEnded: false,
	currentPlayer: "x",
	btnClick: false,
};

export const AppReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_CURRENT_PLAYER": {
			return { ...state, currentPlayer: payload };
		}
		case "SET_IS_DRAW": {
			return {
				...state,
				isDraw: payload,
			};
		}
		case "SET_FIELD": {
			return {
				...state,
				field: payload,
			};
		}
		case "SET_IS_GAME_ENDED": {
			return {
				...state,
				isGameEnded: payload,
			};
		}
		case "SET_IS_buttonClick": {
			return {
				...state,
				btnClick: payload,
			};
		}
		default:
			return state;
	}
};
