// Función para obtener un chiste de la API
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

// Función para mostrar un chiste en la pantalla
async function displayJoke() {
    console.log("sss")
    const jokeElement = document.getElementById('joke');
    const joke = await fetchJoke();
    jokeElement.innerText = joke;
    console.log(joke);
}

// Agregar el evento click al botón "Siguiente chiste"
const nextJokeBtn = document.getElementById('nextJokeBtn');
nextJokeBtn.addEventListener('click', displayJoke);
