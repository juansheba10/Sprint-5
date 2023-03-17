let currentJoke = '';
let currentRating = 0;
let reportJokes = [];

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
