import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Post } from "./components/post/post";

import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./components/main/main";

import {
	useOnChangeTitle,
	useOnDeleteTitle,
	useOnCreateTitle,
	useDebounce,
	useGetPosts,
} from "./hooks";

let currentdate = new Date();

const NotFound = () => <div>Такая страница не существует</div>;

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
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const debounceSearchValue = useDebounce(searchValue, 1000);
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProduct = () => {
		setRefreshProductsFlag(!refreshProductsFlag);
		console.log(refreshProductsFlag);
	};

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

	const onChangeTitle = useOnChangeTitle(datetime, refreshProduct);
	const onDeleteTitle = useOnDeleteTitle(refreshProduct);
	const { titles, setTitles, titlesCopy } = useGetPosts(
		setIsLoading,
		refreshProductsFlag
	);
	const { createItem, formActive, caseValue, setCaseValue, setFormActive } =
		useOnCreateTitle(refreshProduct);
	console.log(titles);
	return (
		<div className="container mb-5">
			<Routes>
				<Route
					path="/"
					element={
						<Main
							caseValue={caseValue}
							clickSort={clickSort}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							inputChange={inputChange}
							createItem={createItem}
							formActive={formActive}
							isLoading={isLoading}
							titles={titles}
						/>
					}
				></Route>
				<Route
					path="product/:id"
					element={
						<Post
							titles={titles}
							onChangeTitle={onChangeTitle}
							onDeleteTitle={onDeleteTitle}
						/>
					}
				></Route>
				<Route path="/404" element={<NotFound />}></Route>
				<Route path="*" element={<Navigate to="/404" />}></Route>
			</Routes>
		</div>
	);
};
