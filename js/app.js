/*
 * Create a list that holds all of your cards
 */
function createCard (className) {

}

/*
 * Display the cards on the page*/

function createGameBoard () {

}

 /*   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//figure out how to flip 2 cards and not the same card over and over
var lastFlipped = null;

document.querySelectorAll('li.card').forEach(function(card) {
    card.addEventListener('click', function() {
        if(lastFlipped) {
            console.log(lastFlipped, card);
            lastFlipped = card;
            compareCards (lastFlipped, card);
        }
        else {
            lastFlipped = card;
        }
    })
})

//compare cards once clicked
/*function compareCards (cardA, cardB) {
    if class.CardA === class.CardB {
        class.remove (open show);
        class.add (match);
        removeEventListener;
    }
    else {
        //not match
    }
}*/

//timer start and clear
var time = 0;
var timer = '';

function setTimer() {
    timer = setInterval(function() {
        time++;
        console.log(time);
    }, 1000);
};

function clearTimer() {
    clearInterval(timer);
}

//trigger function for timer video 40 minutes

//when all cards have been matched
function gameOver () {

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)*/

 const allCards = document.querySelectorAll('.card');

 allCards.forEach(function(card) {
    card.addEventListener('click', function() {
        card.classList.add('open', 'show')
    });
 });

/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//move counter

var count = 5
function moveCounter(bool) {
    if (bool === true) {
       count++; 
    }
    else if (bool === false) {
        count--;   
    }
}
 //flip cards
 