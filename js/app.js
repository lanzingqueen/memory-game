/*
 * Create a list that holds all of your cards
 */
document.getElementsByClassName('restart')[0].addEventListener('click', function() {
    document.querySelectorAll('li.card').forEach(function(card) {
        card.classList.remove('open', 'show', 'match');
    });
    //shuffle(document.getElementsByClassName('card'));
    console.log(document.getElementsByClassName('card'))
    var deck = document.getElementsByClassName('card');
    deckArr = [];
    for(var i = 0; i < deck.length; i++) {
        deckArr.push(deck[i]);
    }
    deckArr = shuffle(deckArr);
    console.log(deckArr);
    deck.innerHTML = "";
    document.getElementById("deck").innerHTML = "";
    for(var i = 0; i < deckArr.length; i++) {
        document.getElementById("deck").appendChild(deckArr[i]);
    }
    clearTimer();
});


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
    console.log('shuffled');
    console.log(array);
    return array;
}

//figure out how to flip 2 cards and not the same card over and over
var lastFlipped = null;
var shouldClickable = true;

document.querySelectorAll('li.card').forEach(function(card) {
    card.addEventListener('click', function() {
       //move this to somewhere else and make sure it doesn't get confused
       var star = document.getElementsByClassName("fa-star")[0];
       star.parentNode.removeChild(star);
       console.log(star)
       //

        if (shouldClickable === false) {
            console.log('cannot click again');
            return;
        }
        if (lastFlipped === card) {
            console.log('stop clicking yourself!');
            return;
        }
        if (card.classList.contains('match')) {
            console.log("leave it alone");
            return;
        }
        if (timer === undefined) {
            setTimer();
        }
        if(lastFlipped) {
            shouldClickable = false;
            card.classList.add('open', 'show');
            console.log("second ", lastFlipped, card);
            setTimeout(function() {
                if (lastFlipped.firstElementChild.classList[1] === card.firstElementChild.classList[1]) {
                    console.log ("matched, yo!");
                    lastFlipped.classList.remove('open', 'show');
                    lastFlipped.classList.add('match');
                    card.classList.remove('open', 'show');
                    card.classList.add('match');
                }
                else {
                    lastFlipped.classList.remove('open', 'show');
                    card.classList.remove('open', 'show');
                    console.log("wrong");
                }
                lastFlipped = null;
                shouldClickable = true;
            }, 300);
          //  compareCards (lastFlipped, card);
            
        }
        else {
            lastFlipped = card;
            lastFlipped.classList.add('open', 'show');
            console.log("first clicked card ", card, card.firstElementChild, card.firstElementChild.classList[1])
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
var timer = undefined;

function setTimer() {
    timer = setInterval(function() {
        time++;
        var str = "";
        var minutes = Math.floor(time/60);
        if (minutes >= 0 && minutes <= 9) {
            str += "0" + minutes;
        } else {
            str += minutes;
        }
        str+=":";
        var seconds = time % 60;
        if(seconds >=0 && seconds <=9) {
            str += "0" + seconds;
        } else {
            str += seconds;
        }
        console.log(time);
        document.getElementById('timer').innerHTML=str;
    }, 1000);
};

function clearTimer() {
    clearInterval(timer);
    timer = undefined;
    time = 0;
}



//when all cards have been matched
function gameOver () {

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)

 const allCards = document.querySelectorAll('.card');

 allCards.forEach(function(card) {
    card.addEventListener('click', function() {
        card.classList.add('open', 'show')
    });
 });

  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//move counter

let move = 0;
function addMove() {
    if (bool === true) {
       move++; 
    }
    else if (bool === false) {
        move--;   
    }
}
 //flip cards
 