import { Post } from "./components/post/post";
import styles from "./style.module.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./components/main/main";

const NotFound = () => <div>Такая страница не существует</div>;

export const App = () => {
	return (
		<div className="container mb-5">
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="product/:id" element={<Post />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
