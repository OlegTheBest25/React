import { useState } from "react";
const initialState = {
	email: "",
	password: "",
	passwordIsTrue: "",
};

const initialErrorsState = {
	emailError: null,
	passwordError: null,
	passwordIsTrueError: null,
};

export const useStore = () => {
	const [stateErrors, setStateErrors] = useState(initialErrorsState);
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		getStateErrors: () => stateErrors,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		updateStateErrors: (ErrorName, ErrorValue) => {
			setStateErrors({ ...stateErrors, [ErrorName]: ErrorValue });
		},
		resetState: () => {
			setState(initialState);
			setStateErrors(initialErrorsState);
		},
	};
};
