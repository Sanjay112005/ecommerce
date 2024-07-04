
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCartClicked);
});


function addToCartClicked(event) {
  const button = event.target;
  const product = button.parentElement;
  const productName = product.querySelector('h2').textContent;
  const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));

  addItemToCart(productName, productPrice);
  updateCartTotal();
  openCartModal();
}


function addItemToCart(name, price) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.getElementById('cartItems');
  const cartItemNames = cartItems.getElementsByClassName('cart-item-name');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].textContent === name) {
      alert('This item is already added to the cart!');
      return;
    }
  }
  const cartRowContents = `
    <div class="cart-item cart-column">
      <span class="cart-item-name">${name}</span>
    </div>
    <span class="cart-price cart-column">$${price}</span>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
}

// Function to update cart total
function updateCartTotal() {
  const cartItemContainer = document.getElementById('cartItems');
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    total += price;
  }
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

// Function to open cart modal
function openCartModal() {
  const modal = document.getElementById('cartModal');
  modal.style.display = 'block';

  // Close modal when clicking on 'x' or outside the modal
  const span = document.getElementsByClassName('close')[0];
  span.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Handle checkout button
  const checkoutButton = document.getElementsByClassName('checkout')[0];
  checkoutButton.onclick = function() {
    alert('Redirecting to checkout page...');
    // Replace with actual checkout logic
  };
}

// Initialize cart modal close functionality
window.onload = function() {
  const modal = document.getElementById('cartModal');
  const span = document.getElementsByClassName('close')[0];

  span.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
};
