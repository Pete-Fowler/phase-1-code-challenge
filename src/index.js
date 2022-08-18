const bar = document.querySelector('#character-bar');
const title = document.querySelector('#name');
const image = document.querySelector('#image');
const votes = document.querySelector('#vote-count');
const form = document.querySelector('#votes-form');
const input = document.querySelector('#votes');
const resetBtn = document.querySelector('#reset-btn');
let clicked;

const resetVotes = () => {
  clicked.votes = 0;
  votes.textContent = 0;
  input.value = '';
}

const addVotes = (e) => {
  e.preventDefault();
  clicked.votes += parseInt(input.value);
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

const getCharacters = () => {
  fetch(`http://localhost:3000/characters`)
  .then(res => res.json())
  .then(data => {
    displayCharacters(data);
  });
}

const listen = () => {
  form.addEventListener('submit', addVotes);
  resetBtn.addEventListener('click', resetVotes);
}

const init = (() => {
  getCharacters();
  listen();
})();