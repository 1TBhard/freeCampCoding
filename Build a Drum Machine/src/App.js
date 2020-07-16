import React from "react";
import "./style.css";

const bankOne = [
	{
		keyCode: 81,
		keyTrigger: "Q",
		id: "Heater-1",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	{
		keyCode: 87,
		keyTrigger: "W",
		id: "Heater-2",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	{
		keyCode: 69,
		keyTrigger: "E",
		id: "Heater-3",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	{
		keyCode: 65,
		keyTrigger: "A",
		id: "Heater-4",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	{
		keyCode: 83,
		keyTrigger: "S",
		id: "Clap",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	{
		keyCode: 68,
		keyTrigger: "D",
		id: "Open-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	{
		keyCode: 90,
		keyTrigger: "Z",
		id: "Kick-n'-Hat",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	{
		keyCode: 88,
		keyTrigger: "X",
		id: "Kick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	{
		keyCode: 67,
		keyTrigger: "C",
		id: "Closed-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

class DrumBtn extends React.Component {
	constructor(props) {
		super(props);

		this.btnDOM = React.createRef(); // ref 으로 DOM에 접근
		this.audio = React.createRef(); // ref 으로 DOM에 접근
		this.playSound = this.playSound.bind(this);

		window.addEventListener("keydown", this.playSound);
	}

	// 키 계속 눌리는 것 방지
	playSound(e) {
		if (e instanceof KeyboardEvent && e.keyCode !== this.props.data.keyCode)
			return false;

		if (!this.btnDOM.current.classList.contains("playing")) {
			this.btnDOM.current.style.cssText =
				"transform: translateY(10px);background-color: #c78100;";

			this.audio.current.pause();
			this.audio.current.currentTime = 0;
			this.audio.current.play();

			document.getElementById("display").innerText = this.props.data.id;

			setTimeout(
				() =>
					(this.btnDOM.current.style.cssText =
						"transform: 0;background-color: orange;"),
				100
			);
		}
	}

	render() {
		const { id, keyTrigger, url } = this.props.data;
		return (
			<div
				id={id}
				className="drum-pad"
				onClick={this.playSound}
				onKeyDown={this.playSound}
				ref={this.btnDOM}
			>
				{keyTrigger}
				<audio className="clip" id={keyTrigger} src={url} ref={this.audio} />
			</div>
		);
	}
}

class VolumeScroll extends React.Component {
	constructor() {
		super();
		this.state = {
			volumn: 50,
		};

		this.handleVolumn = this.handleVolumn.bind(this);
	}

	handleVolumn(e) {
		this.setState({
			volumn: e.target.value,
		});

		document
			.querySelectorAll(".clip")
			.forEach((ele) => (ele.volume = e.target.value / 100));

		console.log(this.state);
	}

	render() {
		return (
			<div id="volumn">
				Vol.&nbsp;
				<input
					type="range"
					min="0"
					max="100"
					class="volume-slider"
					value={this.state.volumn}
					onChange={this.handleVolumn}
				/>
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div id="drum-machine">
				<h1 class="title">Drum Machine</h1>
				<div id="display">Just Play</div>

				<VolumeScroll />

				<div id="drum-pads">
					{bankOne.map((ele, idx) => (
						<DrumBtn data={ele} key={idx}></DrumBtn>
					))}
				</div>

				<div id="controller"></div>
			</div>
		);
	}
}

export default App;
