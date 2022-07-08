// Feature # Get a Date
function formateDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentTime.getDay()];

  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentHour}:${currentMinutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formateDate(currentTime);

// In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.There's no need to include a temperature conversion at the moment. This will be taught later on in the course.

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
  console.log(responce);
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

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

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
