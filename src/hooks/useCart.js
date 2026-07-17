import { useSyncExternalStore } from "react";
import { getCartSnapshot, subscribeToCart } from "../utils/cartStore";

const emptyCart = [];

export default function useCart() {
  return useSyncExternalStore(subscribeToCart, getCartSnapshot, () => emptyCart);
}
