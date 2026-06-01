import DessertCard from "@/app/components/Cards/DessertCard";

export default function Page() {
  const products = [
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        {
          size: "",
          price: 199,
        },
      ],
      isVeg: true,
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        {
          size: "",
          price: 199,
        },
      ],
      isVeg: true,
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        {
          size: "",
          price: 199,
        },
      ],
      isVeg: true,
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        {
          size: "",
          price: 199,
        },
      ],
      isVeg: true,
    },
  ];
  return (
    <div className="h-139">
      <section className="bg-white flex py-16">
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          {products.map((item, index) => (
            <DessertCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
