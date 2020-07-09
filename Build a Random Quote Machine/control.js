//

//

const changeAllElement = document.querySelectorAll(".changeable-color");
const colorPool = ["#16a085", "#27ae60", "#342224", "#e74c3c", "#472e32"];
const text = document.getElementById("text");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("tweet-quote");

function changeQuote() {
	fetch(
		"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
		{
			method: "get",
		}
	)
		.then((res) => res.json())
		.then((result) => {
			const quoteList = result.quotes;
			const RandomIdx = Math.floor(Math.random() * quoteList.length);
			const color = colorPool[Math.floor(Math.random() * 4)];

			text.innerText = quoteList[RandomIdx]["quote"];
			author.innerText = quoteList[RandomIdx]["author"];
			document.body.style.backgroundColor = color;

			twitterBtn.setAttribute(
				"href",
				`https://www.twitter.com/intent/tweet?hashtags=quotes&related=freecamp${encodeURIComponent(
					'"' +
						quoteList[RandomIdx]["quote"] +
						'" ' +
						quoteList[RandomIdx]["author"]
				)}`
			);

			[...changeAllElement].forEach((item) => {
				item.style.color = color;
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

window.onload = changeQuote();
