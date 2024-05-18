import { useEffect, useState } from "react";
let titlesCopy = [];
export const useGetPosts = (setIsLoading, refreshProductsFlag) => {
	const [titles, setTitles] = useState([]);

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
	return { titles, setTitles, titlesCopy };
};
