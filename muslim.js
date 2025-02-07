// Check if the device is mobile based on the user agent
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const rotateMessage = document.getElementById('rotateMessage');
const backgroundVideo = document.getElementById('background-video');
const videoSource = document.getElementById('videoSource');

// Function to check the aspect ratio
function checkAspectRatio() {
    if (isMobile) {
        const isPortrait = window.innerHeight > window.innerWidth;
        if (isPortrait) {
            // Show the "rotate your phone" message for portrait mode
            rotateMessage.style.display = 'block';
            videoSource.src = '';  // Hide video in portrait mode
        } else {
            // Hide the message and show the video in landscape mode
            rotateMessage.style.display = 'none';
            videoSource.src = 'https://github.com/windfastt/val/raw/refs/heads/main/background.mp4';
        }
    } else {
        // If it's not mobile, keep the video visible regardless of orientation
        rotateMessage.style.display = 'none';
        videoSource.src = 'https://github.com/windfastt/val/raw/refs/heads/main/background.mp4';
    }
}

// Check every 100ms
setInterval(checkAspectRatio, 100);

// Ensure the correct video is shown initially
window.addEventListener('load', checkAspectRatio);

// Detect tab focus and visibility to pause/resume video
function handleVisibilityChange() {
    if (document.hidden) {
        backgroundVideo.pause();
    } else {
        backgroundVideo.play();
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);
