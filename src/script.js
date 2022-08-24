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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thurthday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `         <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/04n@2x.png"
                  alt=""
                  width="50px"
        
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min">10°</span>
                </div>
              </div>
            
        `;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class
  celsiusElement.classList.remove("active");
  // add the active class
  fahrenheitElement.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature + 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  // again
  fahrenheitElement.classList.remove("active");
  celsiusElement.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", displayCelsiusTemperature);

search("Kiev");
