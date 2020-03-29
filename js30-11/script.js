let word = [];
let key = "minh";

document.addEventListener("keyup", e => {
  word.push(e.key);
  word.splice(-word.length - 1, word.length - key.length);
  if ((word, word.join("").includes(key))) alert("boom");
});
