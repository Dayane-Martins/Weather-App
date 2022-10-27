//Feature 1
let mainDay = document.querySelector(".main-day");
let now = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

mainDay.innerHTML = weekDays[now.getDay()];

let currentTime = document.querySelector(".current-time");
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${hours}:${minutes}`;

let today = document.querySelector(".today");
today.innerHTML = ` ${now.getDate()}`;
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = document.querySelector(".month");
month.innerHTML = months[now.getMonth()];

function showWeatherConditions(response) {
  console.log(response.data);
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(".sky-condition").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeatherConditions);
}

function handleSubmitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showPosition(position) {
  console.log(position);
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log("apiUrl");
  axios.get(`${apiUrl}`).then(showWeatherConditions);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function changeUnitsToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = "66°";
}

function changeUnitsToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = "19°";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmitCity);

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", getCurrentPosition);

let unitF = document.querySelector(".unitF");
unitF.addEventListener("click", changeUnitsToF);

let unitC = document.querySelector(".unitC");
unitC.addEventListener("click", changeUnitsToC);

search("Toronto");
