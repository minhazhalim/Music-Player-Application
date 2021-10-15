const audio = new Audio('./songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItem = Array.from(document.getElementsByClassName('songItem'));
let songIndex = 0;
let songs = [
     {songName: "Warriyo - Mortals [NCS Release]",filePath: "./songs/1.mp3",coverPath: "./covers/1.jpg"},
     {songName: "Cielo - Huma-Huma",filePath: "./songs/2.mp3",coverPath: "./covers/2.jpg"},
     {songName: "DEAF KEV - Invincible [NCS Release]-320k",filePath: "./songs/3.mp3",coverPath: "./covers/3.jpg"},
     {songName: "Different Heaven & EH!DE - My Heart [NCS Release]",filePath: "./songs/4.mp3",coverPath: "./covers/4.jpg"},
     {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",filePath: "./songs/5.mp3",coverPath: "./covers/5.jpg"},
     {songName: "Rabba - Salam-e-Ishq",filePath: "./songs/2.mp3",coverPath: "./covers/6.jpg"},
     {songName: "Sakhiyaan - Salam-e-Ishq",filePath: "./songs/2.mp3",coverPath: "./covers/7.jpg"},
     {songName: "Bhula Dena - Salam-e-Ishq",filePath: "./songs/2.mp3",coverPath: "./covers/8.jpg"},
     {songName: "Tumhari Kasam - Salam-e-Ishq",filePath: "./songs/2.mp3",coverPath: "./covers/9.jpg"},
     {songName: "Na Jaana - Salam-e-Ishq",filePath: "./songs/4.mp3",coverPath: "./covers/10.jpg"},
];
songItem.forEach((element,index) => {
     element.getElementsByTagName('img')[0].src = songs[index].coverPath;
     element.getElementsByClassName('songName')[0].innerText = songs[index].songName;
});
masterPlay.addEventListener('click',() => {
     if(audio.paused || audio.currentTime <= 0){
          audio.play();
          masterPlay.classList.remove('fa-play-circle');
          masterPlay.classList.add('fa-pause-circle');
          gif.style.opacity = 1;
     }else{
          audio.pause();
          masterPlay.classList.remove('fa-pause-circle');
          masterPlay.classList.add('fa-play-circle');
          gif.style.opacity = 0;
     }
});
audio.addEventListener('timeupdate',() => {
     const progressing = parseInt((audio.currentTime / audio.duration) * 100);
     myProgressBar.value = progressing;
});
myProgressBar.addEventListener('change',() => {
     audio.currentTime = myProgressBar.value * audio.duration / 100;
});
const makeAllPlays = () => {
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
          element.classList.remove('fa-pause-circle');
          element.classList.add('fa-play-circle');
     });
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
     element.addEventListener('click',(event) => {
          makeAllPlays();
          songIndex = parseInt(event.target.id);
          event.target.classList.remove('fa-play-circle');
          event.target.classList.add('fa-pause-circle');
          audio.src = `./songs/${songIndex + 1}.mp3`;
          masterSongName.innerText = songs[index].songName;
          audio.currentTime = 0;
          audio.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove('fa-play-circle');
          masterPlay.classList.add('fa-pause-circle');
     });
});
document.getElementById('next').addEventListener('click',() => {
     if(songIndex >= 9){
          songIndex = 0;
     }else{
          songIndex += 1;
     }
     audio.src = `./songs/${songIndex + 1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audio.currentTime = 0;
     audio.play();
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
});
document.getElementById('previous').addEventListener('click',() => {
     if(songIndex <= 0){
          songIndex = 0;
     }else{
          songIndex -= 1;
     }
     audio.src = `./songs/${songIndex + 1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audio.currentTime = 0;
     audio.play();
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
});