import "./App.css";
import style from "./style.module.css";
import { useState } from "react";

export const App = () => {
	const [value, setValue] = useState("");
	const [resultColor, setresultColor] = useState(false);
	function numberClick(item) {
		setValue(value + item.target.innerText);
	}

	function operationClick(item) {
		setresultColor(false);
		if (item.target.innerText === "c") {
			setValue("");
		}
		if (item.target.innerText === "+") {
			setresultColor(false);
			setValue(value + item.target.innerText);
		}
		if (item.target.innerText === "-") {
			setresultColor(false);
			setValue(value + item.target.innerText);
		}
		if (item.target.innerText === "=") {
			setresultColor(true);
			setValue(eval(value));
		}
	}

	let numberCalc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	let operetionCalc = ["+", "-", "=", "c"];
	return (
		<div className={style.container}>
			<input
				className={resultColor ? style.result : style.baseStyle}
				type="text"
				value={value}
			/>
			{numberCalc.map((item, index) => {
				return (
					<button onClick={numberClick} key={item}>
						{item}
					</button>
				);
			})}
			{operetionCalc.map((item, index) => {
				return (
					<button onClick={operationClick} key={index}>
						{item}
					</button>
				);
			})}
		</div>
	);
};
