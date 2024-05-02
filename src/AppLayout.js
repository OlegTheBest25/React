import { Information } from "./components/Information/Information.js";
import { Field } from "./components/Field/Field.js";

export const AppLayout = ({
	field,
	currentPlayer,
	isGameEnded,
	isDraw,
	buttonClick,
	onStart,
}) => {
	return (
		<>
			<Information
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
				onStart={onStart}
			/>
			<Field field={field} buttonClick={buttonClick} />
		</>
	);
};
