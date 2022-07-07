const songListDoc = document.querySelector('.song-list')
const playButton = document.querySelector('.control-icon.play-btn')
const pauseButton = document.querySelector('.control-icon.pause-btn')
const forwardButton = document.querySelector('.control-icon.next-btn')
const prevButton = document.querySelector('.control-icon.prev-btn')
const poster = document.querySelector('.poster img')
const songName = document.querySelector('.song-name-else')
const songAuthor = document.querySelector('.song-author-else')
const progressTimeDuration = document.querySelector('.duration')
const progressTimeCurrent = document.querySelector('.current')
const audio = document.querySelector('audio')
const progressCurrent = document.querySelector(".progress-current");
const progressDot = document.querySelector(".progress-dot");
const Songs = document.querySelector('.song') 
console.log(forwardButton)

let songIndex = 0;



function renderSongList() {
  songListDoc.innerHTML = ''
  for (let x of SONG_LIST) {
    songListDoc.innerHTML += ` 
        <div class="song" onclick="changeSong(${x.id})">
            <p class="song-index">${x.id}</p>
            <img class="song-poster" src="${x.poster}" alt="">
            <p class="song-name">${x.name}</p>
            <p class="song-author">${x.author}</p>
            <p class="song-duration">${x.duration}</p>
            <!-- <div class="some-icon">
                <i class="fa-solid fa-waveform-lines"></i>
            </div> -->
        </div>`
  }
}

renderSongList()

//play button 
playButton.addEventListener('click', () => {
  if (playButton.classList.contains('fa-play')) {
    playButton.classList.replace('fa-play', 'fa-pause')
    audio.play()
  } else {
    playButton.classList.replace('fa-pause', 'fa-play')
    audio.pause()
  }
})

function timeFormat(a) {
  a = Math.floor(a);
  let minute = String(Math.floor(a / 60));
  let second = String(a % 60);
  while (minute.length < 2) {
    minute = "0" + minute;
  }
  while (second.length < 2) {
    second = "0" + second;
  }
  return minute + ":" + second;
}

audio.onplay = () => {
  progressTimeDuration.innerHTML = timeFormat(audio.duration);
};

audio.ontimeupdate = () => {
  let offSet = (audio.currentTime / audio.duration) * 100;
  progressDot.value = offSet;
  // progressCurrent.style.width = `${offSet}%`;
  progressTimeCurrent.innerHTML = timeFormat(audio.currentTime);
};



function chooseSong() {
  audio.src = SONG_LIST[songIndex].src
  poster.src = SONG_LIST[songIndex].poster
  songAuthor.innerHTML = SONG_LIST[songIndex].author
  songName.innerHTML = SONG_LIST[songIndex].name
  progressTimeDuration.innerHTML = SONG_LIST[songIndex].duration
  progressDot.value = 0

  audio.currentTime = 0
  playButton.classList.replace('fa-pause', 'fa-play')
};


chooseSong()

forwardButton.addEventListener('click', () => {
  if (songIndex <= SONG_LIST.length){
  songIndex++;
  chooseSong();
  }
  else {
    songIndex = -1;
  }
})

prevButton.addEventListener('click', () => {
  if (songIndex >= 0){
  songIndex--;
  chooseSong();
  }
  else {
    songIndex = SONG_LIST.length
  }
})

function changeSong (id){
  for (song of SONG_LIST){
    if (song.id == id) {
      songIndex = Number(id) - 1;
      chooseSong();
    }
  }
}