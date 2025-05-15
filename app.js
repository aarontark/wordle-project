let letterInput = Array.from(document.querySelectorAll('.letter-input'));
let currentIndex = 0;

window.addEventListener('keydown', event => {
    currentActive = document.querySelector('.active');
    validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (event.key == 'Backspace') {
        if (currentIndex == 0){
            currentActive.innerHTML = '';
            return;
        } else {
            currentActive.innerHTML = '';
            currentActive.classList.remove('active');
            currentIndex--;
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
    // current_active = document.querySelector('.active');
    // current_active.innerHTML = event.key;
    // current_index = letterInput.indexOf(current_active);
    // current_active.classList.remove('active');
    // letterInput[current_index + 1].classList.add('active');
})