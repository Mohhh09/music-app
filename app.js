// get elements from the DOM
const audio = document.querySelector('audio');
const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');
const currentTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const pausePlayBtn = document.querySelector('.pauseplay-track');
const controlIcon = document.getElementById('controlicon');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');
const trackArt = document.querySelector('.track-art img');
const nowPlaying = document.querySelector('.nowplaying');

// initialize audio duration and current time
audio.onloadedmetadata = () => {
  totalDuration.textContent = currentTime.textContent = formatTime(audio.duration);
};

// update seek slider and current time as audio plays
audio.ontimeupdate = () => {
  seekSlider.value = audio.currentTime / audio.duration * 100;
  currentTime.textContent = formatTime(audio.currentTime);
};

// play/pause audio when clicking the play/pause button
pausePlayBtn.onclick = () => {
  const playing = audio.paused;
  audio[playing ? 'play' : 'pause']();
  controlIcon.classList.toggle('fa-play', playing);
  controlIcon.classList.toggle('fa-pause', !playing);
};

// change volume when moving the volume slider
volumeSlider.oninput = () => audio.volume = volumeSlider.value / 100;

// seek to a new time when moving the seek slider
seekSlider.oninput = () => audio.currentTime = audio.duration * seekSlider.value / 100;

// update the track details when a new track starts playing
audio.onplay = () => {
  trackName.textContent = audio.src.split('/').pop().split('.')[0];
  nowPlaying.textContent = `Playing ${audio.src.split('/').pop()} (${formatTime(audio.duration)})`;
  trackArt.src = './img/Cover.jpg';
  trackArtist.textContent = 'Unknown Artist';
};

// utility function to format time in MM:SS format
function formatTime(time) {
  return `${Math.floor(time / 60)}:${(Math.floor(time % 60) < 10) ? '0' : ''}${Math.floor(time % 60)}`;
}



