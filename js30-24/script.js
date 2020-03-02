const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;

const fixNav = e => {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    document.body.classList.add("fixed-to-top");
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove("fixed-to-top");
  }
};

window.addEventListener("scroll", e => {
  fixNav(e);
});
