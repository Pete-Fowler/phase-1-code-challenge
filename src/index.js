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

const patch = (body) => {
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
  fetch(`http://localhost:3000/characters/${clicked.id}`, config)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => alert(err.message));
}

const resetVotes = () => {
  clicked.votes = 0;
  votes.textContent = 0;
  votesInput.value = '';
  patch({'votes': 0});
}

const addVotes = (e) => {
  e.preventDefault();
  clicked.votes += parseInt(votesInput.value);
  votes.textContent = clicked.votes;
  patch({'votes': clicked.votes});
}

const displayDetail = (character) => {
  clicked = character;
  votes.value = '';
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
  
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(character),
  }
  fetch(`http://localhost:3000/characters`, config)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    character.id = data.id;
    displayDetail(character);
    displayOne(character);
  })
  .catch(err => alert(err.message));
}

const getCharacters = () => {
  fetch(`http://localhost:3000/characters`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayCharacters(data);
  })
  .catch(err => alert(err.message));
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