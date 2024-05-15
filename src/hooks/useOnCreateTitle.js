import { useState } from "react";
export const useOnCreateTitle = (refreshProduct) => {
	const [formActive, setFormActive] = useState(true);
	const [caseValue, setCaseValue] = useState("");
	const createItem = (e) => {
		e.preventDefault();
		setFormActive(true);

		fetch("http://localhost:3005/posts", {
			method: "POST",
			headers: { "Content-type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: caseValue,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Пылесос добавлен", data);

				setFormActive(false);
				refreshProduct();
				setCaseValue("");
			});
	};
	return { createItem, formActive, caseValue, setCaseValue, setFormActive };
};
