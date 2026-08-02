// cart.js — cart state, persisted in localStorage so it survives refresh/navigation.
// Depends on MEDICINES from medicines.js being loaded first.

const CART_KEY = "medicatalog:cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartAdd(id, qty) {
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  updateCartBadge();
  return cart;
}

function cartSetQty(id, qty) {
  const cart = loadCart();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  saveCart(cart);
  updateCartBadge();
  return cart;
}

function cartRemove(id) {
  return cartSetQty(id, 0);
}

function cartClear() {
  saveCart({});
  updateCartBadge();
}

function cartCount() {
  const cart = loadCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartItems() {
  const cart = loadCart();
  return Object.entries(cart)
    .map(([id, qty]) => {
      const med = MEDICINES.find((m) => m.id === id);
      return med ? Object.assign({}, med, { qty: qty }) : null;
    })
    .filter(Boolean);
}

function cartTotal() {
  return cartItems().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}
