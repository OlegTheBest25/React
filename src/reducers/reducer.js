let currentdate = new Date();
let value;
let datetime =
	"Данные изменены: " +
	currentdate.getDate() +
	"/" +
	(currentdate.getMonth() + 1) +
	"/" +
	currentdate.getFullYear() +
	" @ " +
	currentdate.getHours() +
	":" +
	currentdate.getMinutes() +
	":" +
	currentdate.getSeconds();

export const initialState = {
	datetime,
	searchValue: "",
	refreshProductFlag: false,
	formActive: true,
	caseValue: "",
	debouncedValue: value,
};

export const AppReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_CaseValue": {
			return { ...state, caseValue: payload };
		}
		case "SET_FormActive": {
			return {
				...state,
				formActive: payload,
			};
		}
		case "SET_RefreshProductsFlag": {
			return {
				...state,
				refreshProductFlag: payload,
			};
		}
		case "SET_SearchValue": {
			return {
				...state,
				searchValue: payload,
			};
		}
		case "SET_IsCreate_Data": {
			return {
				...state,
				caseValue: "",
				refreshProductFlag: !payload,
			};
		}
		case "SET_IsDelete": {
			return {
				...state,
				refreshProductFlag: !payload,
			};
		}
		case "SET_IsUpdate": {
			return {
				...state,
				refreshProductFlag: !payload,
			};
		}

		default:
			return state;
	}
};
