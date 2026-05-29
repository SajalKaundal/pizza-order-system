"use client";

import Cart from "@/app/components/Cart/Cart";
import OrderNavBar from "@/app/components/NavBar/OrderNavBar";
import SearchBar from "@/app/components/htmlcomponents/SearchBar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  return (
    <div className="px-4 border-t border-gray-300 flex flex-column">
      <div className="w-3/4 border-r-2 border-gray-400">
        <div className="px-10 py-5">
          <SearchBar
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <OrderNavBar />
        {children}
      </div>
      <div className="w-1/4 border-l-2 border-gray-400">
        <Cart/>
      </div>
    </div>
  );
}
