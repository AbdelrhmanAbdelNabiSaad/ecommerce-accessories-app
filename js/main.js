// Class Created Object Cards Products
class Product {
  constructor(id, name, price, category, gener, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.gener = gener;
    this.image = image;
    this.isFavorite = false;
    this.isInCart = false;
    this.quantity = 1;
  }
}

const products = [
  new Product(
    1,
    "Golden Watch",
    400,
    "Watches",
    "women",
    "./img/2809f6567a8309c00022f8e273d8715c.jpg",
  ),
  new Product(
    2,
    "Silver necklace",
    150,
    "Necklace",
    "men",
    "./img/686d4a051c21359b7577ee191b02fb70.jpg",
  ),
  new Product(
    3,
    "Golden Earrings",
    200,
    "Earrings",
    "women",
    "./img/6f5d807b3ac44d8f5fdf2d94f7929177.jpg",
  ),
  new Product(
    4,
    "Black Watch",
    350,
    "Watches",
    "men",
    "./img/a959c27ca359e1fc2c5453411253d1ad.jpg",
  ),
  new Product(
    5,
    "Silver Set Rings",
    580,
    "Rings",
    "women",
    "./img/dd94301efd4caef4e84229be9a74bf90.jpg",
  ),
  new Product(
    6,
    "Silver necklace",
    150,
    "Necklace",
    "men",
    "./img/3ca518ac387b3e07aaf503b2c1399707.jpg",
  ),
  new Product(
    7,
    "Black bracelet",
    100,
    "Bracelet",
    "men",
    "./img/ef169eeb1097eaa0cd21f0311524820e.jpg",
  ),
  new Product(
    8,
    "Set Necklace",
    500,
    "Necklace",
    "women",
    "./img/9f5a4002bc9bdda21f05e47dc80a38df.jpg",
  ),
  new Product(
    9,
    "Golden set bracelet",
    300,
    "Bracelet",
    "women",
    "./img/2a384379039c5e05bd5905edc657e93c.jpg",
  ),
  new Product(
    10,
    "Golden Watch",
    400,
    "Watches",
    "women",
    "./img/2809f6567a8309c00022f8e273d8715c.jpg",
  ),
  new Product(
    11,
    "Silver necklace",
    150,
    "Necklace",
    "men",
    "./img/686d4a051c21359b7577ee191b02fb70.jpg",
  ),
  new Product(
    12,
    "Golden Earrings",
    200,
    "Earrings",
    "women",
    "./img/6f5d807b3ac44d8f5fdf2d94f7929177.jpg",
  ),
];

function renderProducts(productList) {
  const productsGrid = document.querySelector("#proucts-grid");

  if (!productsGrid) return;

  productsGrid.innerHTML = ``;

  productList.forEach((product) => {
    const productCard = `<div class="">
          <div class="card" >
            <img src="${product.image}" class="card-img-top" alt="${product.name}" />
            <div class="card-body">
              <h4 class="card-title">${product.name}</h4>
              <p class="card-text">Price: ${product.price}</p>
              <p class="card-text">Category: ${product.category}</p>
              <div class="action-container d-flex align-items-center justify-content-center gap-5">
              <i class="fas fa-heart ${product.isFavorite ? "active" : ""}" onclick="toggleFavorite(${product.id})"></i>
              <button type="button" onclick="toggleCart(${product.id})" class="btn btn-solid ${product.isInCart ? "btn-outline theme-danger" : "theme-warning"}">${product.isInCart ? "Remove from cart" : "Add to cart"}</button>
              </div>
            </div>
          </div>
        </div>`;

    productsGrid.insertAdjacentHTML("beforeend", productCard);
  });
}


function searchProducts() {
  const searchType = document.querySelector("#searchType").value;
  const searchText = document.querySelector("#searchBox").value.toLowerCase();

  if (!searchText || !searchType) return;

  const filteredProducts = products.filter((product) => {
    if (searchType === "name") {
      return product.name.toLowerCase().includes(searchText);
    } else if (searchType === "category") {
      return product.category.toLowerCase().includes(searchText);
    }

    return false;
  });

  renderProducts(filteredProducts);
}

// Redirect between Page
function redirectTo(url) {
  window.location.href = url;
}
// ---------------------------------------------------
// Register and Login (Authentication and Authorization)
let loggedIn = false;

function register() {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!firstName || !lastName || !email || !password) {
    alert("Plesae fill in all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[email] = { firstName, lastName, email, password };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account Created Successfully");
  window.location.href = "./login.html";
}

function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email] && users[email].password === password) {
    localStorage.setItem("loggedInUser", JSON.stringify(users[email]));
    loggedIn = true;
    localStorage.setItem("loggedIn", loggedIn);
    window.location.href = "./loggedin.html";
  } else {
    alert("Invalid email or password");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("loggedIn");
  loggedIn = false;

  window.location.href = "./index.html";
}

// -------------------------------------------------------

// Create Function Toggel =>> Add Cart Or Remove Cart

let cartCount = 0;

function toggleCart(productId) {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  console.log("Toggle Cart Clicked. Logged in: ", isLoggedIn);

  if (!isLoggedIn) {
    console.log(`Redirecting to login.html`);
    redirectTo("login.html");
    return;
  }

  const product = products.find((product) => product.id === productId);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (product.isInCart) {
    product.isInCart = false;

    product.quantity = 0;

    const index = cart.findIndex((product) => product.id === productId);

    if (index > -1) cart.splice(index, 1);
  } else {
    product.isInCart = true;

    product.quantity = 1;

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  saveCartAndFavorites();
  updateCartCount();
  updateCartDropdown();
  renderProducts(products);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelector("#cartCount").textContent = cartCount;
}



// Function Add The Cart Favorite
function toggleFavorite(productId) {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  console.log(`Toggle Favorite Clicked.`, isLoggedIn);

  if (!isLoggedIn) {
    console.log("Redirecting to login.html");
    redirectTo("login.html");
    return;
  }

  const product = products.find((product) => product.id === productId);

  if (product.isFavorite) {
    removeFavorite(productId);
  } else {
    product.isFavorite = true;

    saveCartAndFavorites();
    const productCartHeart = document.querySelector(
      `.fa-heart[onclick="toggleFavorite(${productId})"]`,
    );

    if (productCartHeart) {
      productCartHeart.classList.add("active");
    }
  }

  renderProducts(products);

  if(window.location.includes('cart.html')) renderFavoriteItems();
}

// Function Remove The Cart Favorite
function removeFavorite(productId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const product = products.find((product) => product.id === productId);

  if (product && product.isFavorite) {
    product.isFavorite = false;

    const index = favorites.findIndex((product) => product.id === productId);

    if (index > -1) {
      favorites.splice(index, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    const productCartHeart = document.querySelector(
      `.fa-heart[onclick="toggleFavorite(${productId})"]`,
    );

    if (productCartHeart) {
      productCartHeart.classList.remove("active");
    }

    const favoriteItemCard = document.querySelector(`#favorite-items .card[data-product-id="${productId}"]`);
    if(!favoriteItemCard) return;
    else {
      favoriteItemCard.remove();
    }
    renderFavoriteItems();
  }
}
// Function Save (Cart, Favorite) in LocalStorage
function saveCartAndFavorites() {
  const cart = products.filter((product) => product.isInCart);

  const favorites = products.filter((product) => product.isFavorite);

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function Update Dorpdown

function updateCartDropdown() {
  const cartItems = products.filter((product) => product.isInCart);
  console.log(cartItems);
  const cartDropdownItems = document.querySelector("#cartDropdownItems");
  cartDropdownItems.innerHTML = "";
  if (cartItems.length === 0) {
    cartDropdownItems.innerHTML = `<p class="text-center">Your Cart Is Empty</p>`;
  } else {
    cartItems.forEach((item) => {
      const cartItem = `
        <div class="card_item_dd  w-100 d-flex flex-column justify-content-center align-items-center">
                  <div class="ml-2 d-flex flex-column">
                    <h5 class="mb-0">${item.name}</h5>
                    <p class="mb-0 mt-2">Price: <span class="fe-bold" id="itemPrice${item.id}">${item.price * item.quantity} $</span></p>
                  </div>
                  <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline theme-secondary" onclick="increaseQuantity(${item.id})">+</button>
                    <span class="mx-2" id="itemQuantity${item.id}">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline theme-secondary" onclick="decreaseQuantity(${item.id})">-</button>
                  </div>
                </div>
      `;

      cartDropdownItems.insertAdjacentHTML("beforeend", cartItem);
    });
  }
  updateCartCount();
}



function increaseQuantity(productId) {
  const product = products.find((product) => product.id === productId);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  product.quantity++;

  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity = product.quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelector(`#itemQuantity${productId}`).textContent =
    product.quantity;

  document.querySelector(`#itemPrice${productId}`).textContent =
    product.price * product.quantity;

  updateCartDropdown();
  renderCartItems()
}

function decreaseQuantity(productId) {
  const product = products.find((product) => product.id === productId);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (product && product.isInCart) {
    product.quantity--;

    if (product.quantity <= 0) {
      product.isInCart = false;

      const index = cart.findIndex((product) => product.id === productId);

      if (index > -1) {
        cart.splice(index, 1);
      }

      const productCartButton = document.querySelector(
        `button[onclick="toggleCart(${productId})"]`,
      );

      if (productCartButton) {
        productCartButton.textContent = "Add to Cart";
        productCartButton.classList.remove("btn-outline");
        productCartButton.classList.remove("theme-danger");
        productCartButton.classList.add("theme-warning");
      }

      const cartItemCard = document.querySelector(`cart-items .card[data-product-id="${productId}"]`);

      if(cartItemCard) {
        cartItemCard.remove();
      }

    } else {
      const cartItem = cart.find((product) => product.id === productId);

      if (cartItem) {
        cartItem.quantity = product.quantity;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.querySelector(`#itemQuantity${productId}`).textContent =
      product.quantity;

    document.querySelector(`#itemPrice${productId}`).textContent =
      product.price * product.quantity;
    updateCartDropdown();
    renderCartItems();
    updateTotalPrice();
  }
}

function loadCartAndFavorites() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  products.forEach((product) => {
    const cartProduct = cart.find((p) => p.id === product.id);

    const favoriteProduct = favorites.find((p) => p.id === product.id);

    if (cartProduct) {
      product.isInCart = true;

      product.quantity = cartProduct.quantity;
    } else {
      product.isInCart = false;

      product.quantity = 0;
    }

    product.isFavorite = !!favoriteProduct;
  });
}



function renderCartItems() {

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const cartItemsContainer = document.querySelector(`#cart-items`);
  console.log(cartItemsContainer);
  
  cartItemsContainer.innerHTML = ``;

  if(cartItems.length === 0) {
    cartItemsContainer.classList.remove('grid')
    cartItemsContainer.innerHTML = `<h1 class="text-center">Your cart is empty</h1>`;

    return;

  }

  const cartItemsHTML = cartItems.map(item => `
   <div class="">
    <div class="card d-flex flex-row align-items-start" data-product-id="${item.id}">
          <img
            src="${item.image}"
            class="card-img-top"
            alt="${item.name}"
          />
          <div class="card-body">
            <h4 class="card-title">${item.name}</h4>
            <p class="card-text">Category: ${item.category}</p>
            <p class="card-text">Price: ${item.price * item.quantity}</p>
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn btn-sm btn-outline theme-secondary" onclick="increaseQuantity(${item.id})">
                +
              </button>
              <span class="mx-2" id="itemQuantity${item.id}">${item.quantity}</span>
              <button class="btn btn-sm btn-outline theme-secondary" onclick="decreaseQuantity(${item.id})">
                -
              </button>
            </div>
            <button
              class="block mx-auto mt-4 btn btn-outline theme-danger"
              onclick="removeFromCart(${item.id})"
            >
              Remove From Cart
            </button>
          </div>
        </div>
   </div>
    `).join('');

    cartItemsContainer.insertAdjacentHTML('beforeend', cartItemsHTML);

    updateTotalPrice();
    
}

function updateTotalPrice() {

  const totalPrice = products.filter(product=> product.isInCart).reduce((total,product)=> total + product.price * product.quantity,0);

  document.querySelector('#totalPrice').textContent = totalPrice.toFixed(2);

}

function removeFromCart(productId) {

  const product = products.find(product => product.id === productId);

  if(product) {

    product.isInCart = false;

    product.quantity = 0;

    saveCartAndFavorites();

    renderCartItems();

    updateCartDropdown();

    updateTotalPrice();

    document.querySelector(`#cart-items .card[data-product-id="${productId}"]`).remove();

  }

}


function renderFavoriteItems() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []

  const favoriteItemsContainer = document.querySelector('#favorite-items');

  if(!favoriteItemsContainer) return;

  if(favorites.length === 0) {
    favoriteItemsContainer.classList.remove('grid');
    favoriteItemsContainer.innerHTML = `<h1 class="text-center">You have no favorite items.</h1>`;
    return;
  }

  const favoriteItemsHTML = favorites.map(item => `
    <div>
      <div class="card d-flex flex-row align-items-start card-fav" data-product-id="">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Category: ${item.category}</p>
              <i class="fas fa-heart ${item.isFavorite ? 'active': ''}" onclick="toggleFavorite(${item.id})"></i>
            </div>
          </div>
    </div>
    `).join('');

    favoriteItemsContainer.insertAdjacentHTML('beforeend', favoriteItemsHTML)

}


document.addEventListener("DOMContentLoaded", () => {

  const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));

  if(loggedUser && isLoggedIn) {
    loggedIn = true;
    const username = document.querySelector(`#username`);
    if(!username)return;
    username.textContent = `Hello, ${loggedUser.firstName}`;
  }else {
    loggedIn = false;
  }

  loadCartAndFavorites();
  renderProducts(products);
  updateCartDropdown();
  renderCartItems();
  renderFavoriteItems()
  
});
