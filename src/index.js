const bar = document.querySelector('#character-bar');
const title = document.querySelector('#name');
const image = document.querySelector('#image');
const votes = document.querySelector('#vote-count');

const displayDetail = (character) => {
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

const init = (() => {
  getCharacters();
})();