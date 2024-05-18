import { Title } from "../item/item";
import styles from "./list.module.css";
export const List = ({ titles }) => {
	return (
		<ul>
			{titles.map((title, index) => {
				return <Title key={title.id} title={title} />;
			})}
		</ul>
	);
};
