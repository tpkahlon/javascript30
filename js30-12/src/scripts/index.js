import '../styles/index.scss';

// Source: https://davidwalsh.name/javascript-debounce-function
const debounce = (func, wait, immediate) => {
	let timeout;
	return () => {
    let context = this;
    let args = arguments;
		let later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const images = [...document.querySelectorAll('.img')];

const checkImage = e => {
  images.map(image => {
    const tip = (window.scrollY + window.innerHeight) - image.height / 2;
    const bottom = image.offsetTop + image.height;
    const half = tip > image.offsetTop;
    const under = window.scrollY < bottom;
    half && under ? image.classList.add('active') : image.classList.remove('active');
  });
};

window.addEventListener('scroll', debounce(checkImage, 100));