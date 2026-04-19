window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("main");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      movies.forEach((movie) => {
        const movieEl = document.createElement("article");
        movieEl.id = movie.imdbID;

        movieEl.innerHTML = /*html*/ `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <div>
                        <h3>${movie.Title}</h3>
                        <p>Runtime: ${movie.Runtime}</p>
                        <p>Released: ${movie.Released}</p>
                        <div>
                            ${movie.Genres.map((genre) => `<span class="genre">${genre}</span>`).join("")}
                        </div>
                        <p>${movie.Plot}</p>
                        <h4>Director</h4>
                        <ul>
                            ${movie.Directors.map((d) => `<li>${d}</li>`).join("")}
                        </ul>
                        <h4>Writers</h4>
                        <ul>
                            ${movie.Writers.map((w) => `<li>${w}</li>`).join("")}
                        </ul>
                        <h4>Actors</h4>
                        <ul>
                            ${movie.Actors.map((a) => `<li>${a}</li>`).join("")}
                        </ul>
                        <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
                          <button class="edit-btn">Edit</button>
                        </div>

                    </div>
                `;
        movieEl.querySelector(".edit-btn").onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };
        bodyElement.append(movieEl);
      });
    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText,
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
