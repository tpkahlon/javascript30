const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");

const handleMove = e => {
  const y = e.pageY - e.target.offsetTop;
  const percent = y / e.currentTarget.offsetHeight;
  const min = 0.4,
    max = 4;
  const height = Math.round(percent * 100) + `%`;
  const rate = percent * (max - min) + min;
  bar.textContent = rate.toFixed(1) + `x`;
  bar.style.height = height;
  video.playbackRate = rate;
};

speed.addEventListener("mousemove", e => handleMove(e));
