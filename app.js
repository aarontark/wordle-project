let guessContainer = document.querySelector('.guess_container');
let guess_rows = Array.from(guessContainer);
let activeRow = document.querySelector('.active_row');
let letterInput = Array.from(activeRow.children);
let currentIndex = 0;

async function loadWords(inputWord) {
  const response = await fetch('data/words.txt');
  const text = await response.text();
  words = text.split('\n').map(word => word.trim()).filter(Boolean);
  if (words.includes(inputWord)) {
    verifyTxt.style.display = 'block';
  } else {
    verifyTxt.style.display = 'none';
  }
}

window.addEventListener('keydown', event => {
    currentActive = document.querySelector('.active');
    validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (event.key == 'Backspace') {
        if (currentIndex == 0){
            currentActive.innerHTML = '';
            return;
        } else {
            currentIndex--;
            currentActive.innerHTML = '';
            currentActive.classList.remove('active');
            letterInput[currentIndex].classList.add('active');
            currentActive = document.querySelector('.active');
        }
    } else if (validLetters.includes(event.key.toUpperCase())) {
        if (currentIndex < letterInput.length - 1) {
            currentActive.innerHTML = event.key.toUpperCase();
            currentActive.classList.remove('active');
            currentIndex++;
            letterInput[currentIndex].classList.add('active');
        } else if (currentIndex == 4) {
            currentActive.innerHTML = event.key.toUpperCase();
        } else {
            return null;
        }
     }
})