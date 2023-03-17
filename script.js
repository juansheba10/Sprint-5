let currentJoke = '';
let currentRating = 0;
let reportJokes = [];

const weatherApiKey = "c8a5231d1d034614aae1b557f0d1fd53";
const city = "Barcelona"; 

// Función para obtener información meteorológica de la API de Weatherbit
async function fetchWeather() {
  const url = `https://api.weatherbit.io/v2.0/current?lat=41.3874&lon=2.1686&key=${weatherApiKey}&lang=es`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    const description = weatherData.data[0].weather.description;
    const temperature = Math.round(weatherData.data[0].temp);

    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerText = `Hoy en ${city}: ${description}, ${temperature}°C`;
  } catch (error) {
    console.error("Error al obtener información meteorológica:", error);
  }
}

// Ejecutar la función fetchWeather al cargar la página
fetchWeather();


async function fetchJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el chiste');
        }

        const jokeData = await response.json();
        return jokeData.joke;
    } catch (error) {
        console.error('Error:', error);
        return 'No se pudo obtener un chiste';
    }
}

async function displayJoke() {
    currentJoke = await fetchJoke();
    const jokeElement = document.getElementById('joke');
    jokeElement.innerText = currentJoke;
    console.log(currentJoke);
    document.getElementById('ratingButtons').style.display = 'block';
}

function saveReport() {
    if (currentRating !== 0) {
        const jokeReport = {
            joke: currentJoke,
            score: currentRating,
            date: new Date()
        };
        reportJokes.push(jokeReport);
        console.log(reportJokes);
    }
}

const nextJokeBtn = document.getElementById('nextJokeBtn');
nextJokeBtn.addEventListener('click', () => {
    saveReport();
    currentRating = 0;
    displayJoke();
});

const ratingButtons = document.getElementsByClassName('ratingBtn');
for (let i = 0; i < ratingButtons.length; i++) {
    ratingButtons[i].addEventListener('click', (event) => {
        currentRating = parseInt(event.target.getAttribute('data-score'));
    });
}


