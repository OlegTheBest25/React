import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.css";
import { List } from "./components/list/list";
import { Form } from "./components/form/form";
import { Spinner } from "./components/spinner/spinner";
import {
	selectCaseValue,
	selectDatetime,
	selectDebonucedValue,
	selectFormActive,
	selectIsLoading,
	selectRefreshProductFlag,
	selectSearchValue,
	selectTitles,
	selectTitlesCopy,
} from "./selectors";
import {
	SET_CaseValue,
	SET_FormActive,
	SET_IsLoading,
	SET_SearchValue,
	SET_Titles,
	SET_RefreshProductsFlag,
	setIsLoadDataAsync,
} from "./actions.js";
import {
	useOnChangeTitle,
	useOnDeleteTitle,
	useOnCreateTitle,
	useDebounce,
} from "./hooks";

export const App = () => {
	const dispatch = useDispatch();
	const titles = useSelector(selectTitles);
	const isLoading = useSelector(selectIsLoading);
	const searchValue = useSelector(selectSearchValue);
	const titlesCopy = useSelector(selectTitlesCopy);
	const refreshProductFlag = useSelector(selectRefreshProductFlag);
	const datetime = useSelector(selectDatetime);
	const caseValue = useSelector(selectCaseValue);

	const debounceSearchValue = useDebounce(searchValue, 1000);

	const refreshProduct = () => {
		dispatch(SET_RefreshProductsFlag(!refreshProductFlag));
	};

	const inputChange = ({ target }) => {
		target.value === ""
			? dispatch(SET_FormActive(true))
			: dispatch(SET_FormActive(false));
		dispatch(SET_CaseValue(target.value));
	};

	function getSortPosts(dir = true) {
		return titlesCopy.sort(function (titleA, titleB) {
			if (
				!dir === false
					? titleA.title < titleB.title
					: titleA.title > titleB.title
			)
				return -1;
		});
	}

	const clickSort = () => {
		dispatch(SET_Titles(getSortPosts()));
	};

	useEffect(() => {
		if (debounceSearchValue) {
			let currentArr = titlesCopy.filter(
				(title) => title.title.indexOf(searchValue) > -1
			);
			dispatch(SET_Titles(currentArr));
		} else {
			dispatch(SET_Titles(titlesCopy));
		}
	}, [debounceSearchValue]);

	useEffect(() => {
		dispatch(SET_IsLoading(true));
		dispatch(setIsLoadDataAsync);
	}, [refreshProductFlag]);

	const onChangeTitle = useOnChangeTitle();
	const onDeleteTitle = useOnDeleteTitle();
	const { createItem, formActive } = useOnCreateTitle();
	console.log(formActive);
	return (
		<div className="container mb-5">
			<div className={styles.flexTitle}>
				<button
					className={("btn btn-secondary", styles.buttonSort)}
					onClick={clickSort}
				>
					Сортировка
				</button>
				<input
					className={styles.inputSearch}
					placeholder="Введите данные для поиска"
					value={searchValue}
					onChange={(e) => dispatch(SET_SearchValue(e.target.value))}
				/>
			</div>

			<Form
				value={caseValue}
				inputChange={inputChange}
				createItem={createItem}
				formActive={formActive}
			/>

			{isLoading ? (
				<Spinner />
			) : (
				<List
					titles={titles}
					onChangeTitle={onChangeTitle}
					onDeleteTitle={onDeleteTitle}
				/>
			)}
		</div>
	);
};
