import { useRef } from "react";

import styles from "./app.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const fieldScheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w@_.]*$/,
			"Допустимые символы: буквы, цифры и нижнее подчеркивание"
		)
		.email("Введите корректный email")
		.max(20, "Email-должно быть не больше 20 символов")
		.min(5, "Email - должно быть не меньше 5 символов"),
	password: yup
		.string()
		.matches(
			/^[\w_]*$/,
			"Пароль - допустимые символы: буквы, цифры и нижнее подчеркивание"
		)
		.max(20, "Пароль - должно быть не больше 20 символов")
		.min(3, "Пароль - должно быть не меньше 3 символов"),
	passwordIsTrue: yup
		.string()
		.matches(
			/^[\w_]*$/,
			"Подтверждение пароля - Допустимые символы: буквы, цифры и нижнее подчеркивание"
		)
		.max(20, "Подтверждение пароля - должно быть не больше 20 символов")
		.min(3, "Подтверждение пароля - должно быть не меньше 3 символов"),
});

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const submitButtonRef = useRef(null);
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const passwordIsTrueRef = useRef("");

	const onSubmit = ({ email, password, passwordIsTrue }) => {
		if (password === passwordIsTrue) {
			sendFormData({ email, password, passwordIsTrue });
		} else {
			alert("Пароли не совпадают");
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "", password: "", passwordIsTrue: "" },
		resolver: yupResolver(fieldScheme),
		mode: "onChange",
	});

	let passwordError = errors.password?.message;
	let passwordIsTrueError = errors.passwordIsTrue?.message;
	let emailError = errors.email?.message;

	/*const onChangeForm = ({ email, password, passwordIsTrue }) => {
		setTimeout(() => {
			if (passwordIsTrue === password) {
				console.log("Click");
				submitButtonRef.current.focus();
			}
		}, 100);
	}; */

	const resetState = ({ email, password, passwordIsTrue }) => {
		console.log("reload");
		window.location.reload();
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.app}>
				{emailError !== null && (
					<div className={styles.errorMessage}>{emailError}</div>
				)}
				{passwordError !== null && (
					<div className={styles.errorMessage}>{passwordError}</div>
				)}
				{passwordIsTrueError !== null && (
					<div className={styles.errorMessage}>
						{passwordIsTrueError}
					</div>
				)}

				<input
					name="email"
					type="email"
					ref={emailRef}
					{...register("email", {
						onChange: (e) => {
							emailRef.current = e.target.value;
							setTimeout(() => {
								if (
									passwordIsTrueRef.current ===
										passwordRef.current &&
									passwordRef.current !== ""
								) {
									submitButtonRef.current.focus();
								}
							}, 100);
						},
					})}
					placeholder="Почта"
				/>
				<input
					name="password"
					type="password"
					ref={passwordRef}
					placeholder="Пароль"
					{...register("password", {
						onChange: (e) => {
							passwordRef.current = e.target.value;
							setTimeout(() => {
								if (
									passwordIsTrueRef.current ===
									passwordRef.current
								) {
									submitButtonRef.current.focus();
								}
							}, 100);
						},
					})}
				/>
				<input
					name="passwordIsTrue"
					type="password"
					ref={passwordIsTrueRef}
					placeholder="Подтверждение пароля"
					{...register("passwordIsTrue", {
						onChange: (e) => {
							passwordIsTrueRef.current = e.target.value;
							setTimeout(() => {
								if (
									passwordIsTrueRef.current ===
									passwordRef.current
								) {
									submitButtonRef.current.focus();
								}
							}, 100);
						},
					})}
				/>
				<div className="buttonGroup">
					<button type="button" onClick={resetState}>
						Сброс
					</button>
					<button
						type="submit"
						ref={submitButtonRef}
						disabled={
							!!emailError ||
							!!passwordError ||
							!!passwordIsTrueError
						}
					>
						Зарегестрироваться
					</button>
				</div>
			</form>
		</div>
	);
};
