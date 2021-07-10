const image = document.querySelector('img');
const audio = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const previous = document.getElementById('previous');
const play = document.getElementById('play');
const next = document.getElementById('next');
let currentTime = document.getElementById('current_time');
let totalDuration = document.getElementById('duration');
let progressDiv = document.getElementById('progress_div');
let progress = document.getElementById('progress');
const musics = [
     {
          name: "zim-1",
          title: "Sinister Dark Ambient",
          artist: "CO.AG",
     },
     {
          name: "zim-2",
          title: "Futuristic Electronic",
          artist: "CO.AG",
     },
     {
          name: "zim-3",
          title: "Futuristic Sci-Fi",
          artist: "CO.AG",
     },
     {
          name: "zim-4",
          title: "From the Darkness",
          artist: "CO.AG",
     },
     {
          name: "zim-5",
          title: "Dark Ambient Background",
          artist: "CO.AG",
     },
];
let isPlaying = false;
const playMusic = () => {
     image.classList.add('anime');
     audio.play();
     isPlaying = true;
     play.classList.replace('fa-play','fa-pause');
};
const pauseMusic = () => {
     image.classList.remove('anime');
     audio.pause();
     isPlaying = false;
     play.classList.replace('fa-pause','fa-play');
};
play.addEventListener('click',() => {
     if(isPlaying){
          pauseMusic();
     }else{
          playMusic();
     }
});
const loadSong = (musics) => {
     title.textContent = musics.title;
     artist.textContent = musics.artist;
     audio.src = 'audios/' + musics.name + '.mp3';
     image.src = 'images/' + musics.name + '.jpg';
};
let songIndex = 0;
const previousSong = () => {
     songIndex = (songIndex - 1 + musics.length) % musics.length;
     loadSong(musics[songIndex]);
     playMusic();
};
const nextSong = () => {
     songIndex = (songIndex + 1) % musics.length;
     loadSong(musics[songIndex]);
     playMusic();
};
audio.addEventListener('timeupdate',(event) => {
     const {currentTime,duration} = event.srcElement;
     let progressTime = (currentTime / duration) * 100;
     progress.style.width = `${progressTime}%`;
     let minuteDuration = Math.floor(duration / 60);
     let secondDuration = Math.floor(duration % 60);
     let fullDuration = `${minuteDuration}:${secondDuration}`;
     if(duration){
          totalDuration.textContent = `${fullDuration}`;
     }
     let minuteCurrentTime = Math.floor(currentTime / 60);
     let secondCurrentTime = Math.floor(currentTime % 60);
     if(secondCurrentTime < 10){
          secondCurrentTime = `0${secondCurrentTime}`;
     }
     let fullCurrentTime = `${minuteCurrentTime}:${secondCurrentTime}`;
     currentTime.textContent = `${fullCurrentTime}`;
});
progressDiv.addEventListener('click',(event) => {
     const {duration} = audio;
     let moveProgress = (event.offsetX / event.srcElement.clientWidth) * duration;
     audio.currentTime = moveProgress;
});
audio.addEventListener('ended',nextSong);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);