const app = () => {
  const box = document.querySelector(".box");
  const text = document.querySelector(".box__text");
  const shadow = e => {
    const { offsetWidth: width, offsetHeight: height } = box;
    let { offsetX: x, offsetY: y } = e;
    const walk = 500;
    if (e.target !== e.currentTarget) {
      x += e.target.offsetLeft;
      y += e.target.offsetTop;
    }
    const xWalk = Math.round((x / width) * walk - walk / 2);
    const yWalk = Math.round((y / height) * walk - walk / 2);
    text.style.textShadow = `
      ${xWalk}px ${yWalk}px 2px rgba(235, 51, 35, .5),
      ${xWalk * -1}px ${yWalk}px 4px rgba(78, 112, 235, .5),
      ${yWalk}px ${xWalk * -1}px 6px rgba(84, 175, 87, .5)
    `;
  };
  box.addEventListener("mousemove", shadow);
};

app();
