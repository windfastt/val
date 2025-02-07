// Check if the device is mobile based on the user agent
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const rotateMessage = document.getElementById('rotateMessage');
const backgroundVideo = document.getElementById('background-video');
const videoSource = document.getElementById('videoSource');

// Function to check orientation and display rotate message if mobile in portrait mode
function handleOrientationChange() {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    
    if (isMobile) {
        if (orientation === 'portrait') {
            rotateMessage.style.display = 'block';
            backgroundVideo.style.display = 'none';  // Hide video in portrait
        } else {
            rotateMessage.style.display = 'none';
            backgroundVideo.style.display = 'block';  // Show video in landscape
        }
    }
}

// Listen for window resize and load events to detect orientation changes
window.addEventListener('resize', handleOrientationChange);
window.addEventListener('load', handleOrientationChange);
