import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { List } from "./components/list/list";
import { Form } from "./components/form/form";
import { AppContext } from "./context";
import { Spinner } from "./components/spinner/spinner";
import {
	useOnChangeTitle,
	useOnDeleteTitle,
	useOnCreateTitle,
	useDebounce,
} from "./hooks";

let currentdate = new Date();
let titlesCopy = [];
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

export const App = () => {
	/*const [dir, setDir] = useState(false); */
	const [titles, setTitles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const debounceSearchValue = useDebounce(searchValue, 1000);

	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProduct = () => {
		setRefreshProductsFlag(!refreshProductsFlag);
		console.log(refreshProductsFlag);
	};
	/*const refreshDir = () => {
		setDir(!dir);
	}; */
	const inputChange = ({ target }) => {
		target.value === "" ? setFormActive(true) : setFormActive(false);
		setCaseValue(target.value);
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
		setTitles(getSortPosts());

		/*refreshDir(); */
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

	useEffect(() => {
		setIsLoading(true);
		fetch("http://localhost:3005/posts")
			.then((response) => response.json())
			.then((json) => {
				setTitles(json);
				titlesCopy = [...json];
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshProductsFlag]);

	const onChangeTitle = useOnChangeTitle(datetime, refreshProduct);
	const onDeleteTitle = useOnDeleteTitle(refreshProduct);
	const { createItem, formActive, caseValue, setCaseValue, setFormActive } =
		useOnCreateTitle(refreshProduct);

	return (
		<AppContext.Provider value={{ onChangeTitle, onDeleteTitle }}>
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
		</AppContext.Provider>
	);
};
