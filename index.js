const loc = document.getElementById("input-location");
const displayLocation = document.getElementById("display-location");
const feelsLike = document.getElementById("feels-like");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");
const button = document.getElementById("button");
function toCelsius(temp) {
  return (temp = temp - 273.15).toFixed(1);
}
button.addEventListener("click", (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const xhrUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc.value.toLowerCase()}&appid=64ee3c61d34ee3c1e6c2594698e46b8d`;
  xhr.open("GET", xhrUrl);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(this.responseText);

      displayLocation.innerText = loc.value.toUpperCase();
      temp.innerText = `${toCelsius(data.main.temp)}°C`;
      feelsLike.innerText = `${toCelsius(data.main.feels_like)}°C`;
      maxTemp.innerText = `${toCelsius(data.main.temp_max)}°C`;

      minTemp.innerText = `${toCelsius(data.main.temp_min)}°C`;
      humidity.innerText = `${data.main.humidity}%`;
      weather.innerText = data.weather[0].description.toUpperCase();
      let icon = data.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }
  };
  xhr.send();
});
