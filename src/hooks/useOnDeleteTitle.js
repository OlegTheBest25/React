import { selectRefreshProductFlag } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { setIsDelete } from "../actions.js";
export const useOnDeleteTitle = () => {
	const dispatch = useDispatch();
	const refreshProductFlag = useSelector(selectRefreshProductFlag);
	const onDeleteTitle = (id) => {
		if (window.confirm("Подтвердите удаление")) {
			dispatch(setIsDelete(id, refreshProductFlag));
		}
	};
	return onDeleteTitle;
};
