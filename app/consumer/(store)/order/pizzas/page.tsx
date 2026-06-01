import PizzaCard from "@/app/components/Cards/PizzaCard";

export default function Page() {
  const products = [
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "MARGHERITA",
      description:
        "Pizza sauce and molten real mozzarella in golden harmony to create a pizza at its purest, gooey best.",
      variants: [
        {
          size: "Small",
          price: 199,
        },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "MARGHERITA",
      description:
        "Pizza sauce and molten real mozzarella in golden harmony to create a pizza at its purest, gooey best.",
      variants: [
        {
          size: "Small",
          price: 199,
        },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "MARGHERITA",
      description:
        "Pizza sauce and molten real mozzarella in golden harmony to create a pizza at its purest, gooey best.",
      variants: [
        {
          size: "Small",
          price: 199,
        },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "MARGHERITA",
      description:
        "Pizza sauce and molten real mozzarella in golden harmony to create a pizza at its purest, gooey best.",
      variants: [
        {
          size: "Small",
          price: 199,
        },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
  ];
  return (
    <div className="h-139">
      <section className="bg-white flex py-16">
        <div className="flex flex-wrap items-stretch justify-center gap-5">
          {products.map((item, index) => (
            <PizzaCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
