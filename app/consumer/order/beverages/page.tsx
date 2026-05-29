import BeveragesCard from "@/app/components/Cards/BeverageCard";

export default function Page() {
  const products = [
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        { size: "M", price: 299 },
        { size: "L", price: 399 },
      ],
      isVeg:true,
    },

    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        { size: "6 PCS", price: 299 },
      ],
      isVeg:true,
    },
   {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        { size: "8 PCS", price: 299 },
      ],
      isVeg:true,
    },
   {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        { size: "14 PCS", price: 299 },
      ],
      isVeg:true,
    },
  ];
  return (
    <div className="h-140 overflow-x-hidden scrollbar-thin">
      <section className="bg-white flex py-16">
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          {products.map((item, index) => (
            <BeveragesCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
