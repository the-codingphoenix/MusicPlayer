const image = document.querySelector('.img-container img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const previousBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

let isPlaying = false;
//current song
let songIndex = 0;

// music
const songs = [
    {
        name: 'goodness',
        displayName: 'Goodness of God',
        artist: 'Jenn Johnson',
    },
    {
        name: 'see-what',
        displayName: 'See What The Lord Has Done',
        artist: 'Nathaniel Bassey',
    },
    {
        name: 'i-love-You',
        displayName: 'Lord, I Love You',
        artist: 'Adrian Cunningham',
    },
    {
        name: 'believe-for-it',
        displayName: 'Believe For It',
        artist: 'Cece Winans',
    }
];

//Update DOM: load sng details
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpeg`;
}

// function to play song
function playSong() {
    music.play();
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    isPlaying = true;
}

// function to pause song
function pauseSong() {
    music.pause();
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    isPlaying = false;
}

// Toggle play and pause
function togglePlayPause() {
    music.paused ? playSong() : pauseSong();
}

//previous song
function previousSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//On Load - Select First Song
loadSong(songs[songIndex]);

//Event Listeners
previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);

// Event listener for play/pause button
playBtn.addEventListener('click', togglePlayPause);

// update progress bar & time
