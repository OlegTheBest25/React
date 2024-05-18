import styles from "./post.module.css";
import { useParams, useNavigate } from "react-router-dom";

export const Post = ({ titles, onChangeTitle, onDeleteTitle }) => {
	const PostNotFound = () => <div>Пост не найден</div>;
	const params = useParams();
	const navigate = useNavigate();
	let title = titles.find((item) => item.id === parseInt(params.id));
	if (!title) {
		return <PostNotFound />;
	}

	return (
		<div
			className={
				("list-group-item list-group-item-info  justify-content-between align-items-center",
				styles.wrapper)
			}
		>
			<p>{title.title}</p>

			<div className="btn-group btn-group-sm">
				<button
					className="btn btn-primary"
					onClick={() => {
						navigate(-1);
					}}
				>
					&laquo;
				</button>
				<button
					className="btn btn-secondary"
					onClick={() => onChangeTitle(params.id)}
				>
					Изменить дело
				</button>
				<button
					className="btn btn-danger"
					onClick={() => onDeleteTitle(params.id)}
				>
					Удалить дело
				</button>
			</div>
		</div>
	);
};
