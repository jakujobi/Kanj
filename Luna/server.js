const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const GOOGLE_PLACES_API_KEY = 'AIzaSyDgNSQthcJU8tRxuQdmbG5bUJUEu7IvdYs';
https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=ref&key=AIzaSyDgNSQthcJU8tRxuQdmbG5bUJUEu7IvdYs

app.use(express.static(path.join(__dirname, 'public')));
async function searchNearbyHospitals(latitude, longitude, radius = 482803) {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                key: GOOGLE_PLACES_API_KEY,
                location: `${latitude},${longitude}`,
                radius: radius,
                type: 'veterinary_care',
                limit: 10
            }
        });
        console.log(response.data.results[0].photos[0].photo_reference);
        return generateHTML(response.data.results);
    } catch (error) {
        console.error('Error fetching nearby hospitals:', error);
        return '<p>Error fetching nearby hospitals</p>';
    }
}

function generateHTML(hospitals) {
    let html = '';
    hospitals.forEach(hospital => {
        let imageSrc = ''; // Default to empty string if photos are not available
        if (hospital.photos && hospital.photos.length > 0) {
            const photoReference = hospital.photos[0].photo_reference;
            imageSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=AIzaSyDgNSQthcJU8tRxuQdmbG5bUJUEu7IvdYs`;
        }
        html += `<section>
                    <a href="#one" class="image"><img src="${imageSrc}" alt="" data-position="top center" /></a>
                        <div class="content">
                        <div class="inner">
                            <h2>${hospital.name}</h2>
                            <p>Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis mauris, eu ultricies erat malesuada quis. Aliquam dapibus.</p>
                            <ul class="actions">
                            <li><a href="generic.html" class="button">Learn more</a></li>
                            </ul>
                         </div>
                        </div>
                        </section>`;
    });
    html += `<!-- END OF REPLACEMENT -->`;
    return html;
}

async function appendHospitalsToListFile(latitude, longitude, radius) {
    const html = await searchNearbyHospitals(latitude, longitude, radius);
    const filePath = path.join(__dirname, 'public', 'schedule_appt.html'); // Constructing the file path
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const modifiedHTML = data.replace(/<div id="wrapper">[\s\S]*?<!-- END OF REPLACEMENT -->/, `<div id="wrapper">\n${html}\n</div>`); // Replace content within the wrapper div
        fs.writeFile(filePath, modifiedHTML, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Hospitals replaced in providers_list.html');
        });
    });
}

const latitude = 37.7749; // Example latitude
const longitude = -122.4194; // Example longitude

appendHospitalsToListFile(latitude, longitude, 482803);

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Signup page route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    // Handle signup logic here
    res.redirect('/dashboard');
});

// Login page route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    // Handle login logic here
    res.redirect('/dashboard');
});

app.get('/css/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'css', 'main.css'));
});
app.get('/css/noscript', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'css', 'noscript.css'));
});

app.get('/hyperspace/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hyperspace', 'assets', 'css', 'main.css'));
});
app.get('/hyperspace/noscript', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hyperspace', 'assets', 'css', 'noscript.css'));
});

app.get('/hyperspace/mainjs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hyperspace', 'assets', 'js', 'main.js'));
});
app.get('/hyperspace/utiljs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hyperspace', 'assets', 'js', 'util.js'));
});

// Dashboard page route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Routes for dashboard tabs
app.get('/my_pets', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'my_pets.html'));
});

app.get('/schedule_appt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'schedule_appt.html'));
});


app.get('/medications', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'medications.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
