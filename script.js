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
