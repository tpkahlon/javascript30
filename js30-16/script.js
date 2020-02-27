const app = () => {
  const button = document.querySelector("#button");
  const people = document.querySelector("#people");
  const getName = arr => {
    return arr.map(i =>
      i.name && i.surname ? `${i.name}, ${i.surname}` : i.name
    );
  };
  const strip = name => name.replace(/^.*?,/, "").trim();
  const handleSort = arr => {
    return arr.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));
  };
  const handleButton = data => {
    if (!data) return;
    let nameList = getName(data);
    let sortedNameList = handleSort(nameList);
    handleSort(nameList);
    sortedNameList.forEach(i => {
      let firstName = i.split(",")[0].trim();
      let surName = i.includes(",") ? i.split(",")[1].trim() : "";
      if(!firstName || !surName) return;
      people.innerHTML += `<li class="list-group-item"><span class="first-name">${firstName}</span>${surName &&
        `<span class=\"sur-name\">${surName}</span>`}</li>`;
    });
  };
  const getPeople = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://uinames.com/api/?ext&amount=25&region=random&gender=random&source=uinames.com"
    )
      .then(response =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then(data => handleButton(data))
      .catch(err => console.warn("Something went wrong.", err));
  };
  button.addEventListener("click", e => {
    e.preventDefault();
    people.innerHTML = ``;
    getPeople();
  });
  window.onload = function () {
    setInterval(handleButton, 5000);
  };
};

app();
