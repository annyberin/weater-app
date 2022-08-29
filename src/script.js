function currentDate(handleDate) {
  let date = new Date(handleDate);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(daystemp) {
  let date = new Date(daystemp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastEachDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `         <div class="col-2" style="width: 14%">
                <div class="weather-forecast-date">${formatDay(
                  forecastEachDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastEachDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="50px"
        
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastEachDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastEachDay.temp.min
                  )}°</span>
                </div>
              </div>
            
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3e7e8fd8cf76af676ed5110468b54fe1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showtemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpped");
  let dateElement = document.querySelector("#date");
  let imgElement = document.querySelector("#weaterImg");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = currentDate(response.data.dt * 1000);

  imgElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imgElement.setAttribute("alt", response.data.weather[0].description);
  //handle getting each day weather data
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3e7e8fd8cf76af676ed5110468b54fe1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#city-input");
  search(searchCityElement.value);
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = searchCityElement.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showPositon(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3e7e8fd8cf76af676ed5110468b54fe1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleShowCurrentTemperature);
}

function handleShowCurrentTemperature(response) {
  let city = response.data.name;
  let showCurrentCity = document.getElementById("city");
  showCurrentCity.innerHTML = `${city}`;
  search(city);
}

navigator.geolocation.getCurrentPosition(showPositon, function (e) {
  console.log(e);
});
