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

// Create a section with a class of grid
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
  let pairArray = cardsArray.concat(cardsArray)
  pairArray.forEach((item) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = item.name
    card.style.backgroundImage = `url(${item.img})`
    grid.appendChild(card)
  }
  )