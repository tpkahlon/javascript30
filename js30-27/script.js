const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomHole = holes => {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  hole === lastHole ? randomHole(holes) : false;
  lastHole = hole;
  return hole;
};

const peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
};

const startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
};

const bonk = e => {
  if (!e.isTrusted) return;
  score++;
  e.target.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
};

moles.forEach(mole => mole.addEventListener("click", bonk));
