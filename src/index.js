// Nav and detail elements
const bar = document.querySelector('#character-bar');
const title = document.querySelector('#name');
const image = document.querySelector('#image');
const votes = document.querySelector('#vote-count');

// Voting elements
const votesForm = document.querySelector('#votes-form');
const votesInput = document.querySelector('#votes');
const resetBtn = document.querySelector('#reset-btn');
const characterForm = document.querySelector('#character-form');

// New character form elements
const newName = document.querySelector('form#character-form input#name');
const newImage = document.querySelector('#image-url');
let clicked;

const resetVotes = () => {
  clicked.votes = 0;
  votes.textContent = 0;
  votesInput.value = '';
}

const addVotes = (e) => {
  e.preventDefault();
  clicked.votes += parseInt(votesInput.value);
  votes.textContent = clicked.votes;
}

const displayDetail = (character) => {
  clicked = character;
  title.textContent = character.name;
  image.src = character.image;
  votes.textContent = character.votes;
}

const displayCharacters = (data) => {
  data.forEach((character) => {
    const span = document.createElement('span');
    span.textContent = character.name;
    span.addEventListener('click', () => displayDetail(character));
    bar.append(span);
  });
}

const displayOne = (character) => {
  const span = document.createElement('span');
  span.textContent = character.name;
  span.addEventListener('click', () => displayDetail(character));
  bar.append(span);
}

const newChar = (e) => {
  e.preventDefault();
  const character = {
    name: newName.value,
    image: newImage.value,
    votes: 0,
  }
  displayDetail(character);
  displayOne(character);
}

const getCharacters = () => {
  fetch(`http://localhost:3000/characters`)
  .then(res => res.json())
  .then(data => {
    displayCharacters(data);
  });
}

const listen = () => {
  votesForm.addEventListener('submit', addVotes);
  resetBtn.addEventListener('click', resetVotes);
  characterForm.addEventListener('submit', newChar);
}

const init = (() => {
  getCharacters();
  listen();
})();