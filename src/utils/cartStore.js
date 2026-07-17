const CART_STORAGE_KEY = "albanien-radreisen-cart";
const listeners = new Set();

function readStoredCart() {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

let cartItems = readStoredCart();

export function addCartItemToList(items, newItem) {
  const matchingIndex = items.findIndex(
    (item) => item.tourId === newItem.tourId && item.departureId === newItem.departureId,
  );

  if (matchingIndex === -1) return [...items, newItem];

  const nextItems = [...items];
  nextItems[matchingIndex] = newItem;
  return nextItems;
}

export function removeCartItemFromList(items, itemId) {
  return items.filter((item) => item.id !== itemId);
}

function saveCart(items) {
  cartItems = items;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
  listeners.forEach((listener) => listener());
}

export function addCartItem(item) {
  saveCart(addCartItemToList(cartItems, item));
}

export function removeCartItem(itemId) {
  saveCart(removeCartItemFromList(cartItems, itemId));
}

export function clearCart() {
  saveCart([]);
}

export function getCartSnapshot() {
  return cartItems;
}

export function subscribeToCart(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== CART_STORAGE_KEY) return;
    cartItems = readStoredCart();
    listeners.forEach((listener) => listener());
  });
}
