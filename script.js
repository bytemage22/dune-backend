const wrapperEl = document.querySelector('.wrapper');
const inputEl = document.querySelector('input');
let cartQuantity = 0;

let products = [];

async function getProducts() {
  try {
    const response = await fetch(
      'https://jsonbek.uz/api/products?style=adventure'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    products = await response.json();

    console.log('Products loaded:', products);

    updateUi(products);
  } catch (error) {
    console.error('Error:', error);
  }
}

function searchProduct(keyword) {
  const newArray = products.filter(prod =>
    prod.title.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  updateUi(newArray);
}

inputEl.addEventListener('input', () => {
  searchProduct(inputEl.value);
});

function updateUi(array) {
  wrapperEl.innerHTML = '';

  let html = '';
  array.forEach(prod => {
    html += `
        <div class="product-card" data-id="1">

        <div class="image-container">
          <img
            src="${prod.image}"
            alt="${prod.title}"
          >
          <span class="availability">● Mavjud</span>
        </div>

        <div class="product-info">

          <p class="origin">📍 Qizilqum</p>

          <h2 class="product-title">${prod.title}</h2>

          <p class="description">
            Issiq qumlarda yurish uchun yaratilgan.
            Har bir qadam – yangi sarguzashtga eltadi.
          </p>

          <div class="rating">
            <span class="star">★</span>
            <span class="rating-value">8.9</span>
            <span class="rating-label">/ 10 baho</span>
          </div>

          <hr class="divider">

          <div class="bottom">
            <div>
              <p class="price-label">Narxi</p>
              <p class="price">55 000 so'm</p>
            </div>

            <button class="buy-btn" onclick="addToCart()">Sotib olish →</button>
          </div>

        </div>
      </div>
    `
  });

  wrapperEl.innerHTML = html;
}

getProducts();

function addToCart() {
  cartQuantity++;
  document.querySelector('.cart-quantity').textContent = cartQuantity;
}