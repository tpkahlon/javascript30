import '../styles/index.scss';

const api = `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`;
const cities = [];
const input = document.querySelector('input');
const list = document.querySelector('ul');

fetch(api)
.then(blob => blob.json())
.then(result => cities.push(...result));

const findMatches = (word, cities) => cities.filter(place => place.city.match(new RegExp(word, 'gi')) || place.state.match(new RegExp(word, 'gi')));

const getMatches = (e, cities) => {
  const results = findMatches(e.target.value, cities);
  const string = results.map(result => {
    const highlight = result.city.replace(new RegExp(e.target.value, 'gi'), `<span class="font-weight-bold rounded">${e.target.value}</span>`);
    return `<li class="list-group-item disabled"><p>${highlight}</p><p>${result.state}</p><p>Population: ${result.population}</p></li>`;
  }).join("");
  list.innerHTML = string;
}

input.addEventListener('keyup', e => getMatches(e, cities));
input.addEventListener('blur', e => list.textContent = '');


