const app = document.querySelector("#app");
const words = document.querySelector(".words");
let p = document.createElement("p");
words.appendChild(p);
if (navigator.userAgent.search("Chrome") !== -1) {
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = true;
  recognition.addEventListener("result", e => {
    console.log(`E:`, e, `E:R:`, e.results[0], `E:F:`, e.results[0].isFinal);
    const transcript = Array.from(e.results)
      .map(i => i[0])
      .map(j => j.transcript)
      .join("");
    p.textContent = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement("p");
      words.appendChild(p);
    }
  });
  recognition.addEventListener("end", recognition.start);
  // recognition.addEventListener("end speechend soundend audioend", recognition.start);
  recognition.start();
} else {
  p.textContent = `This feature is not supported in your browser. Pleas head to Google Chrome.`;
}
