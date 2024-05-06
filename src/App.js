import { useRef } from "react";
import { useStore } from "./useStore.js";
import styles from "./app.module.css";

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const {
		getState,
		getStateErrors,
		updateStateErrors,
		updateState,
		resetState,
	} = useStore();

	//const [loginError, setLoginError] = useState(true);

	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		if (email && password && password === passwordIsTrue) {
			console.log("Пароли совпадают");
			sendFormData(getState());
		} else {
			alert("Пароли не совпадают");
		}
	};

	const { email, password, passwordIsTrue } = getState();
	const { emailError, passwordError, passwordIsTrueError } = getStateErrors();

	const onFormChange = ({ target }) => {
		setTimeout(() => {
			if (
				email &&
				target.name === "passwordIsTrue" &&
				emailError === null
			) {
				if (target.value === password) {
					submitButtonRef.current.focus();
				}
			}
		}, 100);
	};

	const onChange = ({ target }) => {
		let newErrorEmail = null;
		let newErrorPassword = null;
		let newErrorPasswordIsTrue = null;

		if (target.name === "password") {
			if (!/^[\w@_]*$/.test(target.value)) {
				newErrorPassword =
					"Допустимые символы: буквы, цифры и нижнее подчеркивание";
			} else if (target.value.length > 20) {
				newErrorPassword = "Должно быть не больше 20 символов";
			} else if (target.value.length < 3) {
				newErrorPassword = "Должно быть не меньше 3 символов";
			}
			updateStateErrors("passwordError", newErrorPassword);
		}
		if (target.name === "passwordIsTrue") {
			if (!/^[\w@_]*$/.test(target.value)) {
				newErrorPasswordIsTrue =
					"Допустимые символы: буквы, цифры и нижнее подчеркивание";
			} else if (target.value.length > 20) {
				newErrorPasswordIsTrue = "Должно быть не больше 20 символов";
			} else if (target.value.length < 3) {
				newErrorPasswordIsTrue = "Должно быть не меньше 3 символов";
			}
			updateStateErrors("passwordIsTrueError", newErrorPasswordIsTrue);
		}

		if (target.name === "email") {
			if (!/^[\w@_]*$/.test(target.value)) {
				newErrorEmail =
					"Допустимые символы: буквы, цифры и нижнее подчеркивание";
			} else if (target.value.length > 20) {
				newErrorEmail = "Должно быть не больше 20 символов";
			} else if (target.value.length < 3) {
				newErrorEmail = "Должно быть не меньше 3 символов";
			}
			if (!target.value.includes("@")) {
				newErrorEmail = "Email должен содержать символ @";
			}
			updateStateErrors("emailError", newErrorEmail);
		}
		updateState(target.name, target.value);

		console.log(getState());
		console.log(getStateErrors());
	};

	return (
		<div className={styles.container}>
			<form
				onSubmit={onSubmit}
				onChange={onFormChange}
				className={styles.app}
			>
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
					value={email}
					onChange={onChange}
					placeholder="Почта"
				/>
				<input
					name="password"
					type="password"
					value={password}
					onChange={onChange}
					placeholder="Пароль"
				/>
				<input
					name="passwordIsTrue"
					type="password"
					value={passwordIsTrue}
					onChange={onChange}
					placeholder="Подтверждение пароля"
				/>
				<div className="buttonGroup">
					<button type="button" onClick={resetState}>
						Сброс
					</button>
					<button
						type="submit"
						ref={submitButtonRef}
						disabled={
							emailError !== null ||
							passwordError !== null ||
							passwordIsTrueError !== null
						}
					>
						Зарегестрироваться
					</button>
				</div>
			</form>
		</div>
	);
};
