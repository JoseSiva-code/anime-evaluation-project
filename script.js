// Create the main container for the application. All dynamic page elements will be placed inside it.
// Cria o contentor principal da aplicação. Todos os elementos dinâmicos da página vão ficar dentro dele.
const app = document.createElement("div");
app.classList.add("app");

// Add the main container to the body so it becomes visible in the browser.
// Adiciona o contentor principal ao body para que ele fique visível no browser.
document.body.appendChild(app);

// Create the header area that holds the samurai image and the main title.
// Cria a área de cabeçalho que contém a imagem do samurai e o título principal.
const header = document.createElement("header");
header.classList.add("page-header");

// Create the samurai image used as a decorative visual beside the title.
// Cria a imagem do samurai usada como elemento visual decorativo ao lado do título.
const samuraiImage = document.createElement("img");
samuraiImage.src = "assets/samurai-anime.png";
samuraiImage.alt = "Black and gold samurai armor";
samuraiImage.classList.add("samurai-image");

const title = document.createElement("h1");
title.textContent = "Top Anime";

// Create a wrapper around the samurai image so we can add a floor shadow with CSS.
// Cria um contentor à volta da imagem do samurai para podermos adicionar uma sombra no chão com CSS.
const samuraiWrapper = document.createElement("div");
samuraiWrapper.classList.add("samurai-wrapper");

samuraiWrapper.appendChild(samuraiImage);

header.appendChild(title);
header.appendChild(samuraiWrapper);

app.appendChild(header);

// Create the main content area. This will hold the anime grid and the details panel.
// Cria a área principal de conteúdo. Aqui ficam a grelha dos animes e o painel de detalhes.
const main = document.createElement("main");
main.classList.add("main-content");

// Add the main area after the title, keeping the page structure organized.
// Adiciona a área principal depois do título, mantendo a estrutura da página organizada.
app.appendChild(main);

// Create the grid where each filtered anime card will be inserted.
// Cria a grelha onde cada card de anime filtrado será inserido.
const animeGrid = document.createElement("section");
animeGrid.classList.add("anime-grid");

// Place the anime grid inside the main content area.
// Coloca a grelha de animes dentro da área principal de conteúdo.
main.appendChild(animeGrid);

// Create the side panel that will show more information when an anime is selected.
// Cria o painel lateral que vai mostrar mais informação quando um anime for selecionado.
const detailsPanel = document.createElement("aside");
detailsPanel.classList.add("details-panel", "hidden");

// Add the details panel to the main area, but it starts hidden because no anime is selected yet.
// Adiciona o painel de detalhes à área principal, mas ele começa escondido porque ainda não há anime selecionado.
main.appendChild(detailsPanel);

// Create the footer that will contain the copyright sentence required by the exercise.
// Cria o rodapé que vai conter a frase de copyright pedida no exercício.
const footer = document.createElement("footer");

// Get the current year automatically so the footer does not need manual updates.
// Vai buscar o ano atual automaticamente para o rodapé não precisar de alterações manuais.
const currentYear = new Date().getFullYear();

// Add the footer text in one sentence with the copyright symbol, year, and author name.
// Adiciona o texto do rodapé numa só frase com o símbolo de copyright, ano e nome do autor.
footer.textContent = `© ${currentYear} José Silva`;

// Place the footer at the end of the main application container.
// Coloca o rodapé no fim do contentor principal da aplicação.
app.appendChild(footer);

// Store the API URL in a variable so it is easy to reuse or change later.
// Guarda o URL da API numa variável para ser fácil reutilizar ou alterar mais tarde.
const apiUrl = "https://api.jikan.moe/v4/top/anime";

// Show the selected anime details in the side panel.
// Mostra os detalhes do anime selecionado no painel lateral.
function showAnimeDetails(anime) {
  detailsPanel.classList.remove("hidden");

  detailsPanel.textContent = "";

  // Create the selected anime title so the user knows which card is being shown.
  // Cria o título do anime selecionado para o utilizador saber que card está a ser mostrado.
  const detailsTitle = document.createElement("h2");
  detailsTitle.textContent = anime.title;

  // Show the score value that was also used to filter the anime list.
  // Mostra o valor do score que também foi usado para filtrar a lista de animes.
  const detailsScore = document.createElement("p");
  detailsScore.textContent = `Score: ${anime.score}`;

  // Show the age/content rating provided by the API.
  // Mostra a classificação etária/de conteúdo fornecida pela API.
  const detailsRating = document.createElement("p");
  detailsRating.textContent = `Rating: ${anime.rating || "Not available"}`;

  // Create a text with all genre names separated by commas.
  // Cria um texto com todos os nomes dos géneros separados por vírgulas.
  const genreNames = anime.genres.map(function(genre) {
    return genre.name;
  }).join(", ");

  // Show the anime genres provided by the API.
  // Mostra os géneros do anime fornecidos pela API.
  const detailsGenres = document.createElement("p");
  detailsGenres.textContent = `Genres: ${genreNames || "Not available"}`;

  // Show the anime type, such as TV, Movie, OVA, or Special.
  // Mostra o tipo do anime, como TV, Movie, OVA ou Special.
  const detailsType = document.createElement("p");
  detailsType.textContent = `Type: ${anime.type || "Not available"}`;

  // Show the number of episodes when this information exists in the API response.
  // Mostra o número de episódios quando esta informação existe na resposta da API.
  const detailsEpisodes = document.createElement("p");
  detailsEpisodes.textContent = `Episodes: ${anime.episodes || "Not available"}`;

  // Show the current release status of the anime.
  // Mostra o estado atual de lançamento do anime.
  const detailsStatus = document.createElement("p");
  detailsStatus.textContent = `Status: ${anime.status || "Not available"}`;

  // Show a short description of the anime story when the API provides one.
  // Mostra uma pequena descrição da história do anime quando a API fornece essa informação.
  const detailsSynopsis = document.createElement("p");
  detailsSynopsis.classList.add("synopsis");

  const synopsisLabel = document.createElement("strong");
  synopsisLabel.textContent = "Synopsis: ";

  const synopsisText = document.createElement("span");
  synopsisText.textContent = anime.synopsis || "Not available";

  detailsSynopsis.appendChild(synopsisLabel);
  detailsSynopsis.appendChild(synopsisText);

  // Show the release date. If the API does not provide a date, show a fallback message.
  // Mostra a data de lançamento. Se a API não fornecer uma data, mostra uma mensagem alternativa.
  const detailsReleaseDate = document.createElement("p");
  detailsReleaseDate.textContent = `Release date: ${anime.aired.string || "Not available"}`;

  detailsPanel.appendChild(detailsTitle);
  detailsPanel.appendChild(detailsScore);
  detailsPanel.appendChild(detailsRating);
  detailsPanel.appendChild(detailsReleaseDate);
  detailsPanel.appendChild(detailsGenres);
  detailsPanel.appendChild(detailsType);
  detailsPanel.appendChild(detailsEpisodes);
  detailsPanel.appendChild(detailsStatus);
  detailsPanel.appendChild(detailsSynopsis);
}

// Receive the filtered anime list and create one visual card for each anime.
// Recebe a lista de animes filtrada e cria um card visual para cada anime.
function displayAnimeList(animeList) {
  animeList.forEach(function(anime) {
    // Create one card to group the image and title of the current anime.
    // Cria um card para agrupar a imagem e o título do anime atual.
    const animeCard = document.createElement("article");
    animeCard.classList.add("anime-card");

    // Create the anime image using the image URL provided by the API.
    // Cria a imagem do anime usando o URL da imagem fornecido pela API.
    const animeImage = document.createElement("img");
    animeImage.src = anime.images.jpg.image_url;
    animeImage.alt = anime.title;

    // When the image is clicked, show the details of that anime.
    // Quando a imagem for clicada, mostra os detalhes desse anime.
    animeImage.addEventListener("click", function() {
      // Remove the selected style from any card that was previously clicked.
      // Remove o estilo de seleção de qualquer card que tenha sido clicado antes.
      const selectedCard = document.querySelector(".anime-card.selected");

      if (selectedCard) {
        selectedCard.classList.remove("selected");
      }

      // Add the selected style to the card that belongs to the clicked image.
      // Adiciona o estilo de seleção ao card que pertence à imagem clicada.
      animeCard.classList.add("selected");

      showAnimeDetails(anime);
    });

    // Create the anime title using the title provided by the API.
    // Cria o título do anime usando o nome fornecido pela API.
    const animeTitle = document.createElement("h2");
    animeTitle.textContent = anime.title;

    // Add the image and title to the card before placing the card on the page.
    // Adiciona a imagem e o título ao card antes de colocar o card na página.
    animeCard.appendChild(animeImage);
    animeCard.appendChild(animeTitle);

    animeGrid.appendChild(animeCard);
  });
}

// Get the anime data from the API, filter it, and send the filtered list to the display function.
// Vai buscar os dados dos animes à API, filtra-os e envia a lista filtrada para a função que mostra os cards.
fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // The API response has a data property that contains the array of anime.
    // A resposta da API tem uma propriedade data que contém o array/lista de animes.
    const animeList = data.data;

    // Keep only anime with a score higher than 9, as required by the exercise.
    // Mantém apenas os animes com score superior a 9, como pedido no exercício.
    const highScoreAnime = animeList.filter(function(anime) {
      return anime.score > 9;
    });

    displayAnimeList(highScoreAnime);
  });
