const url = "https://api.noroff.dev/api/v1/gamehub";
const bestOffersContainer = document.getElementById("bestOffers_container");
const loadingIndicator = document.getElementById("loadingIndicator");

async function getData() {
  // How to make loading indicator stay longer on a screen? without using setTimeout?
  displayLoadingIndicator();
  const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
  const data = await response.json();
  displayGames(data);
  return data;
}

getData();

async function displayGames(games) {
  games.forEach((game) => {
    loadingIndicator.innerHTML = "";
    bestOffersContainer.innerHTML += `      
      <div class="bestsellers-container">
        <img class="bestellers-covers" src=${game.image} /         
       </div>
       <div class="description">
       <p>${game.title}  <span>Price: $${game.price}</span></p>       
       <p>${game.description}</p>
       <button><a href="productDetails.html?id=${game.id}&title=${game.title}">Buy now!</button>                
      </div>
    `;
  });
}

// Only works for millisecond, cant even notice it
function displayLoadingIndicator() {
  loadingIndicator.innerHTML = "<h4>Loading....</h4>";
}

// carousel

const imgsContainer = document.getElementById("image-carousel-container");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const images = document.querySelectorAll("#image-carousel-container img");

let index = 0;

let interval = setInterval(runImages, 2500);

function runImages() {
  index++;
  changeImages();
}

function changeImages() {
  if (index > images.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = images.length - 1;
  }

  imgsContainer.style.transform = `translateX(${-index * 700}px)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(runImages, 2500);
}

rightBtn.addEventListener("click", () => {
  index++;

  changeImages();
  resetInterval();
});

leftBtn.addEventListener("click", () => {
  index--;

  changeImages();
  resetInterval();
});
