class AudioController { // a class is basically a blueprint that allows flexibility 
    constructor() {
        this.bgMusic = new Audio('Assets/Audio/creepy.mp3');
        this.flipSound = new Audio('Assets/Audio/flip.wav');
        this.matchSound = new Audio('Assets/Audio/match.wav');
        this.victorySound = new Audio('Assets/Audio/victory.wav');
        this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
        this.bgMusic.volume = 0.5; //the music in this file is originally loud so its to tone it down putting volume halfway
        this.bgMusic.loop = true; // to set the music to loop so it doesnt just end 
    }
    startMusic() { //we are making method functions that we can call to do specific things within the AudioController class
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0; //putting time back to zero so it was go back to the start
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null; // we want this in order to have the card thats being check to not be able to be flipped until the matching is done
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
    }
    canFlipCard(card) {
        return true;
        // return (!this.busy && !this.matchedCards.includes(card) && card != this.cardToCheck);
    }
    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks; //inner text is being updated 
            card.classList.add('visible'); //adds the visible class to all the cards
        }
    }
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); //event listener: anticpates and responds 
} else {
    ready();
}
// if the HTML page has not finished loading, but an event listener on the DOM so that when it is loaded call ready()
// else its already loaded and call ready()

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text')); //document.getElement is an HTML collection whereas Array.from creates an array from whatever inside ()
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    //add click event listeners so when we click on overlays or cards it will respond to a specific action

    overlays.forEach(overlay => { //defining a function name
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        })
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    });
}