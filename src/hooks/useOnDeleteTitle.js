export const useOnDeleteTitle = (refreshProduct) => {
	const onDeleteTitle = (id) => {
		if (window.confirm("Подтвердите удаление")) {
			fetch(`http://localhost:3005/posts/${id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log("Данные удалены", data);
					refreshProduct();
				});
		}
	};
	return onDeleteTitle;
};
