import { AppReducer } from "./reducers/reducer";
import { TitlesReducer } from "./reducers/TitlesReducer";
import { thunk } from "redux-thunk";
import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from "redux";

const reducer = combineReducers({
	mainState: AppReducer,
	TitlesState: TitlesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
