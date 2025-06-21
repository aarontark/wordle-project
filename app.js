let guessContainer = document.querySelector('.guess_container');
let guessRows = Array.from(guessContainer.children);
let activeRow = document.querySelector('.active_row');
let letterInput = Array.from(activeRow.children);
let keyboardLetters = Array.from(document.querySelectorAll('.key_input'));
let enterKey = document.querySelector('.enter_key');
let backspaceKey = document.querySelector('.backspace_key')
let endContainer = document.querySelector('.end_container');
let endTitle = document.querySelector('.end_title')
let restartBtn = document.querySelector('.restart_btn');
let wordDisplay = document.querySelector('.word');
let currentIndex = 0;
let guessRowIndex = 0;
let wordList;
let randomWord;
let letterColors = {};

for (element of keyboardLetters) {
    letterColors[element.innerHTML] = element;
}

async function loadWords() {
    const response = await fetch('data/words.txt');
    const text = await response.text();
    words = text.split('\n').map(word => word.trim()).filter(Boolean);
    const randomIndex = Math.floor(Math.random() * 2316) - 1;
    wordList = words; 
    randomWord = words[randomIndex].toUpperCase();
}

function letterEvent(key) {
    if (currentIndex == 4) {
        currentActive = document.querySelector('.active');
        currentActive.innerHTML = key.toUpperCase();
        currentIndex++;
        currentActive.classList.remove('active');
    } else if (currentIndex < 4) {
        currentActive = document.querySelector('.active');
        currentActive.innerHTML = key.toUpperCase();
        currentIndex++;
        currentActive.classList.remove('active');
        letterInput[currentIndex].classList.add('active');
    } else {
        return;
    }
}

function backspaceEvent() {
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

function enterEvent() {
    let userWord = '';
    for (let i = 0; i < letterInput.length; i++) {
        userWord += letterInput[i].innerHTML;
    }
    if (userWord.length < 5) {
        alert('not enough letters');
    } else if (!wordList.includes(userWord.toLowerCase())) {
        alert('word not in word list')
    } else {
        // if user guesses correct word
        if (userWord == randomWord) {
            for (let i = 0; i < userWord.length; i++) {
                applyStyle(letterInput[i], i * 300, 'green');
            }
            endGame('win');
            // if user guesses incorrect word
        } else {
            let applyStyleArray = ['grey', 'grey', 'grey', 'grey', 'grey'];
            let userWordArray = userWord.split('');
            let randomWordArray = randomWord.split('');
            checkCorrectLetter(userWordArray, randomWordArray, applyStyleArray);
            checkMisplacedLetter(userWordArray, randomWordArray, applyStyleArray);
            for (let i = 0; i < letterInput.length; i++) {
                applyStyle(letterInput[i], i * 300, applyStyleArray[i]);
            }
            if (guessRowIndex >= 5) {
                window.removeEventListener('keydown', windowListener);
                endGame('lose');
            } else {
                window.removeEventListener('keydown', windowListener);
                changeRow();
            }
        }
    }
}

function windowListener(event) {
    validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (validLetters.includes(event.key.toUpperCase())) {       
        letterEvent(event.key);
    } else if (event.key == 'Backspace') {
        backspaceEvent();
    } else if (event.key == 'Enter') {
        enterEvent();
    }
}

function applyStyle(arrayIndex, delay, color) {
    setTimeout(() => {
        let letterStyle = letterColors[arrayIndex.innerHTML]
        if (color == 'green') {
            arrayIndex.classList.add('pulse-anim-green');
            if (!(letterStyle == undefined)) {
                letterStyle.style.backgroundColor = '#538d4e';
                delete letterColors[arrayIndex.innerHTML];
            }
        } else if (color == 'yellow') {
            arrayIndex.classList.add('pulse-anim-yellow');
            if (!(letterStyle == undefined)) {
                letterStyle.style.backgroundColor = '#b59f3b';
            }
        } else {
            arrayIndex.classList.add('pulse-anim-grey');
            if (!(letterStyle == undefined)) {
                if (!(letterStyle.style.backgroundColor == 'rgb(181, 159, 59)')) {
                    letterStyle.style.backgroundColor = '#3a3a3c';
                }
            }
        }
    }, delay)
}

function endGame(result) {
    setTimeout(() => {
        wordDisplay.innerHTML = randomWord;
        if (result == 'win') {
            endTitle.innerHTML = 'You win!';
            endContainer.style.display = 'flex';
        } else {
            endTitle.innerHTML = 'You lose!';
            endContainer.style.display = 'flex';
        }
    }, 2500)
}

function changeRow(){
    setTimeout(() => {
        guessRowIndex++;
        activeRow = guessRows[guessRowIndex];
        letterInput = Array.from(activeRow.children);
        letterInput[0].classList.add('active');
        currentIndex = 0;
        window.addEventListener('keydown', windowListener);
    }, 1800)
}

function checkCorrectLetter(userWordArray, randomWordArray, styleArray) {
    for (let i = 0; i < userWordArray.length; i++) {
        if (userWordArray[i] == randomWordArray[i]) {
            styleArray[i] = 'green';
            randomWordArray[i] = '*';
            userWordArray[i] = '*';
        }
    }
}

function checkMisplacedLetter(userWordArray, randomWordArray, styleArray) {
    for (let i = 0; i < userWordArray.length; i++) {
        if (randomWordArray.includes(userWordArray[i])) {
            for (let j = 0; j < randomWordArray.length; j++) {
                if (userWordArray[i] == randomWordArray[j]) {
                    if (styleArray[i] == 'green') {
                        break;
                    } else {
                        styleArray[i] = 'yellow';
                        randomWordArray[j] = '*';
                        break;
                    }
                }
            }
        }
    }
}

// arrayIndex.classList.add('pulse-anim-green');

window.addEventListener('keydown', windowListener);

if (window.innerWidth <= 800) {
    for (const letter of keyboardLetters) {
        letter.addEventListener('touchstart', () => letterEvent(letter.innerHTML));
    }
    enterKey.addEventListener('touchstart', enterEvent);
    backspaceKey.addEventListener('touchstart', backspaceEvent);
    restartBtn.addEventListener('touchstart', () => {
        window.location.reload();
    })
} else {
    for (const letter of keyboardLetters) {
        letter.addEventListener('click', () => letterEvent(letter.innerHTML));
    }
    enterKey.addEventListener('click', enterEvent);
    backspaceKey.addEventListener('click', backspaceEvent);
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    })
}

loadWords();

// code for mobile

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);