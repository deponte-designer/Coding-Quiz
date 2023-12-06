// highscores.html
// Pseudo code:
// - Retrieve highscores from local storage
// - sort the scores from higher score to lower score
// - Display the highscores as a list
// - When the user click on "Clear Highscores", clear local storage

// scores.js
// Implementing functions to retrieve, display, and clear highscores

// to retrieve highscores from local storage
function getHighscores() {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    return highscores;
};

// function to display highscores
function displayHighscores() {
    const highscores = getHighscores();
    const highscoresList = document.getElementById("highscores");

    // Sort highscores from higher score to lower score
    highscores.sort((a, b) => b.score - a.score);

    // Display highscores as a list
    highscores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${score.initials} - ${score.score}`;
        highscoresList.appendChild(listItem);
    });
};

