function showtemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#windSpped");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "3e7e8fd8cf76af676ed5110468b54fe1";
let city = "Alta";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showtemperature);
