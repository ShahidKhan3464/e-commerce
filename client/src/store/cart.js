import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      // Add item to cart
      addItem: (product) => {
        const items = get().cartItems;
        const existingItem = items.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cartItems: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cartItems: [...items, { ...product, quantity: 1 }]
          });
        }
      },

      // Remove item from cart
      removeItem: (id) => {
        set({
          cartItems: get().cartItems.filter((item) => item._id !== id)
        });
      },

      // Update quantity (increase or decrease)
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({
            cartItems: get().cartItems.filter((item) => item._id !== id)
          });
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item._id === id ? { ...item, quantity } : item
            )
          });
        }
      },

      // Clear cart
      clearCart: () => set({ cartItems: [] }),

      // Get totals
      getTotals: () => {
        const { cartItems } = get();
        const totalItems = cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const totalPrice = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { totalItems, totalPrice };
      }
    }),
    {
      name: 'cart-storage' // key in localStorage
    }
  )
);

export default useCartStore;
