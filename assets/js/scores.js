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

// Function to clear highscores and update the displayed highscores
function clearHighscores() {
    // Clear highscores from local storage
    localStorage.removeItem("highscores");

    // Clear displayed highscores in the browser
    const highscoresList = document.getElementById("highscores");
    highscoresList.innerHTML = "";
};

// Event listener for clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighscores);


// call the function 
displayHighscores();
