import logo from "./logo.svg";
import "./App.css";
import { createElement } from "react";

function Greeting({ name }) {
	const date = new Date();
	//Императивный стиль
	return createElement(
		"div",
		{ className: "App" },

		createElement(
			"header",
			{ className: "App-header" },
			null,
			createElement("img", { src: logo, className: "App-logo" }, null),
			createElement(
				"p",
				null,
				"Edit <code>src/App.js</code> and save to reload."
			),
			createElement(
				"a",
				{
					className: "App-link",
					href: "https://reactjs.org",
					target: "_blank",
					rel: "noopener noreferrer",
				},
				"Learn React"
			),
			createElement("p", null, `Текущий год: ${date.getFullYear()}`)
		)
	);
}

export function App() {
	return createElement(Greeting);
}
