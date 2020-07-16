import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const NUM = "NUM";
const OPERATOR = "OPERATOR";
const CLEAR = "CLEAR";
const EQUAL = "EQUAL";

const keyInfoArray = [
	{
		type: CLEAR,
		text: "AC",
		id: "clear",
	},
	{
		type: OPERATOR,
		text: "/",
		id: "divide",
	},
	{
		type: OPERATOR,
		text: "x",
		id: "multiply",
	},
	{
		type: NUM,
		text: "7",
		id: "seven",
	},
	{
		type: NUM,
		text: "8",
		id: "eight",
	},
	{
		type: NUM,
		text: "9",
		id: "nine",
	},
	{
		type: OPERATOR,
		text: "-",
		id: "subtract",
	},
	{
		type: NUM,
		text: "4",
		id: "four",
	},
	{
		type: NUM,
		text: "5",
		id: "five",
	},
	{
		type: NUM,
		text: "6",
		id: "six",
	},
	{
		type: OPERATOR,
		text: "+",
		id: "add",
	},
	{
		type: NUM,
		text: "1",
		id: "one",
	},
	{
		type: NUM,
		text: "2",
		id: "two",
	},
	{
		type: NUM,
		text: "3",
		id: "three",
	},
	{
		type: EQUAL,
		text: "=",
		id: "equals",
	},
	{
		type: NUM,
		text: "0",
		id: "zero",
	},
	{
		type: NUM,
		text: ".",
		id: "decimal",
	},
];

class CalBtn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button id={this.props.id} onClick={this.props.handleClick}>
				{this.props.text}
			</button>
		);
	}
}

class Display extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="all-display">
				<div className="formulaScreen">{this.props.totalExpression}</div>
				<div id="display">{this.props.currentInput}</div>
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.initialState = {
			totalExpression: "",
			currentInput: "0",
			isEnd: false,
		};

		this.state = Object.assign({}, this.initialState);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(type, value) {
		switch (type) {
			case CLEAR:
				this.setState(this.initialState);
				return false;

			case EQUAL:
				try {
					const result = eval(this.state.totalExpression.replace(/x/gi, "*"));
					this.setState(() => ({
						totalExpression: `${this.state.totalExpression}=${result}`,
						currentInput: result,
						isEnd: true,
					}));
				} catch (e) {
					return false;
				}
				break;

			case NUM:
				if (this.state.isEnd) {
					this.setState({
						totalExpression: "" + value,
						currentInput: "" + value,
						isEnd: false,
					});
				}

				if (
					this.state.totalExpression === "" ||
					this.state.currentInput === "0"
				) {
					this.setState({
						totalExpression: "" + value,
						currentInput: "" + value,
					});
				} else if (["-", "+", "/", "x"].indexOf(value) != -1) {
					this.setState({
						totalExpression: this.state.totalExpression + value,
						currentInput: "" + value,
					});
				} else {
					if (value === "." && /\./.test(this.state.currentInput)) return false;

					this.setState({
						totalExpression: this.state.totalExpression + value,
						currentInput: this.state.currentInput + value,
					});
				}

				break;

			case OPERATOR:
				if (this.state.isEnd) {
					console.log(this.state);
					this.setState({
						totalExpression: this.state.currentInput + value,
						currentInput: this.state.currentInput + value,
						isEnd: false,
					});

					return false;
				}

				let changeExpresion = this.state.totalExpression;
				if (/[\+\-x/]/.test(this.state.currentInput.slice(-1))) {
					switch (value) {
						case "+":
							changeExpresion = this.state.totalExpression.replace(
								/[x/]?[\+\-x/]$/,
								""
							);
							break;
						case "-":
							changeExpresion = this.state.totalExpression.replace(
								/[\+\-]$/,
								""
							);
							break;
						case "x":
						case "/":
							changeExpresion = this.state.totalExpression.replace(
								/[\+\-x/]$/,
								""
							);
					}
				}

				this.setState({
					totalExpression: changeExpresion + value,
					currentInput: "" + value,
				});
				break;

			default:
				console.error("That is wrong typing: ", value);
		}
	}

	render() {
		return (
			<div id="App">
				<Display
					totalExpression={this.state.totalExpression}
					currentInput={this.state.currentInput}
				/>
				<div className="buttons">
					{keyInfoArray.map((item, idx) => (
						<CalBtn
							text={item.text}
							id={item.id}
							key={idx}
							handleClick={() => this.handleClick(item.type, item.text)}
						/>
					))}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
