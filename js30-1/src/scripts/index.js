import '../styles/index.scss';

const keys = document.querySelectorAll('.key');
const audios = document.querySelectorAll('audio');
const kbd = document.querySelector('.kbd');
const input = document.querySelector('.input');

window.addEventListener('keydown', e => {
  const audio = document.querySelector(`audio[data-key='${e.key}']`);
  const key = document.querySelector(`button[data-key='${e.key}']`);
  playAudio(audio, key);
});

keys.forEach(key => {
  key.addEventListener('click', e => {
    const currentKey = e.target.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key='${currentKey}']`);
    const targetKey = document.querySelector(`button[data-key='${currentKey}']`);
    playAudio(audio, targetKey);
  });
});

audios.forEach(audio => {
  audio.addEventListener('ended', e => {
    const targetKey = e.target.getAttribute('data-key');
    const matchedKey = document.querySelector(`button[data-key='${targetKey}']`);
    matchedKey.classList.remove('playing');
  });
});

kbd.addEventListener('click', () => {
  console.log('here');
  input.focus();
});

function playAudio(audio, key) {
  if(!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}
