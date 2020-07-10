import React from "react";
import { connect, Provider, createStore } from "react-redux";

// redux

const INPUT = "INPUT";
const DELETE = "DELETE";

const reducer = (state = "", action) => {
	switch (action.type) {
		case INPUT:
			return Object.assign({}, { text: state + action.value });
		case DELETE:
			return Object.assign({}, { text: state.slice(0, state.length - 1) });
		default:
			return state;
	}
};

const store = createStore();

// react

class Editor extends React.Component {
	constructor() {
		super();

		this.state = {
			input: "",
		};

		this.inputChange = this.inputChange.bind(this);
	}

	inputChange(e) {
		this.setState({
			input: e.target.value,
		});
	}

	render() {
		return (
			<textarea
				id="editor"
				value={this.state.input}
				onChange={this.inputChange}
			></textarea>
		);
	}
}

class Preview extends React.Component {
	constructor() {
		super();
	}
}

function App() {
	return (
		<Provider className="App" store={store}>
			<Editor />
		</Provider>
	);
}

export default App;
