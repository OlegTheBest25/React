import styles from "./Layout.module.css";
import PropTypes from "prop-types";
export const InformationLayout = ({
	currentPlayer,
	isGameEnded,
	isDraw,
	onStart,
}) => {
	return (
		<>
			<div className={styles.container}>
				{isDraw ? (
					<p>Ничья</p>
				) : !isDraw && !isGameEnded ? (
					<p>Ходит: {currentPlayer}</p>
				) : (
					<p>Победа: {currentPlayer}</p>
				)}
			</div>
			<button onClick={onStart}>Начать заново</button>
		</>
	);
};
InformationLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
	onStart: PropTypes.func,
};
