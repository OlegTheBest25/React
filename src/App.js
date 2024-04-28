import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const clickNext = () => {
		activeIndex === 6 ? setActiveIndex(0) : setActiveIndex(activeIndex + 1);
	};
	const clickPreview = () => {
		console.log(activeIndex);
		setActiveIndex(activeIndex - 1);
	};

	const buttonClick = (event) => {
		setActiveIndex(event.target.innerText - 1);
	};
	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let isFirst = true;
	let isEnd = false;
	if (activeIndex !== 0) {
		isFirst = false;
	}
	if (activeIndex === 6) {
		isEnd = true;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{data[activeIndex].content}
					</div>
					<ul className={styles["steps-list"]}>
						{steps.map((item, index) => {
							return (
								<li
									className={
										index === activeIndex
											? styles["steps-item"] +
											  " " +
											  styles.done +
											  " " +
											  styles.active
											: index < activeIndex
											? styles["steps-item"] +
											  " " +
											  styles.done
											: styles["steps-item"]
									}
								>
									<button
										className={styles["steps-item-button"]}
										onClick={buttonClick}
									>
										{index + 1}
									</button>
									Шаг {index + 1}
								</li>
							);
						})}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={clickPreview}
							disabled={isFirst}
						>
							Назад
						</button>
						<button className={styles.button} onClick={clickNext}>
							{isEnd ? "Начать сначала" : "Далее"}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
