let guessContainer = document.querySelector('.guess_container');
let guessRows = Array.from(guessContainer.children);
let activeRow = document.querySelector('.active_row');
let letterInput = Array.from(activeRow.children);
let currentIndex = 0;
let guessRowIndex = 0;
let wordList;
let randomWord;

async function loadWords() {
    const response = await fetch('data/words.txt');
    const text = await response.text();
    words = text.split('\n').map(word => word.trim()).filter(Boolean);
    const randomIndex = Math.floor(Math.random() * 2316) - 1;
    wordList = words; 
    randomWord = words[randomIndex].toUpperCase();
}

function applyStyle(arrayIndex, delay, color) {
    setTimeout(() => {
        if (color == 'green') {
            arrayIndex.classList.add('pulse-anim-green');
        } else if (color == 'yellow') {
            arrayIndex.classList.add('pulse-anim-yellow');
        } else {
            arrayIndex.classList.add('pulse-anim-grey');
        }
    }, delay)
}

// arrayIndex.classList.add('pulse-anim-green');

window.addEventListener('keydown', event => {
    // currentActive = document.querySelector('.active');
    validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    console.log(randomWord);
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
    } else if (event.key == 'Enter') {
        let userWord = '';
        for (let i = 0; i < letterInput.length; i++) {
            userWord += letterInput[i].innerHTML;
        }
        console.log(randomWord);
        console.log(userWord);
        if (userWord.length < 5) {
            alert('guess length too small');
        } else if (!wordList.includes(userWord.toLowerCase())) {
            alert('word not in word list')
        } else {
            if (userWord == randomWord) {
                for (let i = 0; i < userWord.length; i++) {
                    applyStyle(letterInput[i], i * 300, 'green');
                }
            } else {
                let applyStyleArray = [];
                let randomWordArray = randomWord.split('')
                for (let i = 0; i < userWord.length; i++){
                    if (userWord[i] == randomWord[i]) {
                        applyStyleArray.push('green');
                    } else if (randomWordArray.includes(userWord[i])) {
                        applyStyleArray.push('yellow');
                        randomWordArray.slice(i, 1);
                    } else {
                        applyStyleArray.push('grey');
                    }
                }
                for (let i = 0; i < letterInput.length; i++) {
                    applyStyle(letterInput[i], i * 300, applyStyleArray[i]);
                }
                guessRowIndex++;
                activeRow.classList.remove('active_row');
                activeRow = guessRows[guessRowIndex];
                activeRow.classList.add('active_row');
                letterInput = Array.from(activeRow.children);
                letterInput[0].classList.add('active');
                currentIndex = 0;
            }
        }
    }
})

loadWords();