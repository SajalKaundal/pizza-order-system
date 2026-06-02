"use client";

import { useCart } from "@/app/consumer/context/cartcontext/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function PizzaCard({
  item,
}: {
  item: {
    image: string;
    name: string;
    description: string;
    variants: {
      size: string;
      price: number;
    }[];
    isVeg: boolean;
  };
}) {
  const [size, setSize] = useState("Small");
  const [price, setPrice] = useState<number>(item.variants[0].price);
  const { dispatch, state } = useCart();
  console.log(state);
  return (
    <div className="border border-zinc-200 hover:border-zinc-300 transition-colors rounded-xl flex flex-col w-full max-w-sm mx-auto bg-white">
      {/* Top row */}
      {/* <div className="flex items-center justify-end mb-3">
    <div className="size-7 rounded-full border border-zinc-300 flex items-center justify-center cursor-pointer"> */}
      {/* Bookmark SVG */}
      {/* </div>
  </div> */}

      {/* Product Image */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden rounded-xl bg-gray-100 mb-4">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        {/* Product Name */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>

            <Image
              src={item.isVeg ? "/veg.png" : "/non-veg.png"}
              alt={item.isVeg ? "Veg" : "Non Veg"}
              width={20}
              height={20}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Selects */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-600 z-10">
              Select Size
            </label>

            <select
              className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:border-blue-600"
              onChange={(e) => {
                const selectedVariant = item.variants.find(
                  (v) => v.size === e.target.value,
                );

                setSize(e.target.value);
                setPrice(selectedVariant?.price || 0);
              }}
            >
              {item.variants.map((v, index) => (
                <option key={index} value={v.size}>
                  {v.size}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-600 z-10">
              Select Crust
            </label>

            <select className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:border-blue-600">
              <option value="original">Original Crust</option>
              <option value="thin">Thin N&apos; Crispy</option>
            </select>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-neutral-900">₹{price}</span>

          <button
            className="px-4 py-2 bg-green-900 hover:bg-green-800 text-white rounded-lg font-medium transition-colors"
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id: item.name,
                  quantity: 1,
                  price,
                  name: item.name,
                },
              })
            }
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
