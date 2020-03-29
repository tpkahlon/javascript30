const h1 = document.querySelector("h1");
h1.classList.add("test");

console.log(
  `Use Element -> Break on -> Attribute modifications to see DOM manipulation for selected element.`
);

console.log(`Sample log usage.`);

console.log(`%c I am styled.`, `color: red`);

console.warn(`Warning.`);

console.error(`Error.`);

console.info(`Info.`);

console.assert(1 === 2, `1 is not equal to 2.`);

console.dir(h1);

const people = [
  { name: "John", age: 25 },
  { name: "Bob", age: 24 }
];
people.map(person => {
  console.groupCollapsed(`${person.name}`);
  console.log(`${person.name} is ${person.age} years old.`);
  console.groupEnd(`${person.name}`);
});

console.count(`Star`);
console.count(`Universe`);
console.count(`Star`);
console.count(`Star`);
console.count(`Universe`);
console.count(`Universe`);
console.count(`Star`);

console.time("Start");
for (let i = 0; i <= 1000; i++) {
  console.timeLog("Between");
}
console.timeEnd("Stop");
