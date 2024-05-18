import { useNavigate } from "react-router-dom";
export const useOnDeleteTitle = (refreshProduct) => {
	const navigate = useNavigate();
	const onDeleteTitle = (id) => {
		if (window.confirm("Подтвердите удаление")) {
			fetch(`http://localhost:3005/posts/${id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log("Данные удалены", data);
					refreshProduct();
					navigate("/");
				});
		}
	};
	return onDeleteTitle;
};
