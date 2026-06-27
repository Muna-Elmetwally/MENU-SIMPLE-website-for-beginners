// ─────────────────────────────────
// SESSION 1 — Variables & template literals
// SESSION 4 — Arrays and objects
// ─────────────────────────────────

// Each menu item is an object with simple properties
// Image property contains the path to the image in images folder
const item0  = { name: "Hummus Trio",        category: "starters",  price: 150,  image: "./images/hummus.jpg", desc: "Classic hummus with warm pita bread." };
const item1  = { name: "Fattoush Salad",      category: "starters",  price: 320, image: "./images/salad.jpg", desc: "Crispy pita chips, tomatoes, sumac dressing." };
const item2  = { name: "Lamb Kibbeh",         category: "starters",  price: 1320, image: "./images/kibbeh-platter-.jpg", desc: "Spiced lamb and bulgur, fried golden." };
const item3  = { name: "Chicken Shawarma",    category: "mains",     price: 270, image: "./images/shawerma.jpg", desc: "Marinated chicken, garlic sauce, flatbread." };
const item4  = { name: "Lamb Ouzi",           category: "mains",     price: 2600, image: "./images/lamb.jpg", desc: "Slow-braised lamb over saffron rice." };
const item5  = { name: "Vegetable Tagine",    category: "mains",     price: 860, image: "./images/vegetable tagine.jpg", desc: "Seasonal vegetables, preserved lemon, couscous." };
const item6  = { name: "Mint Lemonade",       category: "drinks",    price: 120,  image: "./images/lemon mint.jpg", desc: "Fresh mint, hand-squeezed lemons." };
const item7  = { name: "Rose Water Iced Tea", category: "drinks",    price: 100,  image: "./images/rose tea.jpg", desc: "Hibiscus and rose water blend." };
const item8  = { name: "Turkish Coffee",      category: "drinks",    price: 80,  image: "./images/coffee.jpg", desc: "Cardamom-spiced, served with lokum." };
const item9  = { name: "Kunafa",              category: "desserts",  price: 300, image: "./images/kunafa.jpg", desc: "Shredded pastry, clotted cream, blossom syrup." };
const item10 = { name: "Baklava Selection",   category: "desserts",  price: 420,  image: "./images/balaklava.jpg", desc: "Walnut and pistachio, honey drenched." };

// Array holding all menu items — index starts at 0
const menuItems = [item0, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10];

// ─────────────────────────────────
// SESSION 1 — Variables
// ─────────────────────────────────

let total = 0;              // running total price
let itemCount = 0;          // total number of items (including duplicates)
let currentFilter = "all";  // which category button is active

// SESSION 4 — Array of objects to track the cart
// Each entry: { index, name, price, image, qty }
let cart = [];

// ─────────────────────────────────
// SESSION 6 — Functions
// SESSION 5 — DOM: innerHTML, getElementById
// SESSION 3 — for loop
// SESSION 2 — conditions
// ─────────────────────────────────

// Builds and shows the menu cards for a given category
function showMenu(filter) {

  let menuCards = "";

  // SESSION 3 — for loop through the menuItems array
  for (let i = 0; i < menuItems.length; i++) {

    let item = menuItems[i]; // SESSION 4 — access by index

    // SESSION 2 — only show if category matches the filter
    if (filter === "all" || item.category === filter) {

      // SESSION 1 — template literal builds the card HTML
      // Image is now dynamic from the image property
      menuCards = menuCards + `
        <div class="card">
          <div class="card-icon">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="card-body">
            <div class="card-category">${item.category}</div>
            <div class="card-name">${item.name}</div>
            <div class="card-desc">${item.desc}</div>
            <div class="card-bottom">
              <span class="card-price">EGP${item.price}</span>
              <button class="add-btn" id="add-${i}">Add +</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // SESSION 5 — put the built HTML into the page
  document.getElementById("menu-grid").innerHTML = menuCards;

  // SESSION 7 — attach a click event to each Add button
  // SESSION 3 — loop through all items to find their buttons
  for (let i = 0; i < menuItems.length; i++) {

    // SESSION 2 — only attach if this button is currently on the page
    if (document.getElementById("add-" + i) !== null) {

      document.getElementById("add-" + i).addEventListener("click", function() {
        addItem(i); // SESSION 6 — call function with index as parameter
      });

    }
  }
}

// ─────────────────────────────────
// Adds an item to the cart, or increases its qty if already there
// SESSION 6 — function with parameter
// SESSION 3 — for loop to search the cart
// SESSION 2 — if/else condition
// ─────────────────────────────────

function addItem(index) {

  let item = menuItems[index]; // SESSION 4 — get object by index
  let found = false;           // SESSION 1 — boolean variable

  // SESSION 3 — loop through cart to check if item is already there
  for (let i = 0; i < cart.length; i++) {

    // SESSION 2 — condition: is this the same item?
    if (cart[i].index === index) {
      cart[i].qty = cart[i].qty + 1; // SESSION 4 — update object property
      found = true;
    }
  }

  // SESSION 2 — if not found, add a new entry to the cart array
  if (found === false) {
    cart[cart.length] = { index: index, name: item.name, price: item.price, image: item.image, qty: 1 };
  }

  // Update totals
  total = total + item.price;
  itemCount = itemCount + 1;

  // Redraw the cart and clear any old message
  updateCart();
  document.getElementById("message").textContent = "";
}

// ─────────────────────────────────
// Removes one qty of an item, or removes it entirely if qty reaches 0
// SESSION 6 — function with parameter
// SESSION 3 — for loop
// SESSION 2 — conditions
// ─────────────────────────────────

function removeItem(index) {

  // SESSION 3 — loop to find the item in the cart
  for (let i = 0; i < cart.length; i++) {

    if (cart[i].index === index) {

      // Subtract from totals
      total = total - cart[i].price;
      itemCount = itemCount - 1;
      cart[i].qty = cart[i].qty - 1;

      // SESSION 2 — if qty is now 0, remove this entry from the cart
      if (cart[i].qty === 0) {

        // Build a new array without this item
        let newCart = [];
        for (let j = 0; j < cart.length; j++) {
          if (j !== i) {
            newCart[newCart.length] = cart[j];
          }
        }
        cart = newCart;
      }

    }
  }

  updateCart();
}

// ─────────────────────────────────
// Redraws the order summary box based on current cart array
// SESSION 6 — function
// SESSION 3 — for loop
// SESSION 5 — innerHTML, textContent, getElementById
// SESSION 1 — template literals
// ─────────────────────────────────

function updateCart() {

  // SESSION 2 — condition: is the cart empty?
  if (cart.length === 0) {

    document.getElementById("order-list").innerHTML = "<p class='empty-msg'>No items added yet.</p>";
    document.getElementById("place-btn").disabled = true;

  } else {

    let cartRows = "";

    // SESSION 3 — loop through the cart and build each row
    for (let i = 0; i < cart.length; i++) {

      let entry = cart[i]; // SESSION 4 — access cart object by index

      // SESSION 1 — template literal builds each cart row
      // Image is now dynamic from the image property
      cartRows = cartRows + `
        <div class="cart-row">
          <div class="cart-icon">
            <img src="${entry.image}" alt="${entry.name}" />
          </div>
          <span class="cart-name">${entry.name}</span>
          <div class="cart-controls">
            <button class="qty-btn" id="remove-${entry.index}">−</button>
            <span class="cart-qty">${entry.qty}</span>
            <button class="qty-btn" id="readd-${entry.index}">+</button>
          </div>
          <span class="cart-line-price">EGP ${entry.price * entry.qty}</span>
        </div>
      `;
    }

    // SESSION 5 — put the cart rows into the page
    document.getElementById("order-list").innerHTML = cartRows;
    document.getElementById("place-btn").disabled = false;

    // SESSION 7 — attach click events to every − and + button
    // SESSION 3 — loop through cart again to find buttons
    for (let i = 0; i < cart.length; i++) {

      document.getElementById("remove-" + cart[i].index).addEventListener("click", function() {
        removeItem(cart[i].index);
      });

      document.getElementById("readd-" + cart[i].index).addEventListener("click", function() {
        addItem(cart[i].index);
      });

    }
  }

  // SESSION 5 — update total display
  document.getElementById("total-amount").textContent = "$" + total;
}

// ─────────────────────────────────
// SESSION 6 — Function, classList
// ─────────────────────────────────

function setFilter(filter, label, activeButtonId) {

  currentFilter = filter;

  // SESSION 5 — textContent: update section label
  document.getElementById("section-label").textContent = label;

  // SESSION 6 — classList: remove active from all, add to clicked
  document.getElementById("btn-all").classList.remove("active");
  document.getElementById("btn-starters").classList.remove("active");
  document.getElementById("btn-mains").classList.remove("active");
  document.getElementById("btn-drinks").classList.remove("active");
  document.getElementById("btn-desserts").classList.remove("active");

  document.getElementById(activeButtonId).classList.add("active");

  showMenu(filter);
}

// ─────────────────────────────────
// SESSION 7 — addEventListener, click events
// ─────────────────────────────────

document.getElementById("btn-all").addEventListener("click", function() {
  setFilter("all", "All Items", "btn-all");
});

document.getElementById("btn-starters").addEventListener("click", function() {
  setFilter("starters", "Starters", "btn-starters");
});

document.getElementById("btn-mains").addEventListener("click", function() {
  setFilter("mains", "Mains", "btn-mains");
});

document.getElementById("btn-drinks").addEventListener("click", function() {
  setFilter("drinks", "Drinks", "btn-drinks");
});

document.getElementById("btn-desserts").addEventListener("click", function() {
  setFilter("desserts", "Desserts", "btn-desserts");
});

// Place order button
document.getElementById("place-btn").addEventListener("click", function() {

  if (itemCount > 0) {
    document.getElementById("message").textContent = "✓ Order placed! Total: $" + total;

    // Reset everything
    cart = [];
    total = 0;
    itemCount = 0;
    updateCart();
  }

});

// SESSION 7 — keyboard event: press Enter to place order
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (itemCount > 0) {
      document.getElementById("place-btn").click();
    }
  }
});

// ─────────────────────────────────
// Run on page load
// ─────────────────────────────────
showMenu("all");