const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimi&format=json&origin=*&srsearch=";
t = 20;

const form = document.querySelector(".form");
const formInput = document.querySelector(".form-input");
const btn = document.querySelector(".submit-btn");
const resultsContainer = document.querySelector(".results");
const page_url = "http://en.wikipedia.org/?curid=";

const fetchItem = async (value) => {
  resultsContainer.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(`${url}${value}`);
    const data = await response.json();
    const list = data.query.search;
    if (list.lenght < 1) {
      resultsContainer.innerHTML = `<div>no matching results</div>`;
      return;
    }

    showItem(list);
  } catch (error) {
    resultsContainer.innerHTML = `<div>there was an error</div>`;
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = formInput.value;
  if (!value) {
    resultsContainer.innerHTML = `<div>please enter text</div>`;
    return;
  }

  fetchItem(value);
});

const showItem = (list) => {
  const newList = list
    .map((item) => {
      console.log(item);
      const { pageid, title, snippet: info } = item;
      return `
          <a 'href=http://en.wikipedia.org/?curid=${pageid}' target="'blank">
            <h4>${title}</h4>
            <p>
              ${info}
            </p>
          </a>`;
    })
    .join("");

  resultsContainer.innerHTML = `<div class="articles">${newList}</div>`;
};
