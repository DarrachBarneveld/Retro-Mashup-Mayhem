// Create a variable to store the remaining time for each level.
let level1Timer = 60000; // 1 minute in milliseconds
let level2Timer = 60000;
let level3Timer = 12000; // 2 minutes in milliseconds
let level4Timer = 12000; // 2 minutes in milliseconds

// Create a function to update the timer to every frame.
export function updateTimer() {
  // Decrement the remaining time for the current level.
  if (currentLevel === Level1) {
    level1Timer -= 1000;
  } else if (currentLevel === Level2) {
    level2Timer -= 1000;
  } else if (currentLevel === Level3) {
    level3Timer -= 1000;
  } else if (currentLevel === Level4) {
    level4Timer -= 1000;
  }
}

// Start the timer when the game starts.
window.addEventListener("load", function () {
  updateTimer();
});

// Check if the timer has reached 0 and end the game if it has.
function checkTimer() {
  if (level1Timer === 0) {
    gameOver();
  } else if (level2Timer === 0) {
    gameOver();
  } else if (level3Timer === 0) {
    gameOver();
  } else if (level4Timer === 0) {
    gameOver();
  }
}

// Update the timer and check if it has reached 0 every frame.
setInterval(updateTimer, 1000);
setInterval(checkTimer, 1000);

function timer(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Timer done after ${duration} milliseconds`);
    }, duration);
  });
}
