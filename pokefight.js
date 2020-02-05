console.log('app.js here...');
let playerTwo = null;
let playerOne;

const fetchPokeOne = (name) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(res => res.json())
  .then(json => {playerOne = json})
}

const fetchPokeTwo = (name) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(res => res.json())
  .then(json => {playerTwo = json})
}

const playerOneBtn = document.getElementById('player-1-btn');

playerOneBtn.addEventListener('change', ()=>{
  let input = playerOneBtn.value;
  fetchPokeOne(input);
})

const submitPlayerOne = document.getElementById('submit-1');

submitPlayerOne.addEventListener('click', ()=> {
  displayPlayer(1);
})

const playerTwoBtn = document.getElementById('player-2-btn');

playerTwoBtn.addEventListener('change', ()=>{
  let input = playerTwoBtn.value;
  fetchPokeTwo(input);
})

const submitPlayerTwo = document.getElementById('submit-2');

submitPlayerTwo.addEventListener('click', ()=> {
  displayPlayer(2);
})

// const fetchPlayerOne = fetch('https://pokeapi.co/api/v2/pokemon/charmeleon')
//   .then(res => res.json())
//   .then(json => {playerOne = json});

// const fetchPlayerTwo = fetch('https://pokeapi.co/api/v2/pokemon/jigglypuff')
// .then(res => res.json())
// .then(json => {playerTwo = json});

const listStat = (stat, num) => {
  let player;
  if (num === 1) {
    player = playerOne;
  } else {
    player = playerTwo;
  }
  let index = player.stats.findIndex(element => element.stat.name === `${stat}`);
  let fetchedData = player.stats[index].base_stat;
  let li = document.createElement('li');
  li.innerText = `${stat} : ${fetchedData}`;
  return li;
}

const displayPlayer = (num) => {
  let player;
  if(num === 1) {
    player = playerOne
    spriteUrl = playerOne.sprites.back_default;
    string = 'One'
  } else {
    player = playerTwo
    spriteUrl = playerTwo.sprites.front_default;
    string = 'Two'
  }
  let name = player.name;
  let image = document.createElement('img');
  image.src = spriteUrl;
  let playerDisplay = document.getElementById(`player${string}`);
  let nameDiv = document.createElement('div');
  nameDiv.classList.add('playerName');
  nameDiv.innerText = `${name}`;
  playerDisplay.appendChild(nameDiv);
  playerDisplay.appendChild(image);
  let statDiv = document.createElement('div');
  statDiv.id = `statsBoxPlayer${string}`;
  playerDisplay.appendChild(statDiv);
  let statList = document.createElement('ul');
  statDiv.appendChild(statList);
  statList.appendChild(listStat('speed', num));
  statList.appendChild(listStat('special-defense', num));
  statList.appendChild(listStat('special-attack', num));
  statList.appendChild(listStat('defense', num));
  statList.appendChild(listStat('attack', num));
  statList.appendChild(listStat('hp', num));
}

const fight = () => {
  let text;
  let winnerDiv = document.getElementById('winner-div');
  if(playerOne.stats[0].base_stat > playerTwo.stats[0].base_stat){
    text = `${playerOne.name} wins!`
  } else {
    text = `${playerTwo.name} wins!`
  }
  let p = document.createElement('p');
  p.innerText = text;
  winnerDiv.appendChild(p);
}

const fightBtn = document.getElementById('fight');
fightBtn.addEventListener('click', fight);