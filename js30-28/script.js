const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

const handleEnter = e => {
  e.target.classList.add("trigger-enter");
  setTimeout(() => {
    if (e.target.classList.contains("trigger-enter")) {
      e.target.classList.add("trigger-enter-active");
    }
  }, 100);
  background.classList.add("open");

  const dropdown = e.target.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  background.style.setProperty("width", `${coords.width}px`);
  background.style.setProperty("height", `${coords.height}px`);
  background.style.setProperty("top", `${coords.top}px`);
  background.style.setProperty("left", `${coords.left}px`);
};

const handleLeave = e => {
  e.target.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
};

triggers.forEach(trigger => {
  trigger.addEventListener("mouseenter", handleEnter);
  trigger.addEventListener("mouseleave", handleLeave);
});
