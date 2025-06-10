let guessContainer = document.querySelector('.guess_container');
let guessRows = Array.from(guessContainer.children);
let activeRow = document.querySelector('.active_row');
let letterInput = Array.from(activeRow.children);
let endContainer = document.querySelector('.end_container');
let endTitle = document.querySelector('.end_title')
let restartBtn = document.querySelector('.restart_btn');
let wordDisplay = document.querySelector('.word');
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

function windowListener(event) {
    validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (validLetters.includes(event.key.toUpperCase())) {       
        if (currentIndex == 4) {
            currentActive = document.querySelector('.active');
            currentActive.innerHTML = event.key.toUpperCase();
            currentIndex++;
            currentActive.classList.remove('active');
        } else if (currentIndex < 4) {
            currentActive = document.querySelector('.active');
            currentActive.innerHTML = event.key.toUpperCase();
            currentIndex++;
            currentActive.classList.remove('active');
            letterInput[currentIndex].classList.add('active');
        } else {
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
        console.log(randomWord);
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
    

restartBtn.addEventListener('click', () => {
    window.location.reload();
})

loadWords();