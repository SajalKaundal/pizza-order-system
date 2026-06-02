'use client'

import { useReducer } from "react";
import { CartContext } from "./CartContext";

export type CartItem = {
  id: string;
  quantity: number;
  price: number;
  name: string;
};

export type Action = {
  type: "ADD_TO_CART";
  payload: CartItem;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: CartItem[] = [];
  const reducer = (state: CartItem[], action: Action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        const existingItem = state.find(
          (item) => item.id === action.payload.id,
        );

        if (existingItem) {
          return state.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                }
              : item,
          );
        }

        return [...state, action.payload];
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state,dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
