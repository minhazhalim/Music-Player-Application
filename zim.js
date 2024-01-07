let currentSong = new Audio();
let songs;
let currentFolder;
function secondsToMinutesSeconds(seconds){
     if(isNaN(seconds) || seconds < 0) return '00:00';
     const minutes = Math.floor(seconds / 60);
     const remainingSeconds = Math.floor(seconds % 60);
     const formattedMinutes = String(minutes).padStart(2,'0');
     const formattedSeconds = String(remainingSeconds).padStart(2,'0');
     return `${formattedMinutes}:${formattedSeconds}`;
}
const playMusic = (track,pause = false) => {
     currentSong.src = `./${currentFolder}/` + track;
     if(!pause){
          currentSong.play();
          play.src = './image/pause.svg';
     }
     document.querySelector('.songInfo').innerHTML = decodeURI(track);
     document.querySelector('.songTime').innerHTML = '00:00 / 00:00';
}
async function getSongs(folder){
     currentFolder = folder;
     let path = await fetch(`./${folder}`);
     let response = await path.text();
     let div = document.createElement('div');
     div.innerHTML = response;
     let a = div.getElementsByTagName('a');
     songs = [];
     for(let index = 0;index < a.length;index++){
          const element = a[index];
          if(element.href.endsWith('.mp3')){
               songs.push(element.href.split(`/${folder}/`)[1]);
          }
     }
     let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
     songUL.innerHTML = "";
     for(const song of songs){
          songUL.innerHTML = songUL.innerHTML + `
          <li>
               <img src="./image/music.svg" alt="Music Icon" class='invert' width="34">
               <div class="info">
                    <div> ${song.replaceAll('%20',"")}</div>
                    <div>zim</div>
               </div>
               <div class="playNow">
                    <span>play now</span>
                    <img src="./image/play.svg" alt="Play Icon" class="invert">
               </div>
          </li>`;
     }
     Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(event => {
          event.addEventListener('click',element => {
               playMusic(event.querySelector('.info').firstElementChild.innerHTML.trim());
          });
     });
     return songs;
}
async function displayAlbums(){
     let path = await fetch(`./song/`);
     let response = await path.text();
     let div = document.createElement('div');
     div.innerHTML = response;
     let a = div.getElementsByTagName('a');
     let cardContainer = document.querySelector('.cardContainer');
     let array = Array.from(a);
     for(let index = 0;index < array.length;index++){
          const element = array[index];
          if(element.href.includes('./song') && !element.href.includes('.htaccess')){
               let folder = element.href.split('/').slice(-2)[0];
               let path = await fetch(`./song/${folder}/info.json`);
               let response = await path.json();
               cardContainer.innerHTML = cardContainer.innerHTML + `
                    <div data-folder="${folder}" class="card">
                         <div class="play">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round"/>
                              </svg>
                         </div>
                         <img src="./song/${folder}/cover.jpg" alt="Cover Icon">
                         <h2>${response.title}</h2>
                         <p>${response.description}</p>
                    </div>
               `;
          }
     }
     Array.from(document.getElementsByClassName('card')).forEach(event => {
          event.addEventListener('click',async item => {
               songs = await getSongs(`./song/${item.currentTarget.dataset.folder}`);
               playMusic(songs[0]);
          });
     });
}
async function main(){
     await getSongs('./song/ncs');
     playMusic(songs[0],true);
     await displayAlbums();
     play.addEventListener('click',() => {
          if(currentSong.paused){
               currentSong.play();
               play.src = './image/pause.svg';
          }else{
               currentSong.pause();
               play.src = './image/play.svg';
          }
     });
     currentSong.addEventListener('timeupdate',() => {
          document.querySelector('.songTime').innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
          document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) * 100 + '%';
     });
     document.querySelector('.seekBar').addEventListener('click',event => {
          let percent = (event.offsetX / event.target.getBoundingClientRect().width) * 100;
          document.querySelector('.circle').style.left = percent + '%';
          currentSong.currentTime = ((currentSong.duration) * percent) / 100;
     });
     document.querySelector('.hamburger').addEventListener('click',() => {
          document.querySelector('.left').style.left = '0px';
     });
     document.querySelector('.close').addEventListener('click',() => {
          document.querySelector('.left').style.left = '-120%';
     });
     previous.addEventListener('click',() => {
          currentSong.pause();
          let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0]);
          if((index - 1) >= 0){
               playMusic(songs[index - 1]);
          }
     });
     next.addEventListener('click',() => {
          currentSong.pause();
          let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0]);
          if((index + 1) < songs.length){
               playMusic(songs[index + 1]);
          }
     });
     document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change',(event) => {
          currentSong.volume = parseInt(event.target.value) / 100;
          if(currentSong.volume > 0){
               document.querySelector('.volume img').src = document.querySelector('.volume img').src.replace('mute.svg','volume.svg');
          }
     });
     document.querySelector('.volume img').addEventListener('click',event => {
          if(event.target.src.includes('volume.svg')){
               event.target.src = event.target.src.replace('volume.svg','mute.svg');
               currentSong.volume = 0;
               document.querySelector('.range').getElementsByTagName('input')[0].value = 0;
          }else{
               event.target.src = event.target.src.replace('mute.svg','volume.svg');
               currentSong.volume = 0.10;
               document.querySelector('.range').getElementsByTagName('input')[0].value = 10;
          }
     });
}
main();