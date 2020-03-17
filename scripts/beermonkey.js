let input = document.getElementById('input');
let abv_gt = document.getElementById('abv_gt');
let food = document.getElementById('food');
let ibu_gt = document.getElementById('ibu_gt');
let beerSection = document.getElementById('beers');

// const thenBeer = () => {
//   let id = input.value;
//   fetch('https://api.punkapi.com/v2/beers/'+id)
//     .then(res => res.json())
//     .then(data => {
//       displayBeer(data[0])
//       console.log(data[0])
//     }
//       )
// }

const asyncBeer = async() => {
  beerSection.innerHTML = '';
  let URL = 'https://api.punkapi.com/v2/beers/'
  let optionsArr = [[abv_gt.value, 'abv_gt='],[ibu_gt.value, 'ibu_gt='],[food.value, 'food=']]
  let url = composeURL(optionsArr, URL);
  console.log(url);
  let response = await fetch(url);
  let results = await response.json();
  let beers = results;
  displayBeers(beers);
  console.log(beers);
}

const composeURL = (arr, string) => {
  arr.forEach(item => {
    if(item[0] && string.length > 33) {
      string += '&' + item[1] + item[0]
    } else if (item[0]) {
      string += '?' + item[1] + item[0]
    }
  } )
  return string
}

abv_gt.addEventListener('change', asyncBeer);
ibu_gt.addEventListener('change', asyncBeer);
food.addEventListener('change', asyncBeer);

const displayBeers = (beersArr) => {
  beersArr.forEach(beer => renderBeer(beer));
}

// const displayBeer = (beer) => {
//   let imgContainer = document.getElementById('img-container');
//   imgContainer.innerHTML = '';
//   const name = document.getElementById('name')
//   name.innerText = beer.name;
//   const abv = document.getElementById('abv');
//   abv.innerText = beer.abv;
//   const desc = document.getElementById('desc');
//   desc.innerText = beer.description;
//   let img = document.createElement('img');
//   img.src = beer.image_url;
//   img.classList.add('beer-img')
//   imgContainer.appendChild(img)
// }

const renderBeer = (beer) => {
  let imgContainer = document.createElement('div');
  let infoContainer = document.createElement('div');
  let card = document.createElement('div');
  let img = document.createElement('img');
  let h1 = document.createElement('h1');
  let h2 = document.createElement('h2');
  let p = document.createElement('p');
  let ul = document.createElement('ul');
  let food = beer.food_pairing.map(pairingLis);

  imgContainer.classList.add('img-container');
  infoContainer.classList.add('info-container');
  card.classList.add('beer-card');

  img.src = beer.image_url;
  img.classList.add('beer-img');
  
  h1.innerText = beer.name;
  h2.innerText = beer.abv;
  p.innerText = beer.description;
  
  food.forEach(pairing => ul.appendChild(pairing));
  
  imgContainer.appendChild(img);
  
  infoContainer.appendChild(h1);
  infoContainer.appendChild(h2);
  infoContainer.appendChild(p);
  infoContainer.appendChild(ul);
  
  card.appendChild(imgContainer);
  card.appendChild(infoContainer);

  beerSection.appendChild(card);
}

const pairingLis = (food) => {
  let li = document.createElement('li')
  li.innerText = food
  return li
}

window.onload = (event) => {
  console.log('window is loaded', event);
  asyncBeer();
}