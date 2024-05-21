export const useOnChangeTitle = (datetime, refreshProduct) => {
	const onChangeTitle = (id) => {
		fetch(`http://localhost:3005/posts/${id}`, {
			method: "PUT",
			headers: { "Content-type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: `${datetime}`,
				id: id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Данные изменены", data);
				refreshProduct();
			});
	};
	return onChangeTitle;
};
