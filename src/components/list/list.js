import { Title } from "../item/item";
import styles from "./list.module.css";
export const List = ({ employees, onClick }) => {
	return (
		<div className={styles.wrap}>
			{employees.map((employee, index) => {
				return (
					<Title key={index} employee={employee} onClick={onClick} />
				);
			})}
		</div>
	);
};
