let guessContainer = document.querySelector('.guess_container');
let guess_rows = Array.from(guessContainer);
let activeRow = document.querySelector('.active_row');
let letterInput = Array.from(activeRow.children);
let currentIndex = 0;
let randomWord;

async function loadWords() {
    const response = await fetch('data/words.txt');
    const text = await response.text();
    words = text.split('\n').map(word => word.trim()).filter(Boolean);
    const randomIndex = Math.floor(Math.random() * 2316) - 1; 
    randomWord = words[randomIndex];
}

window.addEventListener('keydown', event => {
    // currentActive = document.querySelector('.active');
    validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (validLetters.includes(event.key.toUpperCase())) {       
        if (currentIndex == 4) {
            currentActive = document.querySelector('.active');
            currentActive.innerHTML = event.key.toUpperCase();
            currentIndex++;
            currentActive.classList.remove('active');
        } else if (currentIndex < 4) {
            console.log(currentIndex);
            currentActive = document.querySelector('.active');
            currentActive.innerHTML = event.key.toUpperCase();
            currentIndex++;
            currentActive.classList.remove('active');
            letterInput[currentIndex].classList.add('active');
        } else {
            console.log(currentIndex);
            return;
        }
    } else if (event.key == 'Backspace') {
        if (currentIndex == 5) {
            currentIndex--;
            currentActive = letterInput[currentIndex];
            currentActive.classList.add('active');
            currentActive.innerHTML = '';
        } else if (currentIndex <= 4 && currentIndex > 0) {
            currentActive = letterInput[currentIndex];
            currentActive.classList.remove('active');
            currentIndex--;
            currentActive = letterInput[currentIndex];
            currentActive.classList.add('active');
            currentActive.innerHTML = '';
        }
    }
})

loadWords();