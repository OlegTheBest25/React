import { InformationLayout } from "./InformationLayout.js";
export const Information = ({
	currentPlayer,
	isGameEnded,
	isDraw,
	onStart,
}) => {
	return (
		<InformationLayout
			currentPlayer={currentPlayer}
			isGameEnded={isGameEnded}
			isDraw={isDraw}
			onStart={onStart}
		/>
	);
};
