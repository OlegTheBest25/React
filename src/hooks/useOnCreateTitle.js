import {
	selectCaseValue,
	selectFormActive,
	selectRefreshProductFlag,
} from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { SET_FormActive, setIsCreateDataAsync } from "../actions.js";
export const useOnCreateTitle = () => {
	const dispatch = useDispatch();
	const caseValue = useSelector(selectCaseValue);
	const formActive = useSelector(selectFormActive);
	const refreshProductFlag = useSelector(selectRefreshProductFlag);

	const createItem = (e) => {
		e.preventDefault();
		dispatch(SET_FormActive(true));
		dispatch(setIsCreateDataAsync(caseValue, refreshProductFlag));
	};
	return { createItem, formActive, caseValue };
};
