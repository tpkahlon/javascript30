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
        <div class="d-flex justify-content-between align-content-center align-items-center">
          <div class="d-flex align-content-center align-items-center">
          <input class="mr-2" type="checkbox" id="item${i}" data-index=${i} ${
          stamp.done ? "checked" : ""
          }>
          <label class="form-check-label text-capitalize" for="item${i}">
          ${stamp.text}
          </label>
          </div>
          <button class="btn btn-danger btn-sm"  data-index=${i}><i class="fa fa-trash" aria-hidden="true"></i></button>
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
  const removeButton = e => {
    if (!e.target.matches("button")) return;
    const el = e.target;
    const index = el.dataset.index;
    stamps.splice(index, 1);
    localStorage.setItem("stamps", JSON.stringify(stamps));
    populateList(stamps, stampsList);
  };
  addStamps.addEventListener("submit", addStamp);
  stampsList.addEventListener("click", toggleDone);
  stampsList.addEventListener("click", removeButton);
  populateList(stamps, stampsList);
};

app();
