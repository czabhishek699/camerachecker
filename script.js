document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById('camera-feed');
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', function () {
        // Check for camera support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Your browser does not support accessing the camera.');
            return;
        }

        // Access the camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Display the camera feed in the video element
                videoElement.srcObject = stream;
            })
            .catch(function (error) {
                console.error('Error accessing the camera: ' + error);
            });
    });
});
const videoElement = document.getElementById('camera-feed');
const filterSelect = document.querySelector('select#filter');

// Check if the browser supports the getUserMedia API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        // Set the video element's source to the camera stream
        videoElement.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing the camera:', error);
    });
} else {
    console.error('getUserMedia is not supported in this browser');
}

// Function to apply filters
function applyFilter(filterType) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Apply selected filter
    if (filterType === 'hue') {
        // Apply hue filter (e.g., change to red)
        context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    } else if (filterType === 'brightness') {
        // Apply brightness filter (e.g., increase brightness)
        context.filter = 'brightness(150%)';
    } else {
        // No filter (default)
        context.filter = 'none';
    }

    // Display the modified canvas on the video element
    videoElement.srcObject = null;
    videoElement.src = canvas.toDataURL('image/webp');
}
