import { useState } from "react";
import { AppLayout } from "./AppLayout.js";
let POS_X = [];
let POS_0 = [];

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState("x");
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);
	//WIN_PATTERNS - задаём выигрышные варианты одной из сторон
	const WIN_PATTERNS = [
		["0", "1", "2"],
		["3", "4", "5"],
		["6", "7", "8"],
		["0", "3", "6"],
		["1", "4", "7"],
		["2", "5", "8"],
		["0", "4", "8"],
		["2", "4", "6"],
	];
	const onStart = () => {
		setField(["", "", "", "", "", "", "", "", ""]);
		setIsGameEnded(false);
		setIsDraw(false);
		console.log("start");
		POS_X = [];
		POS_0 = [];
	};
	const buttonClick = (event) => {
		if (isGameEnded) {
			alert("Игра завершена. Начните игру сначала");
			return;
		}
		currentPlayer === "x"
			? POS_X.push(event.target.getAttribute("id"))
			: POS_0.push(event.target.getAttribute("id"));
		console.log(POS_X.length + POS_0.length);
		if (POS_X.length + POS_0.length === 9) {
			setIsDraw(true);
		}
		let currentField = [...field];
		if (currentField[event.target.getAttribute("id")] === "") {
			currentPlayer === "x"
				? setCurrentPlayer("0")
				: setCurrentPlayer("x");
			currentField[event.target.getAttribute("id")] = currentPlayer;
			setField(currentField);
		} else {
			alert("Выберите пустую клетку");
		}
		// Проверка на достижение победного результата
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			if (
				WIN_PATTERNS[i].every((el) => {
					return POS_X.includes(el);
				})
			) {
				setCurrentPlayer("x");

				POS_X = [];
				setIsGameEnded(true);
			}

			if (
				WIN_PATTERNS[i].every((el) => {
					return POS_0.includes(el);
				})
			) {
				setCurrentPlayer("0");

				POS_0 = [];
				setIsGameEnded(true);
			}
		}
	};

	return (
		<AppLayout
			field={field}
			currentPlayer={currentPlayer}
			isGameEnded={isGameEnded}
			isDraw={isDraw}
			buttonClick={buttonClick}
			onStart={onStart}
		/>
	);
};
