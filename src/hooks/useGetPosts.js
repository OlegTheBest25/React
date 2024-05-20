import { useEffect, useState } from "react";
let titlesCopy = [];
export const useGetPosts = () => {
	const [titles, setTitles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);
	const refreshProduct = () => {
		setRefreshProductsFlag(!refreshProductsFlag);
	};

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
	return { titles, setTitles, titlesCopy, refreshProduct, isLoading };
};
