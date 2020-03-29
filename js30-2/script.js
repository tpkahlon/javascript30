const setTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const hourDeg = calculateDegree(hour);
  const minuteDeg = calculateDegree(minute);
  const secondDeg = calculateDegree(second);
  const text = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  setHands(hourDeg, minuteDeg, secondDeg);
  setText(hourDeg, minuteDeg, secondDeg, hour, minute, second);
  setMessage(text);
};

const setHands = (hour, minute, second) => {
  const hourHand = document.querySelector('.hand--hour');
  const minuteHand = document.querySelector('.hand--minute');
  const secondHand = document.querySelector('.hand--second');
  hourHand.style.cssText = `transform: rotate(${hour}deg)`;
  minuteHand.style.cssText = `transform: rotate(${minute}deg)`;
  secondHand.style.cssText = `transform: rotate(${second}deg)`;
  if(second === 90) secondHand.style.cssText = `transition-property: none`;
};

const setText = (hourDeg, minuteDeg, secondDeg, hour, minute, second) => {
  const hourText = document.querySelector('.hour');
  const minuteText = document.querySelector('.minute');
  const secondText = document.querySelector('.second');
  hourText.textContent = hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  minuteText.textContent = minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  secondText.textContent = second.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  hourText.style.cssText = `transform: rotate(-${hourDeg}deg)`;
  minuteText.style.cssText = `transform: rotate(-${minuteDeg}deg)`;
  secondText.style.cssText = `transform: rotate(-${secondDeg}deg)`;
};

const setMessage = value => {
  const text = document.querySelector('.js-text');
  text.textContent = value;
};

const calculateDegree = value => ((value / 60) * 360) + 90;

setInterval(setTime, 1000);
