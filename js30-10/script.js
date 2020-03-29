const player = document.querySelector(".player");
const video = player.querySelector(".player__video");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__bar");
const toggle = player.querySelector(".toggle");
const skipButtons = [...player.querySelectorAll("[data-skip]")];
const ranges = [...player.querySelectorAll(".player__range")];

const togglePlay = () => (video.paused ? video.play() : video.pause());
const updateButton = e =>
  (toggle.textContent = e.target.paused ? "Play" : "Pause");
const skip = e => (video.currentTime += parseFloat(e.target.dataset.skip));
const range = e => (video[e.target.name] = e.target.value);
const handleProgress = e => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};
const scrub = e => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

video.addEventListener("click", togglePlay);
video.addEventListener("play", e => updateButton(e));
video.addEventListener("pause", e => updateButton(e));
video.addEventListener("timeupdate", e => handleProgress(e));

ranges.map(button => button.addEventListener("change", e => range(e)));
ranges.map(button => button.addEventListener("mousemove", e => range(e)));
toggle.addEventListener("click", togglePlay);
skipButtons.map(button => button.addEventListener("click", e => skip(e)));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
