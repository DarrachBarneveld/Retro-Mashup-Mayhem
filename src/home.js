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

/* Open Modals */
const rulesModal = document.querySelector('.rules-modal');
const aboutUsModal = document.querySelector('.about-us-modal');
const rulesButton = document.querySelector('.rules-button');
const aboutUsButton = document.querySelector('.about-us-button');

rulesButton.addEventListener('click', () => {
    console.log('open rules modal');
});