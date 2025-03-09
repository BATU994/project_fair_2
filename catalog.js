const grid = document.getElementById("grid");

async function doing() {
  const resp = await fetch(
    "https://67c92f840acf98d070892402.mockapi.io/movies"
  );
  const data = await resp.json();
  console.log(data);
  let arr = data.map((item) => ({
    name: item.name,
    genres: item.genres,
    overview: item.overview,
    id: item.id,
    pop: item.pop,
    poster: item.poster || `https://placehold.co/400`,
    backdrop: item.backdrop,
    rate: item.rate,
  }));
  console.log(arr);
  createMovie(arr);
}

function createMovie(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].overview.length);
    let overview = arr[i].overview;
    if (arr[i].overview.length > 150) {
      overview = arr[i].overview.slice(0, 150) + "...";
    }
    let tex = document.createElement("div");
    tex.classList.add("tex");
    tex.innerHTML = `
        <img src="${arr[i].poster}" alt="Poster">
        <h1>${arr[i].name}</h1>
        <div class="overflow">
            ${overview}
        </div>
        <p>Rating: ${arr[i].rate}</p>`;
    tex.style.cssText = "cursor:pointer;";
    grid.appendChild(tex);
    tex.addEventListener("click", () => {
      window.location.href = `details.html?id=${arr[i].id}`;
    });
  }
}

window.addEventListener("DOMContentLoaded", doing);
