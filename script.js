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
        name: 'i-believe',
        displayName: 'I Believe',
        artist: 'Jonathan Nelson',
    },
    {
        name: 'believe-for-it',
        displayName: 'Believe For It',
        artist: 'Cece Winans',
    },
    {
        name: 'hard-road',
        displayName: 'Hard Road To Travel',
        artist: 'Sebastian Braham'
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

// Update progress bar and time if isPlaying is true
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progress bar width
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;

            // Calculate and display the current time
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60);
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        }
    }
}


// Display duration of the audio file
function displayDuration() {
    const duration = music.duration;
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    durationElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

// Set progress bar based on click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    if (duration) {
        music.currentTime = (clickX / width) * duration;
    }
}

//Event Listeners
previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('loadedmetadata', displayDuration);
progressContainer.addEventListener('click', setProgress);

// Event listener for play/pause button
playBtn.addEventListener('click', togglePlayPause);

// Set initial duration if metadata is already loaded
if (music.readyState >= 1) {
    displayDuration();
}

// Initially set the paused class if the audio is not playing
if (music.paused) {
    progressContainer.classList.add('paused');
}

//On Load - Select First Song
loadSong(songs[songIndex]);