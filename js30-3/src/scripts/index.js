import '../styles/index.scss';

const inputs = document.querySelectorAll('input');

function handleInput(e) {
  console.log(e.target.id);
  const measurement = e.target.dataset.unit || '';
  document.documentElement.style.setProperty(`--${e.target.id}`, `${e.target.value}${measurement}`);
}

inputs.forEach(input => {
  input.addEventListener('change', e => handleInput(e));
});

