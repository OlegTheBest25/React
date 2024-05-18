import styles from "./item.module.css";
import { Link } from "react-router-dom";
export const Title = ({ title }) => {
	return (
		<li
			className={
				("list-group-item list-group-item-info d-flex justify-content-between align-items-center",
				styles.truncate)
			}
		>
			<Link to={`product/${title.id}`}>{title.title}</Link>
		</li>
	);
};
