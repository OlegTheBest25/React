import { AppLayout } from "./AppLayout.js";
import React from "react";

import { store } from "./store.js";
import { useRef } from "react";

let POS_X = [];
let POS_0 = [];

const win = (WIN_PATTERNS, currentPlayer) => {
	return WIN_PATTERNS.every((el) => {
		return currentPlayer.includes(el);
	});
};

export const App = () => {
	const { currentPlayer, isDraw, isGameEnded, field, WIN_PATTERNS } =
		store.getState();
	const Appref = useRef(null);
	const render = (currentPlayer, isDraw, isGameEnded, field) => {
		return (
			<AppLayout
				field={buttonClick.field ? buttonClick.field : field}
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
				buttonClick={buttonClick}
				onStart={onStart}
			/>
		);
	};
	const onStart = () => {
		store.dispatch({
			type: "SET_FIELD",
			payload: ["", "", "", "", "", "", "", "", ""],
		});
		store.dispatch({ type: "SET_IS_GAME_ENDED", payload: false });
		store.dispatch({ type: "SET_IS_DRAW", payload: false });
		POS_X = []; //Помещаем в массив ходы игрока Х
		POS_0 = []; //Помещаем в массив ходы игрока 0
	};

	const buttonClick = (index) => {
		const { currentPlayer, isGameEnded, field } = store.getState();

		if (isGameEnded) {
			alert("Игра завершена. Начните игру сначала");
			return;
		}

		let currentField = [...field];
		if (currentField[index] === "") {
			currentPlayer === "x" ? POS_X.push(index) : POS_0.push(index);
			if (POS_X.length + POS_0.length === 9) {
				store.dispatch({ type: "SET_IS_DRAW", payload: true });
			}
			currentPlayer === "x"
				? store.dispatch({
						type: "SET_CURRENT_PLAYER",
						payload: "0",
				  })
				: store.dispatch({
						type: "SET_CURRENT_PLAYER",
						payload: "x",
				  });
			currentField[index] = currentPlayer;
			store.dispatch({ type: "SET_FIELD", payload: currentField });
		} else {
			alert("Выберите пустую клетку");
		}
		// Проверка на достижение победного результата
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			if (win(WIN_PATTERNS[i], POS_X)) {
				store.dispatch({
					type: "SET_CURRENT_PLAYER",
					payload: "x",
				});

				POS_X = [];
				store.dispatch({
					type: "SET_IS_GAME_ENDED",
					payload: true,
				});
			}

			if (win(WIN_PATTERNS[i], POS_0)) {
				store.dispatch({
					type: "SET_CURRENT_PLAYER",
					payload: "0",
				});

				POS_0 = [];
				store.dispatch({
					type: "SET_IS_GAME_ENDED",
					payload: true,
				});
			}
		}
		Appref.current.innerHTML = "";
		Appref.current.append(`<AppLayout
				field={${buttonClick.field ? buttonClick.field : field}}
				currentPlayer={${currentPlayer}}
				isGameEnded={${isGameEnded}}
				isDraw={${isDraw}}
				buttonClick={${buttonClick}}
				onStart={${onStart}}
			/>`);

		/*return render(currentPlayer, isDraw, isGameEnded, field);*/
	};

	return (
		<div ref={Appref}>
			{render(currentPlayer, isDraw, isGameEnded, field)}
		</div>
	);
};
