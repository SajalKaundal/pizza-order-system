import Image from "next/image";

export default function ExtraCard({
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
       {/* Product Image */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden rounded-xl bg-gray-100 mb-4">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Product Name */}
      <p className="mb-4 px-2">
        {item.name}
        <br />
        <span className="block text-sm text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
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
          ₹{item.variants[0].price}
        </span>
        <button className="px-4 py-2 bg-green-900 font-semibold text-white rounded-xl">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
