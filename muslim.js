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
const rotateMessage = document.getElementById('rotateMessage');
const videoSource = document.getElementById('videoSource');

// Failsafe: Exit if elements are missing
if (!videoBackground || !rotateMessage || !videoSource) {
    console.error("Missing required elements. Check your HTML.");
} else {
    // Detect if user is in portrait or landscape mode
    function handleOrientationChange() {
        const isPortrait = window.innerHeight > window.innerWidth;

        if (deviceType === "Mobile" && isPortrait) {
            rotateMessage.style.display = 'block';
            // Set custom rotate message based on device type
            if (deviceType === "Mobile") {
                if (/android/i.test(navigator.userAgent)) {
                    rotateMessage.innerText = "rotate ur poor fucking android nigga LOOLL";
                } else if (/iphone/i.test(navigator.userAgent)) {
                    rotateMessage.innerText = "Rotate phone 💔😞";
                } else if (/ipad/i.test(navigator.userAgent)) {
                    rotateMessage.innerText = "Rotate ipad 💔😞";
                } else {
                    rotateMessage.innerText = "howd u get here lol (turn device)";
                }
                videoSource.src = 'rotate.mp4';  // Change to your desired video for portrait
            }
        } else {
            rotateMessage.style.display = 'none';
            videoSource.src = 'background.mp4';  // Default background video
        }

        // Reload video if the source changes
        videoBackground.load();
    }

    // Function to scale the video dynamically
    function resizeVideo() {
        const aspectRatio = 16 / 9; // Adjust based on your video
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if (screenWidth / screenHeight > aspectRatio) {
            // Screen is wider than the video aspect ratio, fit by width
            videoBackground.style.width = '100%';
            videoBackground.style.height = 'auto';
        } else {
            // Screen is taller than the video aspect ratio, fit by height
            videoBackground.style.width = 'auto';
            videoBackground.style.height = '100%';
        }
    }

    // Warn user before leaving the page (unsaved work)
    window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        event.returnValue = "dont leave bb :c";
    });

    // Listen for window resize to detect orientation changes and resize video
    window.addEventListener('resize', () => {
        handleOrientationChange();
        resizeVideo();
    });

    // Ensure the correct video is shown and resized initially
    window.addEventListener('load', () => {
        handleOrientationChange();
        resizeVideo();
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
