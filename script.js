const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const definitionContainer = document.querySelector("#definition-container");
const sourceSelect = document.querySelector("#source-select");
const darkModeToggle = document.querySelector("#dark-mode-toggle");
// import { API_KEY } from "./api-keys";

searchButton.addEventListener("click", function () {
    const word = searchInput.value;
    const source = sourceSelect.value;

    definitionContainer.innerHTML = "Loading...";

    fetch(`https://api.dictionaryapi.dev/${source}/${word}?api_key=2efa2f86-ba82-4766-a79b-fd039838158a`)
    // fetch(`https://api.dictionaryapi.dev/${source}/${word}`)
        .then((response) => response.json())
        .then((data) => {
            definitionContainer.innerHTML = "";

            if (data.message) {
                definitionContainer.innerHTML = `<p>${data.message}</p>`;
                return;
            }

            const definitionElements = data.definitions.map(
                (definition) => `
        <div class="definition">
          <h2>${definition.word}</h2>
          <p>${definition.definition}</p>
        </div>
      `
            );

            definitionContainer.innerHTML = definitionElements.join("");
        });
});

darkModeToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
});
