import styles from "./main.module.css";
import { Form } from "../form/form.js";
import { Spinner } from "../spinner/spinner.js";
import { List } from "../list/list.js";
export const Main = ({
	caseValue,
	clickSort,
	searchValue,
	setSearchValue,
	inputChange,
	titles,
	createItem,
	formActive,
	isLoading,
}) => {
	return (
		<div>
			<div className={styles.flexTitle}>
				<button
					className={("btn btn-secondary", styles.buttonSort)}
					onClick={clickSort}
				>
					Сортировка
				</button>
				<input
					className={styles.inputSearch}
					placeholder="Введите данные для поиска"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			<Form
				value={caseValue}
				inputChange={inputChange}
				createItem={createItem}
				formActive={formActive}
			/>
			{isLoading ? <Spinner /> : <List titles={titles} />}
		</div>
	);
};
