window.axios = require('axios');
window.bootstrap = require('bootstrap');

function fetchWeatherByCity(city) {
    return fetch(`./weather/${city}`)
        .then(response => response.json());
}



function updateAllBlocks() {
    let cities = ['vilnius', 'kaunas', 'klaipeda', 'siauliai', 'panevezys', 'alytus'];

    for (let i = 0; i < cities.length; i++) {
        fetchWeatherByCity(cities[i]).then(response => {
            updateBlock(i, response);
        });
    }
}

updateAllBlocks();

let times = document.querySelectorAll('.card .time');

for (let time of times){
    time.textContent = new Date().toLocaleTimeString();
}

let temperatures = document.querySelectorAll('.card .temperature');
let windSpeeds = document.querySelectorAll('.card .wind-speed');
let humidities = document.querySelectorAll('.card .humidity');
let airConditions = document.querySelectorAll('.card .condition');

function updateBlock(index, data) {
    let condition = data.forecastTimestamps[0].conditionCode;
    temperatures[index].textContent = data.forecastTimestamps[0].airTemperature + '°C';
    windSpeeds[index].textContent = data.forecastTimestamps[0].windSpeed + ' m/s';
    humidities[index].textContent = data.forecastTimestamps[0].relativeHumidity + ' %';
    airConditions[index].textContent = condition.charAt(0).toUpperCase() + condition.slice(1);

}



