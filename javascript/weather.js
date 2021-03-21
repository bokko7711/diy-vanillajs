const weatherSpan = document.querySelector(".current-weather");
const CURRENT_LOCATION = "currentLocation";
const API_KEY = "629dfcedd7e5ae9c7ca5b325da4742b6";

function requestWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function (fetchedData) {
            return fetchedData.json();
        }).then(function (jsonedWeather) {
            //console.dir(jsonedWeather);
            const temp = jsonedWeather.main.temp;
            const city = jsonedWeather.name;
            weatherSpan.innerText =
                `${temp}*C @ ${city}`;
        });
}

function requestSucceeded(location) {
    //console.dir(location);
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    const currentLocation = {
        lat, lng
    }
    localStorage.setItem(CURRENT_LOCATION, JSON.stringify(currentLocation));
    requestWeather(currentLocation.lat, currentLocation.lng);
}

function requestFailed() {
    console.error("Request failed.");
}

function requestLocation() {
    navigator.geolocation.getCurrentPosition(requestSucceeded, requestFailed);
}

function init() {
    const loadedData = localStorage.getItem(CURRENT_LOCATION);
    if (loadedData === null) {
        requestLocation();
    }
    else {
        const currentLocation = JSON.parse(loadedData);
        //console.dir(currentLocation);
        requestWeather(currentLocation.lat, currentLocation.lng);
    }
}

init();