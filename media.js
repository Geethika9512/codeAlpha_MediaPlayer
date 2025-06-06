 const songs = [
  {
    name: "[iSongs.info] 01 - Aamani.mp3",
    title: "Aamani",
    artist: "Geetanjali",
    cover: "cover1.png"
  },
  {
    name: "[iSongs.info] 10 - Malli Malli.mp3",
    title: "Malli Malli",
    artist: "Rakshasudu",
    cover: "cover2.jpg"
  },
  {
    name: "Chinni-Chinni-Asha.mp3",
    title: "Chinni-Chinni-Asha",
    artist: "Roja",
    cover: "cover3.jpg"
  }
];

let currentSong = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const cover = document.getElementById('cover');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
  cover.src = `covers/${song.cover}`;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
  updatePlaylist();
});

nextBtn.addEventListener('click', () => {
  nextSong();
});

function nextSong() {
  if (isShuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(songs[currentSong]);
  playSong();
  updatePlaylist();
}

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  alert(`Shuffle: ${isShuffle ? 'ON' : 'OFF'}`);
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  alert(`Repeat: ${isRepeat ? 'ON' : 'OFF'}`);
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

audio.addEventListener('ended', () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updatePlaylist() {
  playlist.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === currentSong) li.classList.add('active');
    li.addEventListener('click', () => {
      currentSong = index;
      loadSong(songs[currentSong]);
      playSong();
      updatePlaylist();
    });
    playlist.appendChild(li);
  });
}

// Init
loadSong(songs[currentSong]);
updatePlaylist();
volume.value = 0.5;
audio.volume = 0.5;
