const mostPop = document.getElementById("most_popular");
const highly = document.getElementById("highly_rated");
let arr = [];
const navSh = document.querySelector(".navSh");
navSh.style.display = "none";
window.onload = function () {
  const username = localStorage.getItem("username");
  const disUser = document.querySelector("userName");
  disUser.innerHTML = username;
};
function navShow() {
  if (navSh.style.display === "flex") {
    navSh.style.display = "none";
  } else {
    navSh.style.display = "flex";
  }
}

async function fetchMovies() {
  try {
    const response = await fetch(
      "https://67c92f840acf98d070892402.mockapi.io/movies"
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    arr = data.map((item) => ({
      name: item.name,
      genres: item.genres,
      overview: item.overview,
      id: item.id,
      pop: item.pop,
      poster: item.poster || `https://placehold.co/400`,
      backdrop: item.backdrop,
      rate: item.rate,
    }));
    mostPopular();
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function mostPopular() {
  mostPop.innerHTML = "";
  highly.innerHTML = "";

  arr.forEach((movie) => {
    if (parseFloat(movie.pop) > 100) {
      createMovieCard(movie, mostPop);
    }
    if (parseFloat(movie.rate) > 7) {
      createMovieCard(movie, highly);
    }
  });
}

function createMovieCard(movie, container) {
  let div = document.createElement("div");
  div.classList.add("movie");
  div.dataset.id = movie.id;

  let img = document.createElement("img");
  img.src = movie.poster;
  img.alt = movie.name;
  img.onerror = () => {
    img.src = "https://placehold.co/400x600";
  };

  let title = document.createElement("div");
  title.classList.add("movie-title");
  title.textContent = movie.name;

  let rating = document.createElement("p");
  rating.textContent = `Rating: ${movie.rate}`;
  title.appendChild(rating);

  div.appendChild(img);
  div.appendChild(title);
  container.appendChild(div);

  div.addEventListener("click", () => {
    window.location.href = `details.html?id=${movie.id}`;
  });
}

fetchMovies();

function searchMovies() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const searchResults = document.getElementById("searchResults");
  const filteredMovies = arr.filter((movie) =>
    movie.name.toLowerCase().includes(searchInput)
  );

  searchResults.innerHTML = "";

  if (searchInput.trim() === "") {
    searchResults.style.display = "none";
    return;
  }

  if (filteredMovies.length > 0) {
    filteredMovies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie-result");

      const img = document.createElement("img");
      img.src = movie.poster;
      img.alt = movie.name;
      img.onerror = () => {
        img.src = "https://placehold.co/50x75";
      };

      const rating = document.createElement("div");
      rating.classList.add("movie-rating");
      rating.textContent = `${movie.name}`;

      movieDiv.appendChild(img);
      movieDiv.appendChild(rating);
      searchResults.appendChild(movieDiv);
      movieDiv.addEventListener("click", () => {
        window.location.href = `details.html?id=${movie.id}`;
      });
    });
    searchResults.style.display = "block";
  } else {
    searchResults.innerHTML = "<div class='no-results'>No results found</div>";
    searchResults.style.display = "block";
  }
}

document.addEventListener("click", (event) => {
  const searchResults = document.getElementById("searchResults");
  const searchInput = document.getElementById("searchInput");

  if (!event.target.closest(".search")) {
    searchResults.style.display = "none";
  }
});

$(document).ready(function () {
  $(".carousel").carousel({
    dist: -40,
    shift: 20,
    padding: 0,
    numVisible: 3,
    indicators: true,
    noWrap: false,
    duration: 200,
    fullWidth: false,
    onCycleTo: null,
    responsive: {
      0: {
        numVisible: 1,
      },
      600: {
        numVisible: 2,
      },
      1000: {
        numVisible: 3,
      },
    },
  });

  $(".carousel-item").click(function (e) {
    e.preventDefault();
    $(".carousel").carousel("next");
  });

  $(".carousel").mouseenter(function () {
    $(this).css("cursor", "pointer");
  });

  setInterval(function () {
    $(".carousel").carousel("next");
  }, 3000);
});

function refreshCaro() {
  if (
    window.matchMedia("(max-width: 768px)").matches &&
    window.matchMedia("(max-width: 400px)").matches
  ) {
    $(document).ready(function () {
      $(".carousel").carousel({
        dist: -40,
        shift: 20,
        padding: 0,
        numVisible: 3,
        indicators: false,
        responsive: {
          0: {
            numVisible: 1,
          },
          600: {
            numVisible: 2,
          },
          1000: {
            numVisible: 3,
          },
        },
      });
    });
  }
}

refreshCaro();
