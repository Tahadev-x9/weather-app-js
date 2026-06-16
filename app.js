
const API_KEY = "6a98018d32ad9816a44044dc7ed849f8";

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function weatherAppFn(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        condition.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
    }
    catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        weatherAppFn(city);
    }
});

// cityInput.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         searchBtn.click();
//     }
// });

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function getCurrentWeather(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        condition.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
    }
    catch (error) {
        console.log(error);
    }
}

function loadApp() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            getCurrentWeather(latitude, longitude);
        },
        (error) => {
            console.log(error);
        }
    );
}

loadApp();