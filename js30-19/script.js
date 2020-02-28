const init = () => {
  let app = document.querySelector(".app");

  // Get a Random Number
  const getRandomNumber = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // Recursion
  const createBox = (n, el) => {
    // Base case
    if (n === 0) return;
    // Recursion case
    let currentBox = document.createElement("div");
    currentBox.dataset.index = n;
    currentBox.innerHTML = `<p>${n}</p>`;
    currentBox.classList.add(`box`);
    currentBox.classList.add(`shadow`);
    currentBox.style.background = `rgb(${getRandomNumber(255) -
      n},${getRandomNumber(255) - n},${getRandomNumber(255) - n})`;
    el.appendChild(currentBox);
    return createBox(n - 1, currentBox);
  };
  createBox(50, app);

  // Events

  // Filter items
  const firstBox = Array.from(document.querySelectorAll("div"))
    .filter(i => i.dataset.index)
    .filter(i => Number(i.dataset.index) === 1);
  const secondBox = Array.from(document.querySelectorAll("div"))
  .filter(i => i.dataset.index)
  .filter(i => Number(i.dataset.index) === 2);

  // Method
  const forOne = e => {
    alert(
      `${e.currentTarget.dataset.index || e.currentTarget.classList.value}`
    );
  };
  const forTwo = e => {
    alert(
      `${e.currentTarget.dataset.index || e.currentTarget.classList.value}`
    );
  };

  // Handlers
  firstBox[0].addEventListener(
    "click",
    e => {
      forOne(e);
    },
    { capture: true }
  );
  secondBox[0].addEventListener(
    "click",
    e => {
      forTwo(e);
    },
    { once: true }
  );
};

init();
