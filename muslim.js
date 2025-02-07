// Check if the device is mobile or desktop based on screen width
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const videoBackground = document.getElementById('video-background');
const rotateMessage = document.getElementById('rotateMessage');
const backgroundVideo = document.getElementById('backgroundVideo');

// Detect if mobile user is in portrait or landscape mode
function handleOrientationChange() {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    
    if (isMobile && orientation === 'portrait') {
        // Show the "rotate your phone" message for portrait mode
        rotateMessage.style.display = 'block';
        backgroundVideo.src = 'rotate.mp4';  // Replace with your rotation prompt video
    } else {
        // Hide the message and reset video source when in landscape mode
        rotateMessage.style.display = 'none';
        backgroundVideo.src = 'background.mp4';  // Reset back to the main video
    }
}

// Detect tab focus and visibility
function handleVisibilityChange() {
    if (document.hidden) {
        // Pause video when the tab is not focused
        backgroundVideo.pause();
    } else {
        // Play video when the tab is focused
        backgroundVideo.play();
    }
}

// On load, check initial screen orientation
window.addEventListener('load', handleOrientationChange);

// Listen for orientation changes to handle portrait/landscape
window.addEventListener('resize', handleOrientationChange);

// Listen for tab focus/unfocus events
document.addEventListener('visibilitychange', handleVisibilityChange);

// Ensure video plays only if on desktop or mobile in landscape mode
if (isMobile && window.innerHeight <= window.innerWidth) {
    videoBackground.style.display = 'block';  // Show the background video for mobile landscape
} else if (!isMobile) {
    videoBackground.style.display = 'block';  // Show the background video for desktop
} else {
    // Hide the video for mobile in portrait mode
    videoBackground.style.display = 'none';
}
