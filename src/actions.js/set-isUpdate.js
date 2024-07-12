export const setIsUpdateDataAsync =
	(id, datetime, refreshProductFlag) => (dispatch) =>
		fetch(`http://localhost:3005/posts/${id}`, {
			method: "PUT",
			headers: { "Content-type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: `${datetime}`,
				id: id,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch({
					type: "SET_IsUpdate",
					payload: refreshProductFlag,
				});
			});
