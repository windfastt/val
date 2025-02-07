// Check if the device is mobile based on the user agent
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const videoBackground = document.getElementById('video-background');
const rotateMessage = document.getElementById('rotateMessage');
const backgroundVideo = document.getElementById('backgroundVideo');
const videoSource = document.getElementById('videoSource');

// Detect if mobile user is in portrait or landscape mode
function handleOrientationChange() {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

    if (isMobile && orientation === 'portrait') {
        // Show the "rotate your phone" message for portrait mode
        rotateMessage.style.display = 'block';
        videoSource.src = 'rotate.mp4';  // Use your video for rotation prompt
    } else {
        // Hide the message and reset video source when in landscape mode
        rotateMessage.style.display = 'none';
        videoSource.src = 'background.mp4';  // Reset back to the main background video
    }
}

// Listen for window resize to detect orientation changes
window.addEventListener('resize', handleOrientationChange);

// Ensure the correct video is shown initially
window.addEventListener('load', handleOrientationChange);

// Detect tab focus and visibility
function handleVisibilityChange() {
    if (document.hidden) {
        backgroundVideo.pause();
    } else {
        backgroundVideo.play();
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);
