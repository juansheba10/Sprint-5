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


let currentJokeSource = 0;

// Función para obtener un chiste de la API de icanhazdadjoke
async function fetchDadJoke() {
  const url = "https://icanhazdadjoke.com/";
  const options = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const response = await fetch(url, options);
    const jokeData = await response.json();
    return jokeData.joke;
  } catch (error) {
    console.error("Error al obtener chiste de icanhazdadjoke:", error);
    return null;
  }
}

// Función para obtener un chiste de la API de Chuck Norris Joke
async function fetchChuckNorrisAPIJoke() {
  const url = "https://api.chucknorris.io/jokes/random";

  try {
    const response = await fetch(url);
    const jokeData = await response.json();
    return jokeData.value;
  } catch (error) {
    console.error("Error al obtener chiste de JokeAPI:", error);
    return null;
  }
}

// Función para obtener un chiste de una fuente seleccionada
async function fetchJoke() {
  // Alternar entre las fuentes de chistes
  currentJokeSource = (currentJokeSource + 1) % 2;
  console.log(currentJokeSource)
  if (currentJokeSource === 0) {
    return await fetchDadJoke();
  } else {
    return await fetchChuckNorrisAPIJoke();
  }
}

// Modificar la función nextJoke para utilizar la función fetchJoke
async function nextJoke() {
  // ...
  const joke = await fetchJoke();
  return joke;
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


