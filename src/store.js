import { AppReducer } from "./reducer";
import { legacy_createStore as createStore } from "redux";

const store = createStore(AppReducer);
export default store;
