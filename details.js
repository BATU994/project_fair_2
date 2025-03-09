const href = window.location.href;
if (href.includes("id=")) {
  const id = href.slice(href.indexOf("id=") + 3).split("&")[0];
  console.log(id);
  console.log(`Length of ID: ${id.length}`);
  fetchMovieDetails(id);
} else {
  console.error("No ID found in the URL.");
}

const body = document.querySelector("body");

async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `https://67c92f840acf98d070892402.mockapi.io/movies?id=${movieId}`
    );

    const movies = await response.json();
    const movie = movies[0];
    console.log(movie);
    document.getElementById("poster").src =
      movie.poster || "https://placehold.co/400";
    document.querySelector(".overview").textContent = movie.overview;
    document.querySelector(".rate").textContent = `Rating: ${movie.rate}`;

    const genresList = document.querySelector(".genres");
    genresList.innerHTML = movie.genres
      .map((genre) => `<li>${genre}</li>`)
      .join("");

    body.style.backgroundImage = `url(${movie.backdrop})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backdropFilter = "blur(30px)";
    overlay.style.zIndex = "-1";
    body.appendChild(overlay);
  } catch (error) {
    console.error(error);
  }
}
