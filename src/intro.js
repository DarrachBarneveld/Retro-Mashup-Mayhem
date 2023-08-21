/*Change Page after Scroll animation */
const titles = document.querySelector('#titlecontent');
const duration = 22550; // Duration of the scroll animation in milliseconds

setTimeout(() => {
  window.location.href ="index.html";
}, duration);

/* Sound toggle */

const soundOnButton = document.getElementById('sound-on');
const soundOffButton = document.getElementById('sound-off');
const backgroundMusic = document.getElementById('backgroundMusic');

soundOffButton.addEventListener('click', () => {
  soundOffButton.classList.add('hide');
  soundOnButton.classList.remove('hide');
  backgroundMusic.play();

});

soundOnButton.addEventListener('click', () => {
  soundOnButton.classList.add('hide');
  soundOffButton.classList.remove('hide');
  backgroundMusic.pause();
});