const cardsArray = [
	{id: 1, color: "#ffb3ba" },
	{id: 2, color: "#ffffff" },
	{id: 3, color: "#000000" },
	{id: 4, color: "#452719" },
	{id: 5, color: "#967126" },


];

const container = document.querySelector('.container');
console.log(container);

const stringToHTML = str => {
  const div = document.createElement("div");
  div.innerHTML = str;
  return div.firstChild;
};


const createCard = (id, color) => {
  return `<div style="background-color:${color}" class="card__item" data-color=${id}></div>`;
};

const generateCards = () => {
	const duplicatedArray = cardsArray.concat(cardsArray);
  duplicatedArray.forEach(item => {
		const element = createCard(item.id, item.color);
		container.appendChild(stringToHTML(element));
  });
};


generateCards();
