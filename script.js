const musicContainer = document.getElementById('music-container');
const progressContainer = document.getElementById('progress-container');
const playButton = document.getElementById('play');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const songs = ['hey','summer','ukulele'];
let songIndex = 2;
function loadSong(song){
     title.innerText = song;
     audio.src = `./musics/${song}.mp3`;
     cover.src = `./images/${song}.jpg`;
}
loadSong(songs[songIndex]);
function playSong(){
     musicContainer.classList.add('play');
     playButton.querySelector('.fas').classList.remove('fa-play');
     playButton.querySelector('.fas').classList.add('fa-pause');
     audio.play();
}
function pauseSong(){
     musicContainer.classList.remove('play');
     playButton.querySelector('.fas').classList.add('fa-play');
     playButton.querySelector('.fas').classList.remove('fa-pause');
     audio.pause();
}
function previousSong(){
     songIndex--;
     if(songIndex<0){
          songIndex = songs.length - 1;
     }
     loadSong(songs[songIndex]);
     playSong();
}
function nextSong(){
     songIndex++;
     if(songIndex>songs.length - 1){
          songIndex = 0;
     }
     loadSong(songs[songIndex]);
     playSong();
}
function updateProgress(event){
     const {duration,currentTime} = event.srcElement;
     const progressPercent = (currentTime / duration) * 100;
     progress.style.width = `${progressPercent}%`;
}
function setProgress(event){
     const width = this.clientWidth;
     const clickX = event.offsetX;
     const duration = audio.duration;
     audio.currentTime = (clickX / width) * duration;
}
playButton.addEventListener('click',() => {
     const isPlaying = musicContainer.classList.contains('play');
     if(isPlaying){
          pauseSong();
     }else{
          playSong();
     }
});
previousButton.addEventListener('click',previousSong);
nextButton.addEventListener('click',nextSong);
audio.addEventListener('timeupdate',updateProgress);
audio.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgress);