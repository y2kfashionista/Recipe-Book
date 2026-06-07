// document.getElementById looks for an element by its id attribute.
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

// Step 2: Listen for a click on the hamburger button.
// When clicked, toggle the 'open' class on the nav.
hamburger.addEventListener("click", function () {
  nav.classList.toggle("open");
});

// An object stores related data together as key: value pairs.
const singleRecipe = {
  id: 1,
  name: "Jollof Rice",
  category: "dinner",
  cuisine: "Nigerian",
  emoji: "🍚",
  ingredients: ["2 cups rice", "Tomato paste", "Onions", "Seasoning"],
  instructions: "Fry tomato base, add stock, cook rice in sauce until tender.",
  isFavorite: false,
};

// Access any value using dot notation:
console.log(singleRecipe.name); // 'Jollof Rice'
console.log(singleRecipe.ingredients[0]); // '2 cups rice'
console.log(singleRecipe.isFavorite); // false

// Arrays hold multiple items in order, using square brackets [ ].
// We use 'let' because we will add and remove recipes later.
let recipes = [
  {
    id: 1,
    name: "Jollof Rice",
    category: "dinner",
    cuisine: "Nigerian",
    emoji: "🍚",
    ingredients: [
      "2 cups rice",
      "Tomato paste",
      "Onions",
      "Seasoning",
      "Chicken stock",
    ],
    instructions: "Fry tomato base, add stock, cook rice in sauce.",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Avocado Toast",
    category: "breakfast",
    cuisine: "International",
    emoji: "🥑",
    ingredients: [
      "2 slices bread",
      "1 ripe avocado",
      "Salt",
      "Pepper",
      "Lemon",
    ],
    instructions: "Toast bread. Mash avocado with lemon and salt. Spread.",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Chicken Pasta",
    category: "dinner",
    cuisine: "Italian",
    emoji: "🍝",
    ingredients: [
      "200g pasta",
      "Chicken breast",
      "Cream",
      "Garlic",
      "Parmesan",
    ],
    instructions: "Cook pasta. Fry garlic and chicken, add cream, toss.",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Mango Smoothie",
    category: "snack",
    cuisine: "Tropical",
    emoji: "🥭",
    ingredients: ["2 mangoes", "1 cup milk", "Honey", "Ice cubes"],
    instructions: "Blend all until smooth. Serve cold.",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "dessert",
    cuisine: "American",
    emoji: "🎂",
    ingredients: [
      "Flour",
      "Cocoa",
      "Sugar",
      "Eggs",
      "Butter",
      "Milk",
      "Baking powder",
    ],
    instructions: "Mix ingredients, bake at 180C for 35 minutes.",
    isFavorite: false,
  },
];

// Find the grid container once.
const recipeGrid = document.getElementById("recipeGrid");

function renderRecipes(recipesToShow) {
  if (recipesToShow.length === 0) {
    recipeGrid.innerHTML = `
            <div class='empty-state'>
                <div class='icon'>🍽</div>
                <p>No recipes found. Try adding one!</p>
            </div>
        `;
    return;
  }

  let html = "";

  recipesToShow.forEach(function (recipe) {
    const preview = recipe.ingredients
      .slice(0, 3)
      .map(
        (ing) => `<span style='font-size:0.8rem;color:#6B7280'>• ${ing}</span>`,
      )
      .join("<br>");

    const heart = recipe.isFavorite ? "❤" : "🤍";
    const favClass = recipe.isFavorite
      ? "btn-icon btn-favorite active"
      : "btn-icon btn-favorite";

    html += `
            <div class='card'>
                <div class='card-header'>${recipe.emoji || "🍽"}</div>
                <div class='card-body'>
                    <h3 class='card-title'>${recipe.name}</h3>
                    <span class='card-badge'>${recipe.category}</span>
                    <p class='card-cuisine'>Cuisine: ${recipe.cuisine}</p>
                    <div style='margin-top:8px'>${preview}</div>
                </div>
                <div class='card-actions'>
                    <button class='btn-icon btn-delete'
                            data-id='${recipe.id}'>🗑 Delete</button>
                    <button class='btn-icon btn-shopping'
                            data-id='${recipe.id}'>🛒 Shop</button>
                    <button class='${favClass}'
                            data-id='${recipe.id}'>${heart} Fav</button>
                </div>
            </div>
        `;
  });

  recipeGrid.innerHTML = html;
  attachCardEvents(); // We write this later
}

// Placeholder so the app does not crash yet
function attachCardEvents() {}

// Call the function immediately to show all recipes
renderRecipes(recipes);

const modalOverlay = document.getElementById("modalOverlay");
const openFormBtn = document.getElementById("openFormBtn");
const modalClose = document.getElementById("modalClose");
const saveRecipeBtn = document.getElementById("saveRecipeBtn");

// Open modal
openFormBtn.addEventListener("click", function () {
  modalOverlay.classList.add("open");
});

// Close modal with X button
modalClose.addEventListener("click", function () {
  modalOverlay.classList.remove("open");
});

// Close modal by clicking the dark overlay behind it
modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove("open");
  }
});

// Save the new recipe
saveRecipeBtn.addEventListener("click", function () {
  const name = document.getElementById("recipeName").value.trim();
  const category = document.getElementById("recipeCategory").value;
  const cuisine = document.getElementById("recipeCuisine").value.trim();
  const emoji = document.getElementById("recipeEmoji").value.trim() || "🍽";
  const instruct = document.getElementById("recipeInstructions").value.trim();

  // Ingredients: textarea value → split by newline → remove empty lines
  const ingredients = document
    .getElementById("recipeIngredients")
    .value.split("\n")
    .map(function (line) {
      return line.trim();
    })
    .filter(Boolean);

  if (!name || ingredients.length === 0) {
    alert("Please enter a name and at least one ingredient.");
    return;
  }

  const newRecipe = {
    id: Date.now(),
    name: name,
    category: category,
    cuisine: cuisine || "Not specified",
    emoji: emoji,
    ingredients: ingredients,
    instructions: instruct,
    isFavorite: false,
  };

  recipes.push(newRecipe);
  renderRecipes(recipes);
  modalOverlay.classList.remove("open");
  clearForm();
});

function clearForm() {
  document.getElementById("recipeName").value = "";
  document.getElementById("recipeCuisine").value = "";
  document.getElementById("recipeIngredients").value = "";
  document.getElementById("recipeInstructions").value = "";
  document.getElementById("recipeEmoji").value = "";
}

function attachCardEvents() {
  const deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(this.dataset.id);

      if (!confirm("Delete this recipe?")) return;

      // Filter OUT the recipe with this ID.
      // We keep all recipes where id does NOT match.
      recipes = recipes.filter(function (recipe) {
        return recipe.id !== id;
      });

      renderRecipes(recipes);
    });
  });

  document.querySelectorAll(".btn-favorite").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleFavorite(Number(this.dataset.id));
    });
  });
  document.querySelectorAll(".btn-shopping").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openShoppingList(Number(this.dataset.id));
    });
  });
}

// Placeholders — full versions coming soon
function toggleFavorite(id) {}
function openShoppingList(id) {}

const searchInput = document.getElementById("searchInput");

// 'input' fires on every keystroke — gives us real-time filtering
searchInput.addEventListener("input", function () {
  applyFilters();
});

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = document.getElementById("categoryFilter").value;

  const filtered = recipes.filter(function (recipe) {
    const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
    const cuisineMatch = recipe.cuisine.toLowerCase().includes(searchTerm);
    const textMatch = nameMatch || cuisineMatch;

    const catMatch =
      selectedCategory === "all" || recipe.category === selectedCategory;

    return textMatch && catMatch;
  });

  renderRecipes(filtered);
}

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", function () {
  applyFilters(); // Same function as the search — it handles both!
});

const shoppingPanel = document.getElementById("shoppingPanel");
const shoppingItems = document.getElementById("shoppingItems");
const closeShoppingPanel = document.getElementById("closeShoppingPanel");

closeShoppingPanel.addEventListener("click", function () {
  shoppingPanel.classList.remove("open");
});

function openShoppingList(recipeId) {
  // .find() returns the ONE recipe that matches the ID
  const recipe = recipes.find(function (r) {
    return r.id === recipeId;
  });

  if (!recipe) return;

  // .map() transforms each ingredient into an HTML string
  // .join('') merges the array into one big string
  const itemsHTML = recipe.ingredients
    .map(function (ingredient) {
      return `<div class='shopping-item'>🛒 ${ingredient}</div>`;
    })
    .join("");

  shoppingItems.innerHTML = `
        <p style='font-weight:600; color:#40916C; margin-bottom:16px'>
            ${recipe.emoji} ${recipe.name}
        </p>
        ${itemsHTML}
        <p style='margin-top:16px; color:#6B7280; font-size:0.85rem'>
            ${recipe.ingredients.length} items total
        </p>
    `;

  shoppingPanel.classList.add("open");
}

function saveToStorage() {
  // JSON.stringify turns the recipes array into a JSON string
  localStorage.setItem("recipebookData", JSON.stringify(recipes));
}

function loadFromStorage() {
  const stored = localStorage.getItem("recipebookData");
  // If something was previously saved, use it
  if (stored !== null) {
    recipes = JSON.parse(stored);
  }
}
 
function toggleFavorite(recipeId) {
  const recipe = recipes.find(function (r) {
    return r.id === recipeId;
  });

  if (!recipe) return;

  // Flip the boolean: true → false, false → true
  recipe.isFavorite = !recipe.isFavorite;

  saveToStorage();
  renderRecipes(recipes);
}

// In the saveRecipeBtn handler, AFTER: recipes.push(newRecipe);
// ADD this line:
saveToStorage();

// In the deleteButton handler, AFTER: recipes = recipes.filter(...);
// ADD this line:
saveToStorage();

function init() {
  loadFromStorage(); // Load saved data first
  renderRecipes(recipes); // Then render whatever we have
}

init(); // Run when page loads
