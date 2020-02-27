const app = () => {
  const talks = document.querySelector("#talks");
  const inputPlaylist = document.querySelector("#input-playlist");
  const buttonPlaylist = document.querySelector("#button-playlist");
  const formPlaylist = document.querySelector("#form-playlist");
  const getVideos = async videoList => {
    try {
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD5JQeXs-wkxUINtZMgUwmQvvhZqv4zu0Q&id=${videoList}&part=contentDetails&maxResults=50`
      );
      let data = await response.json();
      return data;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };
  const handleVideos = arr => {
    const videoArr = arr.items.map(i => i.snippet.resourceId.videoId);
    const videoList = videoArr.toString();
    const talkList = arr.items;
    const totalTalks = arr.pageInfo;
    let timestamps;
    talks.innerHTML = `
      <p class="mb-3">There are a total of <strong>${totalTalks.totalResults}</strong> videos in this playlist.</p>
    `;
    getVideos(videoList).then(d => {
      const sum = d.items
        .map(i => moment.duration(i.contentDetails.duration).asSeconds())
        .reduce((total, seconds) => total + seconds);
      let secondsLeft = sum;
      let hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;
      let minutes = Math.floor(secondsLeft / 60);
      let seconds = secondsLeft % 60;
      talks.innerHTML += `
      <p class="m-0">The entire playlist is <strong>${hours} hour, ${minutes} minutes, ${seconds} seconds</strong> long, Enjoy.</p>
    `;
    });
  };
  const getPlaylist = async playlistId => {
    try {
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyD5JQeXs-wkxUINtZMgUwmQvvhZqv4zu0Q&playlistId=${playlistId}&part=snippet&maxResults=50`
      );
      let data = await response.json();
      return data;
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const data = Array.from(e.target.elements).filter(i => i.type === "text");
    const value = data[0].value;
    if (!value) return;
    else {
      getPlaylist(value)
        .then(data => handleVideos(data))
        .catch(error => console.log(error));
    }
  };
  window.onload = () => {
    talks.innerHTML = ``;
    getPlaylist(`PLSIUOFhnxEiDFFQeBYQSFxbxp5tOELV28`)
      .then(data => handleVideos(data))
      .catch(error => console.log(error));
  };
  formPlaylist.addEventListener("submit", handleSubmit);
};

app();
