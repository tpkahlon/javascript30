const app = () => {
  const stampsList = document.querySelector(".stamps");
  const addStamps = document.querySelector(".add-stamps");
  const stamps = JSON.parse(localStorage.getItem("stamps")) || [];
  const addStamp = e => {
    e.preventDefault();
    const text = e.currentTarget.querySelector("[name=item").value;
    const item = {
      done: false,
      text
    };
    stamps.push(item);
    populateList(stamps, stampsList);
    localStorage.setItem("stamps", JSON.stringify(stamps));
    e.currentTarget.reset();
  };
  const populateList = (stamps = [], stampsList) => {
    stampsList.innerHTML = stamps
      .map(
        (stamp, i) => `
        <li href="#" class="list-group-item">
        <div class="form-check">
          <input class="form-check-input stretched-link" type="checkbox" id="item${i}" data-index=${i} ${
          stamp.done ? "checked" : ""
          }>
          <label class="form-check-label text-capitalize" for="item${i}">
          ${stamp.text}
          </label>
        </div>
        </li>
      `
      )
      .join("");
  };
  const toggleDone = e => {
    if (!e.target.matches("input")) return;
    const el = e.target;
    const index = el.dataset.index;
    stamps[index].done = !stamps[index].done;
    localStorage.setItem("stamps", JSON.stringify(stamps));
    populateList(stamps, stampsList);
  };
  addStamps.addEventListener("submit", addStamp);
  stampsList.addEventListener("click", toggleDone);
  populateList(stamps, stampsList);
};

app();
