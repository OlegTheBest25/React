export const setIsCreateDataAsync =
	(caseValue, refreshProductFlag) => (dispatch) =>
		fetch("http://localhost:3005/posts", {
			method: "POST",
			headers: { "Content-type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: caseValue,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch({
					type: "SET_IsCreate_Data",
					payload: refreshProductFlag,
				});
			});
