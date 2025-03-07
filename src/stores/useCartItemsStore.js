import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    (set) => ({
      cartItems: {},
      removeCartItem: (slug) => set(evolve({ cartItems: dissoc(slug) })),
      clearCart: () => set({ cartItems: {} }),
      setSelectedQuantity: (slug, quantity) =>
        set(({ cartItems }) => {
          if (quantity <= 0) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, Number(quantity), cartItems) }; // Store as number
        }),
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
