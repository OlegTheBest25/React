import { FieldLayout } from "./FieldLayout";

import store from "../../store.js";

export const Field = ({ field, buttonClick }) => {
	store.subscribe(() => {});

	return <FieldLayout numberField={field} buttonClick={buttonClick} />;
};
