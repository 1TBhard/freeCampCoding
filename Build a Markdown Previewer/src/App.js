import React from "react";
import "./style.css";

const marked = require("marked");

const firstMarkDownText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

class Editor extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>MarkDown</h2>
				<textarea
					id="editor"
					value={this.props.value}
					onChange={this.props.handleChange}
				></textarea>
			</div>
		);
	}
}

class Preview extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { text } = this.props;
		const markDownText = { __html: marked(text, { breaks: true }) };
		return (
			<div>
				<h2>Result</h2>
				<div id="preview" dangerouslySetInnerHTML={markDownText}></div>
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			input: firstMarkDownText,
		};

		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		this.setState({
			input: e.target.value,
		});
	}

	render() {
		return (
			<div id="app">
				<div className="description">
					<h1>MarkDown Editor</h1>
					<p>
						by&nbsp;
						<a href="https://codepen.io/1tbhard" target="_blank">
							1TBhard
						</a>
					</p>
				</div>

				<main>
					<Editor value={this.state.input} handleChange={this.handleInput} />
					<Preview text={this.state.input} />
				</main>
			</div>
		);
	}
}

export default App;
