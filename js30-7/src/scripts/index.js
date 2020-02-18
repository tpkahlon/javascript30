import '../styles/index.scss';

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const action = (element, event, task) => element.addEventListener(event, task);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.strokeStyle = 'red';
context.lineJoin = 'round';
context.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = e => {
  if(!isDrawing) return;
  let posX = e.touches ? e.touches[0].clientX : e.offsetX;
  let posY = e.touches ? e.touches[0].clientY : e.offsetY;
  canvas.classList.add('grab');
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  context.lineWidth = hue;
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(posX, posY);
  context.stroke();
  context.globalCompositeOperation = 'hard-light';
  [lastX, lastY] = [posX, posY];
  changeHue();
  changeStroke();
};

const changeStroke = () => {
  if(context.lineWidth >= 10 || context.lineWidth <= 1) direction != direction;
  direction ? context.lineWidth++ : context.lineWidth--;
};

const changeHue = () => {
  hue++;
  if(hue >= 360) hue = 0;
};

const startDraw = e => draw(e);

const stopDraw = e => {
  isDrawing = false;
  canvas.classList.remove('grab');
};

const initDraw = e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
};

action(canvas, 'mousemove', startDraw);
action(canvas, 'mousedown', initDraw);
action(canvas, 'mouseup', stopDraw);
action(canvas, 'mouseout', stopDraw);

action(canvas, 'touchmove', startDraw);
action(canvas, 'touchstart', initDraw);
action(canvas, 'touchend', stopDraw);
action(canvas, 'touchcancel', stopDraw);

