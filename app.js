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

/////////////duplicate the 12 cards making 24 cards total so that we have 12 card pairs///////////////
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

////////////////////////select cards and if two selected are a match////////////////////////////////

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousClick = null;
let score = 0;
let delay = 1200;

// Add match CSS and increment the score
const match = () => {
    let selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
      card.classList.add('match')
    })
    document.getElementById("score").innerText = `Score: ${score}` 
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

// Add event listener to grid, and only allow two cards to be selected at a time, conditions to evalue if there is a match
grid.addEventListener('click', function (event) {
    // The event target is the clicked item
    let clicked = event.target
    let test = document.getElementsByClassName('selected')
    console.log
  
    // Do not allow the grid section itself to be selected; only select divs inside the grid
    // and click on the same card twice are not valid
    // and disable the fliping of already matched cards
    if (clicked.nodeName === 'SECTION' || 
        clicked === previousClick ||
        clicked.parentNode.classList.contains('match')
    ) {
      return
    }
    //limit the selected cards number to 2
    if (count < 2) {
        count++;
        //assign first guess and second guess after clicks
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name; //each click is clicking on an inner div(front or back), but the name is on the outer div(card)
            // Add selected class
            clicked.parentNode.classList.add("selected");
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            // Add selected class
            clicked.parentNode.classList.add("selected");
        }
         // If both guesses are not empty...
        if (firstGuess !== '' && secondGuess !== '') {
            // and the first guess matches the second match...
            if (firstGuess === secondGuess) {
                score++;
                //add delay after selections
                setTimeout(match, delay);
                setTimeout(resetCount, delay);
            }else {
                setTimeout(resetCount, delay);
            }
        }

    }  
  })

 


  