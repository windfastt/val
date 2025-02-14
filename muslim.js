// Function to get device type
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
        return "Mobile";
    } else if (/tablet|ipad|playbook|silk/.test(userAgent)) {
        return "Tablet";
    } else {
        return "Desktop";
    }
}

// Get device type
const deviceType = getDeviceType();

// Get elements and check if they exist
const videoBackground = document.getElementById('background-video');
const gifBackground = document.getElementById('background-gif'); // Add GIF element
const rotateMessage = document.getElementById('rotateMessage');
const videoSource = document.getElementById('videoSource');

// Failsafe: Exit if elements are missing
if (!videoBackground || !rotateMessage || !videoSource || !gifBackground) {
    console.error("Missing required elements. Check your HTML.");
} else {
    // Function to show the GIF
    function showGif() {
        videoBackground.style.display = 'none';  // Hide video
        gifBackground.style.display = 'block';  // Show GIF
    }

    // Function to show the video
    function showVideo() {
        videoBackground.style.display = 'block';  // Show video
        gifBackground.style.display = 'none';  // Hide GIF
    }

    // Detect if user is in portrait or landscape mode
    function handleOrientationChange() {
        const isPortrait = window.innerHeight > window.innerWidth;

        if (deviceType === "Mobile" && isPortrait) {
            rotateMessage.style.display = 'block';
            // Set custom rotate message based on device type
            if (deviceType === "Mobile") {
                if (/android/i.test(navigator.userAgent)) {
                    rotateMessage.innerText = "Rotate your Android device 💔😞";
                } else if (/iphone/i.test(navigator.userAgent)) {
                    rotateMessage.innerText = "Rotate your iPhone 💔😞";
                } else if (/ipad/i.test(navigator.userAgent)) {
                    rotateMessage.innerText = "Rotate your iPad 💔😞";
                } else {
                    rotateMessage.innerText = "Please rotate your device to landscape mode.";
                }
                videoSource.src = 'rotate.mp4';  // Change to your desired video for portrait
                showGif();  // Show GIF when in portrait mode
            }
        } else {
            rotateMessage.style.display = 'none';
            videoSource.src = 'background.mp4';  // Default background video
            showVideo();  // Show video when in landscape or default mode
        }

        // Reload video if the source changes
        videoBackground.load();
    }

    // Function to scale the video dynamically based on the available space
    function resizeBackground() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Set the video width and height to fill the available space
        videoBackground.style.width = '100%';
        videoBackground.style.height = '100%';

        // Scale GIF similarly
        gifBackground.style.width = '100%';
        gifBackground.style.height = '100%';
    }

    // Warn user before leaving the page (unsaved work)
    window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        event.returnValue = "Are you sure you want to leave? Unsaved work may be lost!";
    });

    // Listen for window resize to detect orientation changes and resize video
    window.addEventListener('resize', () => {
        handleOrientationChange();
        resizeBackground();
    });

    // Ensure the correct video is shown and resized initially
    window.addEventListener('load', () => {
        handleOrientationChange();
        resizeBackground();
    });

    // Handle tab visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            videoBackground?.pause();
        } else {
            videoBackground?.play();
        }
    });

    // Check if the font loads properly with fallback
    document.fonts.load("1em 'SourGummy'").then((loaded) => {
        if (loaded.length === 0) {
            console.error("Failed to load 'SourGummy' font.");
            document.body.style.fontFamily = 'Arial, sans-serif';
        } else {
            console.log("SourGummy font loaded successfully.");
        }
    }).catch((err) => {
        console.error("Font loading error:", err);
        document.body.style.fontFamily = 'Arial, sans-serif';
    });

    // Disable right-click and log
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log("Right-click is disabled!");
    });

    // Disable F12 and developer tools shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 75))) {
            e.preventDefault();
            console.log("Developer tools shortcut disabled!");
        }
    });

    // Detect if DevTools are open
    let devToolsOpen = false;
    const threshold = 160;
    const clickHandler = () => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    };

    function openRickroll() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }

    setInterval(function() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (width <= threshold || height <= threshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                for (let i = 0; i < 5; i++) {
                    alert("Developer tools are open! Do not inspect this page.");
                }
                console.log("DevTools Detected");
                document.addEventListener('click', clickHandler);
            }
        } else {
            devToolsOpen = false;
            document.removeEventListener('click', clickHandler);
        }
    }, 1000);
}
