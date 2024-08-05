document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            document.getElementById('result').innerText = "Geolocation is not supported by this browser.";
        }
    }

    const showPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch('/save-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude, longitude })
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('result').innerText = `Location saved: ${data}`;
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = "An error occurred while saving the location.";
        });
    }

    const showError = (error) => {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
    getLocation();
});
