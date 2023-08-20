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

/* Modals Constants */
const rulesModal = document.querySelector('#rules-modal');
const aboutUsModal = document.querySelector('#about-us-modal');

/* Open Modal Buttons */
const rulesButton = document.querySelector('.rules-button');
const aboutUsButton = document.querySelector('.about-us-button');

/* Close Modal Buttons */
const closeRulesButton = document.querySelector('#close-rules-modal-button');
const closeAboutUsButton = document.querySelector('#close-about-us-modal-button');

/* Open rules modal */
rulesButton.addEventListener('click', () => {
    rulesModal.classList.remove('hide-modal');
});

/* Close rules modal*/
closeRulesButton.addEventListener('click', () => {
    rulesModal.classList.add('hide-modal');
});

/* Open About Us Modal */
aboutUsButton.addEventListener('click', () => {
    console.log('success')
    aboutUsModal.classList.remove('hide-modal');
});

/* Close About Us Modal */
closeAboutUsButton.addEventListener('click', () => {
    aboutUsModal.classList.add('hide-modal');
});
