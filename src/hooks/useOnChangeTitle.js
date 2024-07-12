import { selectRefreshProductFlag, selectDatetime } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { setIsUpdateDataAsync } from "../actions.js";
export const useOnChangeTitle = () => {
	const dispatch = useDispatch();
	const refreshProductFlag = useSelector(selectRefreshProductFlag);
	const datetime = useSelector(selectDatetime);
	const onChangeTitle = (id) => {
		dispatch(setIsUpdateDataAsync(id, datetime, refreshProductFlag));
	};
	return onChangeTitle;
};
