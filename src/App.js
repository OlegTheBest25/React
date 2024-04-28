import style from "./style.module.css";
import { useState } from "react";

export const App = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");
	const [isValueValid, setIsValueValid] = useState(false);
	const onInputButtonClick = () => {
		let promptValue = prompt("Введите новое значение:");
		if (promptValue.length < 3) {
			setIsValueValid(false);
			setError("Введенное значение должно содержать минимум 3 символа");
		} else {
			setIsValueValid(true);
			setValue(promptValue);
			setError("");
		}
	};
	const onAddButtonClick = () => {
		let currentId = Date.now();
		let updateList = [...list, { id: currentId, value: value }];
		setList(updateList);
		console.log(list);
		setError("");
		setValue("");
		setIsValueValid(false);
	};

	return (
		<div className={style.app}>
			<h1 className={style["page-heading"]}>Ввод значения</h1>
			<p className={style["no-margin-text"]}>
				Текущее значение <code>value</code>: "
				<output className={style["current-value"]}>{value}</output>"
			</p>
			{error !== "" ? <div className={style.error}>{error}</div> : null}

			<div className={style["buttons-container"]}>
				<button className={style.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={style.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={style["list-container"]}>
				<h2 className={style["list-heading"]}>Список:</h2>
				{list.length === 0 ? (
					<p className={style["no-margin-text"]}>
						Нет добавленных элементов
					</p>
				) : null}

				<ul className={style.list}>
					{list.map((item) => {
						return (
							<li className={style["list-item"]} key={item.id}>
								{item.value}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
