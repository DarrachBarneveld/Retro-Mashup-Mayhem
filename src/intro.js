/*Change Page after Scroll animation */
const titles = document.querySelector('#titlecontent');
const duration = 305000; // Duration of the scroll animation in milliseconds

setTimeout(() => {
  window.location.href = 'index.html';
}, duration);

/* Sound toggle */

const soundOnButton = document.getElementById('sound-on');
const soundOffButton = document.getElementById('sound-off');

soundOffButton.addEventListener('click', () => {
  soundOffButton.classList.remove('hide');
  soundOnButton.classList.add('hide');
});

soundOnButton.addEventListener('click', () => {
  soundOnButton.classList.remove('hide');
  soundOffButton.classList.add('hide');
});