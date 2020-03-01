const app = document.querySelector("#app");
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const takePhotoButton = document.querySelector("#takePhotoBtn");
const buttons = document.querySelectorAll("[data-key]");
const settings = document.querySelector("#settings");
const getCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(d => {
      video.srcObject = d;
      video.play();
    })
    .catch(err => {
      app.textContent = `Error happened: ${err}`;
      console.log(`Error happened: ${err}`);
    });
};
const paintToCanvas = key => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.height = height;
  canvas.width = width;
  return setInterval(() => {
    context.drawImage(video, 0, 0, width, height);
    let pixels = context.getImageData(0, 0, width, height);
    key === "normal"
      ? (pixels = context.getImageData(0, 0, width, height))
      : key === "red"
        ? (pixels = redEffect(context.getImageData(0, 0, width, height)))
        : key === "split"
          ? (pixels = rgbSplit(context.getImageData(0, 0, width, height)))
          : key === "green"
            ? (pixels = greenScreen(context.getImageData(0, 0, width, height)))
            : (pixels = context.getImageData(0, 0, width, height));
    context.putImageData(pixels, 0, 0);
  }, 16);
  // context.globalAlpha = 0.1;
};
const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL(`image/jpeg`);
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "picture");
  link.innerHTML = `<img src=${data} alt="Picture">`;
  strip.insertBefore(link, strip.firstChild);
};
const redEffect = pixel => {
  for (let i = 0; i < pixel.data.length; i += 4) {
    pixel.data[i + 0] = pixel.data[i + 0] + 100;
    pixel.data[i + 1] = pixel.data[i + 1] - 100;
    pixel.data[i + 2] = pixel.data[i + 2] - 100;
  }
  return pixel;
};
const rgbSplit = pixel => {
  for (let i = 0; i < pixel.data.length; i += 4) {
    pixel.data[i - 150] = pixel.data[i + 0];
    pixel.data[i + 100] = pixel.data[i + 1];
    pixel.data[i - 500] = pixel.data[i + 2];
  }
  return pixel;
};
const greenScreen = pixel => {
  const levels = {};
  document.querySelectorAll("input").forEach(i => {
    levels[i.name] = i.value;
  });
  for (let i = 0; i < pixel.data.length; i += 4) {
    red = pixel.data[i + 0];
    green = pixel.data[i + 1];
    blue = pixel.data[i + 2];
    alpha = pixel.data[i + 3];
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixel.data[i + 3] = 0;
    }
  }
  return pixel;
};
getCamera();
takePhotoButton.addEventListener("click", e => {
  e.preventDefault();
  takePhoto();
});
video.addEventListener("canplay", () => {
  paintToCanvas();
});
buttons.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.dataset.key === "green") {
      settings.classList.add("d-block");
      settings.classList.remove("d-none");
    } else {
      settings.classList.remove("d-block");
      settings.classList.add("d-none");
    }
    paintToCanvas(e.target.dataset.key);
  });
});
