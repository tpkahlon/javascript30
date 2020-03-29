let colors = [];

async function getData() {
  let response = await fetch("./data.json");
  let data = await response.json();
  return data;
}

getData()
  .then(data => {
    console.table(data);
    app(data);
    taskOne(data);
    taskTwo(data);
    taskThree(data);
    taskFour(data);
    taskFive(data);
    taskSix(data);
    taskSeven(data);
    taskEight(data);
    taskNine(data);
    taskTen(data);
    taskEleven(data);
    taskTwelve(data);
  })
  .catch(error => console.table(error));

const app = data =>
  data
    .sort((lastColor, nextColor) =>
      lastColor.colorId > nextColor.colorId ? 1 : -1
    )
    .map(item => makeAppBoxes(item));

const taskOne = data =>
  data
    .filter(color => color.name.includes("Purple"))
    .sort((lastColor, nextColor) =>
      lastColor.colorId > nextColor.colorId ? 1 : -1
    )
    .map(item => taskOneBoxes(item));

const taskTwo = data =>
  data
    .filter(color => color.name.includes("Purple"))
    .sort((lastColor, nextColor) =>
      lastColor.colorId > nextColor.colorId ? 1 : -1
    )
    .map(item => taskTwoBoxes(item));

const taskThree = data =>
  data
    .filter(color => color.name.includes("Blue"))
    .sort((lastColor, nextColor) => (lastColor.name > nextColor.name ? 1 : -1))
    .map(item => taskThreeBoxes(item));

const taskFour = data => {
  const sum = data.reduce((total, item) => {
    return total + item.colorId;
  }, 0);
  taskFourBoxes(sum);
};

const taskFive = data =>
  data
    .filter(color => color.name.includes("Grey"))
    .sort((lastColor, nextColor) => (lastColor.name > nextColor.name ? -1 : 1))
    .map(item => taskFiveBoxes(item));

const taskSix = data =>
  data
    .filter(color => color.name.includes("de"))
    .sort((lastColor, nextColor) => (lastColor.name > nextColor.name ? 1 : -1))
    .map(item => taskSixBoxes(item));

const taskSeven = data =>
  data
    .sort((lastColor, nextColor) => {
      const [aLast, aFirst] = lastColor.name.split(/(\d+)/).filter(Boolean);
      const [bLast, bFirst] = nextColor.name.split(/(\d+)/).filter(Boolean);
      return aFirst > bFirst || !aFirst ? 1 : -1;
    })
    .map(item => taskSevenBoxes(item));

const taskEight = data => {
  const sum = data.reduce((obj, item) => {
    if (!obj[item.name]) obj[item.name] = 0;
    obj[item.name]++;
    return obj;
  }, {});
  const resultStr = JSON.stringify(sum);
  const json = JSON.parse(resultStr);
  for (let prop in json) {
    taskEightBoxes(prop, json[prop]);
  }
};

const taskNine = data => {
  const bool = data.some(item => item.name.length > 10);
  taskNineBoxes(bool);
};

const taskTen = data => {
  const bool = data.every(item => item.name.length > 5);
  taskTenBoxes(bool);
};

const taskEleven = data => {
  const bool = data.find(item => item.hexString === "#ff8700");
  taskElevenBoxes(bool);
};

const taskTwelve = data => {
  const bool = data.findIndex(item => item.hexString === "#ff8700");
  taskTwelveBoxes(bool);
};

/*
Generate boxes for all tasks below
*/

const makeAppBoxes = item => {
  const rgbValue = Object.keys(item.rgb)
    .map(k => item.rgb[k])
    .join(",");
  const hslValue = Object.keys(item.hsl)
    .map(k => item.hsl[k])
    .join(",");
  const row = document.querySelector(".row");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const hexName = document.createElement("p");
  const rgbName = document.createElement("p");
  const hslName = document.createElement("p");
  const boxContent = document.createTextNode(`${item.colorId}: ${item.name}`);
  const colorContent = document.createTextNode(`HEX: ${item.hexString}`);
  const rgbContent = document.createTextNode(`RGB: rgb(${rgbValue})`);
  const hslContent = document.createTextNode(`HSL: hsl(${hslValue})`);
  boxName.appendChild(boxContent);
  hexName.appendChild(colorContent);
  rgbName.appendChild(rgbContent);
  hslName.appendChild(hslContent);
  box.appendChild(boxName);
  box.appendChild(hexName);
  box.appendChild(rgbName);
  box.appendChild(hslName);
  box.classList.add("box");
  hexName.classList.add("p");
  rgbName.classList.add("p");
  hslName.classList.add("p");
  box.style.cssText = `background-color: ${item.hexString}`;
  row.insertAdjacentElement("beforeend", box);
};

const taskOneBoxes = item => {
  const taskTwo = document.querySelector(".task-one");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`${item.colorId}: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskTwo.insertAdjacentElement("beforeend", box);
};

const taskTwoBoxes = item => {
  const taskTwo = document.querySelector(".task-two");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Color: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskTwo.insertAdjacentElement("beforeend", box);
};

const taskThreeBoxes = item => {
  const taskThree = document.querySelector(".task-three");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Color: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskThree.insertAdjacentElement("beforeend", box);
};

const taskFourBoxes = sum => {
  const taskFour = document.querySelector(".task-four");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Sum of all color ids: ${sum}`);
  boxName.appendChild(boxContent);
  taskFour.insertAdjacentElement("beforeend", boxName);
};

const taskFiveBoxes = item => {
  const taskFive = document.querySelector(".task-five");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Color: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskFive.insertAdjacentElement("beforeend", box);
};

const taskSixBoxes = item => {
  const taskSix = document.querySelector(".task-six");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Color: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskSix.insertAdjacentElement("beforeend", box);
};

const taskSevenBoxes = item => {
  const taskSeven = document.querySelector(".task-seven");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Color: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskSeven.insertAdjacentElement("beforeend", box);
};

const taskEightBoxes = (item, count) => {
  const taskEight = document.querySelector(".task-eight");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`${item}: ${count}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: #000`;
  taskEight.insertAdjacentElement("beforeend", box);
};

const taskNineBoxes = item => {
  const taskNine = document.querySelector(".task-nine");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Boolean: ${item}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: #000`;
  taskNine.insertAdjacentElement("beforeend", box);
};

const taskTenBoxes = item => {
  const taskTen = document.querySelector(".task-ten");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Boolean: ${item}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: #000`;
  taskTen.insertAdjacentElement("beforeend", box);
};

const taskElevenBoxes = item => {
  console.log(item);
  const taskEleven = document.querySelector(".task-eleven");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Color: ${item.name}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: ${item.hexString}`;
  taskEleven.insertAdjacentElement("beforeend", box);
};

const taskTwelveBoxes = item => {
  const taskTwelve = document.querySelector(".task-twelve");
  const box = document.createElement("div");
  const boxName = document.createElement("p");
  const boxContent = document.createTextNode(`Boolean: ${item}`);
  boxName.appendChild(boxContent);
  box.appendChild(boxName);
  box.classList.add("box");
  box.style.cssText = `background-color: #000`;
  taskTwelve.insertAdjacentElement("beforeend", box);
};
