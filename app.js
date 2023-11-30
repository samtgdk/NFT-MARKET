const COLLECTIONS_DUMP = COLLECTIONS;

const createCategories = () => {
  const filterCategoriesEl = document.querySelector(".filter__categories");

  let categories = ["all"];

  COLLECTIONS.forEach((item) => {
    if (categories.findIndex((c) => c == item.category) == -1) {
      categories.push(item.category);
    }
  });
  const categorySwitcher = {
    all: "All",
    sport: "Sport",
    collectibles: "Collectibles",
    art: "Art",
    photography: "Photography",
    music: "Music",
  };

  categories.forEach((category) => {
    let categoryHTML = `
        <li class="${
          category == "all" ? "active" : ""
        }" onclick="filterCategories(this)" data-category="${category}"">${
      categorySwitcher[category]
    }</li>
      `;

    filterCategoriesEl.insertAdjacentHTML("beforeend", categoryHTML);
  });
};

const filterCategories = (categoryEl) => {
  const lastActiveEl = document.querySelector("li.active");
  lastActiveEl.classList.remove("active");

  categoryEl.classList.add("active");
  if (categoryEl.dataset.category == "all") {
    COLLECTIONS = COLLECTIONS_DUMP;
  } else {
    COLLECTIONS = COLLECTIONS_DUMP.filter(
      (collection) => collection.category == categoryEl.dataset.category
    );
  }

  listCollections();
};

const listCollections = () => {
  const collectionEl = document.querySelector(".collections");
  collectionEl.innerHTML = "";
  COLLECTIONS.forEach((collection) => {
    let collectionsItemHTML = `  <div class="collections__item">
    <a class="collection__container" href="${collection.link}">
      <img class="collection__img" src="${collection.img}" />
      <div class="collection__info">
        <strong class="collection__title">${collection.name}</strong><br />
        <span>${collection.author}</span>
      </div>
      <div class="collection__price">
        <strong>${collection.price} ETH</strong>
        <img
          src="./images/ethereum-logo.png"
          width="24px"
          height="24px"
        />
      </div>
      <button>Show detail..</button>
    </a>
  </div>`;
    collectionEl.insertAdjacentHTML("beforeend", collectionsItemHTML);
  });
};

const searchCollections = (searchKey) => {
  if (searchKey.length > 1) {
    COLLECTIONS = COLLECTIONS_DUMP.filter((c) =>
      c.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    COLLECTIONS = COLLECTIONS_DUMP;
  }
  listCollections();
};

createCategories();
listCollections();
