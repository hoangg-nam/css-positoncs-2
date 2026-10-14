const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const movieGrid = document.getElementById("movieGrid");
const emptyMessage = document.getElementById("emptyMessage");
const mainVideo = document.getElementById("mainVideo");
const featuredTitle = document.getElementById("featuredTitle");
const playButton = document.getElementById("playButton");
const categoryButtons = document.querySelectorAll(".category");
let activeCategory = "all";

function renderMovies() {
  const query = searchInput.value.trim().toLocaleLowerCase("vi");
  const cards = Array.from(movieGrid.querySelectorAll(".movie-card"));

  cards.sort((a, b) => {
    if (sortSelect.value === "newest") {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    }
    return Number(b.dataset.views) - Number(a.dataset.views);
  });

  let visibleCount = 0;
  cards.forEach(card => {
    const title = card.dataset.title.toLocaleLowerCase("vi");
    const category = card.dataset.category;
    const matchesText = title.includes(query);
    const matchesCategory = activeCategory === "all" ||
      category === activeCategory ||
      (activeCategory === "Việt Nam" && true);
    const visible = matchesText && matchesCategory;
    card.hidden = !visible;
    if (visible) visibleCount++;
    movieGrid.appendChild(card);
  });
  emptyMessage.hidden = visibleCount !== 0;
}

function chooseMovie(card) {
  const title = card.dataset.title;
  const videoId = card.dataset.video;
  featuredTitle.textContent = title;
  mainVideo.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  document.querySelector(".featured").scrollIntoView({ behavior: "smooth", block: "start" });
}

searchInput.addEventListener("input", renderMovies);
sortSelect.addEventListener("change", renderMovies);
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
    activeCategory = button.dataset.category;
    renderMovies();
  });
});
movieGrid.querySelectorAll(".movie-card").forEach(card => {
  card.querySelector(".poster").addEventListener("click", () => chooseMovie(card));
});
playButton.addEventListener("click", () => {
  mainVideo.scrollIntoView({ behavior: "smooth", block: "center" });
});

renderMovies();
