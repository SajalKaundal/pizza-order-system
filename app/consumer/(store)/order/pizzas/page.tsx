import PizzaCard from "@/app/components/Cards/PizzaCard";

export default function Page() {
  const pizzas = [
    {
      image: "/pizzas/chicken-bbq6161.png",
      name: "chicken bbq",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-florentine3740.png",
      name: "chicken floretine",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-hawaiian2476.png",
      name: "chicken hawaiian",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-mexican-ole-4683.png",
      name: "chicken mexican ole",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/chicken-sausage9202.png",
      name: "chicken sausage",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/double-cheese-dhamaka2611.png",
      name: "double chesse",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/fiery-garden-delight-4818.png",
      name: "fiery garden delight",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/garden-special7740.png",
      name: "garden special",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/margherita3310.png",
      name: "margherita",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/paneer-garden-delight9774.png",
      name: "paneer garden delight",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/spicy-garden-special7509.png",
      name: "spicy garden special",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/spicy-italian5900.png",
      name: "spicy italian",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/spicy-paneer-ranch2368.png",
      name: "spicy paneer ranch",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/spinach-alfredo8170.png",
      name: "spinach alfredo",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/the-greek-chicken7384.png",
      name: "the greek chicken",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: false,
    },
    {
      image: "/pizzas/the-greek-veggie7269.png",
      name: "the greek veggie",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/veg-bbq5837.png",
      name: "veg bbq",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/veg-mexican-ole2095.png",
      name: "veg mexican ole",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
    {
      image: "/pizzas/veggie-hawaiian3637.png",
      name: "veggie hawaiian",
      description: "",
      variants: [
        { size: "Small", price: 199 },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
      isVeg: true,
    },
  ];
  return (
    <div className="h-139">
      <section className="bg-white flex justify-center py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.name} item={pizza} />
          ))}
        </div>
      </section>
    </div>
  );
}
