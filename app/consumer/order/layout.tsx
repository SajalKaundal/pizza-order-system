"use client";

import OrderNavBar from "@/app/components/NavBar/OrderNavBar";
import SearchBar from "@/app/components/SearchBar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState("");
  console.log(searchText);
  return (
    <div className="p-4 flex flex-column">
      <div className="bg-blue-300 w-3/4">
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
      <div className="bg-red-300 w-1/4">Cart</div>
    </div>
  );
}
