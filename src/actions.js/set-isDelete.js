export const setIsDelete = (id, refreshProductFlag) => (dispatch) =>
	fetch(`http://localhost:3005/posts/${id}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((json) => {
			dispatch({
				type: "SET_IsDelete",
				payload: refreshProductFlag,
			});
		});
