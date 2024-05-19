import { useState } from "react";
import styles from "./style.module.css";
import { Post } from "./components/post/post";

import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./components/main/main";

import {
	useOnChangeTitle,
	useOnDeleteTitle,
	useGetPosts,
	useOnCreateTitle,
} from "./hooks";

const NotFound = () => <div>Такая страница не существует</div>;

export const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProduct = () => {
		setRefreshProductsFlag(!refreshProductsFlag);
		console.log(refreshProductsFlag);
	};

	const onChangeTitle = useOnChangeTitle(refreshProduct);
	const onDeleteTitle = useOnDeleteTitle(refreshProduct);
	const { titles, setTitles, titlesCopy } = useGetPosts(
		setIsLoading,
		refreshProductsFlag
	);
	const { createItem, formActive, caseValue, setCaseValue, setFormActive } =
		useOnCreateTitle(refreshProduct);

	return (
		<div className="container mb-5">
			<Routes>
				<Route
					path="/"
					element={
						<Main
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							isLoading={isLoading}
							titles={titles}
							setTitles={setTitles}
							titlesCopy={titlesCopy}
							setFormActive={setFormActive}
							setCaseValue={setCaseValue}
							caseValue={caseValue}
							formActive={formActive}
							createItem={createItem}
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
