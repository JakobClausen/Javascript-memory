
// Array of cards
const cardsArray = [
	{id: 1, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2015/10/2015-16-NBA-Hoops-261-Kristaps-Porzingis1.jpg"},
	{id: 2, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2015/10/2015-16-NBA-Hoops-289-Karl-Anthony-Towns.jpg" },
	{id: 3, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2015/10/2015-16-NBA-Hoops-265-DAngelo-Russell1.jpg" },
	{id: 4, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "https://i.pinimg.com/originals/b6/e8/fa/b6e8fa4b973ef0c15a04ee6f7791937a.jpg" },
	{id: 5, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "https://www.blowoutcards.com/wp/wp-content/uploads/2018/11/2018-19-NBA-Hoops-trae-young.jpg" },
	{id: 6, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "https://www.blowoutcards.com/wp/wp-content/uploads/2016/08/2016-17-nba-hoops-2.jpg" },
	{id: 7, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2015/10/2015-16-NBA-Hoops-263-Trey-Lyles1.jpg" },
	{id: 8, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2015/10/2015-16-NBA-Hoops-262-Walter-Tavares.jpg" },
	{id: 9, imgFront: "https://kronozio.blob.core.windows.net/images/card/99e5d83db53e4114aa7fe47df1d98c6e_front.jpg", imgFlipped: "https://images-na.ssl-images-amazon.com/images/I/51wssgty1rL._SY445_.jpg" },

];

// Element selector
const container = document.querySelector('.container');
const duplicatedArray = cardsArray.concat(cardsArray);





// converts a string to html div
const stringToHTML = str => {
  const div = document.createElement("div");
  div.innerHTML = str;
  return div.firstChild;
};

// html string structure
const createCard = (id) => {
  return `<div class="card__item" data-card-Id=${id}></div>`;
};

const createFrontCard = (imgFront) => {
  return `<div class="front"><img src="${imgFront}"></div>`;
};

const createBackCard = (imgFlipped) => {
  return `<div class="back"><img src="${imgFlipped}"></div>`;
};












function startGame() {
	// Shuffles the cards
const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Generates the cards
const generateCards = () => {
	const shuffledArray = shuffle(duplicatedArray);

  shuffledArray.forEach(item => {
		const card = createCard(item.id);
		const frontCard = createFrontCard(item.imgFront);
		const backCard = createBackCard(item.imgFlipped);
		const cardContainer = container.appendChild(stringToHTML(card));
		cardContainer.appendChild(stringToHTML(frontCard))
		cardContainer.appendChild(stringToHTML(backCard))


  });
};
generateCards();

}


// create function variables
let clickCards = document.querySelectorAll('.card__item');
let cardFront = document.querySelectorAll('.front');
let cardBack = document.querySelectorAll('.back');
let counterDiv = document.querySelector('.points');
let matches = 0;
let counter = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let executed = false;
let timer;
let sec = 0;
let min = 0;
let hour = 0;




function flipCard() {
	if (lockBoard) return;
	 if (this === firstCard) return;
	 startTimer()

	this.classList.add('flipped');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;


		return;
	}
	secondCard = this;


		checkForMatch();

 }

 //Starts the timer
 function startTimer(matches) {
	 if (!executed) {
		executed = true;
		timer = setInterval(timerHandeler, 1000);

	 }else if (matches === cardsArray.length){
		 timer = clearInterval(timer);
	 }
 }

// creates the timer
function timerHandeler () {
	sec++;
	if (sec == 60) {
		sec = 0;
		min++
	}
	if (min == 60) {
		min = 0;
		hour++;
	}
	displayTime();

}

// creates the timer
function displayTime () {
	let emptySec;
	let emptyMin;
	let seconds = document.getElementById("seconds")
	let minutes = document.getElementById("minutes")

	if (sec < 10 ) {
		emptySec = "0"+sec
	}else {
		emptySec =sec
	}

	if (min < 10 ) {
		emptyMin = "0"+min
	}else {
		emptyMin = min;
	}


		seconds.innerHTML = emptySec;
		minutes.innerHTML = emptyMin;
	}

// checks for matches
 function checkForMatch() {
	if (firstCard.dataset.cardId === secondCard.dataset.cardId) {
		matches++;
		disableCards();
		pointsCounter()
		startTimer(matches)

		return;
	}

	unflipCards();
	pointsCounter()

}

// disables cards that were a match
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

// counter for total tries
function pointsCounter(){
	setTimeout(() => {
		let niceNumber;
		counter++;
		if (counter <= 9) {
			niceNumber = "0"+counter;

		}else {
			niceNumber = counter;
		}
	counterDiv.innerHTML = niceNumber;
	}, 1000);

}

// unflips card that were not a match
function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');

		resetBoard();
	}, 1000);
}

// creates a try
function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}


 clickCards.forEach(card => card.addEventListener('click', flipCard));









