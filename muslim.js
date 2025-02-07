const isMobile = /(Mobile|Android|iPad(?!.*Mobile)|Tablet)/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);
const isIphone = /iPhone/i.test(navigator.userAgent);
const isIpad = /iPad/i.test(navigator.userAgent);

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
            // Set custom rotate message based on device type
            if (isAndroid) {
                rotateMessage.innerText = "rotate ur poor fucking android nigga LOOLL";
            } else if (isIphone) {
                rotateMessage.innerText = "Rotate phone 💔😞";
            } else if (isIpad) {
                rotateMessage.innerText = "Rotate ipad 💔😞";
            } else {
                rotateMessage.innerText = "howd u get here lol (turn device)";
            }
            videoSource.src = 'rotate.mp4';  // Change to your desired video for portrait
        } else {
            rotateMessage.style.display = 'none';
            videoSource.src = 'background.mp4';  // Default background video
        }

        // Reload video if the source changes
        videoBackground.load();
    }

    // Warn user before leaving the page (unsaved work)
    window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        event.returnValue = "dont leave bb :c";
    });

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

    // Check if the font loads properly with fallback
    document.fonts.load("1em 'SourGummy'").then((loaded) => {
        if (loaded.length === 0) {
            console.error("Failed to load 'SourGummy' font.");
            // Fallback to a default font in case SourGummy doesn't load
            document.body.style.fontFamily = 'Arial, sans-serif';
        } else {
            console.log("SourGummy font loaded successfully.");
        }
    }).catch((err) => {
        console.error("Font loading error:", err);
        // Fallback to a default font in case of error
        document.body.style.fontFamily = 'Arial, sans-serif';
    });

    // Disable right-click and log
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log("Right-click is disabled!");
    });

    // Disable F12 and developer tools shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable F12
        if (e.keyCode === 123) {
            e.preventDefault();
            console.log("F12 is disabled!");
        }
        // Disable Ctrl+Shift+I and other developer shortcuts
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 75)) {
            e.preventDefault();
            console.log("Developer tools shortcut disabled!");
        }
    });

    document.addEventListener('keydown', function(e) {
        // Disable F12
        if (e.key === 'F12') {
            e.preventDefault();
            console.log("F12 is disabled!");
        }
        // Disable Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+Shift+K (common developer tools shortcuts)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'K')) {
            e.preventDefault();
            console.log("Developer tools shortcut disabled!");
        }
    });

    // Detect if DevTools are open
    let devToolsOpen = false;
    const threshold = 160; // Screen size threshold to detect if DevTools are open
    const clickHandler = () => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    };

    // Function to open a rickroll in a new tab
    function openRickroll() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }

    // Detect DevTools using the window size
    setInterval(function() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Detect if DevTools are open by checking screen size
        if (width <= threshold || height <= threshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                // Flood user with warnings
                for (let i = 0; i < 5; i++) { // 5 alerts
                    alert("Developer tools are open! Do not inspect this page.");
                }
                console.log("DevTools Detected");

                // Add the click handler to open rickroll tabs
                document.addEventListener('click', clickHandler);
            }
        } else {
            devToolsOpen = false;
            // Remove the click handler when DevTools are not open
            document.removeEventListener('click', clickHandler);
        }
    }, 1000);
}
