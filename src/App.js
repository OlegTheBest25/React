import { useState } from "react";
import { AppLayout } from "./AppLayout.js";
let POS_X = [];
let POS_0 = [];

const win = (WIN_PATTERNS, currentPlayer) => {
	return WIN_PATTERNS.every((el) => {
		return currentPlayer.includes(el);
	});
};

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState("x");
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);
	//WIN_PATTERNS - задаём выигрышные варианты одной из сторон
	const WIN_PATTERNS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const onStart = () => {
		setField(["", "", "", "", "", "", "", "", ""]);
		setIsGameEnded(false);
		setIsDraw(false);
		POS_X = []; //Помещаем в массив ходы игрока Х
		POS_0 = []; //Помещаем в массив ходы игрока 0
	};
	const buttonClick = (index) => {
		if (isGameEnded) {
			alert("Игра завершена. Начните игру сначала");
			return;
		}

		let currentField = [...field];
		if (currentField[index] === "") {
			currentPlayer === "x" ? POS_X.push(index) : POS_0.push(index);
			if (POS_X.length + POS_0.length === 9) {
				setIsDraw(true);
			}
			currentPlayer === "x"
				? setCurrentPlayer("0")
				: setCurrentPlayer("x");
			currentField[index] = currentPlayer;
			setField(currentField);
		} else {
			alert("Выберите пустую клетку");
		}
		// Проверка на достижение победного результата
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			if (win(WIN_PATTERNS[i], POS_X)) {
				setCurrentPlayer("x");

				POS_X = [];
				setIsGameEnded(true);
			}

			if (win(WIN_PATTERNS[i], POS_0)) {
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
