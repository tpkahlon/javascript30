const app = () => {
  let form = document.getElementById("location");
  let map;
  let randomLat;
  let randomLong;
  let popup;

  const getMap = (lat, lon) => {
    document.getElementById("map").innerHTML =
      "< div id='map' style='width: 100%; height: 100%;'>";
    map = L.map("map").setView([lat, lon], 13);
    popup = L.popup();

    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
      maxZoom: 5,
    }).addTo(map);

    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`Latitude: ${lat}<br>Longitude: ${lon}`)
      .openPopup();

    const onMapClick = e => {
      popup
        .setLatLng(e.latlng)
        .setContent(`Latitude: ${e.latlng.lat}<br>Longitude: ${e.latlng.lng}`)
        .openOn(map);
    };

    map.on("click", onMapClick);
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const els = Array.from(e.target.elements)
      .filter(i => i.type === "text")
      .map(i => i.value)
      .map(parseFloat);
    console.log(els[0], els[1]);
    if (!els.some(isNaN)) {
      if (map != undefined) {
        map.remove();
      }
      getMap(els[0], els[1]);
    } else {
      alert(`Please enter proper latitude and longitude values.`);
    }
  });

  const getRandomInRange = (from, to, fixed) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  };

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  window.addEventListener("load", e => {
    randomLat = getRandomInRange(
      getRandomArbitrary(0, -180),
      getRandomArbitrary(0, 180),
      3
    );
    randomLong = getRandomInRange(
      getRandomArbitrary(0, -180),
      getRandomArbitrary(0, 180),
      3
    );
    getMap(randomLat, randomLong);
  });
};

app();
