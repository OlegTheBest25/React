import { AppReducer } from "./reducer";

const createStore = (reducer) => {
	let state;
	return {
		dispatch: (action) => {
			state = reducer(state, action);
			console.log(state);
		},
		getState: () => state,
	};
};

export const store = createStore(AppReducer);
store.dispatch({});
