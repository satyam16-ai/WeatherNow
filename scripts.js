document.getElementById('search_button').addEventListener('click', function() {
    const location = document.getElementById('search').value;
    fetchWeatherData(location);
});

document.getElementById('location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherData(`${latitude},${longitude}`);
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherData(location) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherCard(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

function updateWeatherCard(data) {
    const currentTime = new Date();
    const formattedTime = formatTime(currentTime);
    let wishMessage = '';

    if (currentTime.getHours() < 12) {
        wishMessage = 'Good Morning!';
    } else if (currentTime.getHours() < 18) {
        wishMessage = 'Good Afternoon!';
    } else {
        wishMessage = 'Good Evening!';
    }

    let weatherMessage = '';
    const condition = data.current.condition.text.toLowerCase();
    const isDay = data.current.is_day;

    let iconClass = '';

    if (condition.includes('rain')) {
        weatherMessage = 'Don\'t forget your umbrella!';
        iconClass = '\f73d';
    } else if (condition.includes('clear')) {
        weatherMessage = 'It\'s a clear day!';
        iconClass = isDay ? '\f185' : '\f186';
    } else if (condition.includes('cloud')) {
        weatherMessage = 'It\'s a bit cloudy today.';
        iconClass = '\f0c2';
    } else if (condition.includes('snow')) {
        weatherMessage = 'Stay warm, it\'s snowing!';
        iconClass = '\f2dc';
    } else {
        weatherMessage = 'Have a great day!';
        iconClass = isDay ? '\f185' : '\f186';
    }

    document.getElementById('wish_message').textContent = `${wishMessage} ${weatherMessage}`;
    document.getElementById('location_name').textContent = `${data.location.name}, ${data.location.region}`;
    document.getElementById('weather_icon').src = data.current.condition.icon;
    document.getElementById('temp_value').textContent = `${data.current.temp_c}°C`;
    document.getElementById('condition_text').textContent = data.current.condition.text;
    document.getElementById('feels_like').textContent = `${data.current.feelslike_c}°C`;
    document.getElementById('wind_speed').textContent = `${data.current.wind_kph} kph`;
    document.getElementById('wind_direction').textContent = data.current.wind_dir;
    document.getElementById('wind_gust').textContent = `${data.current.gust_kph} kph`;
    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('pressure').textContent = `${data.current.pressure_mb} mb`;
    document.getElementById('dew_point').textContent = `${data.current.dewpoint_c}°C`;
    document.getElementById('cloud_cover').textContent = `${data.current.cloud}%`;
    document.getElementById('visibility').textContent = `${data.current.vis_km} km`;
    document.getElementById('current_time').textContent = `Current Time: ${formattedTime}`;

    document.body.setAttribute('data-icon', iconClass);

    document.getElementById('weather_card').style.display = 'block';
}