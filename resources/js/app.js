window.axios = require('axios');
window.bootstrap = require('bootstrap');

let time = new Date().toLocaleTimeString();
time = time.substring(0,2) + ':00:00';
let date = new Date().toLocaleDateString();
let dateTime = date + ' ' + time;


function fetchWeatherByCity(city) {
    return fetch(`./weather/${city}`)
        .then(response => response.json());
}

function updateAllBlocks() {
    let cities = ['vilnius', 'kaunas', 'klaipeda', 'siauliai', 'panevezys', 'alytus'];

    for (let i = 0; i < cities.length; i++) {
        fetchWeatherByCity(cities[i]).then(data => {
            let info = data.forecastTimestamps.filter(x => x.forecastTimeUtc === dateTime);
            updateBlock(i, info[0]);
        });
    }
}

updateAllBlocks();

let timeBlocks = document.querySelectorAll('.card .time');

for (let timeBlock of timeBlocks){
    timeBlock.textContent = dateTime;
}

let temperatures = document.querySelectorAll('.card .temperature');
let windSpeeds = document.querySelectorAll('.card .wind-speed');
let humidities = document.querySelectorAll('.card .humidity');
let airConditions = document.querySelectorAll('.card .condition');
let imgConditions = document.querySelectorAll('.card .weather-icon');

function updateBlock(index, data) {
    let condition = data.conditionCode;
    temperatures[index].textContent = data.airTemperature + '°C';
    windSpeeds[index].textContent = data.windSpeed + ' m/s';
    humidities[index].textContent = data.relativeHumidity + ' %';
    airConditions[index].textContent = translateConditions[condition];
    imgConditions[index].innerHTML = iconConditions[condition];
}

let translateConditions = {
    'clear' : 'Giedra',
    'isolated-clouds' : 'Mažai debesuota',
    'scattered-clouds' : 'Debesuota su pragiedruliais',
    'overcast' : 'Debesuota',
    'light-rain' : 'Nedidelis lietus',
    'moderate-rain' : 'Lietus',
    'heavy-rain' : 'Smarkus lietus',
    'sleet' : 'Šlapdriba',
    'light-snow' : 'Nedidelis sniegas',
    'moderate-snow' : 'Sniegas',
    'heavy-snow' : 'Smarkus sniegas',
    'fog' : 'Rūkas',
    'na' : 'Oro sąlygos nenustatytos'

};

let iconConditions = {
    'clear' : '<i class="wi wi-day-sunny"></i>',
    'isolated-clouds' : '<i class="wi wi-cloud"></i>',
    'scattered-clouds' : '<i class="wi wi-day-cloudy"></i>',
    'overcast' : '<i class="wi wi-cloudy"></i>',
    'light-rain' : '<i class="wi wi-sprinkle"></i>',
    'moderate-rain' : '<i class="wi wi-showers"></i>',
    'heavy-rain' : '<i class="wi wi-rain"></i>',
    'sleet' : '<i class="wi wi-rain-mix"></i>',
    'light-snow' : '<i class="wi wi-snow"></i>',
    'moderate-snow' : '<i class="wi wi-snow"></i>',
    'heavy-snow' : '<i class="wi wi-snow"></i>',
    'fog' : '<i class="wi wi-fog"></i>',
    'na' : '<i class="wi wi-na"></i>'
};
