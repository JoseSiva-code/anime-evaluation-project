// Create the main container for the application.
const app = document.createElement("div");
app.classList.add("app");

// Add the main container to the page body.
document.body.appendChild(app);

// Create the main page title.
const title = document.createElement("h1");
title.textContent = "Top Anime";

// Add the title inside the main container.
app.appendChild(title);

// Create the main content area of the page.
const main = document.createElement("main");
main.classList.add("main-content");

// Add the main content area inside the main container.
app.appendChild(main);

// Create the grid where the anime cards will appear later.
const animeGrid = document.createElement("section");
animeGrid.classList.add("anime-grid");

// Add the anime grid inside the main content area.
main.appendChild(animeGrid);

// Create the side panel that will show anime details.
const detailsPanel = document.createElement("aside");
detailsPanel.classList.add("details-panel", "hidden");

// Add the details panel inside the main content area.
main.appendChild(detailsPanel);

// Create the footer for the page.
const footer = document.createElement("footer");

// Get the current year automatically.
const currentYear = new Date().getFullYear();

// Add the footer text with the current year and author name.
footer.textContent = `© ${currentYear} José Silva`;

// Add the footer inside the main container.
app.appendChild(footer);

// Store the API URL that will give us the top anime data.
const apiUrl = "https://api.jikan.moe/v4/top/anime";

// Display the filtered anime list on the page.
function displayAnimeList(animeList) {
  animeList.forEach(function(anime) {
    const animeCard = document.createElement("article");
animeCard.classList.add("anime-card");

const animeImage = document.createElement("img");
animeImage.src = anime.images.jpg.image_url;
animeImage.alt = anime.title;

const animeTitle = document.createElement("h2");
animeTitle.textContent = anime.title;

animeCard.appendChild(animeImage);
animeCard.appendChild(animeTitle);

animeGrid.appendChild(animeCard);

// Get the anime data from the API.
fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const animeList = data.data;

    const highScoreAnime = animeList.filter(function(anime) {
      return anime.score > 9;
    });

    displayAnimeList(highScoreAnime);
  });