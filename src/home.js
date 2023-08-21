/* Sound toggle */
const soundOnButton = document.getElementById("sound-on");
const soundOffButton = document.getElementById("sound-off");
const backgroundMusic = document.getElementById("backgroundMusic");

soundOffButton.addEventListener("click", () => {
  soundOffButton.classList.add("hide");
  soundOnButton.classList.remove("hide");
  backgroundMusic.play();
});

soundOnButton.addEventListener("click", () => {
  soundOnButton.classList.add("hide");
  soundOffButton.classList.remove("hide");
  backgroundMusic.pause();
});

/* Modals Constants */
const rulesModal = document.querySelector("#rules-modal");
const aboutUsModal = document.querySelector("#about-us-modal");
const trophiesModal = document.querySelector('#trophies-modal')
const levelsModal = document.querySelector('#levels-modal');

/* Open Modal Buttons */
const rulesButton = document.querySelector(".rules-button");
const aboutUsButton = document.querySelector(".about-us-button");
const trophiesButton = document.querySelector('.trophies-button')
const levelsButton = document.querySelector('.levels-button');

/* Close Modal Buttons */
const closeRulesButton = document.querySelector("#close-rules-modal-button");
const closeAboutUsButton = document.querySelector("#close-about-us-modal-button");
const closeTrophiesButton = document.querySelector("#close-trophies-modal-button");
const closeLevelsButton = document.querySelector('#close-levels-button');

/* Open rules modal */
rulesButton.addEventListener("click", () => {
  rulesModal.classList.remove("hide-modal");
});

/* Close rules modal*/
closeRulesButton.addEventListener("click", () => {
  rulesModal.classList.add("hide-modal");
});

/* Open About Us Modal */
aboutUsButton.addEventListener("click", () => {
  aboutUsModal.classList.remove("hide-modal");
});

/* Close About Us Modal */
closeAboutUsButton.addEventListener("click", () => {
  aboutUsModal.classList.add("hide-modal");
});

/* Open Trophies Modal */
trophiesButton.addEventListener("click", () => {
  trophiesModal.classList.remove("hide-modal");
});

/* Close Trophies Modal */
closeTrophiesButton.addEventListener("click", () => {
  trophiesModal.classList.add("hide-modal");
});

/* Open Levels Modal */
levelsButton.addEventListener('click',() => {
  levelsModal.classList.remove('hide-modal');
});

/* Close Levels Modal */
closeLevelsButton.addEventListener('click', () => {
  levelsModal.classList.add('hide-modal');
});