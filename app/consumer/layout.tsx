import React from "react";
import { CartProvider } from "./context/cartcontext/CartProvider";
import { AuthProvider } from "../(auth)/context/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <CartProvider>{children}</CartProvider>
  );
}
