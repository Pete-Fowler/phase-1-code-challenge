const bar = document.querySelector('#character-bar');

const displayCharacters = (data) => {
  data.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char.name;
    bar.append(span);
  });
}

const getCharacters = () => {
  fetch(`http://localhost:3000/characters`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    displayCharacters(data);
  });
}

const init = (() => {
  getCharacters();
})();