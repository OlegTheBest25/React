import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { List } from "./components/list/list";
import { Spinner } from "./components/spinner/spinner";
import { useDebounce } from "./hooks";

let employeesCopy = [];

export const App = () => {
	/*const [dir, setDir] = useState(false); */
	const [employees, setEmployees] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const debounceSearchValue = useDebounce(searchValue, 1000);
	const [currentEmployee, setCurrentEmployee] = useState({});

	useEffect(() => {
		if (debounceSearchValue) {
			let currentArr = employeesCopy.filter(
				(employee) => employee.name.indexOf(searchValue) > -1
			);
			setEmployees(currentArr);
		} else {
			setEmployees(employeesCopy);
		}
	}, [debounceSearchValue]);

	useEffect(() => {
		setIsLoading(true);
		fetch("http://127.0.0.1:3000")
			.then((response) => response.json())
			.then((json) => {
				setEmployees(json);
				employeesCopy = [...json];
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	const onClick = (employee) => setCurrentEmployee(employee);

	return (
		<div className={styles.containerApp}>
			<div
				className="modal"
				id="exampleModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className={styles.header}>
							<h5 className="modal-title" id="exampleModalLabel">
								{currentEmployee.name}
							</h5>
							<button
								className={styles.btnClose}
								data-bs-dismiss="modal"
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0.585786 0.585786C1.36683 -0.195262 2.63317 -0.195262 3.41421 0.585786L10 7.17157L16.5858 0.585786C17.3668 -0.195262 18.6332 -0.195262 19.4142 0.585786C20.1953 1.36683 20.1953 2.63317 19.4142 3.41421L12.8284 10L19.4142 16.5858C20.1953 17.3668 20.1953 18.6332 19.4142 19.4142C18.6332 20.1953 17.3668 20.1953 16.5858 19.4142L10 12.8284L3.41421 19.4142C2.63317 20.1953 1.36683 20.1953 0.585786 19.4142C-0.195262 18.6332 -0.195262 17.3668 0.585786 16.5858L7.17157 10L0.585786 3.41421C-0.195262 2.63317 -0.195262 1.36683 0.585786 0.585786Z"
										fill="black"
									/>
								</svg>
							</button>
						</div>
						<div className={styles.modalContainer}>
							<ul className={styles.listReset}>
								<li className={styles.itemFlex}>
									<span className={styles.tytle}>
										Телефон:
									</span>
									<span className={styles.text}>
										{currentEmployee.phone}
									</span>
								</li>
								<li className={styles.itemFlex}>
									<span className={styles.tytle}>Почта:</span>
									<span className={styles.text}>
										{currentEmployee.email}
									</span>
								</li>
								<li className={styles.itemFlex}>
									<span className={styles.tytle}>
										Дата приёма:
									</span>
									<span className={styles.text}>
										{currentEmployee.hire_date}
									</span>
								</li>
								<li className={styles.itemFlex}>
									<span className={styles.tytle}>
										Должность:
									</span>
									<span className={styles.text}>
										{currentEmployee.position_name}
									</span>
								</li>
								<li className={styles.itemFlex}>
									<span className={styles.tytle}>
										Подразделение:
									</span>
									<span className={styles.text}>
										{currentEmployee.department}
									</span>
								</li>
							</ul>
							<div className={styles.informationTitle}>
								Дополнительная информация:
							</div>
							<div className={styles.informationText}>
								Разработчики используют текст в качестве
								заполнителя макта страницы. Разработчики
								используют текст в качестве заполнителя макта
								страницы.
							</div>
						</div>
					</div>
				</div>
			</div>

			<form className={styles.formSearch}>
				<input
					className={styles.inputSearch}
					placeholder="Введите данные для поиска"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button className={styles.formButton}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M15.8033 15.8033C12.8744 18.7322 8.12563 18.7322 5.1967 15.8033C2.26777 12.8744 2.26777 8.12563 5.1967 5.1967C8.12563 2.26777 12.8744 2.26777 15.8033 5.1967C18.7322 8.12563 18.7322 12.8744 15.8033 15.8033ZM16.1457 16.8545C12.8078 19.8256 7.69007 19.7109 4.48959 16.5104C1.17014 13.191 1.17014 7.80905 4.48959 4.48959C7.80905 1.17014 13.191 1.17014 16.5104 4.48959C19.7115 7.69065 19.8256 12.8097 16.8529 16.1475L21.4605 20.7551C21.6558 20.9504 21.6558 21.267 21.4605 21.4622C21.2653 21.6575 20.9487 21.6575 20.7534 21.4622L16.1457 16.8545Z"
							fill="#432EAB"
						/>
					</svg>
				</button>
			</form>

			{isLoading ? (
				<Spinner />
			) : (
				<List employees={employees} onClick={onClick} />
			)}
		</div>
	);
};
