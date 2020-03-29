let api = "https://forbes400.herokuapp.com/api/forbes400?limit=100";

const loadJson = async url => {
  let response = await fetch(url);
  if (response.status == 200) {
    let json = await response.json();
    return json;
  }
  throw new Error(response.status);
};

loadJson(api)
  .then(result => app(result))
  .catch(alert);

const app = result => {
  const app = document.querySelector("#app");
  const e = document.createElement("div");
  e.classList.add("panels");
  app.appendChild(e);

  result.map((person, index) => makeDOM(person, index));

  const panels = document.querySelectorAll(".panel");
  panels.forEach(panel => panel.addEventListener("click", toggleOpen));
  function toggleOpen() {
    this.classList.toggle("open");
    this.classList.toggle("active");
  }
};

function makeDOM(person, index) {
  const panels = document.querySelector(".panels");
  const e = document.createElement("div");
  const h = document.createElement("header");
  const m = document.createElement("main");
  const f = document.createElement("footer");
  const hT1 = document.createElement("p");
  const hT2 = document.createElement("p");
  const mT = document.createElement("p");
  const fT1 = document.createElement("p");
  const fT2 = document.createElement("p");
  const hT1Text = document.createTextNode(
    `Rank: ${person.rank || "N/A"}, $${person.estWorthPrev ? Math.floor(person.estWorthPrev / 1000) + "B" : "N/A"}`
  );
  const hT2Text = document.createTextNode(
    `${person.industries[0] || "N/A"}${(person.source &&
      `, ${person.source}`) ||
    ""}`
  );
  const mTText = document.createTextNode(`${person.person.name || "N/A"}`);
  const fT1Text = document.createTextNode(
    `Born: ${person.countryOfCitizenship || "N/A"}`
  );
  const fT2Text = document.createTextNode(`Residence: ${person.city || "N/A"}`);
  hT1.appendChild(hT1Text);
  hT2.appendChild(hT2Text);
  mT.appendChild(mTText);
  fT1.appendChild(fT1Text);
  fT2.appendChild(fT2Text);
  e.classList.add("panel");
  e.classList.add(`panel-${index + 1}`);
  e.style.cssText = `background-image: url('https:${person.squareImage}')`;
  h.classList.add("header");
  hT1.classList.add("header__text");
  hT2.classList.add("header__text");
  m.classList.add("main");
  mT.classList.add("main__text");
  f.classList.add("footer");
  fT1.classList.add("footer__text");
  fT2.classList.add("footer__text");
  h.appendChild(hT1);
  h.appendChild(hT2);
  m.appendChild(mT);
  f.appendChild(fT1);
  f.appendChild(fT2);
  e.appendChild(h);
  e.appendChild(m);
  e.appendChild(f);
  panels.appendChild(e);
}
