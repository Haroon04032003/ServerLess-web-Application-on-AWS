const form = document.querySelector('form');
const greeting = document.querySelector('#greeting');
const resetButton = document.querySelector('#reset-btn');
const historyList = document.querySelector('#history-list');
const counter = document.querySelector(".counter-number");
const toggleThemeButton = document.querySelector('#toggle-theme');
const locationDiv = document.querySelector('#location');
const weatherDiv = document.querySelector('#weather');

let isDarkMode = false;

// Update Counter Function
async function updateCounter() {
    try {
        let response = await fetch(
            "https://o73g5ptpujgtclinhzhhneplje0jogoh.lambda-url.us-east-1.on.aws/"
        );
        let data = await response.json();
        counter.innerHTML = `Views: ${data.views}`;  // Ensure you access the correct property
    } catch (error) {
        console.error('Error fetching the counter:', error);
        counter.innerHTML = 'Error fetching views';
    }
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    const dateTimeElement = document.getElementById('date-time');
    dateTimeElement.textContent = now.toLocaleString();
}

// Add Greeting to History
function addGreetingToHistory(name) {
    const listItem = document.createElement('li');
    listItem.textContent = `Hello, ${name}! - ${new Date().toLocaleString()}`;
    historyList.appendChild(listItem);
}

// Form Submit Event Listener
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    greeting.textContent = `Hello, ${name}!`;
    greeting.classList.add('show');
    addGreetingToHistory(name);
});

// Reset Button Event Listener
resetButton.addEventListener('click', () => {
    greeting.textContent = '';
    greeting.classList.remove('show');
    form.reset();
});

// Toggle Dark Mode
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
    toggleThemeButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Get User Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    locationDiv.innerHTML = `Latitude: ${lat}°, Longitude: ${lon}°`;
    getWeather(lat, lon);
}

// Fetch Weather Information
async function getWeather(lat, lon) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${lat},${lon}`);
        let data = await response.json();
        weatherDiv.innerHTML = `Current Temperature: ${data.current.temp_c}°C, Condition: ${data.current.condition.text}`;
    } catch (error) {
        console.error('Error fetching the weather:', error);
    }
}

updateCounter();
updateDateTime();
setInterval(updateDateTime, 1000); // Update date and time every second
getLocation();
