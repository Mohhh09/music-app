// get elements from the DOM
// const audio = document.querySelector('audio');
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
const audio = document.getElementById('song');
const sources = Array.from(audio.querySelectorAll('source')).map(source => source.src);
const songs = audio.getElementsByTagName('source');

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

// Keep track of the current song index
let currentSongIndex = 0;

// Function to skip to the next song
function nextTrack() {
  // Increment the current song index
  currentSongIndex++;
  
  // If the current song index is greater than or equal to the number of songs, wrap around to the beginning
  if (currentSongIndex >= sources.length) {
    currentSongIndex = 0;
  }
  
  // Set the new source URL and play the audio
  audio.src = sources[currentSongIndex];
  audio.play();
  
  // Update the track name and artist in the UI
  const trackNameElement = document.querySelector('.track-name');
  const trackArtistElement = document.querySelector('.track-artist');
  const currentSource = sources[currentSongIndex];
  const trackName = currentSource.substring(currentSource.lastIndexOf('/') + 1, currentSource.lastIndexOf('.mp3')).trim();
  const trackArtist = 'Kendrick Lamar'; 
  trackNameElement.textContent = trackName;
  trackArtistElement.textContent = trackArtist;
}

// Call the nextTrack function when the "Next" button is clicked
const nextButton = document.querySelector('.next-track');
nextButton.addEventListener('click', nextTrack);

function playSong(index) {
    audio.pause();
    audio.currentTime = 0;
    audio.src = songs[index].src;
    audio.load();
    audio.play();
    currentSongIndex = index;
  }
  
  function nextSong() {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  }
  
  function prevSong() {
    const prevIndex = (currentSongIndex + songs.length - 1) % songs.length;
    playSong(prevIndex);
  }
  
  document.querySelector('.prev-track').addEventListener('click', prevSong);
  document.querySelector('.next-track').addEventListener('click', nextSong);


