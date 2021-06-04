const wrapper = document.querySelector(".wrapper"),
musicImage = wrapper.querySelector(".image-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseButton = wrapper.querySelector(".play-pause"),
previousButton = wrapper.querySelector("#previous"),
nextButton = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicButton = wrapper.querySelector("#more-music"),
closeMoreMusic = musicList.querySelector("#close");
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
window.addEventListener("load",() => {
  loadMusic(musicIndex);
  playingSong(); 
});
function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImage.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `musics/${allMusic[indexNumb - 1].src}.mp3`;
}
function playMusic(){
  wrapper.classList.add("paused");
  playPauseButton.querySelector("i").innerText = "pause";
  mainAudio.play();
}
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseButton.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}
function prevMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}
function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}
playPauseButton.addEventListener("click",() => {
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});
previousButton.addEventListener("click",() => {
  prevMusic();
});
nextButton.addEventListener("click",() => {
  nextMusic();
});
mainAudio.addEventListener("timeupdate",(event) => {
  const currentTime = event.target.currentTime;
  const duration = event.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuration = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata",() => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
progressArea.addEventListener("click",(event) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = event.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
  playingSong();
});
const repeatButton = wrapper.querySelector("#repeat-plist");
repeatButton.addEventListener("click",() => {
  let getText = repeatButton.innerText;
  switch(getText){
    case "repeat":
      repeatButton.innerText = "repeat_one";
      repeatButton.setAttribute("title","Song looped");
      break;
    case "repeat_one":
      repeatButton.innerText = "shuffle";
      repeatButton.setAttribute("title","Playback shuffled");
      break;
    case "shuffle":
      repeatButton.innerText = "repeat";
      repeatButton.setAttribute("title","Playlist looped");
      break;
  }
});
mainAudio.addEventListener("ended",() => {
  let getText = repeatButton.innerText;
  switch(getText){
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});
moreMusicButton.addEventListener("click",() => {
  musicList.classList.toggle("show");
});
closeMoreMusic.addEventListener("click",() => {
  moreMusicButton.click();
});
const ulTag = wrapper.querySelector("ul");
for(let i = 0;i < allMusic.length;i++){
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend",liTag);

  let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata",()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){
      totalSec = `0${totalSec}`;
    };
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDurationTag.setAttribute("t-duration",`${totalMin}:${totalSec}`);
  });
}
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  for(let j = 0;j < allLiTag.length;j++){
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick","clicked(this)");
  }
}
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
