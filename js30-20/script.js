const init = () => {
  let triggers = document.querySelectorAll("a");
  let highlight = document.createElement("span");
  highlight.classList.add("highlight");
  document.body.appendChild(highlight);
  const makeHighlight = e => {
    let link = e.target.getBoundingClientRect();
    highlight.style.width = `${link.width}px`;
    highlight.style.height = `${link.height}px`;
    highlight.style.transform = `translate(${link.left +
      window.scrollX -
      5}px, ${link.top + window.scrollY - 5}px)`;
  };
  triggers.forEach(i => {
    i.addEventListener("mouseover", e => makeHighlight(e));
  });
};

init();
