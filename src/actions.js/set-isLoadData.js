export const setIsLoadDataAsync = (dispatch) =>
	fetch("http://localhost:3005/posts")
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: "SET_IsLoad_Data",
				payload: json,
			});
		});
