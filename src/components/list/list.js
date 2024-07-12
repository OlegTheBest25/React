import { Title } from "../item/item";
import styles from "./list.module.css";
<<<<<<< HEAD
export const List = ({ employees, onClick }) => {
	return (
		<div className={styles.wrap}>
			{employees.map((employee, index) => {
				return (
					<Title key={index} employee={employee} onClick={onClick} />
				);
			})}
		</div>
=======
export const List = ({ titles, onChangeTitle, onDeleteTitle }) => {
	return (
		<ul>
			{titles.map((title, index) => {
				return (
					<Title
						key={title.id}
						title={title}
						onChangeTitle={onChangeTitle}
						onDeleteTitle={onDeleteTitle}
					/>
				);
			})}
		</ul>
>>>>>>> 37342afbf58ce0e61c341e43f8c3a0248de125cc
	);
};
