// Create a variable to store the score.
let score = 0;

// Create a function to increment the score.
function incrementScore() {
  score++;
}

// Display the score on the screen.
function displayScore() {
  document.getElementById("score").innerHTML = score;
}

// Create a variable to store the current level.
let currentLevel = 1;

// Increment the score when the player reaches the next level.
function nextLevel() {
  currentLevel++;
  score += 1;
}

// Increment the score when the player combat with an enemy.
function onCombat() {
  incrementScore();
}

// Enemy combat event handler.
document.addEventListener("combat", onCombat);

// displayScore is called at evevery second.
setInterval(displayScore, 1000);

// Increment the score when the player reaches the next level.
document.addEventListener("levelComplete", nextLevel); // Not sure how the player move up levels