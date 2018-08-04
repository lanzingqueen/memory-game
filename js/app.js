/*
 * Reset button
 */
document.getElementsByClassName('restart')[0].addEventListener('click', reset);
// Reset functionality (resets timer, moves, stars, match counter, shuffles deck, and flips all cards back over)
function reset() {
    document.querySelectorAll('li.card').forEach(function(card) {
        card.classList.remove('open', 'show', 'match');
    });
    //shuffle(document.getElementsByClassName('card'));
    //console.log(document.getElementsByClassName('card'))
    let deck = document.getElementsByClassName('card');
    deckArr = [];
    for(let i = 0; i < deck.length; i++) {
        deckArr.push(deck[i]);
    }
    deckArr = shuffle(deckArr);
    //console.log(deckArr);
    deck.innerHTML = "";
    document.getElementById("deck").innerHTML = "";
    for(let i = 0; i < deckArr.length; i++) {
        document.getElementById("deck").appendChild(deckArr[i]);
    }
    let modal = document.getElementById('congrats');
    modal.style.display = "none";
    clearTimer();
    resetMoves();
    resetStars();
    resetMatches();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
let lastFlipped = null;
let shouldClickable = true;
let matchCount = 0;

//function for when each card is clicked
function cardClicked(event) {
    card = event.target;
     if (shouldClickable === false) {
         //console.log('cannot click again');
         return;
     }
     //prevent clicking same card over and over
     if (lastFlipped === card) {
         //console.log('stop clicking yourself!');
         return;
     }
     //prevent clicking when already matched
     if (card.classList.contains('match')) {
         //console.log("leave it alone");
         return;
     }
     //start timer when a legit click has been made (if not already started)
     if (timer === undefined) {
         setTimer();
     }
     //matched logic
     if(lastFlipped) {
         shouldClickable = false;
         card.classList.add('open', 'show');
         //console.log("second ", lastFlipped, card);
         addMove();
         setTimeout(function() {
             if (lastFlipped.firstElementChild.classList[1] === card.firstElementChild.classList[1]) {
                 //console.log ("matched, yo!");
                 lastFlipped.classList.remove('open', 'show');
                 lastFlipped.classList.add('match');
                 card.classList.remove('open', 'show');
                 card.classList.add('match');
                 matchCount++;
                 if (matchCount === 8) {
                    //console.log ('pop-up goes here');
                    gameOver();
                 };
                 //console.log(matchCount + " Match");
             }
             else {
                 //flip back over and delay so user can see what the second card was
                 lastFlipped.classList.remove('open', 'show');
                 card.classList.remove('open', 'show');
                 //console.log("wrong");
             }
             //reset flipped and clickable logic for next move
             lastFlipped = null;
             shouldClickable = true;
         }, 300);
     }
     //  flip cards back over
     else {
         addMove();
         lastFlipped = card;
         lastFlipped.classList.add('open', 'show');
         console.log("first clicked card ", card, card.firstElementChild, card.firstElementChild.classList[1])
     }
 }
function eachCard(card) {
    card.addEventListener('click', cardClicked);    
}

document.querySelectorAll('li.card').forEach(eachCard);

//timer start
let time = 0;
let timer = undefined;

function setTimer() {
    timer = setInterval(function() {
        time++;
        let str = "";
        let minutes = Math.floor(time/60);
        if (minutes >= 0 && minutes <= 9) {
            str += "0" + minutes;
        } else {
            str += minutes;
        }
        str+=":";
        let seconds = time % 60;
        if(seconds >=0 && seconds <=9) {
            str += "0" + seconds;
        } else {
            str += seconds;
        }
        console.log(time);
        //document.getElementsByClassName('timer').innerHTML=str;
        document.querySelectorAll('.timer').forEach(function(timer) {
            timer.innerHTML=str;
        });
    }, 1000);
};

//timer clear
function clearTimer() {
    clearInterval(timer);
    timer = undefined;
    time = 0;
    document.querySelectorAll('.timer').forEach(function(timer) {
        timer.innerHTML='0:00';
    });
}

//when all cards have been matched
function gameOver() {
    let modal = document.getElementById('congrats');
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block";
    pauseTimer();
    modalStars();
}

//move counter
let move = 0;
starsRemoved = 0;
function addMove() {
    move++;
    console.log(move);
    movesText = document.querySelectorAll('.moves').forEach(function(moves){
        moves.innerHTML=Math.floor(move/2);
    });
    console.log('Move added');
    //decrease star ratings
    if (move == 25) {
        let star = document.getElementById("stars").firstElementChild;
        star.classList.add('hide-star');
        starsRemoved++;
        //console.log("star removed ,",star)
    } 
    if (move == 35) {
        let star = document.getElementById("stars").children[1];
        star.classList.add('hide-star');
        //console.log("star removed ,",star)
        starsRemoved++;
    }
    //console.log(`Stars Removed = ${starsRemoved}`);
}

//pause timer when game is over
function pauseTimer() {
    console.log('timer paused');
    clearInterval(timer);
}

//reset stars in the modal pop-up
function modalStars() {
    let starCount = '';
    starCount = `${3-starsRemoved}`;
    let star = document.querySelector('#modal-stars').innerHTML = starCount;
}

//reset match counter
function resetMatches() {
    matchCount = 0;
}

//reset move counter
function resetMoves() {
    move = 0;
    movesText = document.querySelector('.moves');
    movesText.innerHTML = move;
    console.log('reset moves')
}

//reset stars
function resetStars() {
    let star1=document.getElementById('stars').children[0];
    let star2=document.getElementById('stars').children[1];
    star1.classList.remove('hide-star');
    star2.classList.remove('hide-star');
    starsRemoved = 0;
}    