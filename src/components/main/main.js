import styles from "./main.module.css";
import { useEffect } from "react";
import { Form } from "../form/form.js";
import { Spinner } from "../spinner/spinner.js";
import { List } from "../list/list.js";
import { useDebounce } from "../../hooks/useDebounce.js";
export const Main = ({
	searchValue,
	setSearchValue,
	titles,
	isLoading,
	setTitles,
	titlesCopy,
	setFormActive,
	setCaseValue,
	caseValue,
	formActive,
	createItem,
}) => {
	const debounceSearchValue = useDebounce(searchValue, 1000);
	const inputChange = ({ target }) => {
		target.value === "" ? setFormActive(true) : setFormActive(false);
		setCaseValue(target.value);
	};
	useEffect(() => {
		if (debounceSearchValue) {
			let currentArr = titlesCopy.filter(
				(title) => title.title.indexOf(searchValue) > -1
			);
			setTitles(currentArr);
		} else {
			setTitles(titlesCopy);
		}
	}, [debounceSearchValue]);
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
		setTitles(getSortPosts());
	};

	return (
		<div>
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
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			<Form
				value={caseValue}
				inputChange={inputChange}
				createItem={createItem}
				formActive={formActive}
			/>
			{isLoading ? <Spinner /> : <List titles={titles} />}
		</div>
	);
};
