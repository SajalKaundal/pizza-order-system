import { clsx } from "clsx";
import Image from "next/image";

export default function BeverageCard({
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
  return (
    <div className="border border-zinc-200 hover:border-zinc-300 transition-colors rounded-xl p-2 flex flex-col w-80">
      {/* Top row: badge + bookmark */}
      <div className="flex items-center justify-end mb-2">
        {/* <span className="bg-lime-300 text-neutral-800 text-xs px-2 py-0.5 rounded-full">
                <span className="font-bold">20%</span> off
              </span> */}
        <div className="size-7 rounded-full border border-zinc-300 flex items-center justify-center cursor-pointer">
          <svg
            width="9"
            height="11"
            viewBox="0 0 9 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.357.5c.303 0 .594.117.808.325s.335.491.335.786v8.334a.54.54 0 0 1-.076.277.584.584 0 0 1-.779.205L5.067 8.995a1.17 1.17 0 0 0-1.134 0l-2.578 1.432a.584.584 0 0 1-.779-.205.54.54 0 0 1-.076-.277V1.61c0-.295.12-.577.335-.786A1.16 1.16 0 0 1 1.643.5z"
              stroke="#27272a"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Product Image */}
      <div className="flex items-center justify-center h-30 mb-2">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Name */}
        <p className="mb-2 px-2">
          {item.name}
          <br />
          <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
            {item.description}
          </span>
          <Image
            src={item.isVeg ? "/veg.png" : "/non-veg.png"}
            alt=""
            height={20}
            width={20}
          />
        </p>

      {/* Price */}
      <div className="flex justify-between items-center gap-2 px-2">
        <span className="text-sm font-semibold text-neutral-800">
          {item.price}
        </span>
        <button className="px-4 py-2 bg-green-900 font-semibold text-white rounded-xl">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
