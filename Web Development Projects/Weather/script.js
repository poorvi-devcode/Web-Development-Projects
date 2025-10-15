const apiKey = "YOUR_API_KEY";

window.onload = function() {
  // Auto-load last city if saved
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("cityInput").value = lastCity;
    getWeather();
  }
};

function selectCity() {
  const selectedCity = document.getElementById("citySelect").value;
  if (selectedCity) {
    document.getElementById("cityInput").value = selectedCity;
    getWeather();
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter or select a city");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Save city for next time
    localStorage.setItem("lastCity", city);

    document.getElementById("weatherBox").style.display = "block";
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp}°C`;
    document.getElementById("description").innerText = `☁ Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `🌬 Wind: ${data.wind.speed} m/s`;

    // Theme switching
    const currentTime = new Date((data.dt + data.timezone) * 1000);
    const hours = currentTime.getUTCHours();

    const sky = document.getElementById("sky");
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const stars = document.getElementById("stars");

    if (hours >= 6 && hours < 18) {
      sky.style.background = "linear-gradient(to top, #87ceeb, #fdf6e3)";
      sun.style.display = "block";
      moon.style.display = "none";
      stars.style.display = "none";
    } else {
      sky.style.background = "linear-gradient(to top, #0f2027, #203a43, #2c5364)";
      sun.style.display = "none";
      moon.style.display = "block";
      stars.style.display = "block";
    }
  } catch (error) {
    alert(error.message);
  }
}
