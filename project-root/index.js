const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'project-root', 'public')));

app.post('/save-location', (req, res) => {
    const { latitude, longitude } = req.body;
    const data = `Latitude: ${latitude}, Longitude: ${longitude}\n`;

    const filePath = path.join(__dirname, 'locations.txt');

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Location saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
