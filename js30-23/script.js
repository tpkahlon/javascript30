const app = document.querySelector("#app");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const dropdown = document.querySelector("#dropdown");
const textArea = document.querySelector("#textarea");
const options = document.querySelectorAll(`[type="range"], #textarea`);
let p = document.createElement("p");
if (navigator.userAgent.search("Chrome") !== -1) {
  let voices = [];
  let synth = window.speechSynthesis;
  let message = new SpeechSynthesisUtterance();
  message.text = textArea.value;
  const addVoices = e => {
    voices = synth.getVoices();
    dropdown.innerHTML =
      `<option value="" disabled selected>Select a Voice</option>` +
      voices
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(
          voice =>
            `<option value="${voice.name}">${
            voice.name
            }, (${voice.lang.toUpperCase()})</option>`
        )
        .join("");
  };
  const setVoice = e => {
    message.voice = voices.find(v => v.name === e.target.value);
    toggle();
  };
  const toggle = (startOver = true) => {
    synth.cancel();
    if (startOver) {
      synth.speak(message);
    }
  };
  const setOption = e => {
    const { name, value } = e.target;
    message[name] = value;
    toggle();
  };
  options.forEach(option =>
    option.addEventListener("change", e => setOption(e))
  );
  synth.addEventListener("voiceschanged", e => addVoices(e));
  dropdown.addEventListener("change", e => {
    setVoice(e);
  });
  startButton.addEventListener("click", () => toggle());
  stopButton.addEventListener("click", () => toggle(false));
} else {
  app.textContent = ``;
  p.textContent = `This feature is not supported in your browser. Please head to Google Chrome.`;
  app.appendChild(p);
}
