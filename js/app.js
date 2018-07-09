/*
 * Create a list that holds all of your cards
 */
document.getElementsByClassName('restart')[0].addEventListener('click', function() {
    document.querySelectorAll('li.card').forEach(function(card) {
        card.classList.remove('open', 'show', 'match');
    });
    //shuffle(document.getElementsByClassName('card'));
    //console.log(document.getElementsByClassName('card'))
    var deck = document.getElementsByClassName('card');
    deckArr = [];
    for(var i = 0; i < deck.length; i++) {
        deckArr.push(deck[i]);
    }
    deckArr = shuffle(deckArr);
    //console.log(deckArr);
    deck.innerHTML = "";
    document.getElementById("deck").innerHTML = "";
    for(var i = 0; i < deckArr.length; i++) {
        document.getElementById("deck").appendChild(deckArr[i]);
    }
    clearTimer();
    resetMoves();
    resetStars();
    resetMatches();
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
    //console.log(array);
    return array;
}

//figure out how to flip 2 cards and not the same card over and over
var lastFlipped = null;
var shouldClickable = true;
var matchCount = 0;

function cardClicked(event) {
    card = event.target;
    addMove();
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
                 matchCount++;
                 if (matchCount === 8) {
                     console.log ('pop-up goes here');
                    gameOver();
                 };
                 //console.log(matchCount + " Match");
             }
             else {
                 lastFlipped.classList.remove('open', 'show');
                 card.classList.remove('open', 'show');
                 console.log("wrong");
             }
             lastFlipped = null;
             shouldClickable = true;
         }, 300);
     }
     //  compareCards (lastFlipped, card);
     else {
         lastFlipped = card;
         lastFlipped.classList.add('open', 'show');
         console.log("first clicked card ", card, card.firstElementChild, card.firstElementChild.classList[1])
     }
 }
function eachCard(card) {
    card.addEventListener('click', cardClicked);    
}

document.querySelectorAll('li.card').forEach(eachCard);

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
    document.getElementById('timer').innerHTML='00:00';
}

//when all cards have been matched
function gameOver() {
    var modal = document.getElementById('congrats');
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block";
}

//move counter
var move = 0;
starsRemoved = []
function addMove() {
    move++;
    console.log(move);
    movesText = document.querySelector('#moves');
    movesText.innerHTML = move;
    console.log('Move added');
    //move this to somewhere else and make sure it doesn't get confused
    if (move == 20) {
        var star = document.getElementById("stars").firstElementChild;
        star.classList.add('hide-star');

        console.log("star removed ,",star)
    } 
    if (move == 25) {
        var star = document.getElementById("stars").children[1];
        star.classList.add('hide-star');

        console.log("star removed 22,",star)
    }
}

function resetMatches() {
    matchCount = 0;

}
function resetMoves() {
    move = 0;
    movesText = document.querySelector('#moves');
    movesText.innerHTML = move;
}

function resetStars() {
    var star1=document.getElementById('stars').children[0];
    var star2=document.getElementById('stars').children[1];
    star1.classList.remove('hide-star');
    star2.classList.remove('hide-star');
}    