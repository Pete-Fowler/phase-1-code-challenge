
const getCharacters = () => {
  fetch(`http://localhost:3000/characters`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // displayChars(data);
  });
}

const init = (() => {
  getCharacters();
})();