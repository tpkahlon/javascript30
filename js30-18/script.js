const app = () => {
  let button = document.getElementById("get-location");
  let text = document.getElementById("text");

  button.addEventListener("click", function () {
    const getLocation = () => {
      if (navigator.geolocation) {
        console.log('Here.')
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        text.innerHTML = `Geolocation is not supported by this browser.`;
      }
    }
    const showPosition = (position) => {
      text.innerHTML = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
    }
    getLocation();
  });
};

app();
