// Regular expression to check for mobile, Android, iPad (without mobile), and tablet
const isMobileDevice = /(Mobile|Android|iPad(?!.*Mobile)|Tablet)/.test(navigator.userAgent);

// Get video and message elements
const videoBackground = document.getElementById('background-video');
const rotateMessage = document.getElementById('rotateMessage');

// Function to check orientation and display message
function handleOrientationChange() {
    const isPortrait = window.innerHeight > window.innerWidth;
    
    // Show or hide video based on user agent and orientation
    if (isMobileDevice && isPortrait) {
        rotateMessage.style.display = 'block'; // Show message to rotate
        videoBackground.style.display = 'none'; // Hide background video
    } else {
        rotateMessage.style.display = 'none'; // Hide message
        videoBackground.style.display = 'block'; // Show background video
    }
}

// Listen for window resize to detect orientation changes
window.addEventListener('resize', handleOrientationChange);

// Ensure the correct behavior is applied initially
window.addEventListener('load', handleOrientationChange);

// Detect tab visibility changes
function handleVisibilityChange() {
    if (document.hidden) {
        videoBackground.pause();
    } else {
        videoBackground.play();
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);
