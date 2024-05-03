import styles from "./Field.module.css";
import PropTypes from "prop-types";

export const FieldLayout = ({ numberField, buttonClick }) => {
	return (
		<div className={styles.block}>
			{numberField.map((item, index) => {
				return (
					<button
						className={styles.item}
						id={index}
						key={index}
						onClick={() => {
							buttonClick(index);
						}}
					>
						{item}
					</button>
				);
			})}
		</div>
	);
};

FieldLayout.propTypes = {
	numberField: PropTypes.array,
	buttonClick: PropTypes.func,
};
