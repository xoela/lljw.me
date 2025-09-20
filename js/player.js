document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.player__controls__play');
    const audio = document.getElementById('audio-player');
    const progressBar = document.querySelector('.player__progress-input');
    const progressFill = document.querySelector('.player__progress-fill');
    const currentTimeDisplay = document.querySelector('.player__time--current');
    const durationDisplay = document.querySelector('.player__time--duration');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    console.log('Play button found:', playButton);
    console.log('Audio element found:', audio);
    console.log('Progress bar found:', progressBar);
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updatePlayPauseIcon() {
        if (audio.paused) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    }
    
    function updateProgress() {
        const currentTime = audio.currentTime;
        const duration = audio.duration || 0;
        const progressPercent = duration ? (currentTime / duration) * 100 : 0;
        
        progressFill.style.width = `${progressPercent}%`;
        progressBar.value = progressPercent;
        currentTimeDisplay.textContent = formatTime(currentTime);
        
        if (duration) {
            durationDisplay.textContent = formatTime(duration);
        }
    }

    if (audio) {
        audio.addEventListener('loadedmetadata', function() {
            durationDisplay.textContent = formatTime(audio.duration);
        });
        
        audio.addEventListener('timeupdate', updateProgress);
        
        audio.addEventListener('play', updatePlayPauseIcon);
        audio.addEventListener('pause', updatePlayPauseIcon);
        
        audio.addEventListener('ended', function() {
            progressFill.style.width = '0%';
            progressBar.value = 0;
            currentTimeDisplay.textContent = '0:00';
            updatePlayPauseIcon();
        });
    }
    
    if (progressBar && audio) {
        progressBar.addEventListener('input', function() {
            const duration = audio.duration || 0;
            const newTime = (progressBar.value / 100) * duration;
            audio.currentTime = newTime;
        });
    }
    
    if (playButton && audio) {
        playButton.addEventListener('click', function() {
            console.log('Play button clicked');
            if (audio.paused) {
                audio.play().then(() => {
                    console.log('Audio started playing');
                }).catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audio.pause();
                console.log('Audio paused');
            }
        });
    } else {
        console.error('Could not find play button or audio element');
    }
});
