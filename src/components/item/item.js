export const Title = ({ title, onChangeTitle, onDeleteTitle }) => {
	return (
		<li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
			{title.title}
			<div className="btn-group btn-group-sm">
				<button
					className="btn btn-secondary"
					onClick={() => onChangeTitle(title.id)}
				>
					Изменить дело
				</button>
				<button
					className="btn btn-danger"
					onClick={() => onDeleteTitle(title.id)}
				>
					Удалить дело
				</button>
			</div>
		</li>
	);
};
