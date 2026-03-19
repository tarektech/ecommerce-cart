"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, Product } from "@/types";

const CART_STORAGE_KEY = "ecommerce-cart";

interface CartState {
  items: CartItem[];
  hasLoadedFromStorage: boolean;
  addItem: (product: Product) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  setHasLoadedFromStorage: (value: boolean) => void;
}

const incrementItemQuantity = (items: CartItem[], id: number) =>
  items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  );

const appendCartItem = (items: CartItem[], product: Product) => [
  ...items,
  { ...product, quantity: 1 },
];

const decrementItemQuantity = (items: CartItem[], id: number) =>
  items.flatMap((item) => {
    if (item.id !== id) {
      return item;
    }

    if (item.quantity === 1) {
      return [];
    }

    return [{ ...item, quantity: item.quantity - 1 }];
  });

const removeCartItem = (items: CartItem[], id: number) =>
  items.filter((item) => item.id !== id);

const hasCartItem = (items: CartItem[], id: number) =>
  items.some((item) => item.id === id);

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hasLoadedFromStorage: false,
      addItem: (product) =>
        set((state) => {
          if (hasCartItem(state.items, product.id)) {
            return {
              items: incrementItemQuantity(state.items, product.id),
            };
          }

          return {
            items: appendCartItem(state.items, product),
          };
        }),
      increaseQty: (id) =>
        set((state) => ({
          items: incrementItemQuantity(state.items, id),
        })),
      decreaseQty: (id) =>
        set((state) => ({
          items: decrementItemQuantity(state.items, id),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: removeCartItem(state.items, id),
        })),
      clearCart: () => set({ items: [] }),
      setHasLoadedFromStorage: (value) => set({ hasLoadedFromStorage: value }),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasLoadedFromStorage(true);
      },
    },
  ),
);

export const selectCartItems = (state: CartState) => state.items;

export const selectCartHasLoadedFromStorage = (state: CartState) =>
  state.hasLoadedFromStorage;

export const selectCartItemQuantity = (state: CartState, productId: number) =>
  state.items.find((item) => item.id === productId)?.quantity ?? 0;

export const selectCartItemCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: CartState) =>
  Number(
    state.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2),
  );

export const selectCartPanelState = (state: CartState) => ({
  hasLoadedFromStorage: selectCartHasLoadedFromStorage(state),
  items: selectCartItems(state),
  totalItems: selectCartItemCount(state),
  totalPrice: selectCartTotalPrice(state),
});

export const selectCartPanelActions = (state: CartState) => ({
  clearCart: state.clearCart,
  decreaseQty: state.decreaseQty,
  increaseQty: state.increaseQty,
  removeItem: state.removeItem,
});
