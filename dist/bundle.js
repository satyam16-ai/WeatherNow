/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts.js":
/*!********************!*\
  !*** ./scripts.js ***!
  \********************/
/***/ (() => {

  eval("document.getElementById('search_button').addEventListener('click', function() {\n    const location = document.getElementById('search').value;\n    fetchWeatherData(location);\n});\n\ndocument.getElementById('location').addEventListener('click', function() {\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(position => {\n            const latitude = position.coords.latitude;\n            const longitude = position.coords.longitude;\n            fetchWeatherData(`${latitude},${longitude}`);\n        }, error => {\n            console.error('Error getting location:', error);\n        });\n    } else {\n        console.error('Geolocation is not supported by this browser.');\n    }\n});\n\nfunction fetchWeatherData(location) {\n    const apiKey = \"aec27642d2d44100a25113139241209\";\n    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;\n\n    fetch(url)\n        .then(response => response.json())\n        .then(data => {\n            updateWeatherCard(data);\n        })\n        .catch(error => {\n            console.error('Error fetching weather data:', error);\n        });\n}\n\nfunction formatTime(date) {\n    let hours = date.getHours();\n    let minutes = date.getMinutes();\n    const ampm = hours >= 12 ? 'PM' : 'AM';\n    hours = hours % 12;\n    hours = hours ? hours : 12;\n    minutes = minutes < 10 ? '0' + minutes : minutes;\n    return `${hours}:${minutes} ${ampm}`;\n}\n\nfunction updateWeatherCard(data) {\n    const currentTime = new Date();\n    const formattedTime = formatTime(currentTime);\n    let wishMessage = '';\n\n    if (currentTime.getHours() < 12) {\n        wishMessage = 'Good Morning!';\n    } else if (currentTime.getHours() < 18) {\n        wishMessage = 'Good Afternoon!';\n    } else {\n        wishMessage = 'Good Evening!';\n    }\n\n    let weatherMessage = '';\n    const condition = data.current.condition.text.toLowerCase();\n    const isDay = data.current.is_day;\n\n    let iconClass = '';\n\n    if (condition.includes('rain')) {\n        weatherMessage = 'Don\\'t forget your umbrella!';\n        iconClass = '\\f73d';\n    } else if (condition.includes('clear')) {\n        weatherMessage = 'It\\'s a clear day!';\n        iconClass = isDay ? '\\f185' : '\\f186';\n    } else if (condition.includes('cloud')) {\n        weatherMessage = 'It\\'s a bit cloudy today.';\n        iconClass = '\\f0c2';\n    } else if (condition.includes('snow')) {\n        weatherMessage = 'Stay warm, it\\'s snowing!';\n        iconClass = '\\f2dc';\n    } else {\n        weatherMessage = 'Have a great day!';\n        iconClass = isDay ? '\\f185' : '\\f186';\n    }\n\n    document.getElementById('wish_message').textContent = `${wishMessage} ${weatherMessage}`;\n    document.getElementById('location_name').textContent = `${data.location.name}, ${data.location.region}`;\n    document.getElementById('weather_icon').src = data.current.condition.icon;\n    document.getElementById('temp_value').textContent = `${data.current.temp_c}°C`;\n    document.getElementById('condition_text').textContent = data.current.condition.text;\n    document.getElementById('feels_like').textContent = `${data.current.feelslike_c}°C`;\n    document.getElementById('wind_speed').textContent = `${data.current.wind_kph} kph`;\n    document.getElementById('wind_direction').textContent = data.current.wind_dir;\n    document.getElementById('wind_gust').textContent = `${data.current.gust_kph} kph`;\n    document.getElementById('humidity').textContent = `${data.current.humidity}%`;\n    document.getElementById('pressure').textContent = `${data.current.pressure_mb} mb`;\n    document.getElementById('dew_point').textContent = `${data.current.dewpoint_c}°C`;\n    document.getElementById('cloud_cover').textContent = `${data.current.cloud}%`;\n    document.getElementById('visibility').textContent = `${data.current.vis_km} km`;\n    document.getElementById('current_time').textContent = `Current Time: ${formattedTime}`;\n\n    document.body.setAttribute('data-icon', iconClass);\n\n    document.getElementById('weather_card').style.display = 'block';\n}\n\n//# sourceURL=webpack:///./scripts.js?");

  /***/ })
  
  /******/ 	});
  /************************************************************************/
  /******/ 	
  /******/ 	// startup
  /******/ 	// Load entry module and return exports
  /******/ 	// This entry module can't be inlined because the eval devtool is used.
  /******/ 	var __webpack_exports__ = {};
  /******/ 	__webpack_modules__["./scripts.js"]();
  /******/ 	
  /******/ })()
  ;