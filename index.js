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

function toCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = loc.value.trim();
  if (!city) return alert("Please enter a city!");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=64ee3c61d34ee3c1e6c2594698e46b8d`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    displayLocation.innerText = city.toUpperCase();
    temp.innerText = `${toCelsius(data.main.temp)}°C`;
    feelsLike.innerText = `${toCelsius(data.main.feels_like)}°C`;
    maxTemp.innerText = `${toCelsius(data.main.temp_max)}°C`;
    minTemp.innerText = `${toCelsius(data.main.temp_min)}°C`;
    humidity.innerText = `${data.main.humidity}%`;
    weather.innerText = data.weather[0].description.toUpperCase();
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } catch (err) {
    alert(err.message);
  }
});
