
// Array of cards
const cardsArray = [
	{id: 1, color: "#D50032", colorFlipped: "#000000"},
	{id: 2, color: "#D50032", colorFlipped: "#000000" },
	{id: 3, color: "#D50032", colorFlipped: "#000000" },
	{id: 4, color: "#D50032", colorFlipped: "#000000" },
	{id: 5, color: "#D50032", colorFlipped: "#000000" },
	{id: 6, color: "#D50032", colorFlipped: "#000000" },
	{id: 7, color: "#D50032", colorFlipped: "#000000" },
	{id: 8, color: "#D50032", colorFlipped: "#000000" },
	{id: 9, color: "#D50032", colorFlipped: "#000000" },
	{id: 10, color: "#D50032", colorFlipped: "#000000" },

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

const createFrontCard = (color) => {
  return `<div style="background-color:${color}" class="front"}></div>`;
};

const createBackCard = (colorFlipped) => {
  return `<div style="background-color:${colorFlipped}" class="back"}></div>`;
};


// loop through the array of cards and spits out createCard function with cardsArray
const generateCards = () => {
  duplicatedArray.forEach(item => {
		const card = createCard(item.id);
		const frontCard = createFrontCard(item.color);
		const backCard = createBackCard(item.colorFlipped);
		const cardContainer = container.appendChild(stringToHTML(card));
		cardContainer.appendChild(stringToHTML(frontCard))
		cardContainer.appendChild(stringToHTML(backCard))


  });
};

generateCards();


// Node list of memory cards
let clickCards = document.querySelectorAll('.card__item');

let hasFlippedCard = false;
let firstCard, secondCard;


function flipCard() {
	this.classList.add('flipped');


	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;
	 hasFlippedCard = false;



   checkForMatch();
 }

 function checkForMatch() {
	if (firstCard.dataset.cardId === secondCard.dataset.cardId) {
		disableCards();
		return;
	}

	unflipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
	setTimeout(() => {
		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');
	}, 1000);

	(function suffle(){
		clickCards.forEach(card => {



			let suffleCards = Math.floor(Math.random() * duplicatedArray.length);
			card.style.order = suffleCards;
			console.log(card);


		})

	 })
}

 clickCards.forEach(card => card.addEventListener('click', flipCard));




// clickCards.forEach(item => {
// 		item.addEventListener('click', () => {
// 			item.classList.toggle('flipped');
// 			let cardIdComapre = [];
// 			cardIdComapre.push[item.dataset.cardId];



// 			// if (cardIdComapre == item.dataset.cardId) {



// 			// };


// 			console.log('hej');
// 			console.log(item.dataset.cardId);


// 		})


// })






