function formateDate(timestamp) {
  let date = new Date(timestamp);
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

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

function showTemperature(responce) {
  document.querySelector("#temperature").innerHTML = Math.round(
    responce.data.main.temp
  );

  document.querySelector("#city").innerHTML = responce.data.name;
  document.querySelector("#humidity").innerHTML = responce.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    responce.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    responce.data.weather[0].main;
  document.querySelector("#date").innerHTML = formateDate(
    responce.data.dt * 1000
  );
}

function search(city) {
  let apiKey = "170dde170847f45f4cc58e96c7fbbb26";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let url = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  search(city);
}

let form = document.querySelector("#searching-form");
form.addEventListener("submit", handleSubmit);
search("London");

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "170dde170847f45f4cc58e96c7fbbb26";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

// Feature # Temperature Metric
function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = 66;
}
let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsium(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = 29;
}
let temperatureCelsium = document.querySelector("#celsium");
temperatureCelsium.addEventListener("click", convertToCelsium);
