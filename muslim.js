window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
    event.returnValue = " NOOOOOO DONT LEAVE"; 
});

const isMobile = /(Mobile|Android|iPad(?!.*Mobile)|Tablet)/i.test(navigator.userAgent);

// Get elements and check if they exist
const videoBackground = document.getElementById('background-video');
const rotateMessage = document.getElementById('rotateMessage');
const videoSource = document.getElementById('videoSource');

// Failsafe: Exit if elements are missing
if (!videoBackground || !rotateMessage || !videoSource) {
    console.error("Missing required elements. Check your HTML.");
} else {
    // Detect if mobile user is in portrait or landscape mode
    function handleOrientationChange() {
        const isPortrait = window.innerHeight > window.innerWidth;

        if (isMobile && isPortrait) {
            rotateMessage.style.display = 'block';
            videoSource.src = 'rotate.mp4';
        } else {
            rotateMessage.style.display = 'none';
            videoSource.src = 'background.mp4';
        }

        // Reload video if the source changes
        if (videoBackground.load) {
            videoBackground.load();
        }
    }

    // Listen for window resize to detect orientation changes
    window.addEventListener('resize', handleOrientationChange);

    // Ensure the correct video is shown initially
    window.addEventListener('load', handleOrientationChange);

    // Handle tab visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            videoBackground?.pause();
        } else {
            videoBackground?.play();
        }
    });

    // Check if the font loads properly
    document.fonts.load("1em 'SourGummy'").then((loaded) => {
        if (!loaded.length) {
            console.error("Failed to load 'SourGummy' font.");
        }
    }).catch((err) => console.error("Font loading error:", err));
}
