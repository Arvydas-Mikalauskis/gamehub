const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const gameId = urlParams.get("id");

const title = urlParams.get("title");

async function getGameDetails(gameId) {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/gamehub/${gameId}`
  );
  const data = await response.json();
  return data;
}

async function getGameTitle() {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/gamehub/${title}`
  );
  const data = await response.json();
  return data;
}

getGameDetails(gameId)
  .then((game) => {
    const gameDetailsContainer = document.getElementById("gameDetails");
    const gameTitle = document.getElementById("gameTitle");
    gameTitle.textContent = title;

    gameDetailsContainer.innerHTML = `      
    <a href="Index.html"><button class="backToHomeBtn">Back Home</button></a>
      <div class=detailsDescription>
        <img src="${game.image}" alt="${game.title}" />
        <div class=gameDetails>
          <h2>${game.title}</h2>
          <p>Description: ${game.description}</p>
          <p>Price: $${game.price}</p> 
          <button>Add to cart</button> 
        </div>     
      </div>     
    `;
  })
  .catch((error) => {
    console.error("Error: Game not found", error);
  });
