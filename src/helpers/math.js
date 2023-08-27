export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delayTimer(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function loadFromLocalStorage(key) {
  const storedData = localStorage.getItem(key);

  if (!storedData) {
    localStorage.setItem("levels", JSON.stringify([]));
    return [];
  }
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}
