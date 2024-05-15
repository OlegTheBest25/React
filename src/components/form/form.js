export const Form = ({ value, inputChange, createItem, formActive }) => {
	return (
		<form className="input-group mb-3">
			<input
				className="form-control"
				placeholder="Введите название нового дела"
				value={value}
				onChange={inputChange}
			/>
			<button
				onClick={createItem}
				className="btn btn-primary"
				disabled={formActive}
			>
				Добавить дело
			</button>
		</form>
	);
};
