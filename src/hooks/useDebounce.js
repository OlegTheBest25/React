import { useState, useEffect } from "react";
<<<<<<< HEAD
=======

>>>>>>> 37342afbf58ce0e61c341e43f8c3a0248de125cc
export function useDebounce(value, delay) {
	// Состояние и сеттер для отложенного значения
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
}
