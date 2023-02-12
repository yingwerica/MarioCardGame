//init cards
let cardsArray = [{
    'name': 'shell',
    'img': './images/blueshell.png'
  }, {
    'name': 'star',
    'img': './images/star.png'
  }, {
    'name': 'bomb',
    'img': './images/bomb.png'
  }, {
    'name': 'mario',
    'img': './images/mario.png'
  }, {
    'name': 'luigi',
    'img': './images/luigi.png'
  }, {
    'name': 'peach',
    'img': './images/peach.png'
  }, {
    'name': '1up',
    'img': './images/greenmushroom.png'
  }, {
    'name': 'mushroom',
    'img': './images/mushroom.png'
  }, {
    'name': 'shellrun',
    'img': './images/shellrun.png'
  }, {
    'name': 'flower',
    'img': './images/flower.png'
  }, {
    'name': 'coin',
    'img': './images/coin.png'
  }, {
    'name': 'goomba',
    'img': './images/goomba.png'
  }];


/////////////display 12 cards///////////////////
// Grab the div with an id of game
const game = document.getElementById('game')

// Create a section with a class of grid, which is doing<section class="grid"></section>
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')

// Append the grid section to the game div
game.appendChild(grid)

// For each item in the cardsArray array...doing <div class="card" data-name="shell" style="background-image: url("img/blueshell.png");"></div>
// cardsArray.forEach((item) => {
//     // Create a div
//     const card = document.createElement('div')
  
//     // Apply a card class to that div
//     card.classList.add('card')
  
//     // Set the data-name attribute of the div to the cardsArray name
//     card.dataset.name = item.name
  
//     // Apply the background image of the div to the cardsArray image
//     card.style.backgroundImage = `url(${item.img})`
  
//     // Append the div to the grid section
//     grid.appendChild(card)
//   })

/////////////duplicate the 12 cards making 12 pairs total ///////////////
let gameCards = cardsArray.concat(cardsArray)
//shuffle the cards
gameCards.sort(() => Math.random() - 0.5);

gameCards.forEach((item) => {
    //create card element with the name dataset
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = item.name

    //create front of card
    const front = document.createElement('div')
    front.classList.add('front')
    front.style.backgroundImage = `url('./images/questionmark.gif')`

    //create back of the card
    const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`

    //append card to grid, and front and back to each card
    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
}
)

////////////////variaties//////////
let currentPlayer = 1;
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousClick = null;
let score1 = 0;
let score2 = 0;
let delay = 1200;
let promptVisible = document.getElementById('prompt').style.visibility
let prompt = document.getElementById('prompt')

//////////////////////input and display two players name////////////////////////
let playerName1;
document.getElementById('nameinput1').onclick = function() {
  // input validation
    if (document.getElementById('text1').value == null || document.getElementById('text1').value == '') {
        prompt.innerText =" Please enter your name to play."
    }else {
    playerName1 = document.getElementById('text1').value 
    console.log(playerName1)
    //display the input in a <P> element
    let playername1 = document.createElement('p')
    playername1.id = 'name1'
    let player1 = document.getElementById('player1')
    player1.appendChild(playername1)
    document.getElementById('name1').innerText = playerName1
    document.getElementById('mylabel1').remove()
    document.getElementById('text1').remove()
    document.getElementById('nameinput1').remove()
    promptVisible = 'hidden';
    }
}

let playerName2;
document.getElementById('nameinput2').onclick = function() {
    if (document.getElementById('text2').value == null || document.getElementById('text2').value == '' ) {
        prompt.innerText =" Please enter your name to play."
    }else {
    playerName2 = document.getElementById('text2').value 
    console.log(playerName2)
    let playername2 = document.createElement('p')
    playername2.id = 'name2'
    let player2 = document.getElementById('player2')
    player2.appendChild(playername2)
    document.getElementById('name2').innerText = playerName2
    document.getElementById('mylabel2').remove()
    document.getElementById('text2').remove()
    document.getElementById('nameinput2').remove()
    promptVisible = 'hidden';
    }
}

///////////start game after valid names input, button disabled after clicked//////////
document.getElementById('start').onclick = function() {
    if (document.getElementById('name1') == null || document.getElementById('name2') == null) {
        prompt.innerText = "Please enter player's name."
       
    } else {
        prompt.innerText = `Game on!!  ${playerName1}, please click on any card to find a match.`
        gameRound()//disable cards clicking until game start
        document.getElementById('start').disabled = true
        document.getElementById('start').classList.add('disabled')
    }
}


// Add match CSS and increment the score
const matchOfCards = () => {
    let selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
      card.classList.add('match')
    })
    if (currentPlayer === 1){
    document.getElementById("score1").innerText = `Score: ${score1}`
    } else {
    document.getElementById("score2").innerText = `Score: ${score2}`   
    }
    //one round is over
    if (document.querySelectorAll('.match').length === 24) {
        winnerOfTheRound();
        }
  }


//reset the guess count after two to continue the game
const resetCount = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    //remove the selected CSS
    let selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
      card.classList.remove('selected')
    })
}



//game round is over, report the winner
const winnerOfTheRound = () => {
    if (score1 === score2) {
        prompt.innerText = 'Wow!!Even steven!You both win! Refresh the page to start a new round.'
        promptVisible = 'visible' 
    } else if (score1 > score2) {
        prompt.innerText = `Terrific!! ${playerName1} is the winner! Refresh the page to start a new round.`
        promptVisible = 'visible' 
    } else {
        prompt.innerText = `Terrific!! ${playerName2} is the winner! Refresh the page to start a new round.`
        promptVisible = 'visible' 
    }
}

//////////timer between each first and second guess and reset timer////////
let timeleft = 5;
let timer;

const resetTimer = () => {
    if (currentPlayer === 1) {
        setTimeout(() => {document.getElementById("timer1").innerHTML = `Time: 5 sec`}, delay)
    } else {
        setTimeout(() => {document.getElementById("timer2").innerHTML = `Time: 5 sec`}, delay)
    }
}

//timer count down
function countdown() {
    //time's up, but did not make the second guess yet
  if(timeleft <= 0 && count === 1 && currentPlayer === 1){
    clearInterval(timer);
    document.getElementById("timer1").innerHTML = "Time is up!";
    prompt.innerText = `Dang! Time's up. Now it's ${playerName2}'s turn.`
    promptVisible = 'visible'
    //timer reset must be earlier than player reset,since timer is reading the current player
    setTimeout(resetTimer, 1500)
    setTimeout(()=>{currentPlayer = 2}, 2000)
    timeleft = 5
    resetCount()
    
  } else if (timeleft <= 0 && count === 1 && currentPlayer === 2) {
    clearInterval(timer);
    document.getElementById("timer2").innerHTML = "Time is up!";
    prompt.innerText = `Dang! Time's up. Now it's ${playerName1}'s turn.`
    promptVisible = 'visible'
    setTimeout(resetTimer, 1500)
    setTimeout(()=>{currentPlayer = 1}, 2000)
    timeleft = 5
    resetCount()
    
  } else if(timeleft > 0 && count === 1 && currentPlayer === 1){
    document.getElementById("timer1").innerHTML = `Time: ${timeleft} sec`;
  } else if(timeleft > 0 && count === 1 && currentPlayer === 2){
    document.getElementById("timer2").innerHTML = `Time: ${timeleft} sec`;
  }
  timeleft -= 1;
}

////////////////////////////game round////////////////////////////////
// Add event listener to grid, and only allow two cards to be selected at a time, conditions to evalue if there is a match
const gameRound = () => {
    grid.addEventListener('click', function (event) {
        promptVisible = 'hidden'
        // The event target is the clicked item
        let clicked = event.target
        console.log(clicked)
        // let test = document.getElementsByClassName('selected')
        // console.log(test)
      
        // Do not allow the grid section itself to be selected; only select divs inside the grid
        // and click on the same card (front or back) twice is not valid
        // and disable the fliping of already matched cards
        // and avoid odd case clicking on the card div causing grid rotate
        if (clicked.nodeName === 'SECTION' || 
            clicked.parentNode.classList.contains('selected') ||
            clicked.parentNode.classList.contains('match') ||
            clicked.classList.contains('card')    
            ) {
            return
        } 

        
        //limit the selected cards number to 2
        if (count < 2) {
            count++;
            //assign first guess and second guess after clicks
            if (count === 1) {
                //add timer
                timer = setInterval(countdown, 1000)

                firstGuess = clicked.parentNode.dataset.name; //each click is clicking on an inner div(front), but the name is on the outer div(card)
                // Add selected class
                clicked.parentNode.classList.add("selected");
            } else {
                //stop the timer
                clearInterval(timer);
                timeleft = 5;

                secondGuess = clicked.parentNode.dataset.name;
                // Add selected class
                clicked.parentNode.classList.add("selected");
            }
            // If both guesses are not empty...
            if (firstGuess && secondGuess) {
                // if the first guess matches the second match
                if (firstGuess === secondGuess) {
                    if (currentPlayer === 1){
                        score1++;
                    }else {
                        score2++;
                    }
                    prompt.innerText = 'Bravo!!You found a match.Go find more!'
                    promptVisible = 'visible'
                   
                    //add delay after selections
                    setTimeout(matchOfCards, delay);
                    setTimeout(resetCount, delay);

                    //reset the timer display
                    setTimeout(resetTimer, delay);

    
                    
                }else {
                    //not a match, the other player's turn
                    if (currentPlayer === 1) {
                        prompt.innerText = `Oops! Not a match. Now it's ${playerName2}'s turn.`
                        promptVisible = 'visible'
                    
                        setTimeout(resetCount, delay);  
                        resetTimer()
                        currentPlayer = 2
                    } else {
                        prompt.innerText = `Oops! Not a match.Now it's ${playerName1}'s turn.`
                        promptVisible = 'visible'
                       
                        setTimeout(resetCount, delay);  
                        resetTimer()
                        currentPlayer = 1
                    };                    
                }
            }
        
        }  
    })
}

  